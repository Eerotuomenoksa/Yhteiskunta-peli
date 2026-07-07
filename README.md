# Yhteiskunta (Society)

Suomenkielinen, selaimessa toimiva sivilisaatiosimulaatiopeli, jonka tarkoitus on auttaa yläkoulun ja lukion oppilaita ymmärtämään historiaa ja yhteiskuntaoppia mielekkäiden, seurauksellisten valintojen kautta.

Pelaaja johtaa 10 000 hengen yhteiskuntaa agraariajasta nykyaikaan tehden päätöksiä mm. hallinnosta, taloudesta, terveydenhuollosta, maataloudesta ja tutkimuksesta. Pelin lopuksi oppilas esittelee oman yhteiskuntansa tarinan luokkatovereille.

## Tiedostot

- `game/yhteiskunta.jsx` — Reactin lähdekoodi (komponenttiversio, käytettävissä esim. Claude-artefaktina tai osana suurempaa React-sovellusta)
- `game/yhteiskunta.html` — itsenäinen, suoraan selaimessa toimiva versio (React, ReactDOM, Recharts ja Babel ladataan CDN:stä; ei vaadi build-vaihetta). Avaa tuplaklikkaamalla missä tahansa selaimessa.

## Ominaisuudet (tiivistetysti)

- 20 historiallista sivilisaatiota, joilla omat statimuokkaimet
- Neljä aikakautta (agraarinen → varhaisteollinen → teollinen → moderni), joilla omat tarinatyylit
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
