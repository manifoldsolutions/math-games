# Yksikköympyrä — vihjeet

Tämä tiedosto kuvaa pelin vihjeet sellaisina kuin ne on toteutettu
(`index.html`, osio "hints"). Kun vihjeitä muutetaan, päivitä tämä tiedosto
samalla.

## 1. Perusperiaatteet

- Vihje tulee vain Vihje-nappia painamalla. Jokainen vihje maksaa 30 pistettä,
  joka kerrotaan tason kertoimella kuten muutkin tehtävän pisteet.
- Vihjeitä on kahta lajia:
  - **A = palaute pisteistä:** kommentoi pelaajan merkitsemiä pisteitä.
    Lasketaan aina painalluksen hetken pisteistä.
  - **B = tehtäväkohtainen vihje:** riippuu tehtävästä. Osa B-vihjeistä on
    kuvia (kohta 7).
- Vihjeet on jaettu **vihjetasoihin** heikoimmasta vahvimpaan (kohta 2).
- **Vihjetasoilla 1–2 vihje ei saa määrätä ratkaisua yksikäsitteisesti.**
  Vain vihjetaso 3 saa näyttää sen.
- Samaa vihjettä ei anneta kahdesti saman tehtävän aikana.
- Jokaisella vihjeellä on **aihe** (kohta 4). Seuraava vihje on muusta
  aiheesta kuin aiemmat, jos sellainen on tarjolla.
- Viimeisen sallitun painalluksen jälkeen Vihje-nappi katoaa ja tilalle tulee
  "Näytä ratkaisu". Enempää vihjeitä ei saa.
- **Väärä "Ei ratkaisuja" / "Jokainen piste"** lasketaan yhdeksi vihjeeksi: se
  maksaa saman 30 pistettä ja käyttää yhden painalluksen. Nappi tärähtää, ja
  punainen teksti jää näkyviin: "Ratkaisuja on olemassa. Tämä lasketaan
  yhdeksi vihjeeksi." / "Yhtälö ei ole totta jokaisella kulmalla. Tämä
  lasketaan yhdeksi vihjeeksi." Peli jatkuu, elämää ei menetetä, eikä painallus
  kasvata klikkauksia.

## 2. Painallukset ja vihjetasot

| Pelitaso | Painalluksia | 1. painallus | 2. painallus | 3. painallus |
|---|---|---|---|---|
| 0–2 | 2 | vihjetaso 1 | vihjetaso 2 | – |
| 3–7 | 3 | vihjetaso 1 | vihjetaso 2 | vihjetasot 2 ja 3 yhdessä |

Kolmannen painalluksen arvonnassa ovat vihjetasojen 2 ja 3 vielä
käyttämättömät vihjeet. Jos tehtävällä ei ole vihjetason 3 vihjettä (esim.
kerrannaiskulmat), kolmas vihje on siis toinen vihjetason 2 vihje.

| Vihjetaso | Sisältö | Esimerkkejä |
|---|---|---|
| 1 | yleinen tieto, ei paikkaa | ratkaisupisteiden määrä, symmetria, identiteetit, muistikolmio, kulman jako, menetelmä, neljännesten rajat, oikeiden pisteiden määrä, "lähellä", "kaukana" |
| 2 | paikka, mutta ei yksikäsitteisesti | sama vaaka-/pystysuora, neljännes, puolitaso, koordinaattiakselit, kahdeksasosakulmat, arvon merkintä, kulman näyttäminen, lähin piste sykkii, oikeat pisteet vihreiksi |
| 3 | saa näyttää ratkaisun | apuviiva, kolmio ("jokainen piste"), "Ratkaisut ovat koordinaattiakseleilla" kun ratkaisut ovat kaikki neljä akselipistettä |

## 3. Miten vihje valitaan

Jokaisella painalluksella, tässä järjestyksessä:

