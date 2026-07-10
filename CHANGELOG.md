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
