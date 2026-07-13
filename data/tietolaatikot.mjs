// AUTOMAATTISESTI GENEROITU — ÄLÄ MUOKKAA SUORAAN.
// Lähde: data/tietolaatikot.js. Muokkaa sitä tiedostoa ja aja: node tools/build-tietolaatikot-esm.js
// Tämä ES-moduuli on game/main.jsx:n (Vite-build) käyttämä versio. data/tietolaatikot.js pysyy
// klassisena <script>-yhteensopivana versiona game/yhteiskunta.html:n (CDN-fallback) vuoksi.

export const TIETOLAATIKOT = [
  {
    "id": "elinajanodote",
    "kategoria": "vaesto",
    "aikakausiehto": 0,
    "prioriteetti": "normaali",
    "kontekstuaalinen": true,
    "otsikko": {
      "fi": "Elinajanodote",
      "en": "Life Expectancy",
      "da": "Middellevetid"
    },
    "sisalto": {
      "fi": "Oikeasti elinajanodote lasketaan ikäryhmittäisistä kuolleisuusluvuista niin sanotulla elinpöytämenetelmällä (life table) — se ei ole keskimääräinen kuolinikä vaan tilastollinen ennuste sille, kuinka pitkään vastasyntynyt eläisi nykyisillä kuolleisuusluvuilla. Pelissä arvo johdetaan terveys- ja hoivakattavuudesta sekä aikakauden perustasosta.",
      "en": "In reality, life expectancy is calculated from age-specific mortality rates using a life table — it is not the average age at death but a statistical projection of how long a newborn would live under current mortality rates. In the game the value is derived from health and care coverage plus the era's base level.",
      "da": "I virkeligheden beregnes middellevetiden ud fra aldersspecifikke dødelighedstal med den såkaldte dødelighedstavle (life table) — det er ikke den gennemsnitlige dødsalder, men en statistisk prognose for, hvor længe en nyfødt ville leve med de nuværende dødelighedstal. I spillet udledes værdien af sundheds- og omsorgsdækning samt tidsalderens grundniveau."
    }
  },
  {
    "id": "tyollisyysaste",
    "kategoria": "talous",
    "aikakausiehto": 2,
    "prioriteetti": "normaali",
    "kontekstuaalinen": true,
    "otsikko": {
      "fi": "Työllisyysaste",
      "en": "Employment Rate",
      "da": "Beskæftigelsesgrad"
    },
    "sisalto": {
      "fi": "Oikeasti työllisyysaste on työllisten osuus työikäisestä väestöstä (esim. Tilastokeskus laskee sen 15–64-vuotiaista). Käsite syntyi vasta palkkatyön ja teollistumisen myötä 1800-luvulla — sitä ennen 'työttömyys' ei ollut mielekäs tilastoluku. Pelissä arvo heijastaa hallinnon toimivuutta ja osaamistason riittävyyttä.",
      "en": "In reality, the employment rate is the share of employed people among the working-age population (e.g. statistics offices typically use ages 15–64). The concept only emerged with wage labor and industrialization in the 1800s — before that 'unemployment' wasn't a meaningful statistic. In the game the value reflects how well administration functions and whether skill levels suffice.",
      "da": "I virkeligheden er beskæftigelsesgraden andelen af beskæftigede blandt befolkningen i den arbejdsdygtige alder (fx bruger statistikbureauer typisk 15–64 år). Begrebet opstod først med lønarbejde og industrialisering i 1800-tallet — før da var 'arbejdsløshed' ikke et meningsfuldt statistisk begreb. I spillet afspejler værdien, hvor godt forvaltningen fungerer, og om kompetenceniveauet er tilstrækkeligt."
    }
  },
  {
    "id": "saasteindeksi",
    "kategoria": "ymparisto",
    "aikakausiehto": 2,
    "prioriteetti": "normaali",
    "kontekstuaalinen": true,
    "otsikko": {
      "fi": "Saasteindeksi",
      "en": "Pollution Index",
      "da": "Forureningsindeks"
    },
    "sisalto": {
      "fi": "Oikeasti ilmansaasteita mitataan mm. hiukkaspitoisuuksina (PM2.5), hiilidioksidipäästöinä per capita ja ilmanlaatuindekseillä. Teollistuminen 1800-luvulla toi ensimmäiset merkittävät päästöt, ja ympäristötietoisuus alkoi vasta 1900-luvun jälkipuoliskolla. Pelissä arvo nousee teollisuuteen panostettaessa ja laskee tutkimuksen (puhtaamman teknologian) myötä. Matalampi on parempi.",
      "en": "In reality, air pollution is measured via, e.g., particulate concentration (PM2.5), CO2 emissions per capita, and air quality indexes. Industrialization in the 1800s brought the first major emissions, and environmental awareness only began in the latter half of the 1900s. In the game the value rises with investment in industry and falls with research (cleaner technology). Lower is better.",
      "da": "I virkeligheden måles luftforurening bl.a. som partikelkoncentration (PM2,5), CO2-udledning per indbygger og luftkvalitetsindeks. Industrialiseringen i 1800-tallet bragte de første betydelige udledninger, og miljøbevidsthed startede først i anden halvdel af 1900-tallet. I spillet stiger værdien, når der investeres i industri, og falder med forskning (renere teknologi). Lavere er bedre."
    }
  },
  {
    "id": "bkt_per_asukas",
    "kategoria": "talous",
    "aikakausiehto": 3,
    "prioriteetti": "normaali",
    "kontekstuaalinen": true,
    "otsikko": {
      "fi": "Bruttokansantuote per asukas",
      "en": "Gross Domestic Product per capita",
      "da": "Bruttonationalprodukt per indbygger"
    },
    "sisalto": {
      "fi": "Oikeasti BKT lasketaan kolmella tavalla, jotka teoriassa täsmäävät: tuotantoperusteisesti (arvonlisä), tuloperusteisesti (palkat + voitot) tai menoperusteisesti (kulutus + investoinnit + vienti − tuonti). Kansantalouden tilinpito virallistui vasta 1930–40-luvuilla (Simon Kuznets, Nobel 1971). Pelissä luku on abstrakti tuotannon ja teknologian yhdistelmä, ei oikea valuutta.",
      "en": "In reality, GDP is calculated three ways that in theory match: by production (value added), by income (wages + profits), or by expenditure (consumption + investment + exports − imports). National accounting was only formalized in the 1930s–40s (Simon Kuznets, Nobel 1971). In the game the figure is an abstract blend of output and technology, not a real currency.",
      "da": "I virkeligheden beregnes BNP på tre måder, der i teorien stemmer overens: produktionsbaseret (værditilvækst), indkomstbaseret (løn + overskud) eller udgiftsbaseret (forbrug + investeringer + eksport − import). Nationalregnskabet blev først formaliseret i 1930'erne-40'erne (Simon Kuznets, Nobelpris 1971). I spillet er tallet en abstrakt kombination af produktion og teknologi, ikke en reel valuta."
    }
  },
  {
    "id": "rikollisuusaste",
    "kategoria": "yhteiskunta",
    "aikakausiehto": 3,
    "prioriteetti": "normaali",
    "kontekstuaalinen": true,
    "otsikko": {
      "fi": "Rikollisuusaste",
      "en": "Crime Rate",
      "da": "Kriminalitetsrate"
    },
    "sisalto": {
      "fi": "Oikeasti rikollisuutta mitataan ilmoitettujen rikosten määränä 100 000 asukasta kohden, mutta tilasto kärsii ilmoituskynnyksen vaihtelusta eri aikoina ja paikoissa. Systemaattinen rikostilastointi ja kriminologia tieteenalana syntyivät 1800-luvun kaupungistumisen myötä. Pelissä arvo nousee heikon hallinnon ja yhteisöllisyyden myötä. Matalampi on parempi.",
      "en": "In reality, crime is measured as reported offenses per 100,000 inhabitants, but the statistic suffers from varying reporting thresholds across times and places. Systematic crime statistics and criminology as a discipline emerged with 1800s urbanization. In the game the value rises with weak administration and low cohesion. Lower is better.",
      "da": "I virkeligheden måles kriminalitet som anmeldte forbrydelser per 100.000 indbyggere, men statistikken lider under, at anmeldelsestærsklen varierer over tid og sted. Systematisk kriminalstatistik og kriminologi som fagområde opstod med byudviklingen i 1800-tallet. I spillet stiger værdien ved svag forvaltning og lav sammenhængskraft. Lavere er bedre."
    }
  },
  {
    "id": "onnellisuusindeksi",
    "kategoria": "yhteiskunta",
    "aikakausiehto": 4,
    "prioriteetti": "normaali",
    "kontekstuaalinen": true,
    "otsikko": {
      "fi": "Onnellisuusindeksi",
      "en": "Happiness Index",
      "da": "Lykkeindeks"
    },
    "sisalto": {
      "fi": "Oikeasti esim. YK:n World Happiness Report perustuu kyselyihin, joissa ihmiset arvioivat oman elämänsä asteikolla 0–10, yhdistettynä selittäviin tekijöihin kuten BKT, sosiaalinen tuki ja terveys. Raportti julkaistiin ensi kertaa 2012. Pelissä indeksi yhdistää terveyden, yhteisöllisyyden, moraalin, vaurauden ja rikollisuuden yhdeksi 0–10-luvuksi.",
      "en": "In reality, e.g. the UN World Happiness Report is based on surveys where people rate their own life on a 0–10 scale, combined with explanatory factors like GDP, social support, and health. The report was first published in 2012. In the game the index combines health, cohesion, morale, wealth, and crime into a single 0–10 figure.",
      "da": "I virkeligheden bygger fx FN's World Happiness Report på spørgeundersøgelser, hvor folk vurderer eget liv på en skala fra 0–10, kombineret med forklarende faktorer som BNP, social støtte og sundhed. Rapporten blev første gang udgivet i 2012. I spillet kombinerer indekset sundhed, sammenhængskraft, moral, velstand og kriminalitet til ét tal fra 0–10."
    }
  },
  {
    "id": "maatalousmoodi",
    "kategoria": "talous",
    "aikakausiehto": 0,
    "prioriteetti": "normaali",
    "kontekstuaalinen": true,
    "otsikko": {
      "fi": "Maatalouden suuntaus",
      "en": "Agricultural focus",
      "da": "Landbrugsretning"
    },
    "sisalto": {
      "fi": "Pienviljely on tasainen ja saatavilla heti. Suurtilat (Teollisesta) nostavat satoa mutta lisäävät saasteita ja herkkyyttä häiriöille. Bioviljely (Modernista) on kestävää ja puhdasta, mutta tuottaa vähemmän. Erikoistuotteet (Teollisesta) tuovat vaurautta ruokaturvan kustannuksella.",
      "en": "Smallholding is steady and available from the start. Large farms (Industrial era) raise yield but increase pollution and vulnerability to disruption. Organic farming (Modern era) is sustainable and clean but yields less. Specialty crops (Industrial era) bring wealth at the cost of food security.",
      "da": "Småbrug er stabilt og tilgængeligt fra start. Storbrug (fra Industriel tidsalder) øger udbyttet, men øger forurening og sårbarhed over for forstyrrelser. Økologisk landbrug (fra Moderne tidsalder) er bæredygtigt og rent, men giver mindre udbytte. Specialafgrøder (fra Industriel tidsalder) giver velstand på bekostning af fødevaresikkerhed."
    }
  },
  {
    "id": "terveyspainotus",
    "kategoria": "vaesto",
    "aikakausiehto": 0,
    "prioriteetti": "normaali",
    "kontekstuaalinen": true,
    "otsikko": {
      "fi": "Ehkäisevä vs sairaalapainotteinen hoito",
      "en": "Preventive vs. hospital-focused care",
      "da": "Forebyggende vs. hospitalsorienteret pleje"
    },
    "sisalto": {
      "fi": "Ehkäisevä painotus (arvo lähellä 0 %) suojaa erityisesti lapsia ja hillitsee epidemioita. Sairaalapainotteinen hoito (arvo lähellä 100 %) pelastaa paremmin aikuisia ja vanhuksia akuuteissa tilanteissa. Kumpikaan ei ole ylivoimainen — valinta riippuu siitä, minkä ikäryhmän suojelu on juuri nyt tärkeintä.",
      "en": "A preventive focus (value near 0%) especially protects children and curbs epidemics. Hospital-focused care (value near 100%) better saves adults and the elderly in acute cases. Neither is strictly superior — the choice depends on which age group needs protection most right now.",
      "da": "Forebyggende fokus (værdi nær 0%) beskytter især børn og dæmper epidemier. Hospitalsorienteret pleje (værdi nær 100%) redder bedre voksne og ældre i akutte tilfælde. Ingen af delene er entydigt bedst — valget afhænger af, hvilken aldersgruppe der har mest brug for beskyttelse lige nu."
    }
  },
  {
    "id": "erikoislaakarit",
    "kategoria": "vaesto",
    "aikakausiehto": 3,
    "prioriteetti": "normaali",
    "kontekstuaalinen": true,
    "otsikko": {
      "fi": "Erikoislääkärien osuus",
      "en": "Share of specialists",
      "da": "Andel speciallæger"
    },
    "sisalto": {
      "fi": "Erikoislääkäri kattaa 1,4× yleislääkärin verran — vaativampi koulutuspolku, mutta parempi hoitotulos raskaammissa tapauksissa.",
      "en": "A specialist covers 1.4× as much as a general practitioner — a more demanding training path, but a better outcome in severe cases.",
      "da": "En speciallæge dækker 1,4× så meget som en alment praktiserende læge — en mere krævende uddannelsesvej, men et bedre resultat i alvorlige tilfælde."
    }
  },
  {
    "id": "tutkimussuuntaus",
    "kategoria": "koulutus",
    "aikakausiehto": 2,
    "prioriteetti": "normaali",
    "kontekstuaalinen": true,
    "otsikko": {
      "fi": "Perustutkimus vs soveltava tutkimus",
      "en": "Basic vs. applied research",
      "da": "Grundforskning vs. anvendt forskning"
    },
    "sisalto": {
      "fi": "Soveltava tutkimus (arvo lähellä 100 %) nostaa tuotannon tehokkuutta heti, mutta hidastaa tutkimuspisteiden kertymistä jopa 40 %. Perustutkimus (arvo lähellä 0 %) on hitaampaa hyödyntää mutta vie aikakautta eteenpäin nopeimmin.",
      "en": "Applied research (value near 100%) raises production efficiency immediately but slows the accumulation of research points by up to 40%. Basic research (value near 0%) is slower to exploit but advances the era fastest.",
      "da": "Anvendt forskning (værdi nær 100%) øger produktionseffektiviteten med det samme, men bremser ophobningen af forskningspoint med op til 40%. Grundforskning (værdi nær 0%) er langsommere at udnytte, men fører tidsalderen hurtigst fremad."
    }
  },
  {
    "id": "opetussuuntaus",
    "kategoria": "koulutus",
    "aikakausiehto": 0,
    "prioriteetti": "normaali",
    "kontekstuaalinen": true,
    "otsikko": {
      "fi": "Opetuksen suuntaus",
      "en": "Education focus",
      "da": "Uddannelsesretning"
    },
    "sisalto": {
      "fi": "Peruskoulutus on tasainen ja avoinna heti. Ammatillinen koulutus (Varhaisteollisesta) nostaa tuotannon tehokkuutta. Korkeakoulutus (Teollisesta) nostaa tutkimusta merkittävästi, mutta tavoittaa harvemman.",
      "en": "Basic education is steady and available from the start. Vocational training (Early Industrial era) raises production efficiency. Higher education (Industrial era) raises research significantly but reaches fewer people.",
      "da": "Grundskoleundervisning er stabil og tilgængelig fra start. Erhvervsuddannelse (fra Tidlig industriel tidsalder) øger produktionseffektiviteten. Videregående uddannelse (fra Industriel tidsalder) øger forskningen markant, men når færre mennesker."
    }
  },
  {
    "id": "rikostutkijat",
    "kategoria": "yhteiskunta",
    "aikakausiehto": 3,
    "prioriteetti": "normaali",
    "kontekstuaalinen": true,
    "otsikko": {
      "fi": "Rikostutkijat",
      "en": "Detectives",
      "da": "Detektiver"
    },
    "sisalto": {
      "fi": "Rikostutkijoihin erikoistuva osa hallinnosta laskee rikollisuutta suoraan (jopa −35 % täydellä osuudella), mutta vie resursseja yleisestä hallintokattavuudesta (−15 % täydellä osuudella).",
      "en": "The share of administration specializing in criminal investigation directly lowers crime (up to −35% at full share), but draws resources from general admin coverage (−15% at full share).",
      "da": "Den del af administrationen, der specialiserer sig i kriminalefterforskning, sænker kriminaliteten direkte (op til −35% ved fuld andel), men trækker ressourcer fra den generelle administrationsdækning (−15% ved fuld andel)."
    }
  },
  {
    "id": "teollisuussuuntaus",
    "kategoria": "talous",
    "aikakausiehto": 2,
    "prioriteetti": "normaali",
    "kontekstuaalinen": true,
    "otsikko": {
      "fi": "Perustuotanto vs erikoistunut teollisuus",
      "en": "Basic production vs. specialized industry",
      "da": "Basisproduktion vs. specialiseret industri"
    },
    "sisalto": {
      "fi": "Erikoistunut teollisuus (arvo lähellä 100 %) nostaa tehokkuutta, tutkimusta ja BKT:ta, mutta saastuttaa selvästi enemmän kuin perustuotanto.",
      "en": "Specialized industry (value near 100%) raises efficiency, research and GDP, but pollutes noticeably more than basic production.",
      "da": "Specialiseret industri (værdi nær 100%) øger effektivitet, forskning og BNP, men forurener markant mere end basisproduktion."
    }
  },
  {
    "id": "huoltosuhde",
    "kategoria": "vaesto",
    "aikakausiehto": 0,
    "prioriteetti": "korkea",
    "kontekstuaalinen": true,
    "otsikko": {
      "fi": "Huoltosuhde"
    },
    "sisalto": {
      "fi": "Huoltosuhde kertoo, montako lasta ja vanhusta on sataa työikäistä kohden — se on keskeinen mittari sille, kuinka paljon työikäinen väestö joutuu elättämään muita. Suomessa huoltosuhde on yksi Euroopan heikoimmista väestön ikääntymisen vuoksi. Pelissä huoltosuhde lasketaan lasten ja vanhusten yhteismäärästä suhteessa työikäisiin, ja se näkyy väestöpyramidin yhteydessä."
    }
  },
  {
    "id": "demografinen_siirtyma",
    "kategoria": "historia",
    "aikakausiehto": 0,
    "prioriteetti": "korkea",
    "kontekstuaalinen": true,
    "otsikko": {
      "fi": "Demografinen siirtymä"
    },
    "sisalto": {
      "fi": "Demografinen siirtymä tarkoittaa, että yhteiskunnan kehittyessä ensin kuolleisuus laskee (parempi ravinto, hygienia, lääketiede) ja vasta myöhemmin syntyvyys — välivaiheessa väestö kasvaa nopeasti, koska syntyvyys on yhä korkea mutta yhä harvempi kuolee lapsena. Suomessa tämä tapahtui 1800–1900-luvuilla. Pelissä sama ilmiö näkyy syntyvyyskertoimen hitaana laskuna aikakausittain (TFR5 0,9 → 0,5, −44 %), samalla kun lapsikuolleisuus laskee huomattavasti nopeammin (0,17 → 0,008, −95 %)."
    }
  },
  {
    "id": "hallintomuodot_legitimiteetti",
    "kategoria": "yhteiskunta",
    "aikakausiehto": 0,
    "prioriteetti": "korkea",
    "kontekstuaalinen": true,
    "otsikko": {
      "fi": "Hallintomuodot ja legitimiteetti"
    },
    "sisalto": {
      "fi": "Politiikan tutkimuksessa legitimiteetti tarkoittaa sitä, missä määrin kansa hyväksyy vallanpitäjän oikeuden hallita — se voi perustua perinteeseen (esim. heimoneuvosto), karismaan tai lakiin/menettelyihin (esim. vaalit). Sosiologi Max Weber erotti nämä kolme legitimiteetin tyyppiä 1900-luvun alussa. Pelissä hallintomuodon kertoimet mallintavat karkeasti tätä: itsevaltaiset hallinnot ovat tehokkaita mutta hauraita, kun taas demokratia on hitaampi mutta vakaampi."
    }
  },
  {
    "id": "ruokaturva_nalanhata",
    "kategoria": "talous",
    "aikakausiehto": 0,
    "prioriteetti": "korkea",
    "kontekstuaalinen": true,
    "otsikko": {
      "fi": "Ruokaturva ja nälänhätä"
    },
    "sisalto": {
      "fi": "Ruokaturva tarkoittaa sitä, että kaikilla on jatkuvasti riittävästi ravitsevaa ruokaa. Esiteollisissa yhteiskunnissa yksikin huono satovuosi saattoi tarkoittaa nälänhätää — Suomen nälkävuosina 1866–1868 kuoli arviolta 150 000–270 000 ihmistä eli noin 8–9 % väestöstä. Pelissä ruokavarasto toimii puskurina huonoja vuosia vastaan, ja pitkittynyt vaje nostaa kuolleisuutta kaikissa ikäryhmissä."
    }
  },
  {
    "id": "oppivelvollisuus_lukutaito",
    "kategoria": "koulutus",
    "aikakausiehto": 0,
    "prioriteetti": "korkea",
    "kontekstuaalinen": true,
    "otsikko": {
      "fi": "Oppivelvollisuus ja lukutaito"
    },
    "sisalto": {
      "fi": "Yleinen oppivelvollisuus on historiallisesti nuori keksintö — Suomessa se säädettiin vasta 1921, vaikka lukutaitoa vaadittiin jo 1600-luvulta lähtien esimerkiksi rippikoulun ehtona. Koulutuskattavuuden kasvu 1800–1900-luvuilla liittyi kiinteästi teollistumiseen: tehtaat tarvitsivat lukutaitoista työvoimaa. Pelissä koulutuskattavuus riippuu opettajien määrästä suhteessa lapsiin, ja se vaikuttaa suoraan siihen, moniko varttuvista nuorista saa kunnollisen koulutuksen."
    }
  },
  {
    "id": "ammattien_rakennemuutos",
    "kategoria": "talous",
    "aikakausiehto": 0,
    "prioriteetti": "normaali",
    "kontekstuaalinen": false,
    "otsikko": {
      "fi": "Ammattien rakennemuutos"
    },
    "sisalto": {
      "fi": "Rakennemuutos tarkoittaa työvoiman siirtymistä sektorista toiseen talouden kehittyessä — ensin maataloudesta teollisuuteen, sitten teollisuudesta palveluihin. Ennen teollistumista 80–90 % maailman väestöstä työskenteli maataloudessa; nykyään rikkaissa maissa osuus on alle 2 %. Pelissä tämä näkyy suoraan: kun maatalouden tuottavuus nousee aikakausittain, yhä pienempi osuus työvoimasta riittää ruokkimaan koko yhteiskunnan, ja loput vapautuvat muihin sektoreihin."
    }
  },
  {
    "id": "saastuminen_teollistuminen",
    "kategoria": "ymparisto",
    "aikakausiehto": 2,
    "prioriteetti": "normaali",
    "kontekstuaalinen": false,
    "otsikko": {
      "fi": "Saastuminen ja teollistuminen"
    },
    "sisalto": {
      "fi": "Suurkaupunkien ilmansaasteet muuttuivat vakavaksi kansanterveysongelmaksi teollistumisen myötä — esimerkiksi Lontoon \"Great Smog\" vuonna 1952 tappoi noin 4 000 ihmistä muutamassa päivässä ja johti Britannian ensimmäiseen ilmansuojelulakiin (Clean Air Act, 1956). Pelissä saasteindeksi nousee teollisuuteen panostettaessa ja laskee tutkimuksen myötä."
    }
  },
  {
    "id": "uusiutuva_energia_ilmasto",
    "kategoria": "ymparisto",
    "aikakausiehto": 4,
    "prioriteetti": "normaali",
    "kontekstuaalinen": false,
    "otsikko": {
      "fi": "Uusiutuva energia ja ilmastonmuutos"
    },
    "sisalto": {
      "fi": "Ilmastonmuutos eli maapallon keskilämpötilan nousu ihmisen aiheuttamien kasvihuonekaasupäästöjen vuoksi tunnistettiin tieteellisesti jo 1800-luvun lopulla (Svante Arrhenius, 1896), mutta poliittiseksi kysymykseksi se nousi vasta 1900-luvun lopulla. Pelin moderni aikakausi mahdollistaa uusiutuvan energian ja puhtaamman teknologian, jotka pienentävät saasteindeksiä samalla kun tuotanto jatkaa kasvuaan."
    }
  },
  {
    "id": "tiedeseurat_yliopistot",
    "kategoria": "koulutus",
    "aikakausiehto": 0,
    "prioriteetti": "normaali",
    "kontekstuaalinen": false,
    "otsikko": {
      "fi": "Tiedeseurat ja yliopistot"
    },
    "sisalto": {
      "fi": "Järjestäytynyt tiedeyhteisö syntyi vähitellen: ensimmäiset yliopistot (esim. Bologna, 1088) opettivat aluksi lähinnä teologiaa ja lakia, kun taas kokeellinen luonnontiede järjestäytyi omiksi seuroikseen vasta 1600-luvulla (esim. Royal Society, Lontoo 1660). Pelissä tutkimuspisteiden kertyminen nopeutuu koulutuskattavuuden ja hallinnon tehokkuuden myötä — samalla tavalla kuin oikeassa historiassa tiedeinstituutiot vaativat sekä koulutettua väkeä että vakaata rahoitusta."
    }
  },
  {
    "id": "patentit_innovaatio",
    "kategoria": "koulutus",
    "aikakausiehto": 1,
    "prioriteetti": "normaali",
    "kontekstuaalinen": false,
    "otsikko": {
      "fi": "Patentit ja innovaatio"
    },
    "sisalto": {
      "fi": "Patenttijärjestelmä — keksijän väliaikainen yksinoikeus keksintöönsä vastineeksi sen julkistamisesta — vakiintui Euroopassa 1400–1800-luvuilla ja nopeutti teknologian leviämistä, koska keksintöjä ei enää tarvinnut pitää salassa. Pelin keksintöjärjestelmä (esim. höyrykone, penisilliini, internet) kuvaa samaa ilmiötä yksinkertaistettuna: tutkimus tuo mukanaan konkreettisia, aikakaudelle ominaisia läpimurtoja."
    }
  },
  {
    "id": "aikakaudet_eri_tahtiin",
    "kategoria": "historia",
    "aikakausiehto": 0,
    "prioriteetti": "normaali",
    "kontekstuaalinen": false,
    "otsikko": {
      "fi": "Miksi aikakaudet vaihtuvat eri tahtiin eri sivilisaatioilla"
    },
    "sisalto": {
      "fi": "Aikakausi ei vaihdu pelissä minään tiettynä kalenterivuotena, vaan silloin kun yhteiskuntasi tutkimus ja väestö riittävät — täsmälleen kuten oikeassa historiassa eri alueet teollistuivat ja modernisoituivat hyvin eri tahtiin (Englanti 1800-luvun alussa, moni muu alue vasta 1900-luvulla tai myöhemmin). Siksi kaksi samaa sivilisaatiota pelaavaa oppilasta voi päätyä hyvin erilaisiin aikakausiin samalla vuosiluvulla."
    }
  },
  {
    "id": "kirjoitustaito_historiankirjoitus",
    "kategoria": "historia",
    "aikakausiehto": 0,
    "prioriteetti": "normaali",
    "kontekstuaalinen": false,
    "otsikko": {
      "fi": "Kirjoitustaito ja historiankirjoitus"
    },
    "sisalto": {
      "fi": "Kirjoitustaito syntyi itsenäisesti muutamassa paikassa maailmaa: ensin Mesopotamiassa (n. 3400–3300 eaa.) ja Egyptissä (n. 3200 eaa.), paljon myöhemmin ja toisistaan riippumatta myös Kiinassa (n. 1300 eaa.) ja Mesoamerikassa (n. 900–600 eaa.) — yli tuhat vuotta jälkimmäisten jälkeen. Varhaisin kirjoitus palveli lähinnä varastojen ja verojen kirjanpitoa. Vasta kirjoitustaidon myötä yhteiskunnista jäi omaa, ajankohtaista kirjallista lähdeaineistoa — sitä edeltävää aikaa kutsutaan esihistoriaksi, koska siitä tiedetään vain arkeologian kautta. Pelin Muinaisaika-kauden ensimmäinen keksintö on juuri kirjoitus."
    }
  },
  {
    "id": "kolumbuksen_vaihto",
    "kategoria": "historia",
    "aikakausiehto": 1,
    "prioriteetti": "normaali",
    "kontekstuaalinen": false,
    "otsikko": {
      "fi": "Kolumbuksen vaihto"
    },
    "sisalto": {
      "fi": "Kolumbuksen vaihdolla tarkoitetaan kasvien, eläinten ja tautien massiivista siirtymistä Euroopan ja Amerikan välillä vuoden 1492 jälkeen. Peruna ja maissi levisivät Amerikasta Euraasiaan ja mullistivat ruokahuoltoa monin paikoin — peruna esimerkiksi mahdollisti aiempaa suuremman väestöntiheyden karummillakin mailla. Pelin Keskiaika-kauden kuvausteksti viittaa juuri tähän ilmiöön."
    }
  }
];

export const TIETOLAATIKKO_KATEGORIAT = [
  {
    "avain": "vaesto",
    "nimi": {
      "fi": "Väestö & terveys"
    },
    "ikoni": "🫀"
  },
  {
    "avain": "talous",
    "nimi": {
      "fi": "Talous & työ"
    },
    "ikoni": "💰"
  },
  {
    "avain": "yhteiskunta",
    "nimi": {
      "fi": "Yhteiskunta & hallinto"
    },
    "ikoni": "⚖️"
  },
  {
    "avain": "ymparisto",
    "nimi": {
      "fi": "Ympäristö"
    },
    "ikoni": "🏭"
  },
  {
    "avain": "koulutus",
    "nimi": {
      "fi": "Koulutus & tiede"
    },
    "ikoni": "📚"
  },
  {
    "avain": "historia",
    "nimi": {
      "fi": "Historia & aikakaudet"
    },
    "ikoni": "⏳"
  }
];

export function tietolaatikkoKentta(id, kentta, lang) {
  const item = TIETOLAATIKOT.find((t) => t.id === id);
  if (!item) return "";
  const arvo = item[kentta];
  if (!arvo) return "";
  return arvo[lang] !== undefined ? arvo[lang] : arvo.fi;
}
