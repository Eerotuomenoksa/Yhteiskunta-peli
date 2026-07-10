# YHTEISKUNTA — Yhden kuukauden kehityssuunnitelma

**Jakso:** ma 13.7. – pe 7.8.2026 (4 viikkoa)
**Tavoite:** Pilottivalmis versio ja pilottikoulujen kontaktointi ennen syyslukukauden alkua
**Versio:** 1.1 (9.7.2026) — korjattu merkistö, täydennetty tilannekatsauksella

---

## 0. Tilannekatsaus (lisätty 9.7.2026)

Ennen tämän suunnitelman virallista alkua (ma 13.7.) on repossa tehty viikolla 7.–9.7. seuraavaa työtä, joka ei ollut tätä dokumenttia laadittaessa vielä tiedossa. Nämä eivät riko kohdan 6 "ei uusia pelimekaniikkoja" -sääntöä, koska ne valmistuivat *ennen* jakson alkua:

- **Viisi aikakautta neljän sijaan:** Agraarinen jaettiin historiallisesti Muinaisaikaan ja Keskiaikaan (raja ~v. 1450), ja jokainen 20 sivilisaatiosta sai oman, historiallisesti oikean aikakausinimen ja -tarinan saman mekaniikan päälle.
- **Testaajien sivu (`testaajat.html`):** salasanasuojattu (vain testaajaryhmälle), näyttää kehityssuunnitelman tilan ja elävän listan GitHub-issueista, sisältää ilmoituslomakkeen (bugi/ehdotus → GitHub-issueksi tai sähköpostiksi). **Tämä on jo olemassa oleva kanava viikkojen 2 ja 3 pelitestausten (D6) palautteen keräämiseen** — kannattaa käyttää `Testimuistio`-havaintojen rinnalla, ei rakentaa erillistä.
- **Versionhallintamalli:** `dev`-haara jatkuvalle työlle, `main` aina testaajien näkemä tila (GitHub Pages julkaisee siitä), Semantic Versioning + `CHANGELOG.md`, ensimmäinen tagattu julkaisu `v0.1.0`.
- **CI-syntaksitarkistus:** `.github/workflows/ci.yml` + `tools/check-syntax.js` ajaa Babel/esbuild-syntaksitarkistuksen automaattisesti joka pushissa `main`- ja `dev`-haaroille. **Tämä kattaa jo puolet kohdan D10/viikko 1 perjantain tavoitteesta** — jäljellä on vain jsdom-savutestien lisääminen itse pelille (testaajat.html:n lomakkeelle savutestit on jo kirjoitettu erikseen, mutta ei vielä CI:hen asti vietynä).
- **Logo ja visuaalinen tunnus** ("Vuosirenkaat"): favicon ja tunnus kaikilla sivuilla, generoitu skaalautuvana SVG:nä (`tools/gen-logo.js`).

**Näiden vaikutus tähän suunnitelmaan:** Viikko 1 perjantain (17.7.) CI-tehtävä lyhenee (rakenne on jo pystyssä, lisätään vain jsdom-savutestit peliin), ja viikkojen 2–3 pelitestausten palaute kannattaa kirjata sekä testimuistioon että testaajat.html:n kautta GitHub-issueiksi, jotta se näkyy myös testaajaryhmälle itselleen.

> **Avoin riippuvuus, ei vielä ratkaistu:** kohdat "Ma 13.7." ja "To 23.7." (viikko 1–2) edellyttävät tiedostoja `TIETOLAATIKKO_UI_SIJOITTELU.md` ja `TIETOLAATIKKO_SISALLOT.md`, joita ei löydy repositorion tästä versiosta. Jos ne ovat olemassa muualla (esim. omissa muistiinpanoissa), ne pitää lisätä repoon ennen maanantaita 13.7. — muuten ma/to-tehtävät eivät voi alkaa suunnitellusti ja aikataulu siirtyy.

---

