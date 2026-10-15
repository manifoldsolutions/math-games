# Yksikköympyrä — vihjesuunnitelma (luonnos)

Tämä on suunnitelma ennen koodia. Merkintä **[EHDOTUS]** tarkoittaa kohtaa,
jota ei ole vielä sovittu: siinä on Clauden ehdotus.

## 1. Perusperiaatteet

- Vihje tulee vain Vihje-nappia painamalla. Jokainen vihje maksaa 30 pistettä
  (sama A- ja B-vihjeille).
  - Poikkeus: kun kaikki ratkaisut on merkitty ja mukana on ylimääräinen piste,
    tulee noin 1 s kuluttua ilmaiseksi: "Kaikki ratkaisut ovat mukana, mutta
    yksi piste on ylimääräinen."
- Vihjeitä on kahta lajia:
  - **A = palaute pisteistä:** kommentoi pelaajan merkitsemiä pisteitä.
  - **B = tehtäväkohtainen vihje:** riippuu tehtävästä, ei pisteistä.
- Vihjeet on jaettu **vihjetasoihin** heikoimmasta vahvimpaan:
  - 1. painallus antaa vihjetason 1 vihjeen,
  - 2. painallus vihjetason 2 vihjeen,
  - 3. painallus vihjetason 3 vihjeen.
- Vihje arvotaan kaikista sillä hetkellä sopivista saman vihjetason
  vihjeistä, A ja B samassa arvonnassa. Pakollisia vihjeitä ei ole.
- Samaa vihjettä ei anneta kahdesti saman tehtävän aikana.
- A-vihjeet lasketaan aina painalluksen hetken pisteistä.
- Väärä "Ei ratkaisuja" / "Jokainen piste" lasketaan yhdeksi vihjeeksi: se
  maksaa saman 30 pistettä ja käyttää yhden painalluksen (vihjetason).
  Punainen teksti: "Ratkaisuja on olemassa. Tämä lasketaan yhdeksi
  vihjeeksi." / "Yhtälö ei ole totta jokaisella kulmalla. Tämä lasketaan
  yhdeksi vihjeeksi." Peli jatkuu, elämää ei menetetä.
- **Vihjetasoilla 1–2 vihje ei saa määrätä ratkaisua yksikäsitteisesti.**
  Vain vihjetaso 3 (apuviiva) saa näyttää sen.
- Viimeisen sallitun vihjeen jälkeen Vihje-nappi katoaa ja tilalle tulee
  "Näytä ratkaisu". Enempää vihjeitä ei saa.

## 2. Montako vihjettä

| Pelitaso | Painallukset | Vihjetasot |
|---|---|---|
| 0–2 | 2 | 1, 2 |
| 3–7 | 3 | 1, 2, 3 |

Jos pelitasolla 3–7 vihjetason 3 vihjettä ei ole (apuviiva ei sovi, esim.
kerrannaiskulmat), kolmas painallus arpoo toisen, vielä käyttämättömän
vihjetason 2 vihjeen.

| Vihjetaso | Sisältö | Esimerkkejä |
|---|---|---|
| 1 | yleinen tieto, ei paikkaa | ratkaisupisteiden määrä, symmetria, funktion ominaisuus, muistikolmio, kulman jako, menetelmä, oikeiden pisteiden määrä, "lähellä" |
| 2 | paikka, mutta ei yksikäsitteisesti | sama vaaka-/pystysuora, neljännes, puolitaso, koordinaattiakselit, lähin piste sykkii, oikeat pisteet vihreiksi |
| 3 | apuviiva piirretään | vain tehtävissä, joissa apuviiva on olemassa |

## 3. A-vihjeet (palaute pisteistä)

"Lähellä" = alle 20° jostakin ratkaisusta. "Kaukana" = vähintään 70° jokaisesta
ratkaisusta.

### Vihjetaso 1

| Ehto | Teksti |
|---|---|
| jokin merkitty oikein + vääriä (ratkaisuja 1 tai enemmän) | Yksi / Kaksi / Kolme … merkitsemistäsi pisteistä on oikein, mutta muut ovat väärin. |
| ratkaisuja ≥ 2, merkityt kaikki oikein, ratkaisuja puuttuu | Merkitsemäsi pisteet ovat oikein, mutta ratkaisuja on vielä lisää. |
| kaikki merkityt väärin, yksi piste merkitty, se on lähellä | Merkitsemäsi piste on lähellä oikeaa ratkaisua. |
| kaikki merkityt väärin, useita merkitty, lähin on lähellä | lähin piste sykkii magentana: Merkitsemäsi pisteet ovat väärin, mutta sykkivä piste on lähellä oikeaa ratkaisua. (useita ratkaisuja: … lähellä yhtä oikeista ratkaisuista.) |
| kaikki merkityt väärin, kaikki kaukana | Yksikään merkitsemäsi piste ei ole ratkaisu. |

### Vihjetaso 2

