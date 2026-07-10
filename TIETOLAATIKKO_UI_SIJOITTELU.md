# Tietolaatikot — rakenne ja UI-sijoittelu

> **Tila:** Hyväksytty 10.7.2026, valmis toteutettavaksi [KEHITYSSUUNNITELMA_2026-07.md](KEHITYSSUUNNITELMA_2026-07.md):n viikko 1 (ma 13.7. / ke 15.7.) mukaisesti.

## 1. Lähtökohta: mitä pelissä on jo

Koodikannasta (`game/yhteiskunta.jsx`) inventoitu **13 olemassa olevaa info-selitettä**, jotka jo nyt avautuvat kontekstuaalisesti ℹ️-kuvakkeista:

**Kuusi yhteiskuntamittaria** (`METRICS`-taulukko, `InfoButton` rivillä ~2429):
1. Elinajanodote
2. Työllisyysaste
3. Saasteindeksi
4. BKT / asukas
5. Rikollisuusaste
6. Onnellisuusindeksi

**Seitsemän sektorivalinnan selitettä** (kiinteät `InfoButton`-kutsut):
7. Maatalousmoodi (`farmModeInfoText`)
8. Terveyspainotus: ehkäisevä ↔ sairaalapainotteinen (`healthFocusInfoText`)
9. Erikoislääkärien osuus (`specialistInfoText`)
10. Tutkimussuuntaus: perus ↔ soveltava (`appliedInfoText`)
11. Opetussuuntaus (`eduModeInfoText`)
12. Rikostutkijoiden osuus (`detectiveInfoText`)
13. Teollisuussuuntaus (`industryInfoText`)

Näitä EI poisteta paikoiltaan — ne pysyvät kontekstuaalisina siellä missä ne jo ovat (regressioriski muuten). Uusi tietolaatikkopaneeli on **lisäkerros** näiden päälle, ei korvaaja.

## 2. Datarakenne

```js
// data/tietolaatikot.js
export const TIETOLAATIKOT = [
  {
    id: "elinajanodote",           // uniikki, snake/kebab-case, ei muutu enää julkaisun jälkeen
    kategoria: "vaesto",           // ks. kohta 3, tarkka avainlista
    otsikko: "Elinajanodote",
    sisalto: "Oikeasti elinajanodote lasketaan...",  // sama teksti kuin nyt InfoButtonissa, siirretty tänne
    aikakausiehto: 0,              // pienin era-indeksi (0=Muinaisaika) jolloin laatikko on relevantti/avoinna. null = aina
    prioriteetti: "korkea",        // "korkea" | "normaali" — vain "korkea" saa kontekstuaalisen ℹ️-kuvakkeen (ks. kohta 4)
    kontekstuaalinen: true,        // näytetäänkö myös inline-ikonina olemassa olevassa paikassa (13 vanhaa: aina true)
  },
  // ...
];
```

Kentät vastaavat suunnitelman määrittelyä (id, kategoria, otsikko, sisältö, aikakausiehto, prioriteetti) plus yksi lisäkenttä `kontekstuaalinen`, joka tarvitaan kohdan 4 riskinhallintaa varten.

## 3. Kuusi kategoriaa

Valittu niin, että ne vastaavat oikeita yhteiskuntatieteen osa-alueita (LOPS/POPS-kytkentä helpompi perustella kuin mielivaltaisella jaolla) ja jakavat 13 olemassa olevaa laatikkoa luontevasti:

| Avain | Nimi (välilehti) | Ikoni | Olemassa olevat laatikot (13/13 sijoitettu) |
|---|---|---|---|
| `vaesto` | Väestö & terveys | 🫀 | Elinajanodote, Terveyspainotus, Erikoislääkärit |
| `talous` | Talous & työ | 💰 | BKT/asukas, Työllisyysaste, Teollisuussuuntaus, Maatalousmoodi |
| `yhteiskunta` | Yhteiskunta & hallinto | ⚖️ | Rikollisuusaste, Rikostutkijat, Onnellisuusindeksi |
| `ymparisto` | Ympäristö | 🏭 | Saasteindeksi |
| `koulutus` | Koulutus & tiede | 📚 | Opetussuuntaus, Tutkimussuuntaus |
| `historia` | Historia & aikakaudet | ⏳ | *(ei yhtään vielä — kaikki uusia, ks. TIETOLAATIKKO_SISALLOT.md)* |