## 1. Periaatteet (miksi suunnitelma on tällainen)

Suunnitelma noudattaa modernin pelinkehityksen kolmea ydinperiaatetta:

1. **Playtest early, playtest often** — ensimmäinen pelitestaus jo viikolla 2 keskeneräisellä versiolla. Palaute ohjaa loppukuun työtä, ei toisin päin.
2. **Sisältö ja koodi erilleen** — tietolaatikot, tapahtumat ja tarinatekstit siirretään dataksi, jolloin historiallinen varmennus ja käännökset eivät vaadi koodimuutoksia.
3. **Prototyypistä tuotteeksi** — build-vaihe, saavutettavuus ja tallennuksen kestävyys ratkaistaan nyt, koska ne ovat ero demon ja koululle myytävän tuotteen välillä.

**Scope-kuri:** Uusia pelimekaniikkoja EI lisätä tämän kuukauden aikana. Kaikki työ palvelee pilottivalmiutta.

---

## 2. Kuukauden lopputulokset (Definition of Done)

Kuukausi on onnistunut, kun kaikki seuraavat toteutuvat:

| # | Lopputulos | Mittari |
|---|-----------|---------|
| D1 | 26 tietolaatikkoa pelissä, sisältö erillisessä datatiedostossa | Kaikki avautuvat, sisältö muokattavissa ilman koodimuutosta |
| D2 | Build-pipeline (Vite) tuottaa yhden staattisen bundlen | Peli toimii ilman internet-yhteyttä latauksen jälkeen; ei unpkg-riippuvuutta |
| D3 | Tallennuskoodi (export/import) | Pelitila siirtyy koneelta toiselle kopioitavalla koodilla |
| D4 | Saavutettavuus WCAG 2.1 AA -tasolla kriittisiltä osin | Näppäimistönavigointi, focus trap modaaleissa, kontrastit tarkistettu |
| D5 | Kevyt paikallinen telemetria + opettajan vientinappi | Anonyymi loki: avatut tietolaatikot, vuorojen määrä, sessioaika |
| D6 | Vähintään yksi pelitestaus tehty ja dokumentoitu | Kirjallinen muistio havainnoista ja tehdyistä muutoksista |
| D7 | Opettajan oppaan ensiversio (PDF/MD) | Sisältää tuntisuunnitelman 45 min ja 75 min oppitunneille |
| D8 | Historiallinen varmennus valmis | Varmentamiskehikon 6 kriteeriä käyty läpi kaikille 26 laatikolle |
| D9 | Pilottikoulujen kontaktointi aloitettu | Vähintään 5 yhteydenottoa lähetetty (tavoite: 3–5 pilottikoulua) |
| D10 | GitHub Actions ajaa testit joka commitissa | Babel-syntaksitarkistus **(tehty 9.7.)** + jsdom-savutestit automaattisesti |

---

## 3. Viikkosuunnitelma

### VIIKKO 1 (13.–17.7.): Arkkitehtuuri kuntoon + ensimmäiset tietolaatikot

**Teema:** Rakennetaan pohja, jonka päälle loppukuu nojaa. Ei vielä täydellisyyttä — toimiva runko.

