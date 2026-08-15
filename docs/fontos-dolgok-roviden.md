---
sidebar_position: 5
title: Fontos dolgok, röviden
description: A legfontosabb tudnivalók repeater-üzemeltetőknek — egy oldalon, felsorolásban.
---

# Fontos dolgok, röviden

Ez az oldal a repeater-üzemeltetők számára gyűjti össze a legfontosabb tudnivalókat. Ha csak egy
oldalt olvasol el, ez legyen az — a részletekért mindenhol ott a hivatkozás.

## 1. Tartsd naprakészen a firmware-t

A régi firmware nem csak a te eszközödet érinti — **az egész hálózatot visszafogja**:

- az 1.13-as és régebbi eszközök eldobják a több bájtos útvonal-hash értéket tartalmazó csomagokat,
  így a `path.hash.mode 1` használatát is korlátozzák a hálózatban;
- a hurokfelismerés (`loop.detect`) csak **1.14-től** létezik — enélkül egyetlen hibás szomszéd
  csomagvihart tud okozni, amit az eszközöd tovább sokszoroz;
- a kitöltési tényező százalékban (`dutycycle`) csak **1.15-től** állítható.

A jelenlegi verziót a `ver` paranccsal kérdezheted le. Frissíteni a hivatalos
[webflasherrel](https://flasher.meshcore.io) tudsz (Web Serial API kell hozzá: asztali Chrome vagy
Edge), távolról pedig a `start ota` paranccsal.

Frissítés után ellenőrizd a `get radio.rxgain` értékét: ha a flash törlése nélkül frissítettél
1.14.1-re, ez a beállítás ismert hiba miatt `off` maradhat.

## 2. Előbb kérdezz, aztán telepíts

Egy rosszul elhelyezett repeater **többet árt, mint használ**: fölöslegesen sokszorozza a
csomagokat, és lassítja a hálózatot. Telepítés előtt nézd meg az [élő térképet](https://map.meshcore.hu/#/map),
és egyeztess a közösséggel a [Telegram csoportban](https://t.me/+T_a1IA5HyKY5OWE0).

Ideális helyszín: magas pont, jó rálátással nagy területre — tető, torony, hegy. Nem az a cél, hogy
minél kevesebb repeaterrel legyen meg az összeköttetés, hanem hogy útközben is legyen használható
helyi lefedettség.

## 3. „Hungary” gyorsbeállítás

A magyar hálózat **2026.08.08 óta SF7-en** üzemel. Az appban a Gyorsbeállítások (Preset) közül
válaszd a **Hungary** opciót — ez a rádióparamétereket állítja be. Enélkül az eszközöd nem tud
forgalmat bonyolítani a gerinchálózaton.

A `hu` régió **nem** ettől lesz beállítva, azt külön kell megadnod: repeateren a `region put hu`
paranccsal (lásd a 4. pontot), companionon pedig csatornánként, a „Set Region Scope” menüben.

Részletek: [Gyors kezdés](gyors-kezdes.md)

## 4. Kötelező CLI-beállítások

Belépés az adminba → **Command Line**, majd:

```
set path.hash.mode 1
set loop.detect moderate
region put hu
region save
```

Minden parancs után **várd meg az `OK` választ**. Ha 20–30 másodpercen belül nem jön meg, add ki
újra a parancsot.

- `path.hash.mode 1` — 2 bájtos útvonal-hash, így sokkal kisebb az azonosító-ütközés esélye.
- `loop.detect moderate` — eldobja a hurokba került flood csomagokat, ez véd a csomagviharok ellen.
- `region put hu` + `region save` — enélkül a `hu` régióval címkézett forgalmat nem továbbítod.
  A `region save` **kötelező**, különben újraindításkor elvész a beállítás.

Részletek: [CLI-parancsok](referencia/cli-parancsok.md) · [Régiószűrés](region-filtering.md)

## 5. Név és elérhetőség

Használd a magyar hálózat névformátumát: **`HU-<megye>-<helység>`** (például `HU-BAZ-Tiszakeszi`,
`HU-HB-Hajdunanas`).

Töltsd ki az elérhetőségedet is, hogy a többiek tudják, kit keressenek, ha gond van:

```
set name HU-BAZ-Tiszakeszi
set owner.info Kis Pista | Telegram: @pista
```

## 6. Adóteljesítmény

A `set tx <dbm>` **csak a LoRa chip** szintjét állítja. Ha az eszközben külön végfok (PA) is van, a
tényleges kimenő teljesítmény ennél nagyobb — ilyenkor a boardhoz tartozó leírás alapján válassz
értéket. A túl magas érték **jogszabályt sérthet**.

## 7. Telepítés után

- Nézd meg a `stats-radio` és `stats-packets` kimenetét soros kapcsolaton, mielőtt felteszed a
  végleges helyére.
- Ellenőrizd, hogy megjelentél-e az [élő térképen](https://map.meshcore.hu/#/live).
- Az `erase` (gyári visszaállítás) **minden beállítást és a kulcsot is törli** — utána az eszközöd
  új node-ként jelenik meg a hálózaton, ezért csak indokolt esetben használd.

## Gyors ellenőrzőlista

| Lépés | Kész? |
|---|---|
| Legfrissebb firmware feltelepítve (`ver`) | ☐ |
| Egyeztettem a közösséggel a helyszínről | ☐ |
| „Hungary” preset beállítva (SF7) | ☐ |
| `set path.hash.mode 1` | ☐ |
| `set loop.detect moderate` | ☐ |
| `region put hu` + `region save` | ☐ |
| `set name HU-...` a névkonvenció szerint | ☐ |
| `set owner.info` kitöltve | ☐ |
| Adóteljesítmény a board leírása szerint | ☐ |
| Pozíció (`set lat` / `set lon`) beállítva | ☐ |
| Megjelenik az élő térképen | ☐ |
