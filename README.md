# Yhteiskunta (Society)

Suomenkielinen, selaimessa toimiva sivilisaatiosimulaatiopeli, jonka tarkoitus on auttaa yläkoulun ja lukion oppilaita ymmärtämään historiaa ja yhteiskuntaoppia mielekkäiden, seurauksellisten valintojen kautta.

Pelaaja johtaa 10 000 hengen yhteiskuntaa agraariajasta nykyaikaan tehden päätöksiä mm. hallinnosta, taloudesta, terveydenhuollosta, maataloudesta ja tutkimuksesta. Pelin lopuksi oppilas esittelee oman yhteiskuntansa tarinan luokkatovereille.

## Tiedostot

- `game/yhteiskunta.jsx` — Reactin lähdekoodi (komponenttiversio, käytettävissä esim. Claude-artefaktina tai osana suurempaa React-sovellusta)
- `game/yhteiskunta.html` — itsenäinen, suoraan selaimessa toimiva versio (React, ReactDOM, Recharts ja Babel ladataan CDN:stä; ei vaadi build-vaihetta). Avaa tuplaklikkaamalla missä tahansa selaimessa.

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

Avaa `game/yhteiskunta.html` suoraan selaimessa, tai käytä `game/yhteiskunta.jsx`-tiedostoa osana React-projektia (vaatii `react`, `react-dom` ja `recharts`).

## Tausta

Projektilla on myös liiketoimintasuunnitelma, joka tähtää koululisensointiin (ei mainoksia, ei pay-to-win) porrastetulla hinnoittelulla yksittäisille opettajille ja oppilaitoksille. Pidemmällä aikavälillä suunnitteilla on myös kuluttajajulkaisu kansallisvaltio-DLC-mallilla.

## Kehitys &amp; versionhallinta

- **Haarat:** `dev` on jatkuvan kehitystyön haara. `main` pysyy aina testaajille jaetussa, toimivassa tilassa — GitHub Pages julkaisee suoraan `main`-haarasta. Kun `dev`-haaran työ on valmis testattavaksi, se mergetään `main`-haaraan.
- **Versiot:** [Semantic Versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`) ja [CHANGELOG.md](CHANGELOG.md). Jokainen testaajille menevä julkaisu saa git-tagin (esim. `v0.1.0`) ja GitHub Releasen.
- **CI:** joka push ja pull request ajaa automaattisesti `tools/check-syntax.js`:n (GitHub Actions, `.github/workflows/ci.yml`), joka tarkistaa ettei `game/yhteiskunta.jsx` tai `game/yhteiskunta.html` sisällä JS/JSX-syntaksivirheitä. Voit ajaa saman tarkistuksen paikallisesti: `node tools/check-syntax.js`.
- **Testaajapalaute:** [testaajat.html](testaajat.html) kokoaa kehityssuunnitelman ja GitHub Issueina tulevat bugi-/kehitysehdotukset yhteen näkymään.
