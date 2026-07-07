import React, { useState, useMemo, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// ============ AIKAKAUDET ============
// Tuottavuusluvut pohjaavat tutkimukseen: ennen teollistumista 80–90 % väestöstä teki maataloustyötä,
// Englannissa 1381 noin 78 % aikuisista miehistä, 1851 enää 28 % ja 1911 vain 11 %.
// elderCare = kuinka suuri osa vanhusten työpanoksesta muuttuu "näkymättömäksi" hoivaksi (lastenhoito, kevyet askareet)
// virallisen työvoiman ulkopuolella. Eläköityminen instituutiona on moderni keksintö (ensimmäinen valtiollinen
// eläkejärjestelmä Saksassa 1889) — agraariyhteiskunnassa vanhukset eivät irtautuneet tuotannosta kokonaan.
const ERAS = [
  { name: "Agraarinen", feeds: 2.4, minPop: 300, research: 0, desc: "Hevonen ja aura. Lähes kaikkien on viljeltävä, jotta kaikki syövät.", hist: "Vastaa Eurooppaa ennen 1800-lukua: noin 75–90 % työvoimasta raatoi pelloilla.", childMort: 0.17, color: "#7a5c2e", elderCare: 0.55,
    roles: { children: "Paimensivat karjaa, kantoivat vettä, karkottivat lintuja pelloilta ja hoitivat pienempiä sisaruksia jo 5–6-vuotiaasta — todellista lapsityötä.", youth: "Astuivat täyteen työhön noin 12–14-vuotiaana: kyntöä, kylvöä, karjanhoitoa.", elderly: "Eivät jääneet muodolliselle eläkkeelle: hoitivat lapsenlapsia, kehräsivät, korjasivat työkaluja ja välittivät kokemustietoa." } },
  { name: "Varhaisteollinen", feeds: 6, minPop: 4000, research: 250, desc: "Höyry, mylly ja vuoroviljely. Yksi viljelijä ruokkii kuusi.", hist: "Vastaa 1800-luvun puoliväliä: Englannissa 1851 maataloudessa oli enää 28 % työvoimasta.", childMort: 0.1, color: "#8a4b2a", elderCare: 0.35,
    roles: { children: "Moni lapsi työskenteli jo tehtaissa tai kaivoksissa ennen suojalakeja; osa jäi vielä maatilan askareisiin.", youth: "Oppipoika- ja tehdastyö yleistyi; muutto maalta kaupunkeihin alkoi.", elderly: "Muodollista eläkettä tuskin oli — vanhukset asuivat perheen luona ja tekivät kevyempiä kotitöitä niin kauan kuin jaksoivat." } },
  { name: "Teollinen", feeds: 25, minPop: 25000, research: 1000, desc: "Lannoitteet ja traktorit. Yksi viljelijä ruokkii 25.", hist: "Vastaa 1900-luvun puoliväliä: koneellistuminen vapautti väen tehtaisiin ja palveluihin.", childMort: 0.035, color: "#5c4a7a", elderCare: 0.15,
    roles: { children: "Lapsityölait ja oppivelvollisuus yleistyivät — lapset ovat nyt pääosin koulussa.", youth: "Ammattikoulutus ja tehdastyö; nuoret muuttavat itsenäisesti kaupunkeihin.", elderly: "Eläkejärjestelmät leviävät — muodollinen eläkkeelle jääminen syntyy vasta nyt, joskin monet auttavat yhä lastenlastensa kanssa." } },
  { name: "Moderni", feeds: 100, minPop: 120000, research: 3000, desc: "Automaatio ja biotiede. Yksi viljelijä ruokkii 100.", hist: "Vastaa nykypäivää: rikkaissa maissa alle 2 % työvoimasta tuottaa ruoan kaikille.", childMort: 0.008, color: "#2a6a5c", elderCare: 0.05,
    roles: { children: "Koulutus ja harrastukset — lapsityö on kielletty ja harvinaista.", youth: "Pitkä koulutuspolku, myöhäisempi työelämään siirtyminen.", elderly: "Virallinen eläke on normi; epävirallinen lastenhoitoapu jatkuu, mutta pienemmässä mittakaavassa suhteessa väestöön." } },
];

// ============ KEKSINNÖT AIKAKAUSITTAIN ============
// Kun tutkimus etenee kohti seuraavaa aikakautta, tarinaan nostetaan aikakaudelle sopiva keksintö —
// tämä tekee tutkimuksen tuntuvammaksi ja luo mielenkiintoa ilman, että pelimekaniikka muuttuu.
const INVENTIONS_BY_ERA = [
  [ { name: "Aura", desc: "puinen aura moninkertaistaa yhden viljelijän tuottavuuden." },
    { name: "Vuoroviljely", desc: "maan lepäännyttäminen vuorotellen pitää sadot tasaisempina." },
    { name: "Vesimylly", desc: "virtaava vesi jauhaa viljan — käsivoimaa säästyy muuhun työhön." },
    { name: "Kirjoitus", desc: "varastojen ja verojen kirjanpito helpottuu merkittävästi." } ],
  [ { name: "Höyrykone", desc: "mekaaninen voima korvaa ensi kertaa lihasvoiman laajassa mitassa." },
    { name: "Rautatie", desc: "tavara ja väki liikkuvat nopeammin kuin koskaan aiemmin." },
    { name: "Rokotus", desc: "isorokkoa vastaan kehitetty menetelmä pelastaa tuhansia." },
    { name: "Lennätin", desc: "viestit kulkevat nyt lähes valon nopeudella lankaa pitkin." } ],
  [ { name: "Sähkövalaistus", desc: "tehtaat ja kodit voivat toimia pimeän jälkeenkin." },
    { name: "Autoteollisuus", desc: "liukuhihnatuotanto tekee kulkuvälineistä arkipäiväisiä." },
    { name: "Antibiootit", desc: "penisilliini muuttaa tavallisen infektion hoidettavaksi vaivaksi." },
    { name: "Radio", desc: "tieto ja viihde kulkevat nyt reaaliaikaisesti koko kansalle." } ],
  [ { name: "Internet", desc: "tieto ja ihmiset verkottuvat maailmanlaajuisesti." },
    { name: "Ihmisen perimän kartoitus", desc: "lääketiede saa työkalun ymmärtää sairauksia perusteista asti." },
    { name: "Uusiutuva energia", desc: "aurinko- ja tuulivoima alkavat korvata fossiilisia polttoaineita." },
    { name: "Tekoäly", desc: "koneet alkavat avustaa tutkimusta ja päätöksentekoa." } ],
];

// ============ TARINAN TYYLI AIKAKAUSITTAIN ============
// Sama tarinageneraattori, mutta jokainen aikakausi "kertoo" hieman eri äänellä, ettei formaatti puutu.
const STORY_VOICE = [
  { tag: "", tone: "Vanhat kertovat" },
  { tag: "", tone: "Lehti kirjoittaa" },
  { tag: "", tone: "Raportti toteaa" },
  { tag: "", tone: "Verkossa kerrotaan" },
];
// Visuaalinen ilme raporttimodalille aikakausittain: fontit, värit ja CSS-luokka joka ohjaa asettelua.
const REPORT_STYLES = [
  { cls: "rp-folk", masthead: null, bg: "rgba(252,246,232,0.92)", headFont: "'Playfair Display', serif", bodyFont: "'Crimson Pro', Georgia, serif", accent: "#7a5c2e" },
  { cls: "rp-news", masthead: "SANOMALEHTI", bg: "#f2ecd8", headFont: "'Playfair Display', serif", bodyFont: "Georgia, 'Times New Roman', serif", accent: "#2c2416" },
  { cls: "rp-stat", masthead: "TILASTORAPORTTI", bg: "#eef2f2", headFont: "'IBM Plex Mono', monospace", bodyFont: "'IBM Plex Mono', monospace", accent: "#2f5a5a" },
  { cls: "rp-feed", masthead: "PÄIVITYS", bg: "#eaf1fb", headFont: "system-ui, sans-serif", bodyFont: "system-ui, sans-serif", accent: "#2a5c8a" },
];
// health = lisä terveyskattavuuteen, resilience = katastrofien vakavuuskerroin (pienempi = kestävämpi),
// minPop = aikakausien väestövaatimuksen kerroin, store = varastokerroin
const CIVS = [
  { key: "sumer", name: "Sumer", icon: "🏺", trait: "Kastelukanavat & nuolenpääkirjoitus", desc: "Ensimmäiset kaupungit, kirjanpito ja viljavarastot.", mods: { farm: 1.05, research: 1.1, store: 1.3 } },
  { key: "egypti", name: "Egypti", icon: "🏜️", trait: "Niilin tulvat", desc: "Ennustettava tulvarytmi teki maataloudesta poikkeuksellisen tuottavaa.", mods: { farm: 1.2 } },
  { key: "indus", name: "Induslaakso", icon: "🧱", trait: "Viemäröinti & kaupunkisuunnittelu", desc: "Harappan kaupungeissa oli maailman ensimmäiset viemärit.", mods: { health: 0.12, farm: 1.05 } },
  { key: "kiina", name: "Kiina", icon: "🐉", trait: "Byrokratia & keksinnöt", desc: "Paperi, ruuti, kompassi — ja tuhatvuotinen virkamieslaitos.", mods: { research: 1.15, store: 1.1 } },
  { key: "kreikka", name: "Kreikka", icon: "🏛️", trait: "Filosofia & tiede", desc: "Karut vuoret mutta kirkkaat ajatukset.", mods: { research: 1.25, farm: 0.9 } },
  { key: "rooma", name: "Rooma", icon: "🛡️", trait: "Akveduktit & hallinto", desc: "Tiet, vesijohdot ja organisaatio, joka skaalautui imperiumiksi.", mods: { health: 0.1, minPop: 0.9 } },
  { key: "persia", name: "Persia", icon: "🦁", trait: "Kuninkaan tie", desc: "Tehokas hallinto ja posti yhdistivät valtavan alueen.", mods: { minPop: 0.85, store: 1.1 } },
  { key: "maya", name: "Maya", icon: "🌽", trait: "Tähtitiede & kalenteri", desc: "Huippumatematiikkaa — mutta kuivuudet koettelivat ankarasti.", mods: { research: 1.15, resilience: 1.15, farm: 0.95 } },
  { key: "inka", name: "Inkat", icon: "🏔️", trait: "Qollqa-varastot & pengerviljely", desc: "Valtio varastoi ruokaa vuosiksi eteenpäin Andien rinteillä.", mods: { store: 1.5, farm: 1.1, research: 0.9 } },
  { key: "atsteekit", name: "Atsteekit", icon: "🌋", trait: "Chinampa-kelluvat pellot", desc: "Tehoviljelyä järvellä ja nopeasti kasvava väestö.", mods: { birth: 1.15, farm: 1.05, health: -0.05 } },
  { key: "intia", name: "Intia", icon: "🕉️", trait: "Nolla & suuret joet", desc: "Matematiikan lahja maailmalle ja Gangesin hedelmällinen tasanko.", mods: { birth: 1.1, research: 1.05 } },
  { key: "japani", name: "Japani", icon: "🗾", trait: "Sisu & jälleenrakennus", desc: "Maanjäristysten ja taifuunien karaisema — kriiseistä noustaan nopeasti.", mods: { resilience: 0.75 } },
  { key: "khmer", name: "Khmer", icon: "🛕", trait: "Barayt eli vesivarastot", desc: "Angkorin kastelujärjestelmä ruokki keskiajan suurimman kaupungin.", mods: { farm: 1.15, resilience: 1.1 } },
  { key: "bysantti", name: "Bysantti", icon: "☦️", trait: "Sairaalat & diplomatia", desc: "Antiikin lääketiede säilyi ja kehittyi Konstantinopolissa.", mods: { health: 0.15, research: 0.95 } },
  { key: "arabia", name: "Arabien kulta-aika", icon: "🌙", trait: "Viisauden talo", desc: "Bagdadissa käännettiin ja kehitettiin koko maailman tiede.", mods: { research: 1.2 } },
  { key: "mali", name: "Mali", icon: "👑", trait: "Timbuktun kirjastot", desc: "Mansa Musan valtakunta — kultaa, kauppaa ja oppineisuutta.", mods: { store: 1.2, research: 1.05 } },
  { key: "aksum", name: "Aksum / Etiopia", icon: "⛰️", trait: "Ylänköjen linnake", desc: "Vuoristo suojasi, terassit ruokkivat — harvinaisen sitkeä valtio.", mods: { resilience: 0.8, farm: 1.05 } },
  { key: "pohjola", name: "Pohjola", icon: "⚔️", trait: "Karun maan kansa", desc: "Niukkuus opetti selviytymään — nälkävuodetkin kestetään.", mods: { resilience: 0.8, birth: 1.05, farm: 0.95 } },
  { key: "polynesia", name: "Polynesia", icon: "🛶", trait: "Saariyhteisöjen taito", desc: "Pienet eristyneet yhteisöt oppivat pärjäämään vähällä väellä.", mods: { minPop: 0.7, farm: 1.05, research: 0.9 } },
  { key: "eurooppa", name: "Länsi-Eurooppa", icon: "⚙️", trait: "Kirjapaino & kilpailu", desc: "Tiedon leviäminen kiihdytti teollistumista.", mods: { research: 1.1, minPop: 0.95 } },
];
const MOD_DEFAULTS = { farm: 1, research: 1, birth: 1, health: 0, resilience: 1, minPop: 1, store: 1 };
const civMods = (civ) => ({ ...MOD_DEFAULTS, ...(civ?.mods ?? {}) });

// ============ KANSALLISVALTIOT (kuluttajan lisäostot) ============
// Ilmainen peruspeli kattaa koko aikakausikaaren yhdellä sivilisaatiolla voittoon asti.
// Teollisesta aikakaudesta alkaen — historiallisesti oikea kohta, jolloin nationalismi ja
// kansallisvaltiot syntyivät — pelaaja voi ostaa yksittäisen maan jatko-osan (2,99 €/valtio).
// Ostettu valtio tuo mukanaan oman historiallisen tapahtumapoolinsa (yhdistetään perustapahtumiin)
// ja pienen, valtiolle ominaisen bonuksen (extraMods, samat kentät kuin CIVS.mods).
// HUOM: tässä demossa "osto" on paikallinen simulaatio (window.storage) — oikeassa julkaisussa
// tämä kytkettäisiin App Store / Google Play / Stripe -maksuun.
const NATION_BRANCHES = {
  pohjola: [
    { key: "suomi", name: "Suomi", icon: "🇫🇮", price: "2,99 €", trait: "Sisu ja hyvinvointivaltio", extraMods: { research: 1.05, resilience: 0.9 },
      events: [
        { id: "nalkavuodet_fi", name: "Nälkävuodet 1866–68", desc: "Kolme peräkkäistä kylmää kesää. Sato tuhoutuu laajalti.", weight: 5, foodMod: 0.55 },
        { id: "sisallissota_fi", name: "Sisällissota 1918", desc: "Yhteiskunta jakautuu kahtia — talous ja varastot kärsivät levottomuuksista.", weight: 4, storeMod: 0.75 },
        { id: "talvisota_fi", name: "Talvisota", desc: "Ylivoimaista vastaan taistellaan sisulla. Voimavarat suunnataan sotaan tutkimuksen sijaan.", weight: 4, foodMod: 0.85, bonusResearch: -50 },
        { id: "nokia_fi", name: "Nokian nousu", desc: "Kumiteollisuudesta matkapuhelimiin — teknologiavientimenestys.", weight: 6, bonusResearch: 250 },
        { id: "eu_fi", name: "EU-jäsenyys 1995", desc: "Liittyminen Euroopan unioniin avaa markkinat ja tuo vakautta.", weight: 5, storeMod: 1.15 },
      ] },
    { key: "ruotsi", name: "Ruotsi", icon: "🇸🇪", price: "2,99 €", trait: "Suurvalta-ajan perintö", extraMods: { store: 1.05 },
      events: [
        { id: "suurvalta_se", name: "Suurvalta-aika", desc: "Sotilaallinen ja hallinnollinen mahti kasvaa Itämeren ympärillä.", weight: 5, bonusResearch: 150 },
        { id: "emigraatio_se", name: "Emigraatio Amerikkaan", desc: "Nälkä ja ahtaus ajavat suuria joukkoja siirtolaisiksi merten taa.", weight: 4, migration: -0.03 },
        { id: "folkhemmet_se", name: "Folkhemmet — hyvinvointivaltio", desc: "Laaja sosiaaliturva ja tasa-arvo rakennetaan järjestelmällisesti.", weight: 5, storeMod: 1.1 },
      ] },
    { key: "norja", name: "Norja", icon: "🇳🇴", price: "2,99 €", trait: "Öljyvarallisuus ja merenkulku", extraMods: { store: 1.1 },
      events: [
        { id: "oljy_no", name: "Öljylöytö Pohjanmerellä", desc: "1969: valtava öljy- ja kaasuvarantojen löytö Pohjanmereltä.", weight: 5, storeMod: 1.2, bonusResearch: 150 },
        { id: "itsenaisyys_no", name: "Itsenäistyminen Ruotsista 1905", desc: "Rauhanomainen ero synnyttää oman valtion.", weight: 4, storeMod: 1.05 },
        { id: "kalastus_no", name: "Kalastus ja merenkulku", desc: "Pitkä rannikko ja kalarikkaat vedet ruokkivat kansaa.", weight: 6, foodMod: 1.15 },
      ] },
    { key: "tanska", name: "Tanska", icon: "🇩🇰", price: "2,99 €", trait: "Maatalousosuuskunnat", extraMods: { farm: 1.05 },
      events: [
        { id: "osuuskunnat_dk", name: "Maatalousosuuskunnat", desc: "Pienviljelijät yhdistävät voimansa — vientimaatalous kukoistaa.", weight: 6, foodMod: 1.2 },
        { id: "miehitys_dk", name: "Saksan miehitys 1940–45", desc: "Sota-aika rasittaa taloutta ja varastoja.", weight: 4, storeMod: 0.7 },
        { id: "tuulivoima_dk", name: "Hyvinvointimalli ja tuulivoima", desc: "Uusiutuva energia ja vahva sosiaaliturva rakentavat mainetta.", weight: 5, bonusResearch: 150 },
      ] },
  ],
  eurooppa: [
    { key: "ranska", name: "Ranska", icon: "🇫🇷", price: "2,99 €", trait: "Vallankumous ja valistus", extraMods: { research: 1.05 },
      events: [
        { id: "vallankumous_fr", name: "Ranskan vallankumous 1789", desc: "Vanha järjestys kaatuu — talous horjuu mullistuksessa.", weight: 4, storeMod: 0.75 },
        { id: "siirtomaat_fr", name: "Siirtomaavalta", desc: "Laaja siirtomaaverkosto tuo resursseja ja vaurautta.", weight: 5, storeMod: 1.15 },
        { id: "ydinvoima_fr", name: "Ydinvoima ja teknologia", desc: "Kunnianhimoinen ydinvoimaohjelma nostaa energiaomavaraisuutta.", weight: 5, bonusResearch: 220 },
      ] },
    { key: "saksa", name: "Saksa", icon: "🇩🇪", price: "2,99 €", trait: "Teollisuuden suurvalta", extraMods: { research: 1.05, farm: 1.05 },
      events: [
        { id: "yhdistyminen_de", name: "Yhdistyminen 1871", desc: "Hajanaiset ruhtinaskunnat yhdistyvät voimakkaaksi valtioksi.", weight: 5, bonusResearch: 150 },
        { id: "jalleenrakennus_de", name: "Sotien tuho ja jälleenrakennus", desc: "Raskaat menetykset, mutta nopea toipuminen seuraa.", weight: 4, foodMod: 0.7 },
        { id: "talousihme_de", name: "Talousihme (Wirtschaftswunder)", desc: "Nopea jälleenrakennus ja teollinen elpyminen sodan jälkeen.", weight: 5, storeMod: 1.2 },
      ] },
    { key: "englanti", name: "Iso-Britannia", icon: "🇬🇧", price: "2,99 €", trait: "Teollisen vallankumouksen edelläkävijä", extraMods: { research: 1.1 },
      events: [
        { id: "teollinen_gb", name: "Teollinen vallankumous edelläkävijänä", desc: "Höyrykone ja tehtaat muuttavat koko yhteiskunnan ensimmäisenä maailmassa.", weight: 6, bonusResearch: 250 },
        { id: "imperiumi_gb", name: "Imperiumi ja maailmankauppa", desc: "Laaja imperiumi tuo resursseja ja markkinoita joka mantereelta.", weight: 5, storeMod: 1.2 },
        { id: "sodat_gb", name: "Maailmansodat", desc: "Kaksi maailmansotaa rasittavat taloutta ja ruokahuoltoa raskaasti.", weight: 4, foodMod: 0.8 },
      ] },
  ],
};
// Yhdistää sivilisaation, (mahdollisen) ostetun kansallisvaltion ja pelaajan valitsemien aloitustaitojen
// bonukset — health on additiivinen, muut kertoimia.
function combinedMods(civ, nation, skills) {
  const base = civMods(civ);
  const out = { ...base };
  const applyMods = (mods) => {
    if (!mods) return;
    for (const k of Object.keys(mods)) {
      out[k] = k === "health" ? (out.health ?? 0) + mods.health : (out[k] ?? 1) * mods[k];
    }
  };
  applyMods(nation?.extraMods);
  (skills ?? []).forEach((skKey) => applyMods(startingSkillByKey(skKey)?.mods));
  return out;
}

// ============ ALOITUSTAIDOT ============
// Pelaaja valitsee pelin alussa täsmälleen kaksi näistä oman yhteisönsä erityisosaamiseksi.
// Sama mods-rakenne kuin sivilisaatioilla, joten ne yhdistyvät saumattomasti combinedMods-funktiossa.
const STARTING_SKILLS = [
  { key: "kastelu", name: "Kastelujärjestelmä", icon: "💧", desc: "Tehokas veden hallinta nostaa ruoantuotantoa.", mods: { farm: 1.12 } },
  { key: "kirjanpito", name: "Kirjanpito", icon: "📜", desc: "Merkintätapa tiedon tallentamiseen nopeuttaa tutkimusta.", mods: { research: 1.12 } },
  { key: "varastointi", name: "Suuret viljavarastot", icon: "🏺", desc: "Opittu varastointitaito kasvattaa varastokapasiteettia.", mods: { store: 1.2 } },
  { key: "yrtit", name: "Yrttiparannus", icon: "🌿", desc: "Kansanlääkintä parantaa terveydenhuollon kattavuutta.", mods: { health: 0.06 } },
  { key: "varautuminen", name: "Varautuminen katastrofeihin", icon: "🛡️", desc: "Opittu varovaisuus lieventää katovuosien ja epidemioiden iskuja.", mods: { resilience: 0.85 } },
  { key: "suvut", name: "Suuret perheet", icon: "👶", desc: "Vahva sukuyhteisö tukee lastenhankintaa.", mods: { birth: 1.1 } },
  { key: "hallinto", name: "Varhainen hallinto", icon: "⚖️", desc: "Selkeä päätöksentekotapa vaatii vähemmän väestöä aikakauden vaihtoon.", mods: { minPop: 0.85 } },
  { key: "monipuolisuus", name: "Monipuolinen viljely", icon: "🌾", desc: "Usean viljelytavan tuntemus tasapainottaa satoa ja kestävyyttä.", mods: { farm: 1.06, resilience: 0.95 } },
];
const startingSkillByKey = (key) => STARTING_SKILLS.find((sk) => sk.key === key);

// ============ HALLINTOMUODOT ============
// Akseli itsevaltiudesta (tyrannia) kohti kansanvaltaa (demokratia), plus erillinen uskonnollinen haara (teokratia).
// researchMod/cohesionMod = kertoimet, adminEff = kuinka tehokkaasti hallintosektorin työvoima muuntuu kattavuudeksi,
// unrest = peruskerroin levottomuuksien riskille kun yhteisö on tyytymätön, req* = avaamisehdot.
const GOVERNMENTS = [
  { key: "heimo", name: "Heimoneuvosto", icon: "🪶", axis: "Varhainen", desc: "Vanhimmat ja päälliköt päättävät yhdessä, kasvokkain.", minEra: 0, researchMod: 1, cohesionMod: 1.05, adminEff: 1, unrest: 0.02 },
  { key: "tyrannia", name: "Tyrannia / Itsevaltius", icon: "👑", axis: "Itsevaltainen", desc: "Yksi hallitsija, nopeat päätökset — mutta ei vastuuvelvollisuutta.", minEra: 0, researchMod: 0.95, cohesionMod: 0.85, adminEff: 1.2, unrest: 0.07 },
  { key: "oligarkia", name: "Oligarkia / Aristokratia", icon: "🏛️", axis: "Itsevaltainen", desc: "Harva eliitti hallitsee omista lähtökohdistaan käsin.", minEra: 0, researchMod: 1.0, cohesionMod: 0.95, adminEff: 1.1, unrest: 0.045 },
  { key: "tasavalta", name: "Tasavalta", icon: "📜", axis: "Edustuksellinen", desc: "Valitut edustajat päättävät, valtaa on rajoitettu laein.", minEra: 1, reqEdu: 0.4, researchMod: 1.05, cohesionMod: 1.0, adminEff: 0.95, unrest: 0.025 },
  { key: "demokratia", name: "Demokratia", icon: "🗳️", axis: "Kansanvalta", desc: "Kansa äänestää — hidasta, mutta legitiimiä ja vakaata.", minEra: 2, reqEdu: 0.6, reqAdmin: 0.6, researchMod: 1.15, cohesionMod: 1.1, adminEff: 0.85, unrest: 0.015 },
  { key: "teokratia", name: "Teokratia", icon: "☦️", axis: "Uskonnollinen", desc: "Papisto ja uskonnolliset lait ohjaavat yhteiskuntaa.", minEra: 0, reqCohesion: 0.8, researchMod: 0.9, cohesionMod: 1.3, adminEff: 1.05, unrest: 0.02 },
];
const govByKey = (key) => GOVERNMENTS.find((g) => g.key === key) ?? GOVERNMENTS[0];
function govUnlocked(g, eraIdx, derived) {
  if (eraIdx < g.minEra) return false;
  if (g.reqEdu && derived.eduCov < g.reqEdu) return false;
  if (g.reqAdmin && derived.adminCov < g.reqAdmin) return false;
  if (g.reqCohesion && derived.cohesion < g.reqCohesion) return false;
  return true;
}
function govRequirementText(g) {
  const reqs = [];
  if (g.minEra > 0) reqs.push(`aikakausi ≥ ${ERAS[g.minEra].name}`);
  if (g.reqEdu) reqs.push(`koulutuskattavuus ≥ ${Math.round(g.reqEdu * 100)} %`);
  if (g.reqAdmin) reqs.push(`hallintokattavuus ≥ ${Math.round(g.reqAdmin * 100)} %`);
  if (g.reqCohesion) reqs.push(`yhteisöllisyys ≥ ${Math.round(g.reqCohesion * 100)} %`);
  return reqs.length ? reqs.join(" · ") : "Avoinna alusta asti";
}

// ============ YHTEISKUNTAMITTARIT ============
// Oikeita yhteiskuntatieteen mittareita mukailevat, pelin sisäisistä luvuista lasketut tunnusluvut.
// Avautuvat aikakausittain samassa historiallisessa järjestyksessä kuin oikeat mittausmenetelmät syntyivät.
// scoreFn muuntaa mittarin arvon pisteiksi (integroituu Sivilisaatioindeksiin), infoTitle/infoText opettavat
// miten VASTAAVA mittari lasketaan oikeasti — pelin luku on aina yksinkertaistettu simulaatio siitä.
const METRICS = [
  { key: "lifeExpectancy", name: "Elinajanodote", icon: "🫀", unlockEra: 0, unit: " v", decimals: 0,
    infoTitle: "Elinajanodote", infoText: "Oikeasti elinajanodote lasketaan ikäryhmittäisistä kuolleisuusluvuista niin sanotulla elinpöytämenetelmällä (life table) — se ei ole keskimääräinen kuolinikä vaan tilastollinen ennuste sille, kuinka pitkään vastasyntynyt eläisi nykyisillä kuolleisuusluvuilla. Pelissä arvo johdetaan terveys- ja hoivakattavuudesta sekä aikakauden perustasosta.",
    scoreMax: 80, scoreFn: (v) => Math.round(Math.min(1, v / 80) * 80) },
  { key: "employmentRate", name: "Työllisyysaste", icon: "💼", unlockEra: 1, unit: " %", decimals: 0,
    infoTitle: "Työllisyysaste", infoText: "Oikeasti työllisyysaste on työllisten osuus työikäisestä väestöstä (esim. Tilastokeskus laskee sen 15–64-vuotiaista). Käsite syntyi vasta palkkatyön ja teollistumisen myötä 1800-luvulla — sitä ennen 'työttömyys' ei ollut mielekäs tilastoluku. Pelissä arvo heijastaa hallinnon toimivuutta ja osaamistason riittävyyttä.",
    scoreMax: 60, scoreFn: (v) => Math.round(v * 0.6) },
  { key: "pollution", name: "Saasteet", icon: "🏭", unlockEra: 1, unit: " idx", decimals: 0,
    infoTitle: "Saasteindeksi", infoText: "Oikeasti ilmansaasteita mitataan mm. hiukkaspitoisuuksina (PM2.5), hiilidioksidipäästöinä per capita ja ilmanlaatuindekseillä. Teollistuminen 1800-luvulla toi ensimmäiset merkittävät päästöt, ja ympäristötietoisuus alkoi vasta 1900-luvun jälkipuoliskolla. Pelissä arvo nousee teollisuuteen panostettaessa ja laskee tutkimuksen (puhtaamman teknologian) myötä. Matalampi on parempi.",
    scoreMax: 50, scoreFn: (v) => Math.round((100 - Math.min(100, v)) * 0.5) },
  { key: "gdpPerCapita", name: "BKT / asukas", icon: "💰", unlockEra: 2, unit: " yks./hlö", decimals: 0,
    infoTitle: "Bruttokansantuote per asukas", infoText: "Oikeasti BKT lasketaan kolmella tavalla, jotka teoriassa täsmäävät: tuotantoperusteisesti (arvonlisä), tuloperusteisesti (palkat + voitot) tai menoperusteisesti (kulutus + investoinnit + vienti − tuonti). Kansantalouden tilinpito virallistui vasta 1930–40-luvuilla (Simon Kuznets, Nobel 1971). Pelissä luku on abstrakti tuotannon ja teknologian yhdistelmä, ei oikea valuutta.",
    scoreMax: 200, scoreFn: (v) => Math.round(Math.min(200, v)) },
  { key: "crimeRate", name: "Rikollisuus", icon: "🚨", unlockEra: 2, unit: " /100 000", decimals: 0,
    infoTitle: "Rikollisuusaste", infoText: "Oikeasti rikollisuutta mitataan ilmoitettujen rikosten määränä 100 000 asukasta kohden, mutta tilasto kärsii ilmoituskynnyksen vaihtelusta eri aikoina ja paikoissa. Systemaattinen rikostilastointi ja kriminologia tieteenalana syntyivät 1800-luvun kaupungistumisen myötä. Pelissä arvo nousee heikon hallinnon ja yhteisöllisyyden myötä. Matalampi on parempi.",
    scoreMax: 50, scoreFn: (v) => Math.round((100 - Math.min(100, v)) * 0.5) },
  { key: "happiness", name: "Onnellisuusindeksi", icon: "😊", unlockEra: 3, unit: " /10", decimals: 1,
    infoTitle: "Onnellisuusindeksi", infoText: "Oikeasti esim. YK:n World Happiness Report perustuu kyselyihin, joissa ihmiset arvioivat oman elämänsä asteikolla 0–10, yhdistettynä selittäviin tekijöihin kuten BKT, sosiaalinen tuki ja terveys. Raportti julkaistiin ensi kertaa 2012. Pelissä indeksi yhdistää terveyden, yhteisöllisyyden, moraalin, vaurauden ja rikollisuuden yhdeksi 0–10-luvuksi.",
    scoreMax: 200, scoreFn: (v) => Math.round(v * 20) },
];

// ============ SEKTORIEN ERIKOISTUMISET ============
// Maatalous ja opetus toteutetaan valintavaihtoehtoina (yksi suuntaus kerrallaan, ei liukuvana osuutena),
// koska ne kuvaavat laadullisesti erilaisia strategioita, ei saman asian eri määrää.
const FARM_MODES = [
  { key: "pientila", name: "Pienviljely", icon: "🌾", minEra: 0, desc: "Perinteinen, tasainen mutta vaatimaton tuotto.", mods: { feedsMult: 1, resilienceMult: 1, pollutionMult: 0.7, gdpMult: 1 } },
  { key: "suurtila", name: "Suurtilat", icon: "🚜", minEra: 2, desc: "Koneellistetut suurtilat: enemmän satoa per viljelijä, mutta herkempi häiriöille ja kuormittaa ympäristöä enemmän.", mods: { feedsMult: 1.25, resilienceMult: 1.15, pollutionMult: 1.4, gdpMult: 1.15 } },
  { key: "bio", name: "Bioviljely", icon: "🌱", minEra: 3, desc: "Luomumenetelmät: pienempi sato, mutta parempi kestävyys ja puhtaampi ympäristö.", mods: { feedsMult: 0.85, resilienceMult: 0.8, pollutionMult: 0.3, gdpMult: 0.95 } },
  { key: "erikois", name: "Erikoistuotteet", icon: "🍇", minEra: 2, desc: "Kalliit erikoistuotteet (viinit, mausteet, luksustuotteet): vähemmän perusruokaa, mutta enemmän vaurautta.", mods: { feedsMult: 0.9, resilienceMult: 1.05, pollutionMult: 1.0, gdpMult: 1.35 } },
];
const farmModeByKey = (key) => FARM_MODES.find((f) => f.key === key) ?? FARM_MODES[0];

const EDU_MODES = [
  { key: "perus", name: "Peruskoulutus", icon: "📗", minEra: 0, desc: "Laaja-alainen perusopetus kaikille — tasainen, vakaa koulutuskattavuus.", mods: { eduCovMult: 1, researchMult: 1, industryEffMult: 1 } },
  { key: "ammatillinen", name: "Ammatillinen koulutus", icon: "🔧", minEra: 1, desc: "Käytännön ammattitaitoa — parantaa tuotannon tehokkuutta, mutta ei nosta tutkimusta yhtä paljon.", mods: { eduCovMult: 0.95, researchMult: 0.9, industryEffMult: 1.2 } },
  { key: "korkeakoulu", name: "Korkeakoulutus", icon: "🎓", minEra: 2, desc: "Yliopistot ja tutkimuslaitokset — nostaa tutkimusta merkittävästi, mutta tavoittaa pienemmän osan väestöstä.", mods: { eduCovMult: 0.85, researchMult: 1.3, industryEffMult: 0.95 } },
];
const eduModeByKey = (key) => EDU_MODES.find((e) => e.key === key) ?? EDU_MODES[0];

const MOD_LABELS = {
  farm: (v) => `Ruoantuotanto ${v > 1 ? "+" : ""}${Math.round((v - 1) * 100)} %`,
  research: (v) => `Tutkimus ${v > 1 ? "+" : ""}${Math.round((v - 1) * 100)} %`,
  birth: (v) => `Syntyvyys ${v > 1 ? "+" : ""}${Math.round((v - 1) * 100)} %`,
  health: (v) => `Terveys ${v > 0 ? "+" : ""}${Math.round(v * 100)} %-yks.`,
  resilience: (v) => (v < 1 ? `Katastrofit ${Math.round((1 - v) * 100)} % lievempiä` : `Katastrofit ${Math.round((v - 1) * 100)} % rajumpia`),
  minPop: (v) => `Aikakausien väestövaatimus ${Math.round((v - 1) * 100)} %`,
  store: (v) => `Varastokapasiteetti ${v > 1 ? "+" : ""}${Math.round((v - 1) * 100)} %`,
};

const SECTORS = [
  { key: "farm", name: "Maatalous", icon: "🌾" },
  { key: "health", name: "Terveys", icon: "⚕️" },
  { key: "edu", name: "Opetus", icon: "📚" },
  { key: "industry", name: "Teollisuus & rakentaminen", icon: "🔨" },
  { key: "research", name: "Tutkimus", icon: "🔬" },
  { key: "religion", name: "Uskonto & henkisyys", icon: "🙏" },
  { key: "arts", name: "Taide & kulttuuri", icon: "🎨" },
  { key: "admin", name: "Hallinto & oikeus", icon: "⚖️" },
  { key: "services", name: "Palvelut & hoiva", icon: "🛒" },
];

// ============ TIESITKÖ? — yhteiskuntaopin ja historian faktat ============
const FACTS = [
  "Ennen teollistumista 80–90 % maailman väestöstä työskenteli maataloudessa. Nykyään rikkaissa maissa osuus on alle 2 %.",
  "Englannissa vuonna 1381 noin 78 % aikuisista miehistä työskenteli maataloudessa. Vuonna 1911 osuus oli pudonnut 11 prosenttiin.",
  "Demografinen siirtymä tarkoittaa, että yhteiskunnan kehittyessä ensin kuolleisuus laskee ja vasta sitten syntyvyys — välivaiheessa väestö kasvaa nopeasti. Tämä tapahtui Suomessa 1800–1900-luvuilla.",
  "Esiteollisissa yhteiskunnissa jopa neljännes lapsista kuoli ensimmäisen elinvuotensa aikana ja lähes puolet ennen aikuisikää. Siksi syntyvyyskin oli korkea: 5–7 lasta naista kohden.",
  "Suomen nälkävuosina 1866–1868 kuoli arviolta 150 000–270 000 ihmistä eli noin 8–9 % väestöstä — yksi Euroopan viimeisistä suurista rauhanajan nälänhädistä.",
  "Historioitsija Arnold Toynbee luokitteli maailmanhistoriasta 21–28 sivilisaatiota. Oswald Spengler laski kahdeksan, Carroll Quigley 24 — määritelmästä ei ole yksimielisyyttä.",
  "Antropologi Robin Dunbarin mukaan ihminen kykenee ylläpitämään noin 150 merkityksellistä ihmissuhdetta. Suuremmat yhteisöt tarvitsevat yhteisiä tarinoita, uskontoja ja instituutioita pysyäkseen koossa.",
  "Huoltosuhde kertoo, montako lasta ja vanhusta on sataa työikäistä kohden. Suomessa se on yksi Euroopan heikoimmista väestön ikääntymisen vuoksi.",
  "Mustan surman (1347–1351) arvioidaan tappaneen 30–60 % Euroopan väestöstä. Työvoimapula nosti selviytyneiden palkkoja ja mursi feodaalijärjestelmää.",
  "Inkat varastoivat qollqa-varastoihinsa ruokaa jopa 3–7 vuoden tarpeisiin — valtiollinen varautuminen katovuosiin oli imperiumin selkäranka.",
  "Kirjapainotaidon leviäminen 1450-luvulta alkaen puolitti kirjojen hinnan ja moninkertaisti tiedon leviämisnopeuden — sitä pidetään yhtenä teollistumisen edellytyksistä.",
  "YK:n arvion mukaan maapallon väestö oli noin 8,2 miljardia vuonna 2025. Vielä vuonna 1800 meitä oli noin miljardi.",
  "Erikoistuminen vaatii väestöpohjan: nykyaikainen sairaala erikoisaloineen tarvitsee vähintään noin 100 000–200 000 asukkaan väestöpohjan toimiakseen tehokkaasti.",
  "Rooman valtakunnan akveduktit toivat kaupunkiin satoja tuhansia kuutiometrejä vettä päivässä — puhdas vesi oli antiikin tehokkain 'terveydenhuoltojärjestelmä'.",
];

const EVENTS = [
  { id: "kato", name: "Katovuosi", desc: "Halla vei sadon. Ruoantuotanto −40 % tällä vuorolla.", weight: 14, foodMod: 0.6 },
  { id: "hyvasato", name: "Hyvä satovuosi", desc: "Suotuisat säät. Ruoantuotanto +30 %.", weight: 14, foodMod: 1.3 },
  { id: "epidemia", name: "Epidemia", desc: "Kulkutauti leviää. Terveydenhuolto ratkaisee, moniko selviää.", weight: 12, epidemic: true },
  { id: "muutto", name: "Löytöretkeläisiä", desc: "Eristyksestä huolimatta pieni joukko liittyy yhteisöön (+3 % väestöä).", weight: 6, migration: 0.03 },
  { id: "rauha", name: "Rauhallinen kausi", desc: "Mitään erikoista ei tapahtunut. Elämä jatkuu.", weight: 24 },
  { id: "tulipalo", name: "Suurpalo", desc: "Varastot paloivat. Ruokavarasto puolittui.", weight: 8, storeMod: 0.5 },
  { id: "syntyvyys", name: "Vauvabuumi", desc: "Hyvät ajat näkyvät kehdoissa. Syntyvyys +30 % tällä vuorolla.", weight: 8, birthMod: 1.3 },
];

function pickEvent(extra) {
  const pool = extra && extra.length ? EVENTS.concat(extra) : EVENTS;
  const total = pool.reduce((s, e) => s + e.weight, 0);
  let r = Math.random() * total;
  for (const e of pool) { r -= e.weight; if (r <= 0) return e; }
  return pool[pool.length - 1];
}

const makeStart = (civ, villageName, startSkills) => ({
  civ,
  villageName: villageName || "",
  startSkills: startSkills || [],
  year: 0,
  children: 2200, workers: 6300, elderly: 1500,
  foodStore: Math.round(5000 * combinedMods(civ, null, startSkills).store),
  era: 0, research: 0,
  alloc: { farm: 72, health: 3, edu: 3, industry: 8, research: 2, religion: 2, arts: 1, admin: 4, services: 5 },
  gov: "heimo",
  specialistShare: 0,
  healthFocus: 50,
  appliedShare: 0,
  nation: null,
  inventionIdx: 0,
  farmMode: "pientila",
  eduMode: "perus",
  detectiveShare: 0,
  industryFocus: 0,
  log: civ ? [{ year: 0, text: `${civ.icon} ${civ.name} aloittaa: 10 000 ihmistä täydessä eristyksessä. ${civ.trait}: ${civ.desc}`, tone: "info" }] : [],
  milestones: civ ? [{ year: 0, text: `🏘️ ${villageName ? `Kylä "${villageName}"` : "Yhteisö"} perustettiin — ${civ.icon} ${civ.name}${startSkills && startSkills.length ? `. Aloitustaidot: ${startSkills.map((k) => startingSkillByKey(k)?.name).join(" ja ")}.` : "."}` }] : [],
  history: [{ year: 0, pop: 10000 }],
  stableTurns: 0,
  gameOver: null,
  lastEvent: null,
  report: null,
});

const fmt = (n) => Math.round(n).toLocaleString("fi-FI");

export default function Yhteiskunta() {
  const [s, setS] = useState(makeStart(null));
  // ---- Aloitusnäkymä: sivilisaation valinta -> kylän nimeäminen ja aloitustaitojen valinta ----
  const [pendingCiv, setPendingCiv] = useState(null);
  const [villageNameInput, setVillageNameInput] = useState("");
  const [chosenSkills, setChosenSkills] = useState([]);
  const toggleSkill = (key) => {
    setChosenSkills((prev) => {
      if (prev.includes(key)) return prev.filter((k) => k !== key);
      if (prev.length >= 2) return prev;
      return [...prev, key];
    });
  };
  function startGame() {
    if (!pendingCiv || chosenSkills.length !== 2) return;
    setS(makeStart(pendingCiv, villageNameInput.trim(), chosenSkills));
  }
  const pop = s.children + s.workers + s.elderly;
  const era = ERAS[s.era];
  const nextEra = ERAS[s.era + 1];
  const M = combinedMods(s.civ, s.nation, s.startSkills);
  const eraMinPop = Math.round(era.minPop * M.minPop);

  const alloc = s.alloc;

  // ---- Johdetut tunnusluvut ----
  const derived = useMemo(() => {
    const gov = govByKey(s.gov);
    const farmMode = farmModeByKey(s.farmMode);
    const eduMode = eduModeByKey(s.eduMode);
    const w = (k) => (s.workers * alloc[k]) / 100;
    const farmers = w("farm"), medics = w("health"), teachers = w("edu");
    const skillPenalty = pop < eraMinPop ? Math.max(0.5, pop / eraMinPop) : 1;

    // Terveydenhuollon erikoistuminen (avautuu Teollisesta aikakaudesta alkaen): osa terveystyöntekijöistä
    // voi erikoistua, mikä nostaa kattavuutta enemmän per henkilö kuin yleislääkäri.
    const specShare = s.era >= 2 ? s.specialistShare / 100 : 0;
    const generalists = medics * (1 - specShare);
    const specialists = medics * specShare;
    const healthCov = Math.min(1.15, Math.max(0, (generalists + specialists * 1.4) / Math.max(1, pop * 0.018) + M.health));

    // Opetuksen suuntaus (peruskoulutus/ammatillinen/korkeakoulu) muuttaa koulutuskattavuuden painotusta
    const eduCov = Math.min(1.1, (teachers / Math.max(1, s.children / 20)) * eduMode.mods.eduCovMult);

    // Vanhusten hoivapanos: agraarisessa yhteiskunnassa vanhukset eivät jää muodolliselle eläkkeelle
    // vaan hoitavat lapsia ja tekevät kevyempiä askareita — näkyy "näkymättömänä" lisänä hoivakattavuuteen.
    const elderlyCareBoost = (s.elderly * era.elderCare) / Math.max(1, pop * 0.03);

    const cohesion = Math.min(1.1, (w("religion") / Math.max(1, pop * 0.006)) * gov.cohesionMod);
    const morale = Math.min(1.1, w("arts") / Math.max(1, pop * 0.005));
    // Rikostutkijat (avautuu Teollisesta): osa hallinnosta erikoistuu rikostutkintaan — vähentää hieman
    // yleistä hallintokattavuutta, mutta laskee rikollisuutta suoraan (ks. Yhteiskuntamittarit).
    const detectiveFrac = s.era >= 2 ? s.detectiveShare / 100 : 0;
    const adminCov = Math.min(1.1, (w("admin") / Math.max(1, pop * 0.015)) * gov.adminEff * (1 - 0.15 * detectiveFrac));
    const careCov = Math.min(1.1, w("services") / Math.max(1, pop * 0.03) + elderlyCareBoost);
    // Tutkimuksen erikoistuminen (avautuu Varhaisteollisesta): soveltava tutkimus nostaa
    // tuotannon tehokkuutta heti, perustutkimus kasvattaa tutkimuspisteitä nopeammin pitkällä aikavälillä.
    const appliedFrac = s.era >= 1 ? s.appliedShare / 100 : 0;
    // Teollisuuden suuntaus (avautuu Varhaisteollisesta): erikoistunut teollisuus nostaa tehokkuutta ja
    // BKT:ta, mutta saastuttaa enemmän kuin perustuotanto.
    const industryFrac = s.era >= 1 ? s.industryFocus / 100 : 0;
    const efficiency = (0.85 + 0.15 * Math.min(1, adminCov)) * (0.92 + 0.08 * Math.min(1, morale)) * (1 + 0.12 * appliedFrac) * eduMode.mods.industryEffMult * (1 + 0.08 * industryFrac);
    const foodProd = farmers * era.feeds * skillPenalty * M.farm * efficiency * farmMode.mods.feedsMult;
    // Ehkäisevä vs sairaalapainotteinen terveydenhuolto (avautuu Varhaisteollisesta)
    const preventiveFrac = s.era >= 1 ? 1 - s.healthFocus / 100 : 0.5;

    // Keski-ikä (karkea arvio ikäryhmien oletetusta keski-iästä) ja huoltosuhde
    const avgAge = (s.children * 7 + s.workers * 37 + s.elderly * 74) / Math.max(1, pop);
    const depRatio = s.workers > 0 ? ((s.children + s.elderly) / s.workers) * 100 : 0;

    // ---- Yhteiskuntamittarit: oikeita indikaattoreita mukailevat luvut sisäisistä muuttujista ----
    const lifeBase = [32, 42, 58, 78][s.era];
    const lifeExpectancy = Math.max(20, Math.min(90, lifeBase + (healthCov - 0.7) * 35 + (careCov - 0.5) * 10));
    const employmentRate = Math.max(0, Math.min(100, Math.round(100 * (0.8 + 0.2 * Math.min(1, adminCov)) * skillPenalty)));
    const industryShare = alloc.industry / 100;
    const pollutionEraFactor = [0.2, 0.6, 1.0, 0.5][s.era];
    const techCleanup = nextEra ? Math.min(0.4, (s.research / nextEra.research) * 0.4) : 0.4;
    const pollution = Math.max(0, Math.round(industryShare * pollutionEraFactor * 100 * (1 - techCleanup) * farmMode.mods.pollutionMult * (1 + 0.3 * industryFrac)));
    const gdpPerCapita = Math.round(50 * efficiency * (1 + s.era * 1.5) * (1 + (nextEra ? (s.research / nextEra.research) * 0.5 : 0.5)) * farmMode.mods.gdpMult * (1 + 0.2 * industryFrac));
    const crimeRate = Math.max(0, Math.round((60 - adminCov * 35 - cohesion * 20 + (100 - employmentRate) * 0.3) * (1 - 0.35 * detectiveFrac)));
    const happiness = Math.max(0, Math.min(10, healthCov * 2.5 + Math.min(1, cohesion) * 2 + Math.min(1, morale) * 2 + Math.min(1, s.foodStore / (pop * 2)) * 1.5 + ((100 - Math.min(100, crimeRate)) / 100) * 2));

    return { farmers, medics, teachers, generalists, specialists, foodProd, foodNeed: pop, healthCov, eduCov, cohesion, morale, adminCov, careCov, efficiency, skillPenalty, elderlyCareBoost, avgAge, depRatio, gov, appliedFrac, preventiveFrac, lifeExpectancy, employmentRate, pollution, gdpPerCapita, crimeRate, happiness, farmMode, eduMode, detectiveFrac, industryFrac };
  }, [s, pop, era, alloc, M, eraMinPop, nextEra]);

  // ---- Sivilisaatioindeksi: yhteiskunnan kokonaispistemäärä ----
  const score = useMemo(() => {
    const d = derived;
    const parts = {
      "Väestö": Math.round(1200 * Math.log10(Math.max(100, pop) / 100)),
      "Teknologia": s.era * 1500 + (nextEra ? Math.min(500, Math.round((s.research / nextEra.research) * 500)) : 500),
      "Terveys & sivistys": Math.round(300 * Math.min(1, d.healthCov) + 300 * Math.min(1, d.eduCov)),
      "Henki & yhteisöllisyys": Math.round(250 * Math.min(1, d.cohesion) + 250 * Math.min(1, d.morale)),
      "Hallinto & hoiva": Math.round(200 * Math.min(1, d.adminCov) + 200 * Math.min(1, d.careCov)),
      "Vauraus": Math.min(200, Math.round((s.foodStore / Math.max(1, pop)) * 100)),
      "Yhteiskuntamittarit": METRICS.filter((m) => s.era >= m.unlockEra).reduce((sum, m) => sum + m.scoreFn(d[m.key]), 0),
      "Kestävyys": s.year,
    };
    return { parts, total: Object.values(parts).reduce((a, b) => a + b, 0) };
  }, [derived, pop, s, nextEra]);

  // ---- Yhteinen tulostaulu (jaettu tallennustila) ----
  const [board, setBoard] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [scoreSaved, setScoreSaved] = useState(false);

  // ---- Kertomus omassa ikkunassaan (modal), jotta pääruutu pysyy tiiviinä ----
  const [reportOpen, setReportOpen] = useState(false);
  useEffect(() => {
    if (s.report) setReportOpen(true);
  }, [s.report]);

  // ---- Väestön jakauma ja hallintomuoto omissa ikkunoissaan ----
  const [pyramidOpen, setPyramidOpen] = useState(false);
  const [govOpen, setGovOpen] = useState(false);

  // ---- Kansallisvaltiot: kuluttajan lisäostot (demo — paikallinen tallennus, ei oikeaa maksua) ----
  const [nationOpen, setNationOpen] = useState(false);
  const [metricsOpen, setMetricsOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [studentNotes, setStudentNotes] = useState("");
  const [copyDone, setCopyDone] = useState(false);
  // ---- Kokoontaitettavat osiot (mobiiliystävällisyys) ----
  const [allocOpen, setAllocOpen] = useState(true);
  const [profOpen, setProfOpen] = useState(false);
  const [infoModal, setInfoModal] = useState(null); // { title, text } tai null
  const [ownedNations, setOwnedNations] = useState([]);
  const [buyingNation, setBuyingNation] = useState(null);

  useEffect(() => {
    (async () => {
      if (!window.storage) return;
      try {
        const r = await window.storage.get("yhteiskunta-owned-nations", false);
        setOwnedNations(r ? JSON.parse(r.value) : []);
      } catch (e) { setOwnedNations([]); }
    })();
  }, []);

  async function buyNation(nation) {
    setBuyingNation(nation.key);
    // Demo-osto: ei oikeaa veloitusta. Oikeassa julkaisussa tähän kytkeytyisi App Store / Google Play / Stripe.
    await new Promise((r) => setTimeout(r, 400));
    const next = [...new Set([...ownedNations, nation.key])];
    setOwnedNations(next);
    try { if (window.storage) await window.storage.set("yhteiskunta-owned-nations", JSON.stringify(next), false); } catch (e) {}
    setBuyingNation(null);
  }

  function becomeNation(nation) {
    setS((p) => ({
      ...p, nation,
      log: [{ year: p.year, text: `${nation.icon} ${p.civ.name} jatkaa kansallisvaltiona: ${nation.name}. ${nation.trait}.`, tone: "good" }, ...p.log].slice(0, 40),
      milestones: [...p.milestones, { year: p.year, text: `🏳️ Yhteisö muodosti kansallisvaltion: ${nation.icon} ${nation.name}.` }],
    }));
    setNationOpen(false);
  }

  async function loadBoard() {
    try {
      const r = await window.storage.get("yhteiskunta-leaderboard-v1", true);
      return r ? JSON.parse(r.value) : [];
    } catch (e) { return []; }
  }

  useEffect(() => {
    if (s.gameOver && window.storage) loadBoard().then(setBoard);
  }, [s.gameOver]);

  async function submitScore() {
    if (!playerName.trim() || scoreSaved) return;
    try {
      const b = await loadBoard();
      b.push({ name: playerName.trim().slice(0, 20), civ: s.civ.name, icon: s.civ.icon, score: score.total, year: s.year, pop: Math.round(pop), win: !!s.gameOver?.win });
      b.sort((x, y) => y.score - x.score);
      await window.storage.set("yhteiskunta-leaderboard-v1", JSON.stringify(b.slice(0, 50)), true);
      setBoard(b.slice(0, 50));
      setScoreSaved(true);
    } catch (e) { console.error("Tulostaulun tallennus epäonnistui", e); }
  }

  // ---- Ammattitaulukko ----
  const professions = useMemo(() => {
    const w = (k) => Math.round((s.workers * alloc[k]) / 100);
    return [
      { name: "Viljelijät ja karjanhoitajat", n: w("farm"), note: `1 ruokkii ${Math.round(era.feeds * M.farm)}` },
      { name: "Lääkärit (~10 %) ja hoitajat", n: w("health"), note: "tavoite 1,8 % väestöstä" },
      { name: "Opettajat ja kasvattajat", n: w("edu"), note: "1 / 20 lasta" },
      { name: "Sepät, rakentajat, teollisuus", n: w("industry"), note: "työkalut & infra" },
      { name: "Tutkijat ja keksijät", n: w("research"), note: "vie aikakautta eteenpäin" },
      { name: "Papit ja hengelliset johtajat", n: w("religion"), note: "koheesio: tavoite 0,6 % väestöstä" },
      { name: "Taiteilijat, muusikot, tarinankertojat", n: w("arts"), note: "moraali: tavoite 0,5 % väestöstä" },
      { name: "Virkamiehet, tuomarit, järjestyksenvalvojat", n: w("admin"), note: "tehokkuus: tavoite 1,5 % väestöstä" },
      { name: "Kauppiaat, hoivaajat, kuljettajat", n: w("services"), note: "hoiva: tavoite 3 % väestöstä" },
    ];
  }, [s, alloc, era, M]);

  // ---- Allokaation säätö: lisäys otetaan suurimmasta sektorista, vähennys palautuu suurimpaan ----
  function setAlloc(key, val) {
    setS((p) => {
      val = Math.max(0, Math.min(100, val));
      let delta = val - p.alloc[key];
      if (delta === 0) return p;
      const next = { ...p.alloc, [key]: val };
      const others = SECTORS.map((x) => x.key).filter((k) => k !== key);
      // Lisäys: ota työvoima yksikkö kerrallaan siitä sektorista, jossa on eniten
      while (delta > 0) {
        const donor = others.reduce((a, b) => (next[a] >= next[b] ? a : b));
        if (next[donor] <= 0) { next[key] -= delta; break; }
        next[donor] -= 1;
        delta -= 1;
      }
      // Vähennys: vapautunut työvoima palaa suurimpaan sektoriin (yleensä pelloille)
      while (delta < 0) {
        const receiver = others.reduce((a, b) => (next[a] >= next[b] ? a : b));
        next[receiver] += 1;
        delta += 1;
      }
      return { ...p, alloc: next };
    });
  }

  // ---- Hallintomuodon vaihto ----
  function changeGov(key) {
    setS((p) => {
      if (p.gov === key) return p;
      const g = govByKey(key);
      return {
        ...p, gov: key,
        log: [{ year: p.year, text: `${g.icon} Hallintomuoto vaihtui: ${g.name}.`, tone: "info" }, ...p.log].slice(0, 40),
        milestones: [...p.milestones, { year: p.year, text: `${g.icon} Hallintomuoto vaihtui: ${g.name}.` }],
      };
    });
  }

  // ---- Erikoistumisosuuden säätö (terveydenhuolto, avautuu Teollisesta aikakaudesta) ----
  function setSpecialistShare(val) {
    setS((p) => ({ ...p, specialistShare: Math.max(0, Math.min(100, val)) }));
  }
  // ---- Ehkäisevä vs sairaalapainotteinen terveydenhuolto (avautuu Varhaisteollisesta) ----
  function setHealthFocus(val) {
    setS((p) => ({ ...p, healthFocus: Math.max(0, Math.min(100, val)) }));
  }
  // ---- Perustutkimus vs soveltava tutkimus (avautuu Varhaisteollisesta) ----
  function setAppliedShare(val) {
    setS((p) => ({ ...p, appliedShare: Math.max(0, Math.min(100, val)) }));
  }
  // ---- Maatalouden suuntaus (valinta, ei liukuva osuus) ----
  function setFarmMode(key) {
    setS((p) => {
      if (p.farmMode === key) return p;
      const m = farmModeByKey(key);
      return { ...p, farmMode: key, milestones: [...p.milestones, { year: p.year, text: `${m.icon} Maatalouden suuntaus vaihtui: ${m.name}.` }] };
    });
  }
  // ---- Opetuksen suuntaus (valinta, ei liukuva osuus) ----
  function setEduMode(key) {
    setS((p) => {
      if (p.eduMode === key) return p;
      const m = eduModeByKey(key);
      return { ...p, eduMode: key, milestones: [...p.milestones, { year: p.year, text: `${m.icon} Opetuksen suuntaus vaihtui: ${m.name}.` }] };
    });
  }
  // ---- Rikostutkijoiden osuus hallinnosta (avautuu Teollisesta) ----
  function setDetectiveShare(val) {
    setS((p) => ({ ...p, detectiveShare: Math.max(0, Math.min(100, val)) }));
  }
  // ---- Teollisuuden suuntaus: perustuotanto vs erikoistunut (avautuu Varhaisteollisesta) ----
  function setIndustryFocus(val) {
    setS((p) => ({ ...p, industryFocus: Math.max(0, Math.min(100, val)) }));
  }

  // ---- Vuoron simulointi (5 vuotta) ----
  function nextTurn() {
    setS((prev) => {
      if (prev.gameOver || !prev.civ) return prev;
      const C = combinedMods(prev.civ, prev.nation, prev.startSkills);
      const a = prev.alloc;
      const total = Object.values(a).reduce((x, y) => x + y, 0);
      const norm = {}; SECTORS.forEach(({ key }) => (norm[key] = a[key] / total));

      let { children, workers, elderly, foodStore, research, era: eraIdx, stableTurns, gov: govKey, specialistShare, healthFocus, appliedShare, inventionIdx, farmMode: farmModeKey, eduMode: eduModeKey, detectiveShare, industryFocus } = prev;
      let popNow = children + workers + elderly;
      const E = ERAS[eraIdx];
      const G = govByKey(govKey);
      const eMinPop = Math.round(E.minPop * C.minPop);
      const nationEvents = prev.nation?.events;
      const ev = pickEvent(nationEvents);
      const log = [];

      const skillPenalty = popNow < eMinPop ? Math.max(0.5, popNow / eMinPop) : 1;

      // Terveys, koulutus ja neljä yhteiskuntamittaria
      const farmMode = farmModeByKey(farmModeKey);
      const eduMode = eduModeByKey(eduModeKey);
      const medics = workers * norm.health;
      const specShare = eraIdx >= 2 ? specialistShare / 100 : 0;
      const generalists = medics * (1 - specShare);
      const specialists = medics * specShare;
      const healthCov = Math.min(1.15, Math.max(0, (generalists + specialists * 1.4) / Math.max(1, popNow * 0.018) + C.health));
      const teachers = workers * norm.edu;
      const eduCov = Math.min(1.1, (teachers / Math.max(1, children / 20)) * eduMode.mods.eduCovMult);
      const cohesion = Math.min(1.1, ((workers * norm.religion) / Math.max(1, popNow * 0.006)) * G.cohesionMod);
      const morale = Math.min(1.1, (workers * norm.arts) / Math.max(1, popNow * 0.005));
      const detectiveFrac = eraIdx >= 2 ? detectiveShare / 100 : 0;
      const adminCov = Math.min(1.1, ((workers * norm.admin) / Math.max(1, popNow * 0.015)) * G.adminEff * (1 - 0.15 * detectiveFrac));
      // Vanhusten hoivapanos: he eivät jää muodolliselle eläkkeelle vaan hoitavat lapsia ja tekevät kevyempiä askareita
      const elderlyCareBoost = (elderly * E.elderCare) / Math.max(1, popNow * 0.03);
      const careCov = Math.min(1.1, (workers * norm.services) / Math.max(1, popNow * 0.03) + elderlyCareBoost);
      // Hallinto ja moraali kertautuvat kaikkeen tuotantoon; soveltava tutkimus ja erikoistunut teollisuus nostavat tehokkuutta heti
      const appliedFrac = eraIdx >= 1 ? appliedShare / 100 : 0;
      const industryFrac = eraIdx >= 1 ? industryFocus / 100 : 0;
      const efficiency = (0.85 + 0.15 * Math.min(1, adminCov)) * (0.92 + 0.08 * Math.min(1, morale)) * (1 + 0.12 * appliedFrac) * eduMode.mods.industryEffMult * (1 + 0.08 * industryFrac);
      // Ehkäisevä vs sairaalapainotteinen terveydenhuolto: ehkäisevä suojaa lapsia paremmin, sairaalapainotteinen aikuisia/vanhuksia
      const preventiveFrac = eraIdx >= 1 ? 1 - healthFocus / 100 : 0.5;
      if (adminCov < 0.6) {
        foodStore *= 0.9;
        log.push({ text: "Hallinnon rapautuminen: kirjanpito pettää ja varastoista katoaa 10 %. Virkamiehiä ja tuomareita tarvittaisiin ~1,5 % väestöstä.", tone: "bad" });
      }

      // Ruoka (resilience lieventää katovuoden osumaa, tehokkuus kertautuu tuotantoon)
      let foodEvMod = ev.foodMod ?? 1;
      if (foodEvMod < 1) foodEvMod = 1 - (1 - foodEvMod) * C.resilience;
      const farmers = workers * norm.farm;
      let foodProd = farmers * E.feeds * skillPenalty * C.farm * efficiency * foodEvMod * farmMode.mods.feedsMult;
      if (ev.storeMod) foodStore *= 1 - (1 - ev.storeMod) * C.resilience;
      const foodNeed = popNow;
      let foodRatio = 1;
      const storeCap = popNow * 2 * C.store;
      if (foodProd >= foodNeed) {
        foodStore = Math.min(storeCap, foodStore + (foodProd - foodNeed) * 0.5);
      } else {
        const deficit = foodNeed - foodProd;
        const fromStore = Math.min(foodStore, deficit);
        foodStore -= fromStore;
        const stillMissing = deficit - fromStore;
        foodRatio = 1 - stillMissing / foodNeed;
      }

      // Kuolleisuus (5 v) — resilience lieventää nälän ja epidemian vaikutusta, hoiva suojaa lapsia ja vanhuksia.
      // Ehkäisevä painotus suojaa erityisesti lapsia ja epidemioita vastaan, sairaalapainotteinen aikuisia/vanhuksia.
      const famine = (foodRatio < 1 ? (1 - foodRatio) : 0) * C.resilience * farmMode.mods.resilienceMult;
      let childMort = E.childMort * (1.6 - 0.6 * healthCov) * (1.15 - 0.15 * Math.min(1, careCov)) * (1 - 0.15 * preventiveFrac) + famine * 0.5;
      let workerMort = 0.02 * (1.5 - 0.5 * healthCov) + famine * 0.3;
      let elderMort = 0.28 * (1.5 - 0.5 * healthCov) * (1.25 - 0.25 * Math.min(1, careCov)) * (1 - 0.15 * (1 - preventiveFrac)) + famine * 0.6;
      if (ev.epidemic) {
        const hit = 0.12 * (1.4 - healthCov) * C.resilience * (1 - 0.2 * preventiveFrac);
        childMort += hit; workerMort += hit * 0.6; elderMort += hit * 1.5;
        log.push({ text: healthCov > 0.9 ? "Epidemia torjuttiin — hoitajia oli riittävästi." : "Epidemia niitti satoa. Terveydenhuolto oli alimitoitettu.", tone: healthCov > 0.9 ? "good" : "bad" });
      }
      childMort = Math.min(0.9, childMort); workerMort = Math.min(0.9, workerMort); elderMort = Math.min(0.95, elderMort);

      const childDeaths = children * childMort;
      const workerDeaths = workers * workerMort;
      const elderDeaths = elderly * elderMort;

      // Syntyvyys — demografinen siirtymä: varhaiset yhteiskunnat synnyttävät paljon (koska moni kuolee),
      // modernit vähän. TFR5 = syntymiä per hedelmällisessä iässä oleva nainen / 5 vuotta.
      const TFR5 = [0.9, 0.8, 0.65, 0.5][eraIdx];
      const fertileWomen = workers * 0.5 * 0.6;
      const birthFactor = C.birth * (0.85 + 0.25 * Math.min(1, cohesion)) * Math.min(1.1, foodRatio * 0.7 + 0.3 + foodStore / (popNow * 6)) * (ev.birthMod ?? 1);
      const births = fertileWomen * TFR5 * birthFactor;

      // Hajaannus: ilman yhteisiä merkityksiä väkeä erkaantuu yhteisöstä
      let leaverCount = 0;
      if (cohesion < 0.5 && popNow > 500) {
        const leavers = 0.02 * (1 - cohesion);
        leaverCount = popNow * leavers;
        children *= 1 - leavers; workers *= 1 - leavers; elderly *= 1 - leavers;
        log.push({ text: `Hajaannusta: ilman yhteisiä rituaaleja ja uskoa ${fmt(leaverCount)} ihmistä vieraantui ja erkani yhteisöstä. Hengelliseen työhön tarvittaisiin ~0,6 % väestöstä.`, tone: "bad" });
      }

      // Levottomuudet: tyytymättömyys (matala yhteisöllisyys/moraali) yhdistettynä hallintomuodon
      // omaan levottomuusriskiin voi johtaa kapinaan — itsevaltaiset/uskonnolliset hallinnot kaatuvat helpommin.
      let unrestHappened = false;
      if (cohesion < 0.55 && morale < 0.55) {
        const unrestChance = Math.min(0.6, G.unrest * 4);
        if (Math.random() < unrestChance) {
          unrestHappened = true;
          const hit = 0.01 + 0.02 * (1 - cohesion);
          children *= 1 - hit; workers *= 1 - hit; elderly *= 1 - hit;
          if (G.axis === "Itsevaltainen" || G.axis === "Uskonnollinen") {
            govKey = "heimo";
            log.push({ text: `⚔️ Kapina! Tyytymättömyys kaatoi hallinnon — ${G.name.toLowerCase()} väistyi ja valta palasi heimoneuvostolle.`, tone: "bad" });
          } else {
            log.push({ text: "Levottomuuksia kaduilla: kansa on tyytymätön, mutta hallinto pysyy pystyssä.", tone: "bad" });
          }
        }
      }

      // Ikääntyminen
      const grownUp = children * 0.27;
      const retired = workers * 0.10;

      children = children - childDeaths - grownUp + births;
      workers = workers - workerDeaths - retired + grownUp;
      elderly = elderly - elderDeaths + retired;

      let migrantCount = 0;
      if (ev.migration) {
        migrantCount = popNow * ev.migration;
        children += migrantCount * 0.25; workers += migrantCount * 0.6; elderly += migrantCount * 0.15;
      }

      // Tutkimus — hallinto ja moraali vaikuttavat tähänkin. Soveltavaan tutkimukseen painottuminen
      // näkyy jo efficiency-kertoimessa (nopeampi tuotanto), mutta hidastaa puhtaan tutkimuspisteen kertymää.
      const researchers = workers * norm.research;
      const researchGained = researchers * 0.15 * (0.5 + eduCov) * efficiency * C.research * G.researchMod * eduMode.mods.researchMult * (1 - 0.4 * appliedFrac) * (1 + 0.15 * industryFrac) + (ev.bonusResearch ?? 0);
      research += researchGained;

      // Aikakausisiirtymä
      const eraBeforeAdvance = eraIdx;
      const N = ERAS[eraIdx + 1];
      const nMinPop = N ? Math.round(N.minPop * C.minPop) : 0;
      let eraAdvanced = false;
      if (N && research >= N.research && children + workers + elderly >= nMinPop * 0.6) {
        eraIdx++; eraAdvanced = true;
        log.push({ text: `⚙️ Uusi aikakausi: ${N.name}! ${N.desc}`, tone: "good" });
      } else if (N && research >= N.research) {
        log.push({ text: `Tieto ${N.name.toLowerCase()}een aikakauteen on olemassa, mutta väestöpohja (${fmt(nMinPop * 0.6)}) ei vielä riitä erikoistumiseen.`, tone: "info" });
      }

      // ===== KEKSINNÖT: tutkimuksen edistyessä paljastuu aikakaudelle ominaisia keksintöjä =====
      const invList = INVENTIONS_BY_ERA[eraBeforeAdvance] || [];
      let newInventionIdx = inventionIdx;
      let inventionReveal = null;
      if (invList.length) {
        if (N) {
          const milestone = Math.min(invList.length - 1, Math.floor((Math.max(0, research) / N.research) * invList.length));
          if (milestone > inventionIdx) { inventionReveal = invList[milestone]; newInventionIdx = milestone; }
        } else if (Math.random() < 0.35) {
          const idx = Math.floor(Math.random() * invList.length);
          inventionReveal = invList[idx];
        }
      }
      if (eraAdvanced) newInventionIdx = 0;

      const newPop = children + workers + elderly;
      const year = prev.year + 5;
      const totalDeaths = childDeaths + workerDeaths + elderDeaths;
      const educated = grownUp * Math.min(1, eduCov);

      // ===== VIISIVUOTISKERTOMUS: tarina siitä, mitä tapahtui =====
      const p = [];
      // Avaus tapahtuman mukaan
      const openers = {
        kato: `Vuodet ${prev.year}–${year} muistetaan hallaöistä. Pellot mustuivat, ja aikuiset söivät vähemmän, jotta lapsille riittäisi.`,
        hyvasato: `Vuodet ${prev.year}–${year} olivat armollisia: aurinko ja sade vuorottelivat kuin sopimuksesta, ja aitat täyttyivät.`,
        epidemia: `Vuosien ${prev.year}–${year} aikana kylästä kylään kulki tauti, ja sen mukana pelko.`,
        muutto: `Vuosina ${prev.year}–${year} horisontista saapui vaeltajia, jotka päättivät jäädä.`,
        rauha: `Vuodet ${prev.year}–${year} kuluivat arjen merkeissä: kylvettiin, korjattiin, synnyttiin ja haudattiin.`,
        tulipalo: `Vuosiin ${prev.year}–${year} jäi arpi: yönä, jota kukaan ei unohda, varastot roihusivat.`,
        syntyvyys: `Vuosina ${prev.year}–${year} tuntui, että joka talossa itki vastasyntynyt — hyvät ajat näkyivät kehdoissa.`,
      };
      p.push(openers[ev.id] ?? `Vuodet ${prev.year}–${year}.`);
      // Ruoka
      if (famine > 0.02) p.push(`Ruokaa riitti vain ${Math.round(foodRatio * 100)} %:lle väestä, ja nälkä vei heikoimmat.`);
      else if (foodProd > foodNeed * 1.3) p.push(`Sato oli runsas: ${fmt(farmers)} viljelijää tuotti reilusti yli tarpeen, ja ylijäämä kannettiin varastoihin.`);
      else p.push(`${fmt(farmers)} viljelijää piti yhteisön hengissä — niukasti mutta varmasti.`);
      // Väestö
      p.push(`Kehdoissa: ${fmt(births)} lasta syntyi. Haudoilla: ${fmt(totalDeaths)} saatettiin viimeiselle matkalle (${fmt(childDeaths)} lasta, ${fmt(workerDeaths)} työikäistä, ${fmt(elderDeaths)} vanhusta).`);
      const retirementPhrase = [
        `${fmt(retired)} vanhinta siirtyi kevyempiin askareisiin ja lastenlasten hoitoon — muodollista eläkettä ei tunnettu.`,
        `${fmt(retired)} vanhinta jäi perheen luo kevyempiin askareisiin; virallista eläkettä tuskin oli.`,
        `${fmt(retired)} raatajaa jäi eläkkeelle uuden eläkejärjestelmän turvin.`,
        `${fmt(retired)} työntekijää siirtyi eläkkeelle — moni jatkoi silti aktiivisena lastenhoitajana tai vapaaehtoisena.`,
      ][eraBeforeAdvance];
      p.push(`${fmt(grownUp)} nuorta varttui aikuisiksi ja astui työelämään — heistä ${fmt(educated)} kunnollisen koulutuksen saaneina${eduCov < 0.6 ? ", loput opettajapulan vuoksi vaille oppia" : ""}. ${retirementPhrase}`);
      if (leaverCount > 0) p.push(`Kaikki eivät jääneet: ${fmt(leaverCount)} vieraantunutta lähti etsimään merkitystä muualta.`);
      if (migrantCount > 0) p.push(`Yhteisö sai ${fmt(migrantCount)} uutta jäsentä, jotka toivat mukanaan tarinoita ulkomaailmasta.`);
      // Henki & tiede
      if (morale > 1 && cohesion > 1) p.push(`Iltaisin lauluja, pyhinä seremonioita — yhteisön henki oli vahva.`);
      else if (cohesion < 0.5) p.push(`Temppelit seisoivat tyhjinä ja juhlapäivät unohtuivat; jokin yhteisestä tarinasta oli katkeamassa.`);
      if (inventionReveal) {
        // Keksintö kudotaan osaksi samaa virkettä kuin tutkimustulos, ei erillisenä lisättynä huomiona.
        p.push(`Tutkijat kirjasivat ${fmt(researchGained)} yksikköä uutta tietoa, ja kaikkien puheenaiheena oli tuore keksintö — ${inventionReveal.name}: ${inventionReveal.desc}${eraAdvanced ? ` Se riitti viemään yhteisön uuteen aikakauteen: ${ERAS[eraIdx].name}!` : ""}`);
        log.push({ text: `🔧 Keksintö: ${inventionReveal.name} — ${inventionReveal.desc}`, tone: "good" });
      } else if (researchGained > 0) {
        p.push(`Tutkijat kirjasivat ${fmt(researchGained)} yksikköä uutta tietoa${eraAdvanced ? ` — ja se riitti: ${ERAS[eraIdx].name.toLowerCase()} aikakausi koitti!` : "."}`);
      }
      const voice = STORY_VOICE[eraBeforeAdvance] ?? STORY_VOICE[0];
      const story = voice.tag + p.join(" ");

      // ===== VUOSI VUODELTA: viiden vuoden päätapahtumat samaan kertomukseen =====
      // Yksi näistä (primaryOffset) on sama tapahtuma, joka oikeasti vaikutti tämän jakson laskelmiin (ev).
      // Muut neljä ovat kertomuksellista väriä sen rinnalle, ilman erillistä vaikutusta lukuihin.
      const primaryOffset = 1 + Math.floor(Math.random() * 5);
      const years = [];
      for (let yo = 1; yo <= 5; yo++) {
        const ye = yo === primaryOffset ? ev : pickEvent(nationEvents);
        years.push({ year: prev.year + yo, name: ye.name, desc: ye.desc, primary: yo === primaryOffset });
      }

      const report = {
        period: `${prev.year}–${year}`,
        story,
        years,
        eraIdx: eraBeforeAdvance,
        invention: inventionReveal,
        fact: FACTS[prev.history.length % FACTS.length],
        eventName: ev.name,
        rows: [
          ["Syntyneet", "+" + fmt(births)],
          ["Kuolleet", "−" + fmt(totalDeaths)],
          ["  joista lapsia", fmt(childDeaths)],
          ["  työikäisiä", fmt(workerDeaths)],
          ["  vanhuksia", fmt(elderDeaths)],
          ["Aikuistuneet", fmt(grownUp)],
          ["  joista koulutettuja", fmt(educated)],
          ["Eläköityneet", fmt(retired)],
          ...(leaverCount > 0 ? [["Poismuuttaneet", "−" + fmt(leaverCount)]] : []),
          ...(migrantCount > 0 ? [["Saapuneet", "+" + fmt(migrantCount)]] : []),
          ["Ruokaa tuotettu / tarve", `${fmt(foodProd)} / ${fmt(foodNeed)}`],
          ["Tutkimusta kertyi", "+" + fmt(researchGained)],
          ["Väestömuutos", (newPop >= popNow ? "+" : "") + fmt(newPop - popNow)],
        ],
      };

      log.unshift({ text: `${ev.name}: ${ev.desc}`, tone: ev.foodMod < 1 || ev.epidemic || ev.storeMod ? "bad" : ev.id === "rauha" ? "info" : "good" });
      if (famine > 0.02) log.push({ text: `Nälänhätä! Ruokaa riitti vain ${Math.round(foodRatio * 100)} %:lle. ${fmt(childDeaths + workerDeaths + elderDeaths)} kuoli tällä jaksolla.`, tone: "bad" });
      if (skillPenalty < 1) log.push({ text: `Osaamispula: ${E.name} aikakausi vaatisi ${fmt(eMinPop)} ihmistä. Tuottavuus vain ${Math.round(skillPenalty * 100)} %.`, tone: "bad" });

      let gameOver = null;
      if (newPop < 150) {
        gameOver = { win: false, text: `${prev.civ.name} romahti vuonna ${year}. Viimeiset ${fmt(newPop)} eivät riitä yhteiskunnan ylläpitoon.` };
      } else {
        if (eraIdx === 3 && newPop > prev.history[prev.history.length - 1].pop * 0.98) stableTurns++;
        else stableTurns = 0;
        if (stableTurns >= 3) gameOver = { win: true, text: `🏆 Vuonna ${year} ${prev.civ.name} on moderni, vakaa ja ${fmt(newPop)} ihmisen vahvuinen. Voitit!` };
      }

      const newMilestones = [];
      if (eraAdvanced) newMilestones.push({ year, text: `⚙️ Uusi aikakausi: ${N.name} (vuosi ${year}).` });
      if (inventionReveal) newMilestones.push({ year, text: `🔧 Keksintö: ${inventionReveal.name} — ${inventionReveal.desc}` });

      return {
        ...prev,
        year, children, workers, elderly, foodStore, research, era: eraIdx, stableTurns, gov: govKey, inventionIdx: newInventionIdx,
        lastEvent: ev, report,
        log: [...log.map((l) => ({ year, ...l })), ...prev.log].slice(0, 40),
        milestones: newMilestones.length ? [...prev.milestones, ...newMilestones] : prev.milestones,
        history: [...prev.history, { year, pop: Math.round(newPop) }],
        gameOver,
      };
    });
  }

  const foodBalance = derived.foodProd - derived.foodNeed;

  const Stat = ({ label, value, sub, warn }) => (
    <div style={{ padding: "6px 9px", background: "rgba(255,255,255,0.55)", border: "1px solid #d8c9a8", borderRadius: 6, minWidth: 0 }}>
      <div style={{ fontSize: 9.5, textTransform: "uppercase", letterSpacing: 1, color: "#7a6a4a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</div>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 15, fontWeight: 600, color: warn ? "#a02c2c" : "#2c2416", lineHeight: 1.2 }}>{value}</div>
      {sub && <div style={{ fontSize: 9.5, color: warn ? "#a02c2c" : "#8a7a5a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sub}</div>}
    </div>
  );

  // Pieni "ℹ️" -painike joka avaa selittävän tekstin omaan modaliin, jotta pääruutu pysyy siistinä
  const InfoButton = ({ title, text }) => (
    <button className="info-btn" onClick={() => setInfoModal({ title, text })} aria-label="Lisätietoa">ℹ️</button>
  );

  const Section = ({ title, open, onToggle, children, right }) => (
    <div className="paper">
      <div className="section-head" onClick={onToggle}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, margin: 0 }}>{title}</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {right}
          <span className="chevron" style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
        </div>
      </div>
      {open && <div style={{ marginTop: 10 }}>{children}</div>}
    </div>
  );

  // Pieni valintarivi laadullisille suuntauksille (maatalous, opetus) — ei liukuva osuus vaan valinta yhdestä vaihtoehdosta
  const ModeSelector = ({ modes, current, onSelect, eraIdx, disabled }) => (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {modes.map((m) => {
        const unlocked = eraIdx >= m.minEra;
        const active = current === m.key;
        return (
          <button
            key={m.key}
            disabled={!unlocked || disabled}
            onClick={() => onSelect(m.key)}
            title={m.desc}
            style={{
              font: "inherit", cursor: unlocked ? "pointer" : "not-allowed", fontSize: 11.5, padding: "5px 8px", borderRadius: 6,
              border: active ? "1.5px solid #8a4b2a" : "1px solid #cdbb95",
              background: active ? "rgba(138,75,42,0.14)" : "rgba(255,255,255,0.5)",
              opacity: unlocked ? 1 : 0.45,
            }}
          >
            {m.icon} {m.name}{!unlocked && " 🔒"}
          </button>
        );
      })}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#f2e8d0 0%,#e8dcc0 60%,#ddd0b0 100%)", fontFamily: "'Crimson Pro', Georgia, serif", color: "#2c2416", padding: 16 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Crimson+Pro:wght@400;600&family=IBM+Plex+Mono:wght@400;600&display=swap');
        input[type=range]{accent-color:#8a4b2a;width:100%}
        .btn{background:#2c2416;color:#f2e8d0;border:none;padding:14px 28px;font-family:'Playfair Display',serif;font-size:18px;font-weight:700;border-radius:4px;cursor:pointer;letter-spacing:0.5px;box-shadow:3px 3px 0 #8a4b2a;transition:transform .1s}
        .btn:hover{transform:translate(-1px,-1px);box-shadow:4px 4px 0 #8a4b2a}
        .btn:active{transform:translate(2px,2px);box-shadow:1px 1px 0 #8a4b2a}
        .btn:disabled{opacity:.4;cursor:not-allowed}
        .paper{background:rgba(252,246,232,0.8);border:1px solid #cdbb95;border-radius:8px;padding:16px;box-shadow:0 2px 8px rgba(60,45,20,0.12)}
        .civcard{background:rgba(252,246,232,0.92);border:1px solid #cdbb95;border-radius:8px;padding:12px;cursor:pointer;transition:all .15s;text-align:left}
        .civcard:hover{transform:translateY(-3px);box-shadow:0 6px 14px rgba(60,45,20,0.25);border-color:#8a4b2a}
        .step{min-width:46px;height:44px;border:1.5px solid #8a4b2a;background:#fcf6e8;color:#5a3a1a;font-family:'IBM Plex Mono',monospace;font-size:16px;font-weight:600;border-radius:9px;cursor:pointer;touch-action:manipulation;user-select:none;-webkit-tap-highlight-color:transparent;padding:0}
        .step:active:not(:disabled){background:#8a4b2a;color:#f2e8d0;transform:scale(0.95)}
        .step:disabled{opacity:.25;cursor:not-allowed}
        .section-head{display:flex;justify-content:space-between;align-items:center;cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent}
        .chevron{transition:transform .15s;font-size:13px;color:#8a4b2a}
        .info-btn{border:none;background:none;color:#8a4b2a;font-size:13px;cursor:pointer;padding:2px 4px;vertical-align:middle}
        .grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px;align-items:start}
        .grid-graphlog{display:grid;grid-template-columns:minmax(220px,1fr) 2fr;gap:14px;margin-top:10px}
        @media (max-width:680px){
          .grid2{grid-template-columns:1fr}
          .grid-graphlog{grid-template-columns:1fr}
          .score-badge{padding:5px 9px !important}
          .score-badge .score-val{font-size:16px !important}
        }
        @media (max-width:400px){
          .btn{padding:12px 18px;font-size:16px}
        }
        .rp-masthead{text-align:center;text-transform:uppercase;letter-spacing:4px;font-size:11px;font-weight:700;border-bottom:2px solid currentColor;border-top:2px solid currentColor;padding:4px 0;margin-bottom:10px}
        .rp-news .rp-story{column-count:1;text-align:justify;font-size:14.5px;line-height:1.55}
        @media (min-width:520px){ .rp-news .rp-story{column-count:2;column-gap:22px} }
        .rp-news h2{text-transform:uppercase;letter-spacing:1px;border-bottom:3px double currentColor;padding-bottom:6px}
        .rp-stat .rp-story{font-family:'IBM Plex Mono',monospace;font-size:13px;background:rgba(255,255,255,0.5);border:1px solid #cdd8d8;border-radius:4px;padding:10px;line-height:1.6}
        .rp-stat h2{font-family:'IBM Plex Mono',monospace;letter-spacing:0.5px}
        .rp-feed .rp-story{background:#fff;border-radius:14px;padding:12px 14px;font-size:14.5px;line-height:1.55;box-shadow:0 1px 4px rgba(30,60,100,0.12)}
        .rp-feed h2{font-family:system-ui,sans-serif}
      `}</style>

      {s.civ && (
        <div className="score-badge" style={{ position: "fixed", top: 10, right: 10, zIndex: 15, background: "#2c2416", color: "#f2e8d0", borderRadius: 8, padding: "8px 14px", boxShadow: "3px 3px 0 #8a4b2a", textAlign: "center", lineHeight: 1.1 }}>
          <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 1, color: "#c9b98a" }}>Pisteet</div>
          <div className="score-val" style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 20, fontWeight: 700 }}>{fmt(score.total)}</div>
        </div>
      )}

      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: 12, borderBottom: "3px double #8a7a5a", paddingBottom: 10 }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px,4vw,34px)", fontWeight: 900, margin: 0, letterSpacing: -0.5 }}>
            {s.civ && s.villageName ? s.villageName.toUpperCase() : "YHTEISKUNTA"}
          </h1>
          <div style={{ fontStyle: "italic", color: "#7a6a4a", marginTop: 2, fontSize: 14 }}>
            {s.civ ? <><b>{s.nation ? `${s.nation.icon} ${s.nation.name}` : `${s.civ.icon} ${s.civ.name}`}</b> — {s.nation ? s.nation.trait : s.civ.trait}{s.nation && <span style={{ color: "#9a8a6a" }}> (alkujaan {s.civ.icon} {s.civ.name})</span>}</> : "Society · 10 000 ihmistä. Ei tuontia. Ei vientiä. Kuinka pitkälle pääsette?"}
          </div>
        </header>

        {/* ===== SIVILISAATION VALINTA ===== */}
        {!s.civ && !pendingCiv && (
          <div>
            <p style={{ textAlign: "center", fontSize: 16, fontStyle: "italic", color: "#5a4a2a", maxWidth: 640, margin: "0 auto 16px" }}>
              Valitse sivilisaatiosi. Kullakin on historiaan perustuvat vahvuudet — ja heikkoudet.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(215px,1fr))", gap: 10 }}>
              {CIVS.map((c) => {
                const mods = Object.entries(c.mods);
                return (
                  <button key={c.key} className="civcard" onClick={() => setPendingCiv(c)}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 700 }}>{c.icon} {c.name}</div>
                    <div style={{ fontSize: 12, color: "#8a4b2a", fontWeight: 600, margin: "2px 0 4px" }}>{c.trait}</div>
                    <div style={{ fontSize: 12, color: "#6a5a3a", marginBottom: 6, fontStyle: "italic" }}>{c.desc}</div>
                    {mods.map(([k, v]) => (
                      <div key={k} style={{ fontSize: 11, fontFamily: "'IBM Plex Mono',monospace", color: (k === "resilience" || k === "minPop" ? v < 1 : k === "health" ? v > 0 : v > 1) ? "#3a6a3a" : "#a02c2c" }}>
                        {(k === "resilience" || k === "minPop" ? v < 1 : k === "health" ? v > 0 : v > 1) ? "▲" : "▼"} {MOD_LABELS[k](v)}
                      </div>
                    ))}
                  </button>
                );
              })}
            </div>
            <p style={{ textAlign: "center", fontSize: 12, color: "#8a7a5a", marginTop: 14, fontStyle: "italic" }}>
              20 sivilisaatiota Arnold Toynbeen klassisen luokittelun hengessä. Historioitsijat eivät ole yksimielisiä sivilisaatioiden määrästä: Spengler laski 8, Toynbee 21–28, Quigley 24.
            </p>
          </div>
        )}

        {/* ===== KYLÄN NIMEÄMINEN JA ALOITUSTAIDOT ===== */}
        {!s.civ && pendingCiv && (
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <button onClick={() => { setPendingCiv(null); setChosenSkills([]); }} style={{ background: "none", border: "none", color: "#8a4b2a", fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 12 }}>◂ Vaihda sivilisaatio</button>
            <div className="paper" style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{pendingCiv.icon} {pendingCiv.name} — nimeä kylläsi</div>
              <input
                value={villageNameInput}
                onChange={(e) => setVillageNameInput(e.target.value.slice(0, 30))}
                placeholder="Kylän nimi (valinnainen)"
                style={{ width: "100%", padding: "10px 12px", fontSize: 15, fontFamily: "'Crimson Pro',serif", border: "1.5px solid #8a4b2a", borderRadius: 8, background: "#fcf6e8", boxSizing: "border-box" }}
              />
              <p style={{ fontSize: 12, color: "#8a7a5a", margin: "6px 0 0", fontStyle: "italic" }}>Nimi näkyy tarinassa ja historianäkymässä — hyvä nimi tekee myöhemmästä esittelystä muille hauskemman.</p>
            </div>

            <div className="paper">
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Valitse kaksi aloitustaitoa</div>
              <p style={{ fontSize: 12.5, color: "#6a5a3a", margin: "0 0 10px" }}>Nämä ovat pieniä pysyviä bonuksia koko peliajaksi — valitse ne, jotka sopivat suunnittelemaasi strategiaan. ({chosenSkills.length}/2 valittu)</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 8 }}>
                {STARTING_SKILLS.map((sk) => {
                  const active = chosenSkills.includes(sk.key);
                  const disabled = !active && chosenSkills.length >= 2;
                  return (
                    <button
                      key={sk.key}
                      onClick={() => toggleSkill(sk.key)}
                      disabled={disabled}
                      className="civcard"
                      style={{ borderColor: active ? "#8a4b2a" : "#cdbb95", background: active ? "rgba(138,75,42,0.14)" : "rgba(252,246,232,0.92)", opacity: disabled ? 0.45 : 1, cursor: disabled ? "not-allowed" : "pointer" }}
                    >
                      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700 }}>{sk.icon} {sk.name}{active && " ✓"}</div>
                      <div style={{ fontSize: 11.5, color: "#6a5a3a", marginTop: 2 }}>{sk.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: 16 }}>
              <button className="btn" onClick={startGame} disabled={chosenSkills.length !== 2}>Perusta kylä ja aloita ▸</button>
            </div>
          </div>
        )}

        {/* ===== ITSE PELI ===== */}
        {s.civ && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(100px,1fr))", gap: 6, marginBottom: 10 }}>
              <Stat label="Vuosi" value={s.year} sub={era.name} />
              <Stat label="Väestö" value={fmt(pop)} sub={`👶${fmt(s.children)} 💪${fmt(s.workers)} 👴${fmt(s.elderly)}`} warn={pop < 2000} />
              <Stat label="Ruokatase" value={(foodBalance >= 0 ? "+" : "") + fmt(foodBalance)} sub={`Varasto ${fmt(s.foodStore)}`} warn={foodBalance < 0 && s.foodStore < pop * 0.5} />
              <Stat label="Terveys" value={Math.round(derived.healthCov * 100) + " %"} sub={`Koul. ${Math.round(derived.eduCov * 100)} % · Hoiva ${Math.round(derived.careCov * 100)} %`} warn={derived.healthCov < 0.7} />
              <Stat label="Yhteisö" value={Math.round(derived.cohesion * 100) + " %"} sub={`Moraali ${Math.round(derived.morale * 100)} %`} warn={derived.cohesion < 0.5 || derived.adminCov < 0.6} />
              <Stat label="Tutkimus" value={fmt(s.research)} sub={nextEra ? `→ ${nextEra.name}: ${fmt(nextEra.research)} p` : "Huippu saavutettu"} />
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
              <button onClick={() => setPyramidOpen(true)} className="paper" style={{ cursor: "pointer", font: "inherit", padding: "6px 12px", fontSize: 13, border: "1px solid #cdbb95" }}>
                👪 Keski-ikä {Math.round(derived.avgAge)} v · Väestön jakauma ▸
              </button>
              <button onClick={() => setGovOpen(true)} className="paper" style={{ cursor: "pointer", font: "inherit", padding: "6px 12px", fontSize: 13, border: "1px solid #cdbb95" }}>
                {govByKey(s.gov).icon} {govByKey(s.gov).name} · Hallintomuoto ▸
              </button>
              <button onClick={() => setMetricsOpen(true)} className="paper" style={{ cursor: "pointer", font: "inherit", padding: "6px 12px", fontSize: 13, border: "1px solid #cdbb95" }}>
                📈 Yhteiskuntamittarit ▸
              </button>
              <button onClick={() => setHistoryOpen(true)} className="paper" style={{ cursor: "pointer", font: "inherit", padding: "6px 12px", fontSize: 13, border: "1px solid #8a4b2a", background: "rgba(138,75,42,0.08)", fontWeight: 600 }}>
                📖 Historia ja esittely ▸
              </button>
              {s.nation ? (
                <div className="paper" style={{ padding: "6px 12px", fontSize: 13, border: "1px solid #cdbb95", background: "rgba(138,75,42,0.1)" }}>
                  {s.nation.icon} {s.nation.name} <span style={{ color: "#8a7a5a" }}>· kansallisvaltio</span>
                </div>
              ) : (
                s.era >= 2 && NATION_BRANCHES[s.civ.key] && (
                  <button onClick={() => setNationOpen(true)} className="paper" style={{ cursor: "pointer", font: "inherit", padding: "6px 12px", fontSize: 13, border: "1px solid #b08a5a", background: "rgba(138,75,42,0.06)" }}>
                    🏳️ Muodosta kansallisvaltio ▸
                  </button>
                )
              )}
            </div>

            {nationOpen && (
              <div style={{ position: "fixed", inset: 0, background: "rgba(30,22,10,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20, padding: 12 }} onClick={() => setNationOpen(false)}>
                <div className="paper" style={{ maxWidth: 620, width: "100%", maxHeight: "88vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, margin: "0 0 6px" }}>🏳️ Muodosta kansallisvaltio</h2>
                    <button onClick={() => setNationOpen(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#7a6a4a", lineHeight: 1 }}>✕</button>
                  </div>
                  <p style={{ fontSize: 13, color: "#6a5a3a", margin: "0 0 12px" }}>{s.civ.icon} {s.civ.name} voi jatkaa yhtenä historiallisista kansallisvaltioistaan. Kukin tuo oman tapahtumakirjonsa perussimulaation päälle. Peruspeli pysyy täysin pelattavana ilman näitä — tämä on valinnainen syvennys.</p>
                  {NATION_BRANCHES[s.civ.key].map((n) => {
                    const owned = ownedNations.includes(n.key);
                    return (
                      <div key={n.key} className="civcard" style={{ width: "100%", marginBottom: 8, display: "block" }}>
                        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700 }}>{n.icon} {n.name}</div>
                        <div style={{ fontSize: 11.5, color: "#8a4b2a", fontWeight: 600, margin: "2px 0 4px" }}>{n.trait}</div>
                        <div style={{ fontSize: 11.5, color: "#6a5a3a", marginBottom: 6 }}>{n.events.length} omaa historiallista tapahtumaa: {n.events.map((e) => e.name).join(" · ")}</div>
                        {owned ? (
                          <button className="btn" style={{ padding: "8px 16px", fontSize: 13, boxShadow: "2px 2px 0 #8a4b2a" }} onClick={() => becomeNation(n)}>Jatka {n.name}na ▸</button>
                        ) : (
                          <button className="btn" style={{ padding: "8px 16px", fontSize: 13, boxShadow: "2px 2px 0 #8a4b2a" }} disabled={buyingNation === n.key} onClick={() => buyNation(n)}>
                            {buyingNation === n.key ? "Käsitellään…" : `Osta ${n.price} (demo) 🔓`}
                          </button>
                        )}
                      </div>
                    );
                  })}
                  <div style={{ fontSize: 10.5, color: "#9a8a6a", fontStyle: "italic", marginTop: 6 }}>Demo-osto: tallentuu vain tähän selaimeen, ei oikeaa veloitusta. Oikeassa julkaisussa tämä kytkettäisiin sovelluskaupan maksuun.</div>
                </div>
              </div>
            )}

            {metricsOpen && (
              <div style={{ position: "fixed", inset: 0, background: "rgba(30,22,10,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20, padding: 12 }} onClick={() => setMetricsOpen(false)}>
                <div className="paper" style={{ maxWidth: 560, width: "100%", maxHeight: "88vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, margin: "0 0 6px" }}>📈 Yhteiskuntamittarit</h2>
                    <button onClick={() => setMetricsOpen(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#7a6a4a", lineHeight: 1 }}>✕</button>
                  </div>
                  <p style={{ fontSize: 13, color: "#6a5a3a", margin: "0 0 12px" }}>Mittarit mukailevat oikeita yhteiskuntatieteen tunnuslukuja ja avautuvat sitä mukaa kun vastaava mittausmenetelmä syntyi historiassa. Kunkin ℹ️ kertoo, miten oikea mittari lasketaan.</p>
                  {METRICS.map((m) => {
                    const unlocked = s.era >= m.unlockEra;
                    const val = unlocked ? derived[m.key] : null;
                    return (
                      <div key={m.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 4px", borderBottom: "1px dotted #e0d4b4" }}>
                        <div>
                          <span style={{ fontSize: 14 }}>{m.icon} {m.name}</span>
                          {unlocked && <InfoButton title={m.infoTitle} text={m.infoText} />}
                          {!unlocked && <div style={{ fontSize: 10.5, color: "#9a8a6a", fontStyle: "italic" }}>🔒 Avautuu aikakaudella: {ERAS[m.unlockEra].name}</div>}
                        </div>
                        {unlocked && (
                          <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600, fontSize: 15 }}>
                            {m.decimals ? val.toFixed(m.decimals) : Math.round(val)}{m.unit}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {historyOpen && (() => {
              const summaryText = [
                `YHTEISKUNTANI HISTORIA`,
                `${s.villageName ? `Kylä: ${s.villageName}` : "Nimeämätön yhteisö"} — ${s.civ.icon} ${s.civ.name}${s.nation ? ` → ${s.nation.icon} ${s.nation.name}` : ""}`,
                s.startSkills.length ? `Aloitustaidot: ${s.startSkills.map((k) => startingSkillByKey(k)?.name).join(", ")}` : "",
                `Vuosi ${s.year} · Aikakausi: ${era.name} · Väestö: ${fmt(pop)} · Hallintomuoto: ${govByKey(s.gov).name}`,
                ``,
                `AIKAJANA:`,
                ...s.milestones.map((m) => `v.${m.year} — ${m.text}`),
                ``,
                `SIVILISAATIOINDEKSI: ${fmt(score.total)}`,
                ...Object.entries(score.parts).map(([k, v]) => `  ${k}: ${fmt(v)}`),
                ``,
                studentNotes ? `OMAT HUOMIONI:\n${studentNotes}` : "",
              ].filter(Boolean).join("\n");

              const copySummary = () => {
                try {
                  navigator.clipboard.writeText(summaryText);
                  setCopyDone(true);
                  setTimeout(() => setCopyDone(false), 2000);
                } catch (e) {}
              };

              return (
              <div style={{ position: "fixed", inset: 0, background: "rgba(30,22,10,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20, padding: 12 }} onClick={() => setHistoryOpen(false)}>
                <div className="paper" style={{ maxWidth: 640, width: "100%", maxHeight: "90vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, margin: "0 0 6px" }}>📖 {s.villageName ? `${s.villageName}n historia` : "Yhteisöni historia"}</h2>
                    <button onClick={() => setHistoryOpen(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#7a6a4a", lineHeight: 1 }}>✕</button>
                  </div>
                  <p style={{ fontSize: 12.5, color: "#6a5a3a", margin: "0 0 12px" }}>Tämä näkymä kokoaa yhteisösi koko tarinan — hyvä pohja esitellä muille, mitä valintoja teit ja miksi.</p>

                  <div style={{ background: "rgba(138,75,42,0.06)", border: "1px solid #d8c9a8", borderRadius: 8, padding: "10px 12px", marginBottom: 12 }}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700 }}>{s.civ.icon} {s.civ.name}{s.nation && <> → {s.nation.icon} {s.nation.name}</>}</div>
                    {s.startSkills.length > 0 && (
                      <div style={{ fontSize: 12.5, color: "#6a5a3a", marginTop: 4 }}>
                        Aloitustaidot: {s.startSkills.map((k) => `${startingSkillByKey(k)?.icon} ${startingSkillByKey(k)?.name}`).join(" · ")}
                      </div>
                    )}
                    <div style={{ fontSize: 12.5, color: "#6a5a3a", marginTop: 4 }}>Nyt: vuosi {s.year} · {era.name} · {fmt(pop)} asukasta · {govByKey(s.gov).icon} {govByKey(s.gov).name}</div>
                  </div>

                  <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.2, color: "#7a6a4a", marginBottom: 6 }}>Aikajana — keskeiset käännekohdat</div>
                  <div style={{ maxHeight: 200, overflowY: "auto", marginBottom: 14 }}>
                    {s.milestones.map((m, i) => (
                      <div key={i} style={{ padding: "5px 8px", fontSize: 13, borderLeft: "3px solid #8a4b2a", marginBottom: 3, background: "rgba(255,255,255,0.4)" }}>
                        <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, color: "#8a7a5a", marginRight: 8 }}>v.{m.year}</span>{m.text}
                      </div>
                    ))}
                  </div>

                  <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.2, color: "#7a6a4a", marginBottom: 6 }}>Sivilisaatioindeksi nyt: {fmt(score.total)}</div>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginBottom: 14 }}>
                    <tbody>
                      {Object.entries(score.parts).map(([k, v]) => (
                        <tr key={k} style={{ borderBottom: "1px dotted #e0d4b4" }}>
                          <td style={{ padding: "3px 4px" }}>{k}</td>
                          <td style={{ textAlign: "right", fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>{fmt(v)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div style={{ background: "rgba(138,75,42,0.08)", border: "1px dashed #b08a5a", borderRadius: 6, padding: "10px 12px", marginBottom: 14, fontSize: 13 }}>
                    <b>💡 Pohdittavaksi esittelyä varten:</b>
                    <ul style={{ margin: "6px 0 0", paddingLeft: 18 }}>
                      <li>Mikä valinta (hallintomuoto, erikoistuminen, tuotantosuunta) vaikutti eniten yhteiskuntasi kehitykseen?</li>
                      <li>Mikä historiallinen tapahtuma yllätti sinut eniten? Miten reagoit siihen?</li>
                      <li>Jos aloittaisit uudelleen, minkä valinnan tekisit toisin — ja miksi?</li>
                      <li>Mitä yhtäläisyyksiä näet oman yhteiskuntasi ja oikean historian välillä?</li>
                    </ul>
                  </div>

                  <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.2, color: "#7a6a4a", marginBottom: 6 }}>Omat huomiosi (näkyy vain sinulle, tällä laitteella)</div>
                  <textarea
                    value={studentNotes}
                    onChange={(e) => setStudentNotes(e.target.value.slice(0, 2000))}
                    placeholder="Kirjoita tähän ajatuksiasi esittelyä varten..."
                    rows={4}
                    style={{ width: "100%", padding: "8px 10px", fontSize: 13.5, fontFamily: "'Crimson Pro',serif", border: "1.5px solid #cdbb95", borderRadius: 8, background: "#fcf6e8", boxSizing: "border-box", marginBottom: 12 }}
                  />

                  <div style={{ textAlign: "center", display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn" style={{ padding: "10px 18px", fontSize: 14 }} onClick={copySummary}>{copyDone ? "✓ Kopioitu!" : "📋 Kopioi teksti esitystä varten"}</button>
                    <button className="btn" style={{ padding: "10px 18px", fontSize: 14 }} onClick={() => setHistoryOpen(false)}>Sulje ✕</button>
                  </div>
                </div>
              </div>
              ); })()}

            {pyramidOpen && (
              <div style={{ position: "fixed", inset: 0, background: "rgba(30,22,10,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20, padding: 12 }} onClick={() => setPyramidOpen(false)}>
                <div className="paper" style={{ maxWidth: 560, width: "100%", maxHeight: "88vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, margin: "0 0 10px" }}>👪 Väestön jakauma</h2>
                    <button onClick={() => setPyramidOpen(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#7a6a4a", lineHeight: 1 }}>✕</button>
                  </div>
                  <div style={{ display: "flex", gap: 16, marginBottom: 14, flexWrap: "wrap" }}>
                    <div><div style={{ fontSize: 11, color: "#7a6a4a", textTransform: "uppercase" }}>Keski-ikä</div><div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 22, fontWeight: 700 }}>{Math.round(derived.avgAge)} v</div></div>
                    <div><div style={{ fontSize: 11, color: "#7a6a4a", textTransform: "uppercase" }}>Huoltosuhde</div><div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 22, fontWeight: 700 }}>{Math.round(derived.depRatio)}</div><div style={{ fontSize: 10.5, color: "#8a7a5a" }}>lasta+vanhusta / 100 työikäistä</div></div>
                  </div>
                  {[
                    { label: "👶 Lapset", n: s.children, color: "#8a4b2a", role: era.roles.children },
                    { label: "💪 Työikäiset", n: s.workers, color: "#5c4a7a", role: era.roles.youth },
                    { label: "👴 Vanhukset", n: s.elderly, color: "#2a6a5c", role: era.roles.elderly },
                  ].map((g) => (
                    <div key={g.label} style={{ marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 4 }}>
                        <span>{g.label}</span>
                        <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>{fmt(g.n)} · {Math.round((g.n / pop) * 100)} %</span>
                      </div>
                      <div style={{ height: 14, background: "#e6d9b8", borderRadius: 7, overflow: "hidden", border: "1px solid #cdbb95", marginBottom: 5 }}>
                        <div style={{ width: `${(g.n / pop) * 100}%`, height: "100%", background: g.color }} />
                      </div>
                      <div style={{ fontSize: 12, color: "#6a5a3a", fontStyle: "italic" }}>{era.name}: {g.role}</div>
                    </div>
                  ))}
                  <div style={{ textAlign: "center", marginTop: 6 }}>
                    <button className="btn" style={{ padding: "10px 20px", fontSize: 15 }} onClick={() => setPyramidOpen(false)}>Sulje ✕</button>
                  </div>
                </div>
              </div>
            )}

            {govOpen && (
              <div style={{ position: "fixed", inset: 0, background: "rgba(30,22,10,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20, padding: 12 }} onClick={() => setGovOpen(false)}>
                <div className="paper" style={{ maxWidth: 620, width: "100%", maxHeight: "88vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, margin: "0 0 10px" }}>🏛️ Hallintomuoto</h2>
                    <button onClick={() => setGovOpen(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#7a6a4a", lineHeight: 1 }}>✕</button>
                  </div>
                  <p style={{ fontSize: 13, color: "#6a5a3a", margin: "0 0 12px" }}>Itsevaltaisilta hallinnoilta puuttuu legitimiteetti — ne tuottavat tehokkaasti mutta kaatuvat herkästi, jos kansa on tyytymätön. Demokratia ja tasavalta ovat hitaampia mutta vakaampia. Teokratia on oma haaransa: vahva yhteisöllisyys, hitaampi tiede.</p>
                  {GOVERNMENTS.map((g) => {
                    const unlocked = govUnlocked(g, s.era, derived);
                    const active = s.gov === g.key;
                    return (
                      <button
                        key={g.key}
                        disabled={!unlocked}
                        onClick={() => { changeGov(g.key); setGovOpen(false); }}
                        className="civcard"
                        style={{ width: "100%", marginBottom: 8, opacity: unlocked ? 1 : 0.45, cursor: unlocked ? "pointer" : "not-allowed", borderColor: active ? "#8a4b2a" : "#cdbb95", background: active ? "rgba(138,75,42,0.1)" : "rgba(252,246,232,0.92)" }}
                      >
                        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700 }}>{g.icon} {g.name} {active && "· nykyinen"}</div>
                        <div style={{ fontSize: 11.5, color: "#8a4b2a", fontWeight: 600, margin: "2px 0 4px" }}>{g.axis}</div>
                        <div style={{ fontSize: 12, color: "#6a5a3a", marginBottom: 4, fontStyle: "italic" }}>{g.desc}</div>
                        <div style={{ fontSize: 11, fontFamily: "'IBM Plex Mono',monospace", color: "#6a5a3a" }}>
                          Tutkimus ×{g.researchMod} · Yhteisöllisyys ×{g.cohesionMod} · Hallintoteho ×{g.adminEff} · Levottomuusriski {Math.round(g.unrest * 100)} %
                        </div>
                        {!unlocked && <div style={{ fontSize: 11, color: "#a02c2c", marginTop: 4 }}>🔒 {govRequirementText(g)}</div>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {derived.skillPenalty < 1 && (
              <div style={{ background: "#f4d9c0", border: "1px solid #c08a5a", borderRadius: 6, padding: "8px 14px", marginBottom: 12, fontSize: 14 }}>
                ⚠️ <b>Osaamispula:</b> {era.name} aikakausi vaatisi vähintään {fmt(eraMinPop)} ihmistä täyteen erikoistumiseen. Tuottavuus nyt {Math.round(derived.skillPenalty * 100)} %.
              </div>
            )}

            {s.report && (
              <button
                onClick={() => setReportOpen(true)}
                style={{ display: "block", width: "100%", textAlign: "left", cursor: "pointer", marginBottom: 10, borderLeft: `5px solid ${era.color}`, background: "rgba(252,246,232,0.8)", border: "1px solid #cdbb95", borderRadius: 8, padding: "8px 12px", font: "inherit" }}
              >
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700 }}>📜 Kertomus vuosilta {s.report.period}</span>
                <span style={{ fontSize: 12, color: "#7a6a4a", marginLeft: 8 }}>— {s.report.eventName} · lue tarina ▸</span>
              </button>
            )}

            {reportOpen && s.report && (() => {
              const rs = REPORT_STYLES[s.report.eraIdx] ?? REPORT_STYLES[0];
              return (
              <div style={{ position: "fixed", inset: 0, background: "rgba(30,22,10,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20, padding: 12 }} onClick={() => setReportOpen(false)}>
                <div className={`paper ${rs.cls}`} style={{ maxWidth: 640, width: "100%", maxHeight: "88vh", overflowY: "auto", borderLeft: `5px solid ${rs.accent}`, background: rs.bg, fontFamily: rs.bodyFont }} onClick={(e) => e.stopPropagation()}>
                  {rs.masthead && <div className="rp-masthead" style={{ color: rs.accent }}>{rs.masthead} · {ERAS[s.report.eraIdx].name}</div>}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h2 style={{ fontFamily: rs.headFont, fontSize: 20, margin: "0 0 10px", color: rs.accent }}>📜 Kertomus vuosilta {s.report.period}</h2>
                    <button onClick={() => setReportOpen(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#7a6a4a", lineHeight: 1 }}>✕</button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16, alignItems: "start" }}>
                    <div>
                      <p className="rp-story" style={{ fontSize: 15, lineHeight: 1.6, margin: "0 0 10px", fontStyle: rs.cls === "rp-folk" ? "italic" : "normal" }}>{s.report.story}</p>
                      <div style={{ background: "rgba(138,75,42,0.08)", border: "1px dashed #b08a5a", borderRadius: 6, padding: "8px 12px", fontSize: 13 }}>
                        💡 <b>Tiesitkö?</b> {s.report.fact}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.2, color: "#7a6a4a", marginBottom: 6 }}>Vuosi vuodelta</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        {s.report.years.map((y) => (
                          <div key={y.year} style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "5px 8px", borderRadius: 6, background: y.primary ? "rgba(138,75,42,0.14)" : "rgba(255,255,255,0.4)", border: y.primary ? "1px solid #b08a5a" : "1px solid transparent" }}>
                            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: "#8a7a5a", minWidth: 32, flexShrink: 0 }}>{y.year}</span>
                            <span style={{ fontSize: 12.5, lineHeight: 1.35 }}>
                              <b>{y.name}</b>{y.primary && " ★"}
                              <span style={{ display: "block", color: "#7a6a4a", fontSize: 11.5 }}>{y.desc}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                      <div style={{ fontSize: 10.5, color: "#9a8a6a", fontStyle: "italic", marginTop: 4 }}>★ = tapahtuma, joka todella vaikutti tämän jakson laskelmiin</div>
                    </div>
                  </div>
                  <details style={{ marginTop: 10 }}>
                    <summary style={{ cursor: "pointer", fontSize: 13, color: "#8a4b2a", fontWeight: 600 }}>Näytä luvut ▸</summary>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginTop: 8 }}>
                      <tbody>
                        {s.report.rows.map(([k, v]) => (
                          <tr key={k} style={{ borderBottom: "1px dotted #e0d4b4" }}>
                            <td style={{ padding: "3px 4px", color: k.startsWith("  ") ? "#8a7a5a" : "#3a2f1c", paddingLeft: k.startsWith("  ") ? 20 : 4 }}>{k.trim()}</td>
                            <td style={{ textAlign: "right", fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600, color: v.startsWith("−") ? "#a02c2c" : v.startsWith("+") ? "#3a6a3a" : "#3a2f1c" }}>{v}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </details>
                  <div style={{ textAlign: "center", marginTop: 14 }}>
                    <button className="btn" style={{ padding: "10px 20px", fontSize: 15 }} onClick={() => setReportOpen(false)}>Sulje ✕</button>
                  </div>
                </div>
              </div>
              ); })()}

            <div className="grid2">
              <Section title="Työvoiman jako" open={allocOpen} onToggle={() => setAllocOpen(!allocOpen)}>
                {SECTORS.map(({ key, name, icon }) => (
                  <div key={key} style={{ marginBottom: 13 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 14, marginBottom: 5 }}>
                      <span>{icon} {name}</span>
                      <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>{alloc[key]} % · {fmt((s.workers * alloc[key]) / 100)} hlö</span>
                    </div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <button className="step" onClick={() => setAlloc(key, alloc[key] - 5)} disabled={!!s.gameOver || alloc[key] <= 0}>−5</button>
                      <button className="step" onClick={() => setAlloc(key, alloc[key] - 1)} disabled={!!s.gameOver || alloc[key] <= 0}>−1</button>
                      <div style={{ flex: 1, height: 16, background: "#e6d9b8", borderRadius: 8, overflow: "hidden", border: "1px solid #cdbb95" }}>
                        <div style={{ width: `${alloc[key]}%`, height: "100%", background: "linear-gradient(90deg,#a05a30,#8a4b2a)", transition: "width .15s" }} />
                      </div>
                      <button className="step" onClick={() => setAlloc(key, alloc[key] + 1)} disabled={!!s.gameOver || alloc[key] >= 100}>+1</button>
                      <button className="step" onClick={() => setAlloc(key, alloc[key] + 5)} disabled={!!s.gameOver || alloc[key] >= 100}>+5</button>
                    </div>

                    {key === "farm" && (
                      <div style={{ marginTop: 6, paddingLeft: 4, borderLeft: "2px solid #d8c9a8" }}>
                        <div style={{ fontSize: 12, color: "#6a5a3a", marginBottom: 4 }}>
                          🚜 Maatalouden suuntaus <InfoButton title="Maatalouden suuntaus" text="Pienviljely on tasainen ja saatavilla heti. Suurtilat (Teollisesta) nostavat satoa mutta lisäävät saasteita ja herkkyyttä häiriöille. Bioviljely (Modernista) on kestävää ja puhdasta, mutta tuottaa vähemmän. Erikoistuotteet (Teollisesta) tuovat vaurautta ruokaturvan kustannuksella." />
                        </div>
                        <ModeSelector modes={FARM_MODES} current={s.farmMode} onSelect={setFarmMode} eraIdx={s.era} disabled={!!s.gameOver} />
                      </div>
                    )}

                    {key === "health" && (
                      <div style={{ marginTop: 6, paddingLeft: 4, borderLeft: "2px solid #d8c9a8" }}>
                        {s.era >= 1 ? (
                          <>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6a5a3a", marginBottom: 4 }}>
                              <span>🏥 Ehkäisevä ↔ Sairaalapainotteinen</span>
                              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>{s.healthFocus}%</span>
                            </div>
                            <div style={{ display: "flex", gap: 5, alignItems: "center", marginBottom: 6 }}>
                              <button className="step" style={{ minWidth: 34, height: 32, fontSize: 13 }} onClick={() => setHealthFocus(s.healthFocus - 10)} disabled={!!s.gameOver || s.healthFocus <= 0}>−10</button>
                              <div style={{ flex: 1, height: 10, background: "#e6d9b8", borderRadius: 6, overflow: "hidden", border: "1px solid #cdbb95" }}>
                                <div style={{ width: `${s.healthFocus}%`, height: "100%", background: "linear-gradient(90deg,#3a6a3a,#5c4a7a)" }} />
                              </div>
                              <button className="step" style={{ minWidth: 34, height: 32, fontSize: 13 }} onClick={() => setHealthFocus(s.healthFocus + 10)} disabled={!!s.gameOver || s.healthFocus >= 100}>+10</button>
                              <InfoButton title="Ehkäisevä vs sairaalapainotteinen hoito" text="Ehkäisevä painotus (arvo lähellä 0 %) suojaa erityisesti lapsia ja hillitsee epidemioita. Sairaalapainotteinen hoito (arvo lähellä 100 %) pelastaa paremmin aikuisia ja vanhuksia akuuteissa tilanteissa. Kumpikaan ei ole ylivoimainen — valinta riippuu siitä, minkä ikäryhmän suojelu on juuri nyt tärkeintä." />
                            </div>
                            {s.era >= 2 ? (
                              <>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6a5a3a", marginBottom: 4 }}>
                                  <span>🩺 Erikoislääkärien osuus</span>
                                  <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>{s.specialistShare}%</span>
                                </div>
                                <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                                  <button className="step" style={{ minWidth: 34, height: 32, fontSize: 13 }} onClick={() => setSpecialistShare(s.specialistShare - 10)} disabled={!!s.gameOver || s.specialistShare <= 0}>−10</button>
                                  <div style={{ flex: 1, height: 10, background: "#e6d9b8", borderRadius: 6, overflow: "hidden", border: "1px solid #cdbb95" }}>
                                    <div style={{ width: `${s.specialistShare}%`, height: "100%", background: "linear-gradient(90deg,#5c4a7a,#2a6a5c)" }} />
                                  </div>
                                  <button className="step" style={{ minWidth: 34, height: 32, fontSize: 13 }} onClick={() => setSpecialistShare(s.specialistShare + 10)} disabled={!!s.gameOver || s.specialistShare >= 100}>+10</button>
                                  <InfoButton title="Erikoislääkärien osuus" text="Erikoislääkäri kattaa 1,4× yleislääkärin verran — vaativampi koulutuspolku, mutta parempi hoitotulos raskaammissa tapauksissa." />
                                </div>
                              </>
                            ) : (
                              <div style={{ fontSize: 10.5, color: "#9a8a6a", fontStyle: "italic" }}>🔒 Erikoislääkärit avautuvat Teollisesta aikakaudesta.</div>
                            )}
                          </>
                        ) : (
                          <div style={{ fontSize: 10.5, color: "#9a8a6a", fontStyle: "italic" }}>🔒 Terveydenhuollon säädöt avautuvat Varhaisteollisesta aikakaudesta.</div>
                        )}
                      </div>
                    )}

                    {key === "research" && (
                      <div style={{ marginTop: 6, paddingLeft: 4, borderLeft: "2px solid #d8c9a8" }}>
                        {s.era >= 1 ? (
                          <>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6a5a3a", marginBottom: 4 }}>
                              <span>🔬 Perustutkimus ↔ Soveltava tutkimus</span>
                              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>{s.appliedShare}%</span>
                            </div>
                            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                              <button className="step" style={{ minWidth: 34, height: 32, fontSize: 13 }} onClick={() => setAppliedShare(s.appliedShare - 10)} disabled={!!s.gameOver || s.appliedShare <= 0}>−10</button>
                              <div style={{ flex: 1, height: 10, background: "#e6d9b8", borderRadius: 6, overflow: "hidden", border: "1px solid #cdbb95" }}>
                                <div style={{ width: `${s.appliedShare}%`, height: "100%", background: "linear-gradient(90deg,#8a4b2a,#5c4a7a)" }} />
                              </div>
                              <button className="step" style={{ minWidth: 34, height: 32, fontSize: 13 }} onClick={() => setAppliedShare(s.appliedShare + 10)} disabled={!!s.gameOver || s.appliedShare >= 100}>+10</button>
                              <InfoButton title="Perustutkimus vs soveltava tutkimus" text="Soveltava tutkimus (arvo lähellä 100 %) nostaa tuotannon tehokkuutta heti, mutta hidastaa tutkimuspisteiden kertymistä jopa 40 %. Perustutkimus (arvo lähellä 0 %) on hitaampaa hyödyntää mutta vie aikakautta eteenpäin nopeimmin." />
                            </div>
                          </>
                        ) : (
                          <div style={{ fontSize: 10.5, color: "#9a8a6a", fontStyle: "italic" }}>🔒 Tutkimuksen suuntaaminen avautuu Varhaisteollisesta aikakaudesta.</div>
                        )}
                      </div>
                    )}

                    {key === "edu" && (
                      <div style={{ marginTop: 6, paddingLeft: 4, borderLeft: "2px solid #d8c9a8" }}>
                        <div style={{ fontSize: 12, color: "#6a5a3a", marginBottom: 4 }}>
                          🎒 Opetuksen suuntaus <InfoButton title="Opetuksen suuntaus" text="Peruskoulutus on tasainen ja avoinna heti. Ammatillinen koulutus (Varhaisteollisesta) nostaa tuotannon tehokkuutta. Korkeakoulutus (Teollisesta) nostaa tutkimusta merkittävästi, mutta tavoittaa harvemman." />
                        </div>
                        <ModeSelector modes={EDU_MODES} current={s.eduMode} onSelect={setEduMode} eraIdx={s.era} disabled={!!s.gameOver} />
                      </div>
                    )}

                    {key === "admin" && (
                      <div style={{ marginTop: 6, paddingLeft: 4, borderLeft: "2px solid #d8c9a8" }}>
                        {s.era >= 2 ? (
                          <>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6a5a3a", marginBottom: 4 }}>
                              <span>🕵️ Rikostutkijoiden osuus</span>
                              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>{s.detectiveShare}%</span>
                            </div>
                            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                              <button className="step" style={{ minWidth: 34, height: 32, fontSize: 13 }} onClick={() => setDetectiveShare(s.detectiveShare - 10)} disabled={!!s.gameOver || s.detectiveShare <= 0}>−10</button>
                              <div style={{ flex: 1, height: 10, background: "#e6d9b8", borderRadius: 6, overflow: "hidden", border: "1px solid #cdbb95" }}>
                                <div style={{ width: `${s.detectiveShare}%`, height: "100%", background: "linear-gradient(90deg,#5c4a7a,#a02c2c)" }} />
                              </div>
                              <button className="step" style={{ minWidth: 34, height: 32, fontSize: 13 }} onClick={() => setDetectiveShare(s.detectiveShare + 10)} disabled={!!s.gameOver || s.detectiveShare >= 100}>+10</button>
                              <InfoButton title="Rikostutkijat" text="Rikostutkijoihin erikoistuva osa hallinnosta laskee rikollisuutta suoraan (jopa −35 % täydellä osuudella), mutta vie resursseja yleisestä hallintokattavuudesta (−15 % täydellä osuudella)." />
                            </div>
                          </>
                        ) : (
                          <div style={{ fontSize: 10.5, color: "#9a8a6a", fontStyle: "italic" }}>🔒 Rikostutkijat avautuvat Teollisesta aikakaudesta.</div>
                        )}
                      </div>
                    )}

                    {key === "industry" && (
                      <div style={{ marginTop: 6, paddingLeft: 4, borderLeft: "2px solid #d8c9a8" }}>
                        {s.era >= 1 ? (
                          <>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6a5a3a", marginBottom: 4 }}>
                              <span>⚙️ Perustuotanto ↔ Erikoistunut teollisuus</span>
                              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>{s.industryFocus}%</span>
                            </div>
                            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                              <button className="step" style={{ minWidth: 34, height: 32, fontSize: 13 }} onClick={() => setIndustryFocus(s.industryFocus - 10)} disabled={!!s.gameOver || s.industryFocus <= 0}>−10</button>
                              <div style={{ flex: 1, height: 10, background: "#e6d9b8", borderRadius: 6, overflow: "hidden", border: "1px solid #cdbb95" }}>
                                <div style={{ width: `${s.industryFocus}%`, height: "100%", background: "linear-gradient(90deg,#8a7a5a,#5c4a7a)" }} />
                              </div>
                              <button className="step" style={{ minWidth: 34, height: 32, fontSize: 13 }} onClick={() => setIndustryFocus(s.industryFocus + 10)} disabled={!!s.gameOver || s.industryFocus >= 100}>+10</button>
                              <InfoButton title="Perustuotanto vs erikoistunut teollisuus" text="Erikoistunut teollisuus (arvo lähellä 100 %) nostaa tehokkuutta, tutkimusta ja BKT:ta, mutta saastuttaa selvästi enemmän kuin perustuotanto." />
                            </div>
                          </>
                        ) : (
                          <div style={{ fontSize: 10.5, color: "#9a8a6a", fontStyle: "italic" }}>🔒 Teollisuuden suuntaaminen avautuu Varhaisteollisesta aikakaudesta.</div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <div style={{ fontSize: 12, color: "#8a7a5a" }}>
                  Työnjaon säännöt <InfoButton title="Työnjaon säännöt" text="Lisätty työvoima otetaan aina suurimmasta sektorista (yleensä pelloilta), ja vapautettu palaa sinne — summa on aina 100 %." />
                </div>
              </Section>

              <Section title="Ammattijakauma" open={profOpen} onToggle={() => setProfOpen(!profOpen)}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <tbody>
                    {professions.map((p) => (
                      <tr key={p.name} style={{ borderBottom: "1px dotted #cdbb95" }}>
                        <td style={{ padding: "6px 4px" }}>{p.name}<div style={{ fontSize: 11, color: "#8a7a5a" }}>{p.note}</div></td>
                        <td style={{ textAlign: "right", fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>{fmt(p.n)}</td>
                      </tr>
                    ))}
                    <tr><td style={{ padding: "6px 4px", color: "#8a7a5a" }}>Työvoiman ulkopuolella (lapset & vanhukset)</td>
                      <td style={{ textAlign: "right", fontFamily: "'IBM Plex Mono',monospace", color: "#8a7a5a" }}>{fmt(s.children + s.elderly)}</td></tr>
                  </tbody>
                </table>
                <div style={{ marginTop: 10, fontSize: 13, color: "#7a6a4a" }}>
                  Aikakauden tausta <InfoButton title={era.name} text={`${era.desc} ${era.hist}`} />
                </div>
              </Section>
            </div>

            <div style={{ textAlign: "center", margin: "14px 0" }}>
              <button className="btn" onClick={nextTurn} disabled={!!s.gameOver}>Seuraavat 5 vuotta ▸</button>
            </div>

            {infoModal && (
              <div style={{ position: "fixed", inset: 0, background: "rgba(30,22,10,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 25, padding: 12 }} onClick={() => setInfoModal(null)}>
                <div className="paper" style={{ maxWidth: 460, width: "100%", maxHeight: "80vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, margin: "0 0 8px" }}>ℹ️ {infoModal.title}</h2>
                    <button onClick={() => setInfoModal(null)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#7a6a4a", lineHeight: 1 }}>✕</button>
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>{infoModal.text}</p>
                </div>
              </div>
            )}

            <div className="grid-graphlog">
              <div className="paper" style={{ padding: 10 }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, margin: "0 0 4px" }}>Väestökehitys</h2>
                <ResponsiveContainer width="100%" height={90}>
                  <LineChart data={s.history} margin={{ top: 5, right: 6, bottom: 0, left: 0 }}>
                    <CartesianGrid stroke="#d8c9a8" strokeDasharray="3 3" />
                    <XAxis dataKey="year" stroke="#7a6a4a" fontSize={10} />
                    <YAxis stroke="#7a6a4a" fontSize={10} tickFormatter={(v) => (v >= 1000 ? v / 1000 + "k" : v)} width={32} />
                    <Tooltip formatter={(v) => [fmt(v), "Väestö"]} labelFormatter={(y) => "Vuosi " + y} contentStyle={{ background: "#fcf6e8", border: "1px solid #cdbb95", fontFamily: "'IBM Plex Mono',monospace", fontSize: 12 }} />
                    <Line type="monotone" dataKey="pop" stroke={era.color} strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="paper" style={{ padding: 10 }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, margin: "0 0 4px" }}>Aikakirjat</h2>
                <div style={{ maxHeight: 110, overflowY: "auto" }}>
                  {s.log.map((l, i) => (
                    <div key={i} style={{ padding: "3px 6px", fontSize: 12.5, borderLeft: `3px solid ${l.tone === "bad" ? "#a02c2c" : l.tone === "good" ? "#3a6a3a" : "#8a7a5a"}`, marginBottom: 3, background: "rgba(255,255,255,0.35)" }}>
                      <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: "#8a7a5a", marginRight: 6 }}>v.{l.year}</span>{l.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {s.gameOver && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(30,22,10,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, padding: 12 }}>
            <div className="paper" style={{ maxWidth: 480, width: "100%", textAlign: "center", padding: 24, maxHeight: "90vh", overflowY: "auto" }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, margin: "0 0 10px", color: s.gameOver.win ? "#3a6a3a" : "#a02c2c" }}>
                {s.gameOver.win ? "Sivilisaatio kukoistaa" : "Yhteisö romahti"}
              </h2>
              <p style={{ fontSize: 16, margin: "0 0 8px" }}>{s.gameOver.text}</p>

              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 40, fontWeight: 900, color: "#8a4b2a", margin: "6px 0 2px" }}>{fmt(score.total)}</div>
              <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1.5, color: "#7a6a4a", marginBottom: 8 }}>Sivilisaatioindeksi</div>
              <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse", marginBottom: 12 }}>
                <tbody>
                  {Object.entries(score.parts).map(([k, v]) => (
                    <tr key={k} style={{ borderBottom: "1px dotted #e0d4b4" }}>
                      <td style={{ textAlign: "left", padding: "3px 4px" }}>{k}</td>
                      <td style={{ textAlign: "right", fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>{fmt(v)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {window.storage && (
                <div style={{ background: "rgba(255,255,255,0.5)", border: "1px solid #d8c9a8", borderRadius: 8, padding: 12, marginBottom: 12 }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 700, marginBottom: 8 }}>🏆 Yhteinen tulostaulu</div>
                  {!scoreSaved ? (
                    <div style={{ display: "flex", gap: 8 }}>
                      <input value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="Nimesi tulostaululle" maxLength={20}
                        style={{ flex: 1, padding: "10px 12px", fontSize: 15, fontFamily: "'Crimson Pro',serif", border: "1.5px solid #8a4b2a", borderRadius: 8, background: "#fcf6e8", minWidth: 0 }} />
                      <button className="btn" style={{ padding: "10px 16px", fontSize: 15 }} onClick={submitScore} disabled={!playerName.trim()}>Tallenna</button>
                    </div>
                  ) : (
                    <div style={{ color: "#3a6a3a", fontSize: 14, fontWeight: 600 }}>✓ Tulos tallennettu!</div>
                  )}
                  <div style={{ fontSize: 11, color: "#8a7a5a", marginTop: 6, fontStyle: "italic" }}>Nimi ja tulos näkyvät kaikille tämän pelin pelaajille.</div>
                  {board && board.length > 0 && (
                    <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse", marginTop: 10 }}>
                      <tbody>
                        {board.slice(0, 10).map((r, i) => (
                          <tr key={i} style={{ borderBottom: "1px dotted #e0d4b4", background: scoreSaved && r.name === playerName.trim() && r.score === score.total ? "rgba(138,75,42,0.12)" : "transparent" }}>
                            <td style={{ textAlign: "left", padding: "3px 4px", fontFamily: "'IBM Plex Mono',monospace", color: "#8a7a5a" }}>{i + 1}.</td>
                            <td style={{ textAlign: "left", padding: "3px 4px" }}>{r.icon} {r.name} <span style={{ color: "#8a7a5a", fontSize: 11 }}>({r.civ}{r.win ? " · voitto" : ""})</span></td>
                            <td style={{ textAlign: "right", fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>{fmt(r.score)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  {board && board.length === 0 && <div style={{ fontSize: 13, color: "#8a7a5a", marginTop: 8 }}>Ole ensimmäinen tulostaululla!</div>}
                </div>
              )}

              <p style={{ fontSize: 13, color: "#7a6a4a", margin: "0 0 10px" }}>Väestöhuippu: {fmt(Math.max(...s.history.map((h) => h.pop)))} · Vuosia: {s.year}</p>
              <button className="btn" onClick={() => { setS(makeStart(null)); setScoreSaved(false); setBoard(null); setPendingCiv(null); setChosenSkills([]); setVillageNameInput(""); }}>Valitse uusi sivilisaatio ↺</button>
            </div>
          </div>
        )}

        <footer style={{ textAlign: "center", fontSize: 12, color: "#8a7a5a", margin: "20px 0 8px", fontStyle: "italic" }}>
          Malli on karkea yksinkertaistus — mutta suhdeluvut (viljelijän tuottavuus, 1,8 % terveydenhuoltoon, 1 opettaja / 20 lasta) pohjaavat historiallisiin arvioihin.
        </footer>
      </div>
    </div>
  );
}
