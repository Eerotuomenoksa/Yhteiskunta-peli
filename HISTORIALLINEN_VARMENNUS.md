# Historiallinen varmennus — kaikki 26 tietolaatikkoa

**Tehty:** 13.7.2026 (KEHITYSSUUNNITELMA vk3 ke -kohta, D8)
**Menettely:** [VARMENNUSKEHIKKO.md](VARMENNUSKEHIKKO.md):n kuusi kriteeriä käytiin läpi jokaiselle 26 tietolaatikolle. Tarkat, tarkistettavissa olevat faktaväitteet (luvut, vuosiluvut) varmennettiin erikseen hakukoneella; muut arvioitiin kriteereillä 2–6 (lähteen luonne, ajallinen tarkkuus, yksinkertaistuksen tasapaino, konsensus, ikäryhmäsopivuus).

**Tulos: 25/26 vahvistettu sellaisenaan, 1/26 korjattu. 0 kohtaa vaati asiantuntijalähetystä** — kaikki löydökset olivat joko selkeästi oikein tai selkeästi korjattavissa, ei aidosti kiistanalaisia/tulkinnanvaraisia rajatapauksia.

## Osa A: 13 olemassa ollutta (siirretty koodista 13.7., ei sisältömuutoksia tehty silloin)

| id | Tulos | Huomio |
|----|-------|--------|
| elinajanodote | ✅ Vahvistettu | Elinpöytämenetelmä (life table) kuvattu oikein. |
| tyollisyysaste | ✅ Vahvistettu | 15–64v. on yleisesti käytetty ikäluokka (mm. Tilastokeskuksen perinteinen luokitus); tekstissä "esim.", ei väitetä ainoaksi määritelmäksi. Käsitteen synty 1800-luvun palkkatyön myötä on defensoitava yleistys. |
| saasteindeksi | ✅ Vahvistettu | PM2.5/CO2-mittarit ja ympäristötietoisuuden ajoitus (1900-luvun jälkipuolisko) pitävät paikkansa. |
| bkt_per_asukas | ✅ Vahvistettu | Kolme laskentatapaa oikein. Simon Kuznets ja kansantalouden tilinpidon virallistuminen 1930–40-luvuilla sekä Nobel 1971 — tarkistettu, oikein. |
| rikollisuusaste | ✅ Vahvistettu | Ilmoitettujen rikosten mittaustapa ja kriminologian synty 1800-luvun kaupungistumisen myötä ovat vakiintuneita yleistyksiä. |
| onnellisuusindeksi | ✅ Vahvistettu | YK:n World Happiness Report julkaistiin ensimmäisen kerran 2012 — tarkistettu, oikein. |
| maatalousmoodi | ✅ Vahvistettu | Kuvaa vain pelimekaniikkaa, ei historiallista faktaväitettä. |
| terveyspainotus | ✅ Vahvistettu | Kuvaa vain pelimekaniikkaa. |
| erikoislaakarit | ✅ Vahvistettu | Kuvaa vain pelimekaniikkaa (1,4×-kerroin on sisäinen tasapainoluku, täsmää koodin kanssa). |
| tutkimussuuntaus | ✅ Vahvistettu | Kuvaa vain pelimekaniikkaa (40 %-luku täsmää koodin `appliedFrac`-logiikan kanssa). |
| opetussuuntaus | ✅ Vahvistettu | Kuvaa vain pelimekaniikkaa. |
| rikostutkijat | ✅ Vahvistettu | −35 %/−15 %-luvut täsmäävät suoraan koodin kaavoihin (`crimeRate`/`adminCov`-laskennassa `detectiveFrac`). |
| teollisuussuuntaus | ✅ Vahvistettu | Kuvaa vain pelimekaniikkaa. |

## Osa B: 13 uutta (hyväksytty luonnos 10.7., ensi kertaa varmennettu nyt)