1. **Ensimmäinen vihje ilman arvontaa** (vain 1. painallus):
   - kun tehtävän arvossa on neliöjuuri (esim. sin α = −√2/2, tan α = √3):
     muistikolmiovihje, ja oikea kolmionappi alkaa sykkiä magentana, kunnes
     sitä painetaan;
   - tehtävässä sin α · cos α = 0: tulon nollasääntö (kohta 6).
2. **Etusijavihjeet** tulevat aina ennen kulman näyttämistä ja apuviivaa:
   identiteetit (sin(180° − α) = sin α, cos(−α) = cos α, tan(α + 180°) =
   tan α) ja, kun ratkaisupisteitä on enemmän kuin kaksi, ratkaisupisteiden
   määrä.
   - 1. painalluksella ne ovat tavallisessa arvonnassa, josta kulman
     näyttäminen jätetään pois.
   - Jos yhtäkään niistä ei ole vielä annettu, 2. painallus arpoo yhden
     niistä. Jos tehtävässä on molemmat (esim. sin²α = ¼), riittää että toinen
     tulee: ne ovat samaa aihetta.
   - Neliöjuuritehtävissä järjestys on siis muistikolmio, etusijavihje,
     arvottu vihje.
3. **Muuten arvotaan.** Ehdokkaat ovat painalluksen vihjetason (kohta 2)
   kaikki sopivat ja käyttämättömät A- ja B-vihjeet. Arvonnassa ovat ensin
   vain vihjeet, joiden aihetta ei ole vielä käytetty.
4. **Varavihje:** jos painalluksen vihjetasoilla ei ole käyttämätöntä vihjettä
   uudesta aiheesta, otetaan vihjetason 1 vihje uudesta aiheesta. Jos sellaista
   ei ole, aihe saa toistua (esim. "Ei ratkaisuja" -tehtävien kolmas vihje).
   Jos mitään ei ole jäljellä: "Mieti, missä kohdissa ympyrää yhtälö on totta."
   (ei ratkaisuja: "Mieti, mitä arvoja yhtälön vasen puoli voi saada.").

## 4. Aiheet

Esimerkki: "Merkitsemäsi piste on lähellä oikeaa ratkaisua" (sijainti) ei saa
jatkokseen "Ratkaisu on y-akselin vasemmalla puolella" (sijainti), vaan esim.
neljännesten rajat (työkalu).

| Aihe | Vihjeet |
|---|---|
| sijainti | lähellä, kaukana, sykkivä piste, neljännes, puolitaso, koordinaattiakselit, korostettu kaari |
| oikeellisuus | "… merkitsemistäsi pisteistä on oikein …", "Merkitsemäsi pisteet ovat oikein, mutta …", "Yksikään merkitsemäsi piste ei ole ratkaisu", vihreät pisteet |
| rakenne | ratkaisupisteiden määrä, symmetriat, tasaisin välein, sama vaaka-/pystysuora, ±, identiteetit, "Käänteisfunktio antaa aina vain yhden kulman", "Voiko yhtälö olla totta millään kulmalla?", "Kokeile muutamaa kulmaa …" |
| kulma | kulman jako (120° = 90° + 30°), helpot kulmat (90° on suora kulma), negatiivinen kulma, "π on puoli kierrosta …" |
| menetelmä | tehtäväkohtainen vihje, "sin α on pisteen y-koordinaatti …", määrittely- ja arvojoukot, akselien nimet, arvon merkintä, korostettu väli |
| muistikolmio | "Tutki tasasivuista / tasakylkistä muistikolmiota!" |
| työkalu | kulman näyttäminen, neljännesten rajat |
| kahdeksasosat | kahdeksasosakulmat (oma aihe, jotta tarkempi asteikko voi tulla neljännesten jälkeen) |
| apuviiva | apuviiva, kolmio ("jokainen piste") |

## 5. A-vihjeet (palaute pisteistä)

Etäisyys mitataan lähimpään ratkaisuun: **lähellä** = alle 20°, **ei lähellä**
= vähintään 20°, **kaukana** = vähintään 70°. Piste on **oikein**, kun se on
alle 5° päässä ratkaisusta.