| Ehto | Teksti |
|---|---|
| useita merkitty, kaikki väärin ja kaukana, lähin alle 70° jostakin ratkaisusta | lähin piste sykkii magentana: Sykkivä piste on lähimpänä oikeaa ratkaisua. |
| kaikki merkityt vähintään 70° päässä jokaisesta ratkaisusta | Kaikki merkitsemäsi pisteet ovat kaukana oikeista ratkaisuista. |
| yksi väärä piste, kaukana, samassa neljänneksessä kuin ratkaisu | Merkitsemäsi piste on oikeassa neljänneksessä. |
| yksi väärä piste, kaukana, eri neljänneksessä | Ratkaisu on vasemmanpuoleisessa yläneljänneksessä. / Yksi ratkaisuista on … |
| yksi väärä piste, kaukana, samassa puolitasossa kuin ratkaisu | Merkitsemäsi piste on samalla puolella y-akselia (x-akselia) kuin ratkaisu. |
| yksi väärä piste, kaukana, eri puolitasossa | Oikea ratkaisu on y-akselin (x-akselin) toisella puolella. |
| oikeita mukana | oikeat pisteet vihreiksi: Vihreät pisteet ovat oikein. |

### Tarkennuksia

- **Sykkivä piste:** lähin piste muuttuu magentaksi ja sen hehku sykkii
  hitaasti. Sanaa "merkitty" ei käytetä, koska se sekoittuu "merkitsemäsi"
  pisteeseen. **[EHDOTUS]** "sykkivä" (vaihtoehtoja: "hehkuva", "vilkkuva").
- **Puolitaso:** valitaan akseli, jonka suhteen piste ja ratkaisu ovat samalla
  tai eri puolella. Käytetään myös silloin, kun ratkaisu ei ole akselilla,
  ettei vihje ole liian ilmeinen.
- **Neljännes:** jos ratkaisu on akselilla (esim. 90°), se ei ole missään
  neljänneksessä: silloin käytetään vain puolitasovihjeitä.
- **Useita ratkaisuja:** neljännes ja puolitaso kerrotaan pelaajan pistettä
  lähimmästä ratkaisusta ("Yksi ratkaisuista on …").
- **Värit:** vihreä ja magenta pysyvät, kunnes pelaaja poistaa pisteen. Uudet
  pisteet ovat tavallisia. Väärät pisteet eivät muutu punaisiksi.
- **Sanat:** neljännesten nimet ovat oikeanpuoleinen / vasemmanpuoleinen +
  ylä- / alaneljännes, joten pelkkä "oikea" tarkoittaa aina "correct".
  Puolitasossa käytetään "samalla puolella … kuin ratkaisu", koska "y-akselin
  oikealla puolella" tarkoittaa suuntaa.

## 4. B-vihjeet tehtävätyypeittäin

"Kulma" = pelitasojen 0–2 kulmatehtävät. Radiaanitehtävissä teksteissä on π,
astetehtävissä asteet.

### Kaikille tehtäville, joilla on ratkaisuja (ei "Ei ratkaisuja"/"Jokainen piste")

| Vihjetaso | Ehto | Teksti |
|---|---|---|
| 1 | aina | Ympyrällä on vain yksi ratkaisupiste. / Ympyrällä on 2 ratkaisupistettä. (3, 4 …) |
| 1 | ratkaisut peilikuvia x-akselin suhteen | Ratkaisut ovat symmetrisesti x-akselin ympärillä. |
| 1 | ratkaisut peilikuvia y-akselin suhteen | Ratkaisut ovat symmetrisesti y-akselin ympärillä. |
| 1 | ratkaisut 180° päässä toisistaan | Ratkaisut ovat origon vastakkaisilla puolilla. |
| 1 | ≥ 3 ratkaisua tasaisin välein | Ratkaisut ovat ympyrällä tasaisin välein. |
| 2 | 2 ratkaisua, sama y | Molemmat ratkaisut ovat samalla vaakasuoralla suoralla. |
| 2 | 2 ratkaisua, sama x | Molemmat ratkaisut ovat samalla pystysuoralla suoralla. |
| 2 | ratkaisu neljänneksessä | Ratkaisu on vasemmanpuoleisessa alaneljänneksessä. / Yksi ratkaisuista on … |
| 2 | ratkaisu ei x-akselilla | Ratkaisu on x-akselin yläpuolella. / … alapuolella. |
| 2 | ratkaisu ei y-akselilla | Ratkaisu on y-akselin oikealla puolella. / … vasemmalla puolella. |
| 2 | kaikki ratkaisut akseleilla | Ratkaisu on koordinaattiakselilla. / Ratkaisut ovat koordinaattiakseleilla. |

### Kulmatehtävät (pelitasot 0–2)