| Päivä | Tehtävä | Tulos |
|-------|---------|-------|
| Ma 13.7. | Sisällön eriyttäminen: luodaan `data/tietolaatikot.js` ja siirretään 13 olemassa olevan modaalin sisällöt sinne. Rakenne: id, kategoria, otsikko, sisältö, aikakausiehto, prioriteetti. *(Edellyttää `TIETOLAATIKKO_UI_SIJOITTELU.md`:tä — ks. kohta 0.)* | Datatiedosto + modaalikomponentti lukee datasta |
| Ti 14.7. | Build-pipeline: Vite-projekti pystyyn, JSX + Recharts bundlataan. Poistetaan selain-Babel ja CDN-riippuvuudet. `npm run build` → yksi jaettava kansio/tiedosto. | Staattinen bundle, joka toimii offline |
| Ke 15.7. | Välilehtisysteemi tietolaatikoille (6 kategoriaa) UI-suunnitelman (`TIETOLAATIKKO_UI_SIJOITTELU.md`) mukaan. Info-kuvakkeet (ℹ️) pelinäkymään kontekstuaalisiin kohtiin. | Navigoitava tietolaatikkopaneeli |
| To 16.7. **(valmis 10.7.)** | 5 uutta korkean prioriteetin tietolaatikkoa sisään (yksi per keskeinen kategoria) `TIETOLAATIKKO_SISALLOT.md`:stä. | 18/26 laatikkoa pelissä ✅ |
| Pe 17.7. | ~~GitHub Actions: workflow joka ajaa syntaksitarkistuksen~~ **(syntaksitarkistus jo pystyssä 9.7. lähtien)** — lisätään jsdom-savutestit itse pelille CI:hen. Viikon commit + zip-toimitus. | CI vihreänä (syntaksi + savutestit); testipaketti valmiina viikon 2 pelitestaukseen |

**Viikon riski:** Vite-migraatio voi paljastaa yllätyksiä (esim. Recharts-importit, window.storage-polyfill). Varaus: torstain tehtävä joustaa perjantaille tarvittaessa.

---

### VIIKKO 2 (20.–24.7.): Ensimmäinen pelitestaus + palautteen mukainen iterointi

**Teema:** Todellisuus kohtaa suunnitelman. Tämä viikko on suunnitelman tärkein.

| Päivä | Tehtävä | Tulos |
|-------|---------|-------|
| Ma 20.7. | Tallennuskoodi: pelitilan export base64/JSON-koodiksi + import-kenttä aloitusruutuun. Testataan koneiden välillä. | **D3 valmis ✅** |
| Ti 21.7. | **PELITESTAUS 1:** 2–3 nuorta (ikäryhmä 15–18) pelaa 30–45 min. Havainnoi äänettömästi: löytävätkö info-kuvakkeet? Lukevatko laatikot? Mihin jäävät jumiin? Lyhyt haastattelu lopuksi. Kirjaa havainnot myös `testaajat.html`:n kautta GitHub-issueiksi, jotta koko testaajaryhmä näkee tilanteen. | Testimuistio 1 |
| Ke 22.7. | Testihavaintojen priorisointi ja korjaukset: UI-ongelmat, epäselvät tekstit, kuvakkeiden sijoittelu. | Korjauslista toteutettu |
| To 23.7. | Loput 8 uutta tietolaatikkoa sisään — muotoiltuna testipalautteen opettamalla tavalla (esim. tekstin pituus, otsikointi). *(Edellyttää `TIETOLAATIKKO_SISALLOT.md`:tä. Huom: kaikki 26 laatikkoa ovat teknisesti jo pelissä ja selattavissa Tietopankki-paneelin kautta 10.7. lähtien — tämän päivän työ on siis lähinnä sisällön hienosäätöä testipalautteen pohjalta, ei enää puuttuvien laatikoiden lisäämistä.)* | 26/26 laatikkoa pelissä (D1) — teknisesti valmis, hienosäätö pelitestauksen jälkeen |
| Pe 24.7. | Telemetrian runko: paikallinen tapahtumaloki (avatut laatikot, vuorot, sessioaika, saavutettu aikakausi) + "Vie raportti" -nappi opettajanäkymään (JSON/CSV). Viikon commit + zip. | D5 pohja valmis |

**Varasuunnitelma:** Jos nuoria ei saa testaajiksi heinäkuussa (loma-aika), testaa yhdellä aikuisella "naiivilla" pelaajalla ja siirrä nuorten testaus viikolle 3. Älä ohita testausta kokonaan.

---

### VIIKKO 3 (27.–31.7.): Saavutettavuus + historiallinen varmennus

