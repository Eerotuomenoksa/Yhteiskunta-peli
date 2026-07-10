# Tietolaatikoiden sisällöt

> **Tila:** Hyväksytty 10.7.2026, valmis toteutettavaksi. Molemmat avoimeksi merkityt kohdat (demografisen siirtymän kertoimet, Lontoon Great Smog -kuolinluku) on tarkistettu ja korjattu. 13 ensimmäistä ovat jo pelissä (tekstit kopioitu suoraan koodista, ei sisältömuutoksia — vain siirto dataksi). 13 uutta käy silti läpi kohdan D8 varsinaisen historiallisen varmennuksen viikolla 3 ennen julkaisua — tämä hyväksyntä koskee sisällön suuntaa, ei korvaa D8:aa.

Kaikki tekstit suomeksi (baseline). Käännökset (en/da) tehdään myöhemmin samalla `I18N`-mallilla kuin muu pelisisältö.

---

## Osa A — 13 olemassa olevaa (siirretään sellaisenaan, ei uutta sisältöä)

### Kategoria: Väestö & terveys (`vaesto`)

**1. `elinajanodote`** · prioriteetti: normaali · aikakausiehto: 0 · kontekstuaalinen: true
Oikeasti elinajanodote lasketaan ikäryhmittäisistä kuolleisuusluvuista niin sanotulla elinpöytämenetelmällä (life table) — se ei ole keskimääräinen kuolinikä vaan tilastollinen ennuste sille, kuinka pitkään vastasyntynyt eläisi nykyisillä kuolleisuusluvuilla. Pelissä arvo johdetaan terveys- ja hoivakattavuudesta sekä aikakauden perustasosta.

**2. `terveyspainotus`** · normaali · aikakausiehto: 0 · kontekstuaalinen: true
Ehkäisevä painotus (arvo lähellä 0 %) suojaa erityisesti lapsia ja hillitsee epidemioita. Sairaalapainotteinen hoito (arvo lähellä 100 %) pelastaa paremmin aikuisia ja vanhuksia akuuteissa tilanteissa. Kumpikaan ei ole ylivoimainen — valinta riippuu siitä, minkä ikäryhmän suojelu on juuri nyt tärkeintä.

**3. `erikoislaakarit`** · normaali · aikakausiehto: 3 · kontekstuaalinen: true
Erikoislääkäri kattaa 1,4× yleislääkärin verran — vaativampi koulutuspolku, mutta parempi hoitotulos raskaammissa tapauksissa.

### Kategoria: Talous & työ (`talous`)

**4. `bkt_per_asukas`** · normaali · aikakausiehto: 3 · kontekstuaalinen: true
Oikeasti BKT lasketaan kolmella tavalla, jotka teoriassa täsmäävät: tuotantoperusteisesti (arvonlisä), tuloperusteisesti (palkat + voitot) tai menoperusteisesti (kulutus + investoinnit + vienti − tuonti). Kansantalouden tilinpito virallistui vasta 1930–40-luvuilla (Simon Kuznets, Nobel 1971). Pelissä luku on abstrakti tuotannon ja teknologian yhdistelmä, ei oikea valuutta.

**5. `tyollisyysaste`** · normaali · aikakausiehto: 2 · kontekstuaalinen: true
Oikeasti työllisyysaste on työllisten osuus työikäisestä väestöstä (esim. Tilastokeskus laskee sen 15–64-vuotiaista). Käsite syntyi vasta palkkatyön ja teollistumisen myötä 1800-luvulla — sitä ennen "työttömyys" ei ollut mielekäs tilastoluku. Pelissä arvo heijastaa hallinnon toimivuutta ja osaamistason riittävyyttä.

**6. `teollisuussuuntaus`** · normaali · aikakausiehto: 2 · kontekstuaalinen: true
Erikoistunut teollisuus (arvo lähellä 100 %) nostaa tehokkuutta, tutkimusta ja BKT:ta, mutta saastuttaa selvästi enemmän kuin perustuotanto.

**7. `maatalousmoodi`** · normaali · aikakausiehto: 0 · kontekstuaalinen: true
Pienviljely on tasainen ja saatavilla heti. Suurtilat (Teollisesta) nostavat satoa mutta lisäävät saasteita ja herkkyyttä häiriöille. Bioviljely (Modernista) on kestävää ja puhdasta, mutta tuottaa vähemmän. Erikoistuotteet (Teollisesta) tuovat vaurautta ruokaturvan kustannuksella.

### Kategoria: Yhteiskunta & hallinto (`yhteiskunta`)