Kategorioiden nimet/ikonit voi silti muuttaa myöhemmin ilman koodivaikutusta, koska datatiedoston avainnimi (`vaesto`, `talous`...) pysyy samana.

## 4. UI-sijoittelu

### 4.1 Uusi keskitetty paneeli (D1:n runko)

- Uusi nappi päätoiminnoissa: **"📖 Tietopankki"** avaa modaalin, jossa 6 välilehteä (kohta 3).
- Jokainen tietolaatikko listataan kategoriansa alla otsikolla; klikkaus avaa sisällön.
- **Aikakausiehto** suodattaa: laatikot joiden `aikakausiehto` on suurempi kuin pelaajan nykyinen aikakausi näkyvät harmaana/lukittuna tekstillä "Avautuu aikakaudella X" (sama kaava kuin `metricLocked` jo nyt toimii METRICS-taulukolle).
- Kaikki 26 laatikkoa ovat aina saavutettavissa tästä paneelista — tämä on D1:n minimivaatimus.

### 4.2 Kontekstuaaliset inline-ikonit (rajattu 5+13=18/26, ei kaikille)

Riskitaulukon mukaisesti ([KEHITYSSUUNNITELMA_2026-07.md](KEHITYSSUUNNITELMA_2026-07.md) kohta 5) kontekstuaalisia ℹ️-kuvakkeita pelinäkymän sisällä EI tehdä kaikille 26:lle heti, koska sijoittelu jokaiselle uniikkiin UI-kohtaan olisi iso työ:

- **13 olemassa olevaa** säilyttävät kontekstuaalisen ikoninsa nykyisellä paikallaan (`kontekstuaalinen: true` kaikilla).
- **13 uudesta** vain **5 tärkeintä** (viikko 1 torstain "5 uutta korkean prioriteetin tietolaatikkoa", `prioriteetti: "korkea"`) saavat myös kontekstuaalisen ikonin — ehdotetut paikat:
  - *Huoltosuhde* → väestöpyramidi-/ikäjakaumanäkymän vierelle
  - *Demografinen siirtymä* → syntyvyys/kuolleisuusluvun viereen tarinaraportissa
  - *Hallintomuodot ja legitimiteetti* → hallintomuodon valintanäkymään (jo olemassa oleva hallinto-modaali)
  - *Ruokaturva ja nälänhätä* → ruokavaraston/foodRatio-näyttöön
  - *Oppivelvollisuus ja lukutaito* → koulutuskattavuuden (eduCov) näyttöön
- **Loput 8 uutta** (viikko 2 torstai) ovat **vain paneelissa** (`kontekstuaalinen: false`) — tämä on tietoinen, dokumentoitu rajaus, ei unohdus.

**Vahvistettu 10.7.:** 5 kontekstuaalista uutta laatikkoa on oikea määrä. Näitä on silti helppo vaihtaa myöhemmin — kyse on vain siitä, mitkä 5/13 uudesta merkitään `prioriteetti: "korkea"`.

## 5. Aikakausiehdon arvot (era-indeksi, 0–4)

Vastaa pelin nykyistä `ERAS`-indeksointia (0=Muinaisaika, 1=Keskiaika, 2=Varhaisteollinen, 3=Teollinen, 4=Moderni). Katso tarkat arvot jokaiselle 26 laatikolle [TIETOLAATIKKO_SISALLOT.md](TIETOLAATIKKO_SISALLOT.md):stä — pääsääntö: metriikat avautuvat samalla `unlockEra`-arvolla kuin nykyinen `METRICS`-taulukko jo määrittää, uudet laatikot arvioitu sisällön historiallisen ajankohdan mukaan.

## 6. Toteutusjärjestys (ei muuta kuin mitä suunnitelma jo sanoo)

1. Ma 13.7.: `data/tietolaatikot.js` + 13 olemassa olevan sisällön siirto sinne (ei sisältömuutoksia, pelkkä siirto)
2. Ke 15.7.: 6 välilehden paneeli + kontekstuaaliset ikonit 13 olemassa olevalle (jo toimivat, varmistetaan ettei rikkoudu siirrossa)
3. To 16.7.: 5 uutta korkean prioriteetin laatikkoa (kontekstuaalisina + paneelissa)
4. To 23.7.: loput 8 (vain paneelissa) → 26/26
