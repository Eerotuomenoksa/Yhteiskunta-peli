# Muutosloki

Formaatti perustuu [Keep a Changelog](https://keepachangelog.com/) -käytäntöön. Versionumerointi noudattaa [Semantic Versioning](https://semver.org/) -mallia (`MAJOR.MINOR.PATCH`) — niin kauan kuin peli on testausvaiheessa (ennen 1.0.0), `MINOR`-numeron kasvu voi sisältää myös pelin tasapainoa muuttavia asioita.

## [Unreleased]

Kehitteillä `dev`-haarassa, ei vielä julkaistu testaajille.

### Lisätty

- Visuaalinen ilmelogo "Vuosirenkaat" (`assets/logo-mark.svg`, `assets/logo-full.svg`, generoitu deterministisesti `tools/gen-logo.js`:llä) — favicon ja tunnus kaikilla sivuilla
- Versionhallintamalli: `dev`-haara jatkuvalle työlle, semver-tagit + tämä muutosloki, CI-syntaksitarkistus (`tools/check-syntax.js`, `.github/workflows/ci.yml`)
- [KEHITYSSUUNNITELMA_2026-07.md](KEHITYSSUUNNITELMA_2026-07.md): yhden kuukauden (13.7.–7.8.) kehityssuunnitelma pilottivalmiuteen, ja [BACKLOG.md](BACKLOG.md) scope-creepin hallintaan
- Tietolaatikoiden rakenne- ja sisältösuunnitelma ([TIETOLAATIKKO_UI_SIJOITTELU.md](TIETOLAATIKKO_UI_SIJOITTELU.md), [TIETOLAATIKKO_SISALLOT.md](TIETOLAATIKKO_SISALLOT.md)): 6 kategoriaa, 26 tietolaatikkoa (13 olemassa olevaa + 13 uutta luonnosta)
- `data/tietolaatikot.js`: 13 olemassa olevaa info-selitettä siirretty koodista dataksi (ei sisältömuutoksia), kaikki `InfoButton`-kutsut lukevat nyt datasta
- Vite-build-pipeline (D2): `npm run build` tuottaa itsenäisen `dist/`-bundlen (`game/yhteiskunta.jsx` + React + Recharts, ei CDN-riippuvuutta). `game/yhteiskunta.html` (CDN-fallback) säilyy koskemattomana rinnalla. `data/tietolaatikot.mjs` on automaattisesti generoitu ES-moduuliversio Vite-buildia varten (`tools/build-tietolaatikot-esm.js`), synkkatarkistettu CI:ssä (`tools/check-data-sync.js`)
- 🗂️ Tietopankki-paneeli pelinäkymään: kaikki 26 tietolaatikkoa selattavissa kuudessa välilehdessä (Väestö & terveys, Talous & työ, Yhteiskunta & hallinto, Ympäristö, Koulutus & tiede, Historia & aikakaudet), aikakausiehdon mukaan lukittuna/avattuna, sisältö avautuu klikkauksesta
- 5 uutta kontekstuaalista ℹ️-nappia (vk1 to, korkean prioriteetin tietolaatikot): huoltosuhde (väestöpyramidi), demografinen siirtymä (kertomusraportin "Näytä luvut"), hallintomuodot & legitimiteetti (hallintomodaali), ruokaturva & nälänhätä (ruokavarasto-tilastossa), oppivelvollisuus & lukutaito (opetussuuntaus-rivillä) — 18/26 tietolaatikkoa nyt myös kontekstuaalisia, loput 8 vain Tietopankissa (tietoinen rajaus, ks. TIETOLAATIKKO_UI_SIJOITTELU.md)
- 💾 Tallennuskoodi (D3, vk2 ma): pelitila voidaan viedä kopioitavaksi base64-koodiksi (info-palkin "Tallennuskoodi ▸" -painike) ja tuoda takaisin aloitusruudun tuontikentästä — jatkaminen onnistuu täsmälleen samasta kohdasta samalla tai toisella koneella. Virheellisestä koodista näytetään selkeä virheilmoitus.
- 📊 Telemetrian runko + "Vie raportti" (D5, vk2 pe): kevyt paikallinen tapahtumaloki (avatut tietolaatikot, vuorojen määrä, saavutetut aikakaudet, istunnon kesto) — ei lähetetä minnekään, pysyy vain selaimen muistissa. "📊 Vie raportti (opettajalle)" -nappi Historia-modaalissa lataa yhteenvedon JSON-tiedostona.
- ♿ Saavutettavuus, osa 1 (vk3 ma, D4 alkuosa): kaikki yhdeksän modaalia sulkeutuvat Esc-näppäimellä, loukkaavat fokuksen sisäänsä (Tab kiertää paneelin sisällä), avautuessaan siirtävät fokuksen sisälleen ja palauttavat sen laukaisijaan sulkeuduttuaan (`role="dialog" aria-modal="true"`). Kaikilla ✕-sulkemisnapeilla nyt aria-label. Työvoiman jako- ja ammatit-osiot sekä Tietopankin tietolaatikkorivit avautuvat myös Enter/Space-näppäimellä (`role="button"`, `tabIndex`). Kuusi liukusäädintä (työvoiman jako × 5 sektoria, terveys-/tutkimus-/rikostutkinta-/teollisuuspainotukset) saivat `role="slider"` + aria-arvot ja toimivat nuolinäppäimillä (Page Up/Down, Home/End).
- ♿ Saavutettavuus, osa 2 (vk3 ti, D4 loppuosa): kaikki modaalit saivat `aria-labelledby` (yhteinen `id="modal-title"` otsikossa — vain yksi modaali kerrallaan auki) ja koko pelinäkymä on nyt `<main>`-maamerkin sisällä. `prefers-reduced-motion: reduce` kytkee pois modaalien avautumisanimaation ja muut siirtymät niitä toivoville käyttäjille. Automaattinen rakenteellinen esteettömyystarkistus (`axe-core` jsdom-testeissä, `tools/check-a11y.js`) ajetaan nyt joka pushissa CI:ssä kolmella pelinäkymällä (sivilisaation valinta, peli auki, modaali auki) — löysi ja varmisti korjatuksi kaksi oikeaa virhettä (dialogeilta puuttuva nimi, sisältö ilman maamerkkiä). Huom: `color-contrast`-sääntö on pois päältä axe-testissä koska jsdom ei tue canvas-renderöintiä — kontrastit (WCAG AA 4.5:1) tarkistettu erikseen käsin koko väripaletista.
- 📜 Historiallisen sisällön varmennus (D8, vk3 ke): [VARMENNUSKEHIKKO.md](VARMENNUSKEHIKKO.md) kirjoitti auki aiemmin vain viitatun (ei koskaan määritellyn) kuuden kriteerin varmentamiskehikon. Kaikki 26 tietolaatikkoa käytiin läpi sillä, tulokset [HISTORIALLINEN_VARMENNUS.md](HISTORIALLINEN_VARMENNUS.md):ssä: 25/26 vahvistettu sellaisenaan (osa tarkistettu erikseen verkkohaulla, mm. Suomen nälkävuosien 1866–68 kuolinlukuhaarukka ja huoltosuhteen EU-vertailu), 1/26 korjattu, 0/26 vaati asiantuntijalähetystä.
- 🏫 Koulusimulaatio (vk3 pe): kestävyystarkistus hitaalle yhteydelle, halvalle koneelle ja verkkokatkolle, tulokset [KOULUSIMULAATIO.md](KOULUSIMULAATIO.md):ssä. Peli ja testaajat.html vahvistettu toimivan täysin ilman verkkoa (jsdom-testi, `fetch()` epäonnistuu aina — 0 kaatumista, laskurit/bugilista näyttävät selkeän virhetilan). Merkittävin löydös: testaajien käyttämä `game/yhteiskunta.html` siirtää verkon yli n. 824 kt CDN-riippuvuuksia (josta 655 kt on pelkkää @babel/standalone-kääntäjää) — 3,5–4× enemmän kuin jo olemassa oleva Vite-bundle (227 kt), jota ei ole vielä julkaistu missään testaajien tavoitettavissa. Ei korjattu tässä paketissa, koska vaatii deploy-putken muutoksen (GitHub Pages -julkaisu dist/-kansiolle) — käyttäjän päätettävä.

### Muutettu

- Kaksi väriä säädetty hieman vaaleammiksi WCAG AA -kontrastivaatimuksen (4.5:1) täyttämiseksi pienikokoisessa tekstissä: varoitusväri `#c96a5a` → `#cb7061` (mm. ruokavaraston alijäämä-teksti), lukittu/ei-vielä-avautunut-teksti `#728098` → `#7d8aa0` (Tietopankin lukitut tietolaatikot). Muutos on silmämääräisesti hyvin pieni.
- 🔢 Käyttölaskuri testaajien sivulle: `testaajat.html` näyttää nyt käynnistettyjen pelien määrän ja sivun omien katselukertojen määrän. Pelilaskuri kasvaa, kun pelaaja painaa "Perusta kylä ja aloita" (ei pelkästä sivun avaamisesta). Toteutettu ilmaisella, rekisteröitymistä vaatimattomalla Abacus-laskuri-API:lla (abacus.jasoncameron.dev) — ei omaa palvelinta eikä tiliä tarvita. Laskuri epäonnistuu äänettömästi eikä koskaan estä pelin tai sivun käyttöä (esim. verkon puuttuessa tai mainonnanestäjän salliessä).

### Korjattu

- Section-apukomponentti (työvoiman jako -osion otsikko) oli määritelty pelikomponentin sisällä, jolloin React loi siitä uuden komponenttityypin joka renderöinnillä ja purki/rakensi koko sisällön (myös fokuksen) uudelleen jokaisen tilanpäivityksen yhteydessä. Tämä olisi rikkonut juuri lisätyn liukusäädinten nuolinäppäinohjauksen — korjattu siirtämällä Section moduulitasolle.
- Tietolaatikko "Kirjoitustaito ja historiankirjoitus" väitti virheellisesti kaikkien neljän itsenäisesti syntyneen kirjoitusjärjestelmän (Mesopotamia, Egypti, Kiina, Mesoamerikka) syntyneen "noin 3000 eaa." — todellisuudessa tämä pitää paikkansa vain Mesopotamialle ja Egyptille; Kiinan kirjoitus syntyi n. 1300 eaa. ja Mesoamerikan n. 900–600 eaa., yli tuhat vuotta myöhemmin. Korjattu erottelemaan ajoitukset (ks. HISTORIALLINEN_VARMENNUS.md).
- Google Fontsin lataus tapahtui render-blocking `@import`-lauseella vasta Reactin renderöimässä `<style>`-tagissa, mikä viivästytti fonttien latauksen alkamista hitailla yhteyksillä turhaan. Siirretty `<head>`-elementin `preconnect`+`stylesheet`-linkeiksi molemmissa peliversioissa (`game/yhteiskunta.html`, `game/index.html`+`.jsx`).

Vite-bundle vahvistettu toimivaksi oikeassa selaimessa (Edge) 10.7. — automatisoitu selainklikkaustestaus ei onnistunut tässä ympäristössä, mutta manuaalinen kokeilu vahvisti build-tuloksen toimivan.

## [0.1.0] — 2026-07-09

Ensimmäinen versio, joka on viety testaajien saataville.

### Lisätty

- Sivilisaatiopeli 20 historiallisella sivilisaatiolla, hallintomuodoilla, työvoimasektoreilla ja väestönkehitysmoottorilla
- Viisi aikakautta (Muinaisaika, Keskiaika, Varhaisteollinen, Teollinen, Moderni) — Agraarinen jaettu kahtia historiallisen tarkkuuden vuoksi
- Sivilisaatiokohtaiset aikakausinimet ja -tarinat kaikille 20 sivilisaatiolle
- Kieliversiot suomi, englanti, tanska (peli) sekä suomi, ruotsi, englanti, tanska (markkinointisivu)
- Markkinointisivu (`index.html`)
- Testaajien sivu (`testaajat.html`): kehityssuunnitelma, elävä bugilista GitHub-issueista, ilmoituslomake
- Museo-tyylinen käyttöliittymä, luokkahuonenäkymä pedagogisine pohdintakysymyksineen

### Muutettu

- Pelin vuoropituus yksinkertaistettu: vain 5 vuoden vuoro (1 vuoden vaihtoehto poistettu)

### Tunnetut rajoitukset

- Sivilisaatiokohtaiset aikakausinimet toistaiseksi vain suomeksi — muilla kielillä näytetään geneerinen aikakausinimi
- Kansallisvaltio-DLC on demo-tasoinen simulaatio (ei oikeaa maksua)

[Unreleased]: https://github.com/Eerotuomenoksa/Yhteiskunta-peli/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/Eerotuomenoksa/Yhteiskunta-peli/releases/tag/v0.1.0
