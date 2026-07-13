# Yhteiskunta (Society)

<img src="assets/logo-full.svg" alt="Yhteiskunta — Kylästä kansakunnaksi" width="360" />

Suomenkielinen, selaimessa toimiva sivilisaatiosimulaatiopeli, jonka tarkoitus on auttaa yläkoulun ja lukion oppilaita ymmärtämään historiaa ja yhteiskuntaoppia mielekkäiden, seurauksellisten valintojen kautta.

Pelaaja johtaa 10 000 hengen yhteiskuntaa agraariajasta nykyaikaan tehden päätöksiä mm. hallinnosta, taloudesta, terveydenhuollosta, maataloudesta ja tutkimuksesta. Pelin lopuksi oppilas esittelee oman yhteiskuntansa tarinan luokkatovereille.

## Tiedostot

- `game/yhteiskunta.jsx` — Reactin lähdekoodi (komponentti), jota **Vite-build** (ks. alla) käyttää
- `play/` — Vite-buildin **committoitu tuotos**, jonka GitHub Pages tarjoilee osoitteesta `/play/` — tämä on testaajien ensisijainen linkki (ks. `testaajat.html`). Rakennettu `npm run build`:lla, ei muokata käsin. **Muista ajaa `npm run build` ja committoida tulos aina kun `game/yhteiskunta.jsx` tai `data/tietolaatikot.mjs` muuttuu**, muuten julkaistu versio jää jälkeen.
- `game/yhteiskunta.html` — itsenäinen, suoraan selaimessa toimiva **CDN-fallback-versio** (React, ReactDOM, Recharts ja Babel ladataan CDN:stä; ei vaadi build-vaihetta eikä palvelinta). Avaa tuplaklikkaamalla missä tahansa selaimessa, myös ilman verkkoyhteyttä asennuksen jälkeen paitsi fonttien osalta. Säilyy tarkoituksella koskemattomana varajärjestelmänä niille jotka lataavat pelin koneelleen offline-käyttöön — huomattavasti raskaampi kuin `play/` (ks. KOULUSIMULAATIO.md), joten ei ole enää testaajien ensisijainen linkki.
- `data/tietolaatikot.js` — pelin tietolaatikoiden (ks. TIETOLAATIKKO_*.md) sisältö, klassinen `<script>`-yhteensopiva muoto — tämä on **muokattava lähdetiedosto**.
- `data/tietolaatikot.mjs` — sama sisältö ES-moduulina Vite-buildia varten. **Automaattisesti generoitu, älä muokkaa suoraan** — aja `node tools/build-tietolaatikot-esm.js` `.js`-tiedoston muokkauksen jälkeen.

## Build (Vite)

```bash
npm install
npm run build     # -> play/ (yksi itsenäinen, git-committoitu kansio jonka GitHub Pages tarjoilee)
npm run dev        # kehityspalvelin hot-reloadilla
npm run preview    # esikatselee play/-kansion paikallisesti
```

`play/`-kansio on täysin itsenäinen (favicon ja kaikki muu bundlattu mukaan) mutta vaatii `type="module"`-tuen vuoksi HTTP(S)-palvelimen — ei toimi `file://`-protokollalla tuplaklikkaamalla (siihen käyttöön on `game/yhteiskunta.html`). Toisin kuin useimmat Vite-projektit, tämä kansio **committoidaan gitiin** (ei ole `.gitignore`ssa) koska GitHub Pages tässä projektissa tarjoilee suoraan `main`-haaran tiedostoja ilman erillistä julkaisuputkea.

## Ominaisuudet (tiivistetysti)

- 20 historiallista sivilisaatiota, joilla omat statimuokkaimet ja omat sivilisaatiokohtaiset aikakausinimet/-tarinat
- Viisi aikakautta (muinaisaika → keskiaika → varhaisteollinen → teollinen → moderni), joilla omat tarinatyylit. Siirtymä ei ole sidottu kalenterivuoteen vaan tutkimus- ja väestökynnyksiin, joten sama aikakausi kestää eri sivilisaatioilla ja läpipeluilla eri pituisen ajan.
- Hallintomuotojärjestelmä: heimoneuvostosta demokratiaan ja teokratiaan, lukitusehdot ja levottomuusmekaniikka
- Yhdeksän työvoimasektoria erikoistumisliukureilla (terveydenhuolto, tutkimus, maatalous, koulutus jne.)
- Väestönkehitysmoottori (syntyvyys, kuolleisuus, ikääntyneiden historiallisesti mallinnettu työpanos)
- Kuusi yhteiskuntamittaria (elinajanodote, työllisyysaste, saastuminen, BKT per capita, rikollisuus, onnellisuusindeksi), jotka avautuvat asteittain
- 5 vuoden jaksotarinat + vuosikohtaiset tapahtumat
- Mobiiliystävällinen käyttöliittymä, infomodaalit, tulostaulu
- Luokkahuonenäkymä: virstanpylväsaikajana, pisteiden erittely, pedagogiset pohdintakysymykset

## Käyttö

Avaa `game/yhteiskunta.html` suoraan selaimessa (ei vaadi mitään asennusta), tai buildaa Vite-versio (ks. yllä) tuotantokäyttöön.

## Tausta

Projektilla on myös liiketoimintasuunnitelma, joka tähtää koululisensointiin (ei mainoksia, ei pay-to-win) porrastetulla hinnoittelulla yksittäisille opettajille ja oppilaitoksille. Pidemmällä aikavälillä suunnitteilla on myös kuluttajajulkaisu kansallisvaltio-DLC-mallilla.

## Kehitys &amp; versionhallinta

- **Haarat:** `dev` on jatkuvan kehitystyön haara. `main` pysyy aina testaajille jaetussa, toimivassa tilassa — GitHub Pages julkaisee suoraan `main`-haarasta. Kun `dev`-haaran työ on valmis testattavaksi, se mergetään `main`-haaraan.
- **Versiot:** [Semantic Versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`) ja [CHANGELOG.md](CHANGELOG.md). Jokainen testaajille menevä julkaisu saa git-tagin (esim. `v0.1.0`) ja GitHub Releasen.
- **CI:** joka push ja pull request ajaa automaattisesti (GitHub Actions, `.github/workflows/ci.yml`): `tools/check-syntax.js` (JS/JSX-syntaksi), `tools/check-data-sync.js` (varmistaa ettei `data/tietolaatikot.mjs` ole jäänyt jälkeen `data/tietolaatikot.js`:stä) ja `npm run build` (Vite-bundle rakentuu virheittä). Voit ajaa nämä paikallisesti samoilla komennoilla.
- **Testaajapalaute:** [testaajat.html](testaajat.html) kokoaa kehityssuunnitelman ja GitHub Issueina tulevat bugi-/kehitysehdotukset yhteen näkymään.