**8. `rikollisuusaste`** · normaali · aikakausiehto: 3 · kontekstuaalinen: true
Oikeasti rikollisuutta mitataan ilmoitettujen rikosten määränä 100 000 asukasta kohden, mutta tilasto kärsii ilmoituskynnyksen vaihtelusta eri aikoina ja paikoissa. Systemaattinen rikostilastointi ja kriminologia tieteenalana syntyivät 1800-luvun kaupungistumisen myötä. Pelissä arvo nousee heikon hallinnon ja yhteisöllisyyden myötä. Matalampi on parempi.

**9. `rikostutkijat`** · normaali · aikakausiehto: 3 · kontekstuaalinen: true
Rikostutkijoihin erikoistuva osa hallinnosta laskee rikollisuutta suoraan (jopa −35 % täydellä osuudella), mutta vie resursseja yleisestä hallintokattavuudesta (−15 % täydellä osuudella).

**10. `onnellisuusindeksi`** · normaali · aikakausiehto: 4 · kontekstuaalinen: true
Oikeasti esim. YK:n World Happiness Report perustuu kyselyihin, joissa ihmiset arvioivat oman elämänsä asteikolla 0–10, yhdistettynä selittäviin tekijöihin kuten BKT, sosiaalinen tuki ja terveys. Raportti julkaistiin ensi kertaa 2012. Pelissä indeksi yhdistää terveyden, yhteisöllisyyden, moraalin, vaurauden ja rikollisuuden yhdeksi 0–10-luvuksi.

### Kategoria: Ympäristö (`ymparisto`)

**11. `saasteindeksi`** · normaali · aikakausiehto: 2 · kontekstuaalinen: true
Oikeasti ilmansaasteita mitataan mm. hiukkaspitoisuuksina (PM2.5), hiilidioksidipäästöinä per capita ja ilmanlaatuindekseillä. Teollistuminen 1800-luvulla toi ensimmäiset merkittävät päästöt, ja ympäristötietoisuus alkoi vasta 1900-luvun jälkipuoliskolla. Pelissä arvo nousee teollisuuteen panostettaessa ja laskee tutkimuksen (puhtaamman teknologian) myötä. Matalampi on parempi.

### Kategoria: Koulutus & tiede (`koulutus`)

**12. `opetussuuntaus`** · normaali · aikakausiehto: 0 · kontekstuaalinen: true
Peruskoulutus on tasainen ja avoinna heti. Ammatillinen koulutus (Varhaisteollisesta) nostaa tuotannon tehokkuutta. Korkeakoulutus (Teollisesta) nostaa tutkimusta merkittävästi, mutta tavoittaa harvemman.

**13. `tutkimussuuntaus`** · normaali · aikakausiehto: 2 · kontekstuaalinen: true
Soveltava tutkimus (arvo lähellä 100 %) nostaa tuotannon tehokkuutta heti, mutta hidastaa tutkimuspisteiden kertymistä jopa 40 %. Perustutkimus (arvo lähellä 0 %) on hitaampaa hyödyntää mutta vie aikakautta eteenpäin nopeimmin.

---

## Osa B — 13 uutta (luonnos, vaatii D8-varmennuksen)

### Viikko 1, torstai 16.7. — 5 korkean prioriteetin laatikkoa (kontekstuaalinen: true)

**14. `huoltosuhde`** · kategoria: `vaesto` · korkea · aikakausiehto: 0 · kontekstuaalinen: true
Huoltosuhde kertoo, montako lasta ja vanhusta on sataa työikäistä kohden — se on keskeinen mittari sille, kuinka paljon työikäinen väestö joutuu elättämään muita. Suomessa huoltosuhde on yksi Euroopan heikoimmista väestön ikääntymisen vuoksi. Pelissä huoltosuhde lasketaan lasten ja vanhusten yhteismäärästä suhteessa työikäisiin, ja se näkyy väestöpyramidin yhteydessä.
*Ehdotettu kontekstuaalinen sijainti: väestöpyramidi-/ikäjakaumanäkymä.*

**15. `demografinen_siirtyma`** · kategoria: `historia` · korkea · aikakausiehto: 0 · kontekstuaalinen: true
Demografinen siirtymä tarkoittaa, että yhteiskunnan kehittyessä ensin kuolleisuus laskee (parempi ravinto, hygienia, lääketiede) ja vasta myöhemmin syntyvyys — välivaiheessa väestö kasvaa nopeasti, koska syntyvyys on yhä korkea mutta yhä harvempi kuolee lapsena. Suomessa tämä tapahtui 1800–1900-luvuilla. Pelissä sama ilmiö näkyy syntyvyyskertoimen hitaana laskuna aikakausittain (TFR5 0,9 → 0,5, −44 %), samalla kun lapsikuolleisuus laskee huomattavasti nopeammin (0,17 → 0,008, −95 %). *(Tarkistettu `ERAS`-taulukon arvoja vasten 10.7. — kuvaus täsmää koodiin.)*
*Ehdotettu kontekstuaalinen sijainti: syntyvyys/kuolleisuusluku vuosiraportissa.*