### Vihjetaso 1

| Ehto | Teksti |
|---|---|
| jokin merkitty oikein + vääriä (ratkaisuja 1 tai enemmän) | Yksi / Kaksi / Kolme … merkitsemistäsi pisteistä on oikein, mutta muut ovat väärin. |
| ratkaisuja ≥ 2, merkityt kaikki oikein, ratkaisuja puuttuu | Merkitsemäsi pisteet ovat oikein, mutta ratkaisuja on vielä lisää. (yksi piste: Merkitsemäsi piste on oikein, …) |
| kaikki väärin, yksi piste merkitty, se on lähellä | Merkitsemäsi piste on lähellä oikeaa ratkaisua. |
| kaikki väärin, useita merkitty, lähin on lähellä | lähin piste sykkii magentana: Merkitsemäsi pisteet ovat väärin, mutta sykkivä piste on niistä lähimpänä oikeaa ratkaisua. (useita ratkaisuja: … lähimpänä yhtä oikeista ratkaisuista.) |
| kaikki väärin, mikään ei lähellä — ei kun ratkaisuja on 1 ja pisteitä 1 (silloin se on selvää: tehtävä olisi muuten ratkennut) | Yksikään merkitsemäsi piste ei ole ratkaisu. / Merkitsemäsi piste ei ole ratkaisu. |
| kaikki kaukana (myös vihjetasolla 2) | Merkitsemäsi piste on kaukana oikeasta ratkaisusta. / Kaikki merkitsemäsi pisteet ovat kaukana oikeista ratkaisuista. |

### Vihjetaso 2

| Ehto | Teksti |
|---|---|
| useita merkitty, kaikki väärin, mikään ei lähellä, lähin alle 70° päässä | lähin piste sykkii magentana: Sykkivä piste on lähimpänä oikeaa ratkaisua. |
| kaikki kaukana | kuten vihjetasolla 1 (sama vihje, annetaan vain kerran) |
| yksi väärä piste, ei lähellä, samassa neljänneksessä kuin lähin ratkaisu | Merkitsemäsi piste on oikeassa neljänneksessä. |
| yksi väärä piste, ei lähellä, eri neljänneksessä | Ratkaisu on vasemmanpuoleisessa yläneljänneksessä. / Yksi ratkaisuista on … |
| yksi väärä piste, ei lähellä, samalla puolella akselia kuin ratkaisu | Merkitsemäsi piste on samalla puolella y-akselia (x-akselia) kuin ratkaisu. / … kuin yksi ratkaisuista. |
| yksi väärä piste, ei lähellä, eri puolella akselia | Oikea ratkaisu on y-akselin (x-akselin) toisella puolella. / Yksi ratkaisuista on … |
| oikeita mukana | oikeat pisteet vihreiksi: Vihreät pisteet ovat oikein. / Vihreä piste on oikein. |

### Erikoistehtävät

| Tehtävä | Vihjetaso | Ehto | Teksti |
|---|---|---|---|
| ei ratkaisuja | 1 | pisteitä merkitty | Yksikään merkitsemäsi piste ei ole ratkaisu. / Merkitsemäsi piste ei ole ratkaisu. |
| jokainen piste | 1 | pisteitä merkitty | Merkitsemäsi pisteet ovat oikein, mutta ratkaisuja on vielä lisää. |

### Tarkennuksia

- **Sykkivä piste:** lähin piste muuttuu magentaksi ja sen hehku sykkii
  hitaasti. Sanaa "merkitty" ei käytetä, koska se sekoittuu "merkitsemäsi"
  pisteeseen.
- **Värit:** vihreä ja magenta pysyvät, kunnes pelaaja poistaa pisteen. Uudet
  pisteet ovat tavallisia. Väärät pisteet eivät muutu punaisiksi.
