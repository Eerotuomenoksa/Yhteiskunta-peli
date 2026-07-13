# Historiallisen sisällön varmentamiskehikko

**Tarkoitus:** Varmistaa, että pelin 26 tietolaatikon historialliset ja yhteiskuntatieteelliset väitteet kestävät tarkastelun ilman, että jokainen tarkistus vaatii erikseen keksittyä mittapuuta. Tätä kehikkoa käytetään ensimmäisen kerran D8-kohdassa (ks. [KEHITYSSUUNNITELMA_2026-07.md](KEHITYSSUUNNITELMA_2026-07.md), vk3 ke) ja jatkossa aina kun tietolaatikoihin lisätään tai muutetaan sisältöä.

**Tausta:** Kehikkoa on viitattu kolmesti (KEHITYSSUUNNITELMA D8-rivi ja vk3-ke-rivi, TIETOLAATIKKO_SISALLOT.md:n loppu) mutta sitä ei ollut koskaan kirjoitettu auki repoon. Tämä dokumentti täyttää sen aukon.

## Kuusi kriteeriä

1. **Faktojen paikkansapitävyys** — Ovatko esitetyt luvut, päivämäärät ja tapahtumat oikein nykyisen tutkimuksen valossa? Jos laatikko esittää tarkan luvun (esim. kuolonuhrien määrä, vuosiluku), se tarkistetaan erikseen — ei riitä että se "kuulostaa oikealta".
2. **Lähteiden luotettavuus** — Perustuuko väite laajasti hyväksyttyyn tutkimukseen eikä yksittäiseen kiistanalaiseen lähteeseen? Suositaan tunnettuja tietosanakirjamaisia koontilähteitä (esim. Tieteen termipankki, yliopistojen oppimateriaalit) yksittäisten blogien sijaan.
3. **Ajallinen tarkkuus / anakronismien välttäminen** — Sopiiko kuvaus oikein sille aikakaudelle/ilmiölle jota käsitellään? Erityinen riski: eri puolilla maailmaa samankaltaiselta näyttävä ilmiö (esim. kirjoitustaito, teollistuminen) syntyi usein *eri aikoina* eri alueilla — yhden yhteisen vuosiluvun antaminen usealle alueelle on tyypillinen anakronismivirhe.
4. **Yksinkertaistuksen tasapaino** — Onko yksinkertaistus pedagogisesti perusteltua vääristämättä olennaista totuutta tai luomatta stereotypioita? Tietolaatikko saa yksinkertaistaa (se on tarkoitus), mutta ei saa antaa suoraan väärää kuvaa.
5. **Tieteellisen konsensuksen ajantasaisuus** — Onko esitetty näkemys tutkimuksen valtavirtaa? Jos aiheesta on merkittävää tieteellistä erimielisyyttä, se mainitaan (esim. "arvioiden mukaan" tarkan luvun sijaan).
6. **Ikäryhmälle sopivuus** — Onko sisältö sopivan tasoista yläkoulu/lukio-ikäisille? Herkät aiheet (nälänhädät, sodat, epidemiat) käsitellään asiallisesti ilman tarpeetonta dramatisointia tai toisaalta vähättelyä.

## Menettely

1. Jokainen tietolaatikko käydään läpi kaikkien kuuden kriteerin osalta.
2. Jos laatikko sisältää tarkan, tarkistettavissa olevan faktaväitteen (luku, vuosiluku, nimi), se varmennetaan hakukoneella tai muulla lähteellä — ei jätetä muistinvaraiseksi.
3. Tulos kirjataan varmennustaulukkoon (ks. [HISTORIALLINEN_VARMENNUS.md](HISTORIALLINEN_VARMENNUS.md)): **Vahvistettu** / **Korjattu** / **Epävarma — lähetetty asiantuntijalle**.
4. Selkeät virheet korjataan suoraan `data/tietolaatikot.js`:ään. Aidosti kiistanalaiset tai tulkinnanvaraiset kohdat (ei selkeää oikein/väärin-vastausta) merkitään "Epävarma" ja kootaan erikseen historianopettajalle/asiantuntijalle kommentoitavaksi — niitä ei arvata.