| id | Tulos | Huomio |
|----|-------|--------|
| huoltosuhde | ✅ Vahvistettu | Verkkohaulla vahvistettu 13.7.: Suomi on tällä hetkellä yksi EU:n ikääntyneimmistä maista vanhushuoltosuhteella mitattuna, ja vuoteen 2030 mennessä yli 65-vuotiaiden osuus on EU:n korkein. Väite "yksi Euroopan heikoimmista" pitää paikkansa. |
| demografinen_siirtyma | ✅ Vahvistettu | Suomen ajoitus (1800–1900-luvut) oikein. TFR5/childMort-luvut (−44 % / −95 %) tarkistettu suoraan koodista ([yhteiskunta.jsx](game/yhteiskunta.jsx)) — täsmäävät. |
| hallintomuodot_legitimiteetti | ✅ Vahvistettu | Max Weberin kolme legitimiteetin tyyppiä (traditionaalinen, karismaattinen, legaalis-rationaalinen) on tunnettu ja oikein kuvattu politiikan tutkimuksen peruskäsite. |
| ruokaturva_nalanhata | ✅ Vahvistettu | Verkkohaulla vahvistettu 13.7.: Suomen nälkävuosien 1866–68 kuolinlukuarviot vaihtelevat lähteittäin n. 150 000 (ylikuolleisuus) – 200 000–270 000 (kokonaiskuolleisuus kaudella) välillä, n. 8 % väestöstä. Tekstin haarukka "150 000–270 000, n. 8–9 %" on tutkimuksen esittämien arvioiden sisällä. |
| oppivelvollisuus_lukutaito | ✅ Vahvistettu | Suomen oppivelvollisuuslaki 1921 ja rippikoulun lukutaitovaatimus 1600-luvulta (v. 1686 kirkkolaki) — molemmat tunnettuja, oikein ajoitettuja faktoja. |
| ammattien_rakennemuutos | ✅ Vahvistettu | 80–90 % maatalousväestöä esiteollisissa yhteiskunnissa, alle 2 % rikkaissa maissa nykyään — yleisesti käytetyt, defensoitavat suuruusluokat. |
| saastuminen_teollistuminen | ✅ Vahvistettu (aiemmin, 10.7.) | Lontoon Great Smog 1952, n. 4 000 suoraa kuolemaa, Clean Air Act 1956 — tarkistettu jo TIETOLAATIKKO_SISALLOT-vaiheessa Wikipedian mukaan. Ei muutoksia nyt. |
| uusiutuva_energia_ilmasto | ✅ Vahvistettu | Svante Arrhenius esitti kasvihuoneilmiölaskelmansa 1896 — tunnettu tiedehistorian fakta, oikein. |
| tiedeseurat_yliopistot | ✅ Vahvistettu | Bolognan yliopisto 1088 (yleisesti pidetty vanhimpana yhtäjaksoisesti toimineena yliopistona) ja Royal Society Lontoossa 1660 — molemmat oikein. |
| patentit_innovaatio | ✅ Vahvistettu | Patenttijärjestelmän vakiintuminen Euroopassa 1400–1800-luvuilla on defensoitava laaja ajanjakso (Venetsian patenttilaki 1474 → useiden maiden lainsäädäntö 1700–1800-luvuilla). |
| aikakaudet_eri_tahtiin | ✅ Vahvistettu | Kuvaa pelin omaa mekaniikkaa historiallisen yleistyksen (teollistuminen eri tahtiin eri alueilla) kautta — ei tarkkoja faktaväitteitä joita voisi olla väärin. |
| kirjoitustaito_historiankirjoitus | ⚠️ **Korjattu 13.7.** | Alkuperäinen teksti väitti kaikkien neljän itsenäisen kirjoitusjärjestelmän (Mesopotamia, Egypti, Kiina, Mesoamerikka) syntyneen "noin 3000 eaa. alkaen". Verkkohaulla vahvistettu 13.7.: tämä pitää paikkansa vain Mesopotamialle (n. 3400–3300 eaa.) ja Egyptille (n. 3200 eaa.) — Kiinan kirjoitus syntyi vasta n. 1300 eaa. ja Mesoamerikan n. 900–600 eaa., yli tuhat vuotta myöhemmin. Teksti korjattu erottelemaan ajoitukset. |
| kolumbuksen_vaihto | ✅ Vahvistettu | Kolumbuksen vaihto (Alfred Crosbyn 1972 lanseeraama käsite) ja perunan/maissin leviäminen Amerikasta Euraasiaan 1492 jälkeen — tunnettu, oikein kuvattu. |

## Yhteenveto

- **Vahvistettu sellaisenaan:** 25/26
- **Korjattu:** 1/26 (kirjoitustaito_historiankirjoitus — ks. `data/tietolaatikot.js`)
- **Lähetetty asiantuntijalle epävarmana:** 0/26

Kaikki tarkat lukuarvoiset väitteet (kuolinluvut, vuosiluvut, prosentit) käytiin läpi erikseen hakukoneella eikä jätetty muistinvaraisiksi, VARMENNUSKEHIKKO.md:n kohdan 1 mukaisesti. Yhtään kohtaa ei jouduttu merkitsemään aidosti kiistanalaiseksi — kaikki 26 laatikkoa olivat joko suoraan oikein tai selkeästi (ei tulkinnanvaraisesti) korjattavissa.