- **Neljännes ja puolitaso** kerrotaan pelaajan pistettä lähimmästä
  ratkaisusta. Jos ratkaisu on akselilla (esim. 90°), se ei ole missään
  neljänneksessä: silloin käytetään vain puolitasovihjeitä. Puolitasoa
  käytetään myös silloin, kun ratkaisu ei ole akselilla, ettei vihje ole liian
  ilmeinen.
- **Sanat:** neljännesten nimet ovat oikeanpuoleinen / vasemmanpuoleinen +
  ylä- / alaneljännes, joten pelkkä "oikea" tarkoittaa aina "correct".
  A-vihjeen puolitasossa käytetään "samalla puolella … kuin ratkaisu", koska
  "y-akselin oikealla puolella" tarkoittaa suuntaa.

## 6. B-vihjeet tehtävätyypeittäin

"Kulmatehtävä" = pelitasojen 0–2 tehtävät α = …. Radiaanitehtävissä teksteissä
on π, astetehtävissä asteet.

### Kaikki tehtävät, joilla on ratkaisuja (ei "Ei ratkaisuja"/"Jokainen piste")

| Vihjetaso | Ehto | Teksti |
|---|---|---|
| 1 | aina, paitsi kulmatehtävissä, joissa on yksi kulma (α = 120° on selvästi yksi piste) | Ympyrällä on vain yksi ratkaisupiste. / Ympyrällä on 2 ratkaisupistettä. (3, 4 …) |
| 1 | sama, kun ratkaisupisteitä on ≥ 2 ja pelaaja on merkinnyt yhtä monta pistettä | Ympyrällä on 2 ratkaisupistettä, mutta ne ovat eri kuin merkityt pisteet. (jos jokin merkitty on oikein: … mutta kaikki merkityt pisteet eivät ole ratkaisuja.) |
| 1 | ratkaisut peilikuvia x-akselin suhteen | Ratkaisut ovat symmetrisesti x-akselin ympärillä. |
| 1 | ratkaisut peilikuvia y-akselin suhteen | Ratkaisut ovat symmetrisesti y-akselin ympärillä. |
| 1 | ratkaisut 180° päässä toisistaan | Ratkaisut ovat origon vastakkaisilla puolilla. |
| 1 | ≥ 3 ratkaisua tasaisin välein | Ratkaisut ovat ympyrällä tasaisin välein. |
| 2 | 2 ratkaisua, sama y | Molemmat ratkaisut ovat samalla vaakasuoralla suoralla. |
| 2 | 2 ratkaisua, sama x | Molemmat ratkaisut ovat samalla pystysuoralla suoralla. |
| 2 | ratkaisu neljänneksessä (useita: yksi arvotaan) | Ratkaisu on vasemmanpuoleisessa alaneljänneksessä. / Yksi ratkaisuista on … |
| 2 | kaikki ratkaisut samalla puolella x-akselia | Ratkaisu on x-akselin yläpuolella. / Kaikki ratkaisut ovat x-akselin alapuolella. |
| 2 | kaikki ratkaisut samalla puolella y-akselia | Ratkaisu on y-akselin oikealla puolella. / Kaikki ratkaisut ovat y-akselin vasemmalla puolella. |
| 2 | kaikki ratkaisut akseleilla, alle 4 ratkaisua | Ratkaisu on koordinaattiakselilla. / Ratkaisut ovat koordinaattiakseleilla. |
| 3 | ratkaisut ovat kaikki neljä akselipistettä (määrää ratkaisun) | Ratkaisut ovat koordinaattiakseleilla. |

**Sijaintivihje, jonka merkityt pisteet jo täyttävät:** jos kaikki merkityt
pisteet ovat väärin ja täyttävät vihjeen ehdon (esim. merkitty piste on
akselilla ja vihje on "Ratkaisu on koordinaattiakselilla"), vihje kuittaa sen:
"Aivan oikein, ratkaisu on koordinaattiakselilla, mutta ei merkitsemässäsi
kohdassa." / "Aivan oikein, ratkaisu on vasemmanpuoleisessa alaneljänneksessä,
mutta ei merkitsemässäsi kohdassa." (useita pisteitä: … kohdissa). Koskee
neljännes-, puolitaso- ja koordinaattiakselivihjeitä.