**16. `hallintomuodot_legitimiteetti`** · kategoria: `yhteiskunta` · korkea · aikakausiehto: 0 · kontekstuaalinen: true
Politiikan tutkimuksessa legitimiteetti tarkoittaa sitä, missä määrin kansa hyväksyy vallanpitäjän oikeuden hallita — se voi perustua perinteeseen (esim. heimoneuvosto), karismaan tai lakiin/menettelyihin (esim. vaalit). Sosiologi Max Weber erotti nämä kolme legitimiteetin tyyppiä 1900-luvun alussa. Pelissä hallintomuodon kertoimet mallintavat karkeasti tätä: itsevaltaiset hallinnot ovat tehokkaita mutta hauraita, kun taas demokratia on hitaampi mutta vakaampi.
*Ehdotettu kontekstuaalinen sijainti: hallintomuodon valintanäkymä.*

**17. `ruokaturva_nalanhata`** · kategoria: `talous` · korkea · aikakausiehto: 0 · kontekstuaalinen: true
Ruokaturva tarkoittaa sitä, että kaikilla on jatkuvasti riittävästi ravitsevaa ruokaa. Esiteollisissa yhteiskunnissa yksikin huono satovuosi saattoi tarkoittaa nälänhätää — Suomen nälkävuosina 1866–1868 kuoli arviolta 150 000–270 000 ihmistä eli noin 8–9 % väestöstä. Pelissä ruokavarasto toimii puskurina huonoja vuosia vastaan, ja pitkittynyt vaje nostaa kuolleisuutta kaikissa ikäryhmissä.
*Ehdotettu kontekstuaalinen sijainti: ruokavaraston/ruokatilanteen näyttö.*

**18. `oppivelvollisuus_lukutaito`** · kategoria: `koulutus` · korkea · aikakausiehto: 0 · kontekstuaalinen: true
Yleinen oppivelvollisuus on historiallisesti nuori keksintö — Suomessa se säädettiin vasta 1921, vaikka lukutaitoa vaadittiin jo 1600-luvulta lähtien esimerkiksi rippikoulun ehtona. Koulutuskattavuuden kasvu 1800–1900-luvuilla liittyi kiinteästi teollistumiseen: tehtaat tarvitsivat lukutaitoista työvoimaa. Pelissä koulutuskattavuus riippuu opettajien määrästä suhteessa lapsiin, ja se vaikuttaa suoraan siihen, moniko varttuvista nuorista saa kunnollisen koulutuksen.
*Ehdotettu kontekstuaalinen sijainti: koulutuskattavuuden näyttö.*

### Viikko 2, torstai 23.7. — 8 laatikkoa (kontekstuaalinen: false, vain paneelissa)

**19. `ammattien_rakennemuutos`** · kategoria: `talous` · normaali · aikakausiehto: 0
Rakennemuutos tarkoittaa työvoiman siirtymistä sektorista toiseen talouden kehittyessä — ensin maataloudesta teollisuuteen, sitten teollisuudesta palveluihin. Ennen teollistumista 80–90 % maailman väestöstä työskenteli maataloudessa; nykyään rikkaissa maissa osuus on alle 2 %. Pelissä tämä näkyy suoraan: kun maatalouden tuottavuus nousee aikakausittain, yhä pienempi osuus työvoimasta riittää ruokkimaan koko yhteiskunnan, ja loput vapautuvat muihin sektoreihin.

**20. `saastuminen_teollistuminen`** · kategoria: `ymparisto` · normaali · aikakausiehto: 2
Suurkaupunkien ilmansaasteet muuttuivat vakavaksi kansanterveysongelmaksi teollistumisen myötä — esimerkiksi Lontoon "Great Smog" vuonna 1952 tappoi noin 4 000 ihmistä muutamassa päivässä ja johti Britannian ensimmäiseen ilmansuojelulakiin (Clean Air Act, 1956). Pelissä saasteindeksi nousee teollisuuteen panostettaessa ja laskee tutkimuksen myötä. *(Luku tarkistettu 10.7. — käytetään 4 000:aa suorien kuolemien arviona.)*

**21. `uusiutuva_energia_ilmasto`** · kategoria: `ymparisto` · normaali · aikakausiehto: 4
Ilmastonmuutos eli maapallon keskilämpötilan nousu ihmisen aiheuttamien kasvihuonekaasupäästöjen vuoksi tunnistettiin tieteellisesti jo 1800-luvun lopulla (Svante Arrhenius, 1896), mutta poliittiseksi kysymykseksi se nousi vasta 1900-luvun lopulla. Pelin moderni aikakausi mahdollistaa uusiutuvan energian ja puhtaamman teknologian, jotka pienentävät saasteindeksiä samalla kun tuotanto jatkaa kasvuaan.