**Teema:** Laatu, jota kunta kysyy hankintavaiheessa ja opettaja luokassa.

| Päivä | Tehtävä | Tulos |
|-------|---------|-------|
| Ma 27.7. | Saavutettavuus, osa 1: modaalien focus trap, Esc sulkee, näppäimistönavigointi (Tab-järjestys), aria-labelit kuvakkeille ja sliderille. | Peli pelattavissa ilman hiirtä |
| Ti 28.7. | Saavutettavuus, osa 2: kontrastitarkistus (vintage-paperiteema vs. WCAG AA 4.5:1), fonttikokojen skaalautuvuus, `prefers-reduced-motion`. Automaattinen tarkistus (axe-core jsdom-testeihin). | D4 valmis; axe-testit CI:ssä |
| Ke 29.7. | Historiallinen varmennus: käy läpi kaikki 26 laatikkoa varmentamiskehikon 6 kriteerillä. Merkitse epävarmat kohdat. Lähetä epävarmat historianopettajalle/asiantuntijalle kommentoitavaksi. | Varmennustaulukko; asiantuntijakysely liikkeellä |
| To 30.7. | **PELITESTAUS 2** (jos viikon 2 testaus siirtyi, tai uusintatestaus korjatulla versiolla): painopiste tietolaatikkojen ymmärrettävyydessä ja telemetrian toimivuudessa. | Testimuistio 2 |
| Pe 31.7. | Koulusimulaatio: testaa bundle hitaalla yhteydellä (Chrome DevTools throttling), vanhalla koneella/halvalla Chromebook-resoluutiolla (1366×768), ja ilman verkkoa. Korjaa löydökset. Viikon commit + zip. | Kestävyystarkistus dokumentoitu |

---

### VIIKKO 4 (3.–7.8.): Opettajan opas + pilottien rekrytointi + jäädytys

**Teema:** Myyntikuntoon. Koodijäädytys keskiviikkona — loppuviikko on viestintää, ei uusia ominaisuuksia.

| Päivä | Tehtävä | Tulos |
|-------|---------|-------|
| Ma 3.8. | Opettajan oppaan ensiversio: pelin pedagoginen idea, LOPS/POPS-kytkennät, 45 min ja 75 min tuntisuunnitelmat, esitystilan käyttö, telemetrialoki opettajan työkaluna, tekniset vaatimukset. | D7 luonnos |
| Ti 4.8. | Asiantuntijapalautteen (vk 3) vienti tietolaatikkoihin — vain datatiedostomuutoksia, ei koodia. Varmennustaulukko valmiiksi. | D8 valmis |
| Ke 5.8. | **KOODIJÄÄDYTYS.** Regressiotestikierros: koko peli läpi kaikilla aikakausilla, CI vihreä, tallennuskoodi, telemetria, saavutettavuus. Versionumero 1.0-pilot. Commit + release-zip GitHubiin. | Pilottiversio jäädytetty |
| To 6.8. | Pilottikoulujen kontaktointipaketti: saatekirje opettajille (oma verkosto + HYOL), 1 sivun esittely, linkki peliin, oppaan liite. Lähetä vähintään 5 yhteydenottoa. | D9 käynnissä |
| Pe 7.8. | Retrospektiivi: mikä toimi, mikä ei, mitä opittiin testauksista. Elokuun suunnitelman runko (pilottien tuki, palautelomake, onnistumismittarit — liiketoimintasuunnitelman kohta 12.3). | Kuukausi paketissa |

---

## 4. Työnjako Eero — Claude

**Claude toteuttaa (istunnoittain):** Vite-migraatio, datatiedostorakenne, välilehtisysteemi, tallennuskoodi, telemetria, saavutettavuuskorjaukset, axe/jsdom-testit, GitHub Actions -workflow, opettajan oppaan luonnos, saatekirjeluonnokset.

