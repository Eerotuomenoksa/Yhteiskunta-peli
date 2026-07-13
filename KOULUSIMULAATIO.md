# Koulusimulaatio — kestävyystarkistus hitaalle yhteydelle, halvalle koneelle ja verkkokatkolle

**Tehty:** 13.7.2026 (KEHITYSSUUNNITELMA vk3 pe -kohta)
**Rajaus:** Tässä ympäristössä ei ole toimivaa selainautomaatiota (Puppeteer epäonnistui aiemmin tässä samassa projektissa käyttöjärjestelmän/EDR-rajoitusten vuoksi), joten Chrome DevTools -kuristusta ei voitu ajaa suoraan. Sen sijaan mitattiin oikeat siirtokoot verkosta ja pääteltiin lataus- ja suoritusaika niistä, ja testattiin verkkokatko-kestävyys jsdomilla oikeaa peliä ajamalla.

## 1. Verkkokatko: peli toimii täysin ilman verkkoa

Testattiin jsdomilla peli koko elinkaaren ajan (sivilisaation valinta → kylän perustus → vuoron eteneminen) tilanteessa jossa **kaikki `fetch()`-kutsut epäonnistuvat aina** (simuloi verkkokatkoa/lentokonetilaa/mainonnanestäjää). Sama testi ajettiin myös `testaajat.html`:lle.

- ✅ Peli käynnistyy, kylä perustuu, vuoro etenee — kaikki toimii normaalisti.
- ✅ Käyttölaskuri (Abacus-API) epäonnistuu äänettömästi, ei kaada mitään.
- ✅ `testaajat.html`: bugilista näyttää selkeän virhetekstin ("Listaa ei juuri nyt saatu ladattua…") sen sijaan että jäisi ikuisesti "Ladataan…"-tilaan; laskurit näyttävät "–".
- ✅ 0 odottamatonta JS-virhettä kummassakaan tapauksessa.

**Ei löydöksiä korjattavaksi tältä osin — peli on jo hyvin verkkokatko-kestävä.**

## 2. Hidas yhteys: fonttien renderöintiä estävä lataustapa korjattu

**Löydös (korjattu):** `game/yhteiskunta.html` ja `game/index.html` (Vite-versio) latasivat Google Fontsin CSS:n `@import`-lauseella React-komponentin renderöimän `<style>`-tagin sisällä. Tämä oli kaksinkertaisesti hidas:

1. `@import` on itsessään sarjamuotoinen (selain lataa ensin pääarkin, löytää siitä importin, ja vasta sitten aloittaa fontin latauksen — ei rinnakkain).
2. Koska `<style>`-tagi renderöityy vasta Reactin mountauksen jälkeen, fonttipyyntö ei edes *alkanut* ennen kuin JS oli ladattu, jäsennelty ja suoritettu — hitaalla yhteydellä tämä tarkoittaa turhaa lisäviivettä ennen fonttien latauksen alkamistakaan.

**Korjaus:** siirretty fonttien lataus `<head>`-elementin `<link rel="preconnect">` + `<link rel="stylesheet">`-pareiksi, jotka selain löytää heti HTML:n jäsennyksen alussa ja aloittaa rinnakkain JS-latauksen kanssa. Sama korjaus tehtiin myös `game/yhteiskunta.jsx`:ään (Vite-lähde) ja `game/yhteiskunta.html`:n CDN-skriptien `unpkg.com`-yhteyteen lisättiin `preconnect`, joka nopeuttaa DNS/TLS-kättelyä ennen itse skriptien latausta.

## 3. Merkittävin löydös: testaajien tällä hetkellä käyttämä sivu on 3–4× raskaampi kuin tarpeen

`testaajat.html`:n "🎮 Pelaa peliä →" -linkki vie suoraan `game/yhteiskunta.html`:ään (CDN-fallback), **ei** Vite-buildin tuottamaan itsenäiseen bundleen (D2, jo valmis mutta ei käytössä). Mitattiin oikeat, pakatut (gzip/brotli) siirtokoot 13.7.:

| Riippuvuus | Siirtokoko (pakattu) |
|---|---|
| React 18 | 4,3 kt |
| ReactDOM 18 | 42,9 kt |
| prop-types | 0,8 kt |
| Recharts (**huom: ei-minifioitu** UMD-versio) | 121,9 kt |
| @babel/standalone (JSX-kääntäjä selaimessa) | **654,6 kt** |
| **CDN-riippuvuudet yhteensä** | **~824,5 kt** |