| Vihjetaso | Ehto | Teksti |
|---|---|---|
| 1 | kulmalla on jako | Huomaa, että 315° = 3 · 90° + 45°. / Huomaa, että 7π/6 = π + π/6, ja π on tasan puoli kierrosta. |
| 1 | negatiivinen kulma | Negatiivinen kulma kierretään myötäpäivään. |
| 1 | ± kulmassa | Merkki ± tarkoittaa kahta kulmaa. |
| 1 | radiaanit, ei jakoa | π on puoli kierrosta ja 2π täysi kierros. |

Tason 0 helpoissa kulmissa (30°, 45°, 60°, 90°, 180°) ei ole tämän taulukon
vihjeitä: arvonnassa ovat yleiset B-vihjeet ja A-vihjeet.

### sin α = c (vaakasuora apuviiva)

| Vihjetaso | Teksti |
|---|---|
| 1 | sin α on pisteen y-koordinaatti. Etsi ympyrältä pisteet, joiden y-koordinaatti on ½. |
| 1 | Huomaa, että sin(180° − α) = sin α kaikilla α. |
| 1 | Tutki tasasivuista muistikolmiota! (vain erikoiskulmat) |
| 3 | apuviiva y = c |

### cos α = c (pystysuora apuviiva)

| Vihjetaso | Teksti |
|---|---|
| 1 | cos α on pisteen x-koordinaatti. Etsi ympyrältä pisteet, joiden x-koordinaatti on ½. |
| 1 | Huomaa, että cos(−α) = cos α kaikilla α. |
| 1 | Tutki tasakylkistä muistikolmiota! (vain erikoiskulmat) |
| 3 | apuviiva x = c |

### tan α = c

| Vihjetaso | Teksti |
|---|---|
| 1 | tan α on säteen kulmakerroin. Etsi säde, joka osuu pystysuoraan apuviivaan x = 1 korkeudella c. |
| 1 | Huomaa, että tan(α + 180°) = tan α kaikilla α. |
| 1 | muistikolmio (vain erikoiskulmat) |
| 3 | apuviiva origon kautta |

### Käänteisfunktiot (sin⁻¹, cos⁻¹, tan⁻¹)

| Vihjetaso | Teksti |
|---|---|
| 1 | Huomaa, että funktion sin⁻¹ määrittelyjoukko on −1 … 1 ja päähaaran arvojoukko −90° … 90°. |
| 1 | Huomaa, että funktion cos⁻¹ määrittelyjoukko on −1 … 1 ja päähaaran arvojoukko 0° … 180°. |
| 1 | Huomaa, että funktio tan⁻¹ on määritelty kaikilla luvuilla ja sen päähaaran arvojoukko on −90° … 90°. |
| 1 | Käänteisfunktio antaa aina vain yhden kulman. |
| 3 | apuviiva |

### Neliöt, itseisarvo, tulo (pelitaso 4)

Nykyiset tehtäväkohtaiset vihjeet (esim. "Jos sin²α = ¼, mitä sin α voi olla?
Muista molemmat merkit, + ja −.") ovat vihjetason 1 vihjeitä. Apuviiva
vihjetasolla 3.

### Kerrannaiskulmat (pelitaso 6)

Nykyiset tehtäväkohtaiset vihjeet ("Millä kulmalla sini on 1? Ne ovat 2α:n
arvoja, joten jaa kahdella …") ovat vihjetason 1 vihjeitä. Ei apuviivaa:
kolmas painallus arpoo toisen vihjetason 2 vihjeen.

### Ei ratkaisuja / Jokainen piste

Ratkaisupisteiden määrää ei kerrota (se paljastaisi vastauksen).

| Vihjetaso | Ehto | Teksti |
|---|---|---|
| 1 | ei ratkaisuja | nykyinen tehtäväkohtainen vihje, esim. Mitä arvoja pisteen y-koordinaatti voi saada yksikköympyrällä? |
| 2 | ei ratkaisuja | Voiko yhtälö olla totta millään kulmalla? Mieti, mitä arvoja vasen puoli voi saada. |
| 1 | jokainen piste | Ympyrän piste on (cos α, sin α), ja sen etäisyys origosta on 1. Mitä Pythagoraan lause silloin sanoo? |
| 2 | jokainen piste | Kokeile muutamaa kulmaa, vaikkapa 0°, 90° ja 30°. Onko yhtälö totta niillä kaikilla? |
| 3 | jos apuviiva on | apuviiva |

## 5. Päätetyt tarkennukset

- "Kaukana"-raja on 70° sekä sykkivälle pisteelle että tekstille "Kaikki
  merkitsemäsi pisteet ovat kaukana oikeista ratkaisuista", joten ne eivät
  koskaan päde yhtä aikaa.
- Peilikuvavihje ei mainitse pelaajan pistettä: se on symmetriavihje
  "Ratkaisut ovat symmetrisesti x-akselin ympärillä." (vihjetaso 1).
- Määrä kerrotaan ratkaisupisteinä ("Ympyrällä on 2 ratkaisupistettä."),
  koska esim. sin α = 0 on totta äärettömän monella kulmalla.