**Eero tekee (vaatii ihmistä):**
- Pelitestausten järjestäminen ja havainnointi (vk 2 ja 3)
- Historianopettaja-/asiantuntijakontaktit varmennukseen (vk 3)
- Commitit GitHubiin zip-paketeista (vakiintunut työtapa)
- Pilottikoulujen yhteydenotot omalla nimellä (vk 4)
- Päätökset priorisointiristiriidoissa
- `TIETOLAATIKKO_UI_SIJOITTELU.md` ja `TIETOLAATIKKO_SISALLOT.md` -tiedostojen toimittaminen repoon ennen viikkoa 1 (ks. kohta 0)

**Istuntorytmi:** 2–3 Claude-istuntoa viikossa riittää; jokainen istunto päättyy zip-toimitukseen ja selkeään "seuraavaksi"-listaan.

---

## 5. Riskit ja varautuminen

| Riski | Tn. | Vaikutus | Varautuminen |
|-------|-----|----------|--------------|
| Heinäkuu = loma-aika: testaajia ja asiantuntijoita vaikea saada | Suuri | Keskisuuri | Varahenkilöt sovittu etukäteen; testaus aikuisella "naiivilla" pelaajalla varasuunnitelmana; asiantuntijakysely asynkronisesti sähköpostilla |
| Vite-migraatio rikkoo jotain (polyfillit, Recharts) | Keskisuuri | Keskisuuri | Vanha CDN-HTML säilyy fallbackina repossa kunnes bundle todettu vakaaksi |
| 26 laatikon integrointi paisuu (kontekstuaalinen avautuminen monimutkaista) | Keskisuuri | Keskisuuri | Minimitoteutus ensin: kaikki laatikot avattavissa paneelista; kontekstuaaliset avautumiset vain 5 tärkeimmälle |
| Saavutettavuuskorjaukset paljastavat teemaongelman (vintage-kontrastit) | Pieni | Pieni | Hyväksytään "korkean kontrastin tila" -kytkin ratkaisuna, ei teeman uusimista |
| Pilottikoulut eivät vastaa elokuun alussa | Suuri | Suuri | Yhteydenotot heti 6.8., muistutus vk 33; rinnalla HYOL:n kanavat; tavoite joustaa syyskuulle |
| Scope creep: uusia ominaisuusideoita kesken kuun | Suuri | Keskisuuri | Idealista (`BACKLOG.md`) repoon — kirjataan, ei toteuteta ennen 8.8. |
| `TIETOLAATIKKO_UI_SIJOITTELU.md` / `TIETOLAATIKKO_SISALLOT.md` puuttuvat repossa | Suuri | Suuri | Toimitettava ennen 13.7. (ks. kohta 0) — muuten viikon 1 maanantai ja viikon 2 torstai eivät voi alkaa suunnitellusti |

---

## 6. Mitä EI tehdä tässä kuussa (tietoisesti rajattu pois)

- Uudet pelimekaniikat, sektorit, hallintomuodot tai kansakunnat *(viikon 7.–9.7. aikakausi- ja sivilisaationimityö on tehty ennen jakson alkua, ks. kohta 0, ei tämän säännön piirissä)*
- Backend, käyttäjätilit tai maksujärjestelmä (localStorage-freemium riittää pilottiin)
- Ruotsin-/englanninkielinen versio (datarakenne mahdollistaa sen myöhemmin)
- Luokkahuonekoodit / moninpeli
- Visuaalinen uudistus *(logo/tunnus 9.7. on poikkeus — pieni, jo tehty, ei vaadi lisätyötä tässä kuussa)*

---

## 7. Seuranta

Jokaisen viikon perjantai-istunnossa käydään läpi: (1) valmistuneet Definition of Done -kohdat, (2) siirtyneet tehtävät ja syy, (3) seuraavan viikon tarkennukset. Tämä dokumentti päivitetään repossa — muutokset commit-historiaan, ei erillisiä versioita.