Vertailun vuoksi: Vite-buildin koko itsenäinen bundle (React + ReactDOM + Recharts + koko pelilogiikka, minifioitu ja puu-karsittu) on **227,3 kt** pakattuna ([npm run build](package.json) -tuloste).

**Toisin sanoen: testaajien juuri nyt käyttämä sivu siirtää verkon yli noin 3,5–4× enemmän dataa** kuin Vite-bundle, ja lisäksi joutuu suorittamaan koko pelin JSX-lähdekoodin (n. 270 kt) selaimessa Babelilla ajonaikaisesti ennen kuin mitään näkyy — tämä on erityisen raskasta juuri niillä halvoilla/vanhoilla koneilla (esim. Chromebookit), joita "koulusimulaatio"-testi koskee, koska ajonaikainen JSX-kääntäminen on prosessoriraskasta, ei vain verkkoraskasta.

**Tämä ei ole bugi vaan tietoinen, jo dokumentoitu arkkitehtuurivalinta** ([KEHITYSSUUNNITELMA_2026-07.md](KEHITYSSUUNNITELMA_2026-07.md) kohta 0): `game/yhteiskunta.html` säilytetään tarkoituksella `file://`-yhteensopivana varapolkuna (offline-jakelu ilman build-vaihetta), kun taas Vite-bundle rakennettiin nimenomaan tätä nopeus-/kevyysongelmaa varten (D2: "ei CDN-riippuvuutta"). Ongelma on, että **Vite-bundlea ei ole vielä koskaan julkaistu missään testaajien tavoitettavissa** — se vain rakennetaan ja tarkistetaan CI:ssä, ei julkaista GitHub Pagesiin.

**Suositus (ei toteutettu vielä, vaatii käyttäjän päätöksen):** lisätä CI:hen/deploy-prosessiin vaihe joka julkaisee `dist/`-kansion GitHub Pagesiin (esim. omaan alikansioon tai erilliseen Pages-lähteeseen), ja vaihtaa `testaajat.html`:n "Pelaa peliä" -linkki osoittamaan sinne — `game/yhteiskunta.html` säilyy silti muuttumattomana varapolkuna niille jotka lataavat pelin koneelleen offline-käyttöön. Tämä on isompi, deploy-putkeen vaikuttava muutos, joten se ei sisälly tähän pakettiin ilman erillistä vahvistusta.

## 4. Pieni resoluutio (1366×768, esim. halpa Chromebook)

Koodikatselmuksella (ei visuaalista selaintestiä — ks. rajaus yllä):

- ✅ Sivun ulointa säiliötä käytetään `minHeight: "100vh"` (ei kiinteä `height`), joten sisältö voi kasvaa yli näkymän ja sivu vierittyy normaalisti — ei "loukkuun jäävää" sisältöä.
- ✅ Kaikki modaalit käyttävät `maxHeight: "88–90vh"` + `overflowY: "auto"` — ne vierittävät sisäisesti, eivät koskaan ylitä näkymän korkeutta edes lyhyellä (768 px) korkeudella.
- ✅ Ruudukot (`.grid2`, `.stat-grid`) käyttävät joustavia yksiköitä (`fr`, `minmax`), ei kiinteitä pikselileveyksiä — 1366 px on reilusti olemassa olevien mobiilirajapisteiden (680 px, 400 px) yläpuolella, joten työpöytäasettelu pysyy mutta mahtuu leveyssuunnassa hyvin.
- ⚠️ **Ei voitu visuaalisesti vahvistaa** oikeassa selaimessa 1366×768-resoluutiolla — koodi vaikuttaa kestävältä, mutta suosittelen käyttäjän omaa pikatarkistusta (esim. selaimen ikkunan koon pienentäminen tähän resoluutioon) varmuuden vuoksi ennen pilottikoulukontaktointia.

## Yhteenveto — mitä tehtiin ja mitä jäi auki

| Löydös | Tila |
|---|---|
| Verkkokatko kaataa jotain | ✅ Ei löytynyt ongelmaa — vahvistettu jsdom-testillä |
| Fonttien render-blocking lataus | ✅ Korjattu (`<head>`-linkit + preconnect) |
| CDN-fallback 3,5–4× raskaampi kuin Vite-bundle | ⚠️ Löydetty ja dokumentoitu, korjaus (Pages-julkaisu) vaatii käyttäjän päätöksen |
| 1366×768-asettelu | ⚠️ Koodikatselmus puhtaana, visuaalinen vahvistus jäi auki (ei selainautomaatiota tässä ympäristössä) |