**22. `tiedeseurat_yliopistot`** · kategoria: `koulutus` · normaali · aikakausiehto: 0
Järjestäytynyt tiedeyhteisö syntyi vähitellen: ensimmäiset yliopistot (esim. Bologna, 1088) opettivat aluksi lähinnä teologiaa ja lakia, kun taas kokeellinen luonnontiede järjestäytyi omiksi seuroikseen vasta 1600-luvulla (esim. Royal Society, Lontoo 1660). Pelissä tutkimuspisteiden kertyminen nopeutuu koulutuskattavuuden ja hallinnon tehokkuuden myötä — samalla tavalla kuin oikeassa historiassa tiedeinstituutiot vaativat sekä koulutettua väkeä että vakaata rahoitusta.

**23. `patentit_innovaatio`** · kategoria: `koulutus` · normaali · aikakausiehto: 1
Patenttijärjestelmä — keksijän väliaikainen yksinoikeus keksintöönsä vastineeksi sen julkistamisesta — vakiintui Euroopassa 1400–1800-luvuilla ja nopeutti teknologian leviämistä, koska keksintöjä ei enää tarvinnut pitää salassa. Pelin keksintöjärjestelmä (esim. höyrykone, penisilliini, internet) kuvaa samaa ilmiötä yksinkertaistettuna: tutkimus tuo mukanaan konkreettisia, aikakaudelle ominaisia läpimurtoja.

**24. `aikakaudet_eri_tahtiin`** · kategoria: `historia` · normaali · aikakausiehto: 0
Aikakausi ei vaihdu pelissä minään tiettynä kalenterivuotena, vaan silloin kun yhteiskuntasi tutkimus ja väestö riittävät — täsmälleen kuten oikeassa historiassa eri alueet teollistuivat ja modernisoituivat hyvin eri tahtiin (Englanti 1800-luvun alussa, moni muu alue vasta 1900-luvulla tai myöhemmin). Siksi kaksi samaa sivilisaatiota pelaavaa oppilasta voi päätyä hyvin erilaisiin aikakausiin samalla vuosiluvulla.

**25. `kirjoitustaito_historiankirjoitus`** · kategoria: `historia` · normaali · aikakausiehto: 0
Kirjoitustaito syntyi itsenäisesti muutamassa paikassa maailmaa (Mesopotamia, Egypti, Kiina, Mesoamerikka) noin 3000 eaa. alkaen, ensin lähinnä varastojen ja verojen kirjanpitoon. Vasta kirjoitustaidon myötä yhteiskunnista jäi omaa, ajankohtaista kirjallista lähdeaineistoa — sitä edeltävää aikaa kutsutaan esihistoriaksi, koska siitä tiedetään vain arkeologian kautta. Pelin Muinaisaika-kauden ensimmäinen keksintö on juuri kirjoitus.

**26. `kolumbuksen_vaihto`** · kategoria: `historia` · normaali · aikakausiehto: 1
Kolumbuksen vaihdolla tarkoitetaan kasvien, eläinten ja tautien massiivista siirtymistä Euroopan ja Amerikan välillä vuoden 1492 jälkeen. Peruna ja maissi levisivät Amerikasta Euraasiaan ja mullistivat ruokahuoltoa monin paikoin — peruna esimerkiksi mahdollisti aiempaa suuremman väestöntiheyden karummillakin mailla. Pelin Keskiaika-kauden kuvausteksti viittaa juuri tähän ilmiöön.

---

## Yhteenveto kategorioittain (26/26)

| Kategoria | Olemassa (A) | Uusi vk1 (B) | Uusi vk2 (B) | Yhteensä |
|---|---|---|---|---|
| Väestö & terveys | 3 | 1 | 0 | 4 |
| Talous & työ | 4 | 1 | 1 | 6 |
| Yhteiskunta & hallinto | 3 | 1 | 0 | 4 |
| Ympäristö | 1 | 0 | 2 | 3 |
| Koulutus & tiede | 2 | 1 | 2 | 5 |
| Historia & aikakaudet | 0 | 1 | 3 | 4 |
| **Yhteensä** | **13** | **5** | **8** | **26** |

## Seuraavat askeleet

1. ~~Lue Osa B läpi, korjaa/poista `[TARKISTA]`-merkityt kohdat~~ — tehty 10.7.
2. Ma 13.7. alkaa suunnitellusti: Osa A siirretään `data/tietolaatikot.js`-tiedostoon.
3. Osa B:n lopullinen historiallinen varmennus (D8, kaikki 26) tehdään silti erikseen viikolla 3 varmentamiskehikon 6 kriteerillä — tämä hyväksyntä ei korvaa sitä, vain mahdollistaa aikataulun pitämisen.