Ratkaisupisteiden määrä on etusijavihje, kun ratkaisuja on enemmän kuin kaksi
(kohta 3).

### Kulmatehtävät (pelitasot 0–2)

| Vihjetaso | Ehto | Teksti |
|---|---|---|
| 1 | kulmalla on jako | Huomaa, että 315° = 3 · 90° + 45°. / Huomaa, että 7π/6 = π + π/6, ja π on tasan puoli kierrosta. |
| 1 | negatiivinen kulma | Negatiivinen kulma kierretään myötäpäivään. |
| 1 | ± kulmassa, ratkaisupisteitä 2, ja pelaaja on merkinnyt vähemmän tai enemmän kuin 2 pistettä | Merkki ± tarkoittaa kahta kulmaa. |
| 1 | radiaanit, ei jakoa | π on puoli kierrosta ja 2π täysi kierros. |

**Kulman jako asteina** käyttää vain sitä, minkä aloittelija tuntee: 45°, 90°,
180° ja 360°. Kolme neljännestä on aina 3 · 90°, ei koskaan 270°: 150° = 90° +
60°, 315° = 3 · 90° + 45°, 270° = 3 · 90°, 390° = 360° + 30°. Radiaanit jaetaan
radiaaneina, ei muunneta asteiksi: 7π/6 = π + π/6, ja π on tasan puoli
kierrosta; 11π/6 = 2π − π/6, ja 2π on täysi kierros.

**Helpot kulmat** (pelitaso 0 sekä pelitason 1 tehtävä α = 60°) saavat jaon
tilalla vihjeen, joka liittää kulman suoraan kulmaan tai oikokulmaan:

| Kulma | Teksti |
|---|---|
| 90° | Huomaa, että 90° on suora kulma. |
| 180° | Huomaa, että 180° on oikokulma. |
| 45° | Huomaa, että 45° = 90°/2, ja 90° on suora kulma. |
| 30° | Huomaa, että 30° = 90°/3, ja 90° on suora kulma. |
| 60° | Huomaa, että 60° = 180°/3, ja 180° on oikokulma. |

### sin α = c, cos α = c (myös sin²α, cos²α, |cos α|)

| Vihjetaso | Ehto | Teksti |
|---|---|---|
| 1 | sin α = c, ei omaa vihjettä | sin α on pisteen y-koordinaatti. Etsi ympyrältä pisteet, joiden y-koordinaatti on ½. |
| 1 | cos α = c, ei omaa vihjettä | cos α on pisteen x-koordinaatti. Etsi ympyrältä pisteet, joiden x-koordinaatti on ½. |
| 1 | sin, ≥ 2 ratkaisua, c ≠ ±1, ei käänteisfunktio | Huomaa, että sin(180° − α) = sin α kaikilla α. (radiaanitehtävä: π − α) |
| 1 | cos, samat ehdot | Huomaa, että cos(−α) = cos α kaikilla α. |
| 1 | ratkaisut erikoiskulmia, pelitaso ≥ 3 | Tutki tasasivuista muistikolmiota! (√3, ½) / Tutki tasakylkistä muistikolmiota! (√2/2, 45°) |
| 3 | apuviiva näkyy kuvassa (\|c\| ≤ 1) | Apuviiva on nyt piirretty ympyrään. (kaksi suoraa, esim. y = ±½: Apuviivat on nyt piirretty ympyrään.) |

Identiteetit ovat etusijavihjeitä (kohta 3). Ne annetaan vain, kun ne antavat
toisen pisteen.

### tan α = c

| Vihjetaso | Ehto | Teksti |
|---|---|---|
| 1 | \|c\| ≤ 1,4 | tan α on säteen kulmakerroin. Etsi säde, joka osuu pystysuoraan apuviivaan x = 1 korkeudella c. |
| 1 | \|c\| > 1,4 | tan α on säteen kulmakerroin. Säde nousee c yksikköä, kun x kasvaa yhdellä. Käytä ruudukkoa tai muistikolmiota. |
| 1 | aina | Huomaa, että tan(α + 180°) = tan α kaikilla α. |
| 1 | ratkaisut erikoiskulmia | muistikolmiovihje |
| 3 | aina | apuviiva origon kautta |

Tehtävissä sin α = cos α ja sin α = −cos α on oma vihje ("Etsi pisteet, joiden
x- ja y-koordinaatti ovat yhtä suuret." / "… toistensa vastalukuja."), eikä
niihin tule tan-vihjeitä (menetelmä, identiteetti, akselin nimi, arvo suoralla
x = 1). Muistikolmio ja apuviiva tulevat.

### Käänteisfunktiot (sin⁻¹, cos⁻¹, tan⁻¹)

| Vihjetaso | Teksti |
|---|---|
| 1 | menetelmä, jonka alussa: sin⁻¹ antaa vain yhden kulman, väliltä −90° … 90°. (cos⁻¹: 0° … 180°; tan⁻¹: … eli ympyrän oikealta puoliskolta.) |
| 1 | Huomaa, että funktion sin⁻¹ määrittelyjoukko on −1 … 1 ja päähaaran arvojoukko −90° … 90°. |
| 1 | Huomaa, että funktion cos⁻¹ määrittelyjoukko on −1 … 1 ja päähaaran arvojoukko 0° … 180°. |
| 1 | Huomaa, että funktio tan⁻¹ on määritelty kaikilla luvuilla ja sen päähaaran arvojoukko on −90° … 90°. |
| 1 | Käänteisfunktio antaa aina vain yhden kulman. |
| 1 | muistikolmiovihje (erikoiskulmat) |
| 3 | apuviiva |

### Neliöt, itseisarvo, tulo (pelitaso 4)

Tehtävien omat vihjeet (esim. "Jos sin²α = ¼, mitä sin α voi olla? Muista
molemmat merkit, + ja −.") ovat vihjetason 1 vihjeitä. Apuviiva on
vihjetasolla 3.

**sin α · cos α = 0:** oma vihje "Tulon nollasäännöstä seuraa, että kaikki
kulmat, joilla sin α = 0 tai cos α = 0, ovat ratkaisuja." on aina ensimmäinen
vihje (tehtävän valinta `first`). Sen jälkeen tulee ratkaisupisteiden määrä
(etusijavihje, 4 ratkaisua).

### Kerrannaiskulmat (pelitaso 6)

Tehtävien omat vihjeet ("Millä kulmalla sini on 1? Ne ovat 2α:n arvoja, joten
jaa kahdella …") ovat vihjetason 1 vihjeitä. Apuviivaa ei ole.

### Ei ratkaisuja / Jokainen piste

Ratkaisupisteiden määrää ei kerrota (se paljastaisi vastauksen). "Jokainen
piste" on oikea vastaus vain tehtävässä sin²α + cos²α = 1, joten sen vihjeet
ovat tämän tehtävän omia. Uusille "jokainen piste" -tehtäville kirjoitetaan
omat vihjeet.

| Vihjetaso | Tehtävä | Teksti |
|---|---|---|
| 1 | sin α = 2 | Mitä arvoja pisteen y-koordinaatti voi saada yksikköympyrällä? |
| 1 | cos α = −3/2 | Mitä arvoja pisteen x-koordinaatti voi saada yksikköympyrällä? |
| 1 | cos²α = −1 | Voiko luvun neliö olla negatiivinen? |
| 2 | ei ratkaisuja | Voiko yhtälö olla totta millään kulmalla? Mieti, mitä arvoja vasen puoli voi saada. |
| 2 | ei ratkaisuja | korostettu väli (kohta 7) |
| 1 | sin²α + cos²α = 1 | Sovella Pythagoraan lausetta suorakulmaiseen kolmioon, jonka kärjet ovat origossa, ympyrän pisteessä (cos α, sin α) ja pisteessä (cos α, 0). Kolmion kateetit ovat \|cos α\| ja \|sin α\|, ja hypotenuusa on 1. |
| 2 | sin²α + cos²α = 1 | Kokeile muutamaa kulmaa, vaikkapa 0°, 90° ja 30°. Onko yhtälö totta niillä kaikilla? |
| 3 | sin²α + cos²α = 1 | kolmio (kohta 7) |

## 7. Visuaaliset vihjeet

Vihje voi olla myös kuva: ympyrään piirretään jotain, ja tekstirivillä on
lyhyt selitys. Kuva on arvonnassa samalla tavalla kuin tekstivihje omalla
vihjetasollaan ja jää näkyviin tehtävän loppuun.

| Vihjetaso | Tehtävät | Kuva | Teksti |
|---|---|---|---|
| 1 | sin α = c (myös sin α = 2) | y-akselin viereen pystysuoraan "sin α", x-akselin yläpuolelle "cos α" | Pisteen y-koordinaatti on sin α. |
| 1 | cos α = c | samat nimet | Pisteen x-koordinaatti on cos α. |
| 1 | tan α = c | suoran x = 1 viereen "tan α" | tan α näkyy korkeutena suoralla x = 1. |
| 1 | kulmatehtävät | neljännesten rajat: 90°, 180°, 270°, 360° (pelitaso 2: π/2, π, 3π/2, 2π) | Neljännesten rajat on merkitty ympyrään. |
| 2 | kulmatehtävät | kahdeksasosakulmat: lisäksi 45°, 135°, 225°, 315° (pelitaso 2: π/4, 3π/4, 5π/4, 7π/4) | Kahdeksasosakulmat on merkitty ympyrään. |
| 2 | sin α = c | arvo c merkitään y-akselille pienellä viivalla ja luvulla | Arvo ½ on merkitty y-akselille. (sin²α: Arvot ½ ja −½ on merkitty …) |
| 2 | cos α = c | arvo c merkitään x-akselille | Arvo ½ on merkitty x-akselille. |
| 2 | tan α = c | arvo c merkitään suoralle x = 1 | Arvo 1 on merkitty suoralle x = 1. |
| 2 | sin⁻¹, tan⁻¹ | päähaaran kaari −90° … 90° (oikea puoli) korostetaan | Ratkaisu on korostetulla kaarella. |
| 2 | cos⁻¹ | päähaaran kaari 0° … 180° (yläpuoli) korostetaan | Ratkaisu on korostetulla kaarella. |
| 2 | sin α = 2, cos α = −3/2 | akselille korostetaan väli −1 … 1, ja arvo c merkitään sen ulkopuolelle (kuvan reunaan, jos se ei mahdu) | sin α on aina korostetulla välillä. / cos α on aina korostetulla välillä. |
| 2 | cos²α = −1 | x-akselille korostetaan väli −1 … 1 | cos α on aina korostetulla välillä, joten cos²α on aina vähintään 0. |
| 2 (pelitasot 5–7: 1 tai 2) | kaikki tehtävät pelitasoilta 1–7, joilla on ratkaisuja | kulma näytetään tehtävän loppuun asti kuten pelitasolla 0: kaari ja lukema säteen vieressä, merkittyjen pisteiden kulmat | Kulma on nyt merkitty tehtävän loppuun saakka. |
| 3 | sin α = c, cos α = c, tan α = c, käänteisfunktiot, sin α · cos α = 0 | apuviiva (kun se näkyy kuvassa) | Apuviiva on nyt piirretty ympyrään. / Apuviivat … |
| 3 | sin²α + cos²α = 1 | kun sädettä liikutetaan, piirretään kolmio: kateetit cos α ja sin α, hypotenuusa 1 | Kolmion sivut ovat cos α, sin α ja 1. |

Tarkennuksia:

- **Värit** noudattavat teemaa: cos (x-suunta) vihreä, sin (y-suunta)
  keltainen, tan cyan, korostukset magenta. Samat värit kuin cos α- ja
  sin α-janat, joten kuva ja selite sopivat yhteen.
- **Akselin nimi ja merkitty arvo** ovat akselin eri puolilla ("sin α"
  y-akselin oikealla, arvo vasemmalla; "cos α" x-akselin yläpuolella, arvo
  alapuolella), joten ne eivät mene päällekkäin.
- **Arvon merkintä** vain, kun arvo näkyy kuvassa (|c| ≤ 1; tan: |c| ≤ 1,36) eikä
  ole 0.
- **Neljännekset ja kahdeksasosat** jätetään pois, jos tehtävän kulma on
  kirjoitettu suoraan yhdeksi merkityistä kulmista (α = 90° ilman neljänneksiä,
  α = 135° ilman kahdeksasosia), koska merkintä näyttäisi vastauksen.
  Tehtävissä −270°, 390° ja 3π merkinnät saa.
- **Kulman näyttäminen:** pelitasolla 0 kulma näkyy aina, joten siellä tätä
  vihjettä ei ole. Lukema on asteina pelitasoilla 0–1 ja radiaaneina
  radiaanitehtävissä sekä pelitasoilla 3–7, paitsi jos tehtävä on kirjoitettu
  asteina (cos(α + 30°) = 0). Radiaanit näytetään π:n monikertana, kun kulma on
  alle 1,5°:n päässä 15°:n monikerrasta (esim. 7π/6), muuten likiarvona
  (≈ 1,18π).
- Lisää kuvia voi keksiä myöhemmin. Ne lisätään tähän taulukkoon samalla
  tavalla.

## 8. Muut tekstit vihjerivillä

- **Tason ohjeteksti** näkyy, kun tehtävä alkaa. Tasoilla 1 ja 2 sen
  ensimmäinen lause kertoo, mikä tasolla muuttui, ja se jätetään pois kahden
  ensimmäisen tehtävän jälkeen:
  - taso 1: "Nyt kulmaa ei enää näytetä. Merkitse ympyrälle kaikki kohdat,
    joissa yhtälö on totta." → tehtävästä 3 alkaen "Merkitse ympyrälle kaikki
    kohdat, joissa yhtälö on totta."
  - taso 2: "Nyt kulmat ovat radiaaneina. Täysi kierros on 2π ja puoli
    kierrosta π." → tehtävästä 3 alkaen "Täysi kierros on 2π ja puoli
    kierrosta π."
- **Ylimääräinen piste** (ilmainen, ei vihje): kun kaikki ratkaisut on merkitty
  ja mukana on väärä piste, noin 1 s kuluttua tulee "Kaikki ratkaisut ovat
  mukana, mutta yksi piste on ylimääräinen." / "… mutta 2 pistettä on
  ylimääräisiä."

## 9. Perustelut

- **Raja 70°** on sama sykkivälle pisteelle ja "kaukana"-tekstille, joten ne
  eivät koskaan päde yhtä aikaa.
- **Peilikuvavihje ei mainitse pelaajan pistettä** ("se on löytämäsi pisteen
  peilikuva …" määräisi toisen ratkaisun): se on symmetriavihje "Ratkaisut
  ovat symmetrisesti x-akselin ympärillä."
- **Määrä kerrotaan ratkaisupisteinä** ("Ympyrällä on 2 ratkaisupistettä."),
  koska esim. sin α = 0 on totta äärettömän monella kulmalla.
- **Itsestäänselvät vihjeet jätetään pois:** "Merkitsemäsi piste ei ole
  ratkaisu", kun ratkaisuja on yksi ja pisteitä yksi (tehtävä olisi muuten jo
  ratkennut), ja "Ympyrällä on vain yksi ratkaisupiste" tehtävissä α = 120°.
