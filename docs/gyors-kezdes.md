---
sidebar_position: 2
title: Gyors kezdés
description: Első lépések — eszköz beszerzésétől az első üzenetig.
---

# Gyors kezdés

Ez az útmutató végigvezet az első MeshCore-eszközöd üzembe helyezésén.

## 1. Szerezz be egy eszközt

Ajánlott eszközök kezdőknek:

| Eszköz | Ár (kb.) | Megjegyzés |
|---|---|---|
| Wio Tracker L1 Pro | ~15 000 Ft | Kijelzős, nagy akksival, külső antennás |
| RAK WisMesh Tag | ~13 000 Ft | Könnyen hordozható, de kisebb akksi és belső antenna |

A legnépszerűbb belépő szintű eszközök (részletek a [Hardver](hardver/eszkozok.md) oldalon):

| Eszköz | Ár (kb.) | Megjegyzés |
|---|---|---|
| Heltec V3 | ~6 000 Ft | Olcsó, kijelzős |
| XIAO nRF52840 & Wio-SX1262 Kit | ~4 000 Ft | Kiváló energiahatékonyság |

Haladóbb szintű, de önálló , telefon nélküli működésre képes eszköz:
| Eszköz | Ár (kb.) | Megjegyzés |
|---|---|---|
| T-Deck | ~25 000 Ft | Billentyűzettel, önálló használatra |

:::tip Fontos
Magyarországon a **868 MHz-es** frekvenciasávot használjuk! Vásárláskor mindig a 868 MHz-es (EU868) változatot válaszd.
:::

## 2. Töltsd fel a firmware-t

1. Nyisd meg a [MeshCore web flashert](https://flasher.meshcore.io) Chrome vagy Edge böngészőben
2. Csatlakoztasd az eszközt USB-n
3. Válaszd ki az eszköztípust és a **Companion Bluetooth** firmware-t
4. Nyomd meg a DFU mód gombot
5. Első telepítésnél érdemes az "erase flash"-el kezdeni
6. Kattints a *Flash* gombra

## 3. Telepítsd az alkalmazást

- **Android:** [MeshCore a Play Áruházban](https://play.google.com/store/apps/details?id=com.liamcottle.meshcore.android)
- **iOS:** [MeshCore az App Store-ban](https://apps.apple.com/app/meshcore/id6742354151)
- **Windows, macOS, Linux** [Telepítőfájlok](https://files.liamcottle.net/MeshCore/v1.47.0/)
- Webalkalmazás (telepítés nélkül használható): https://app.meshcore.nz/

## 4. Csatlakozz és küldj üzenetet

1. Nyisd meg az appot, párosítsd az eszközt Bluetooth-on
2. Állítsd be a nevedet
3. Ellenőrizd a régiót: EU/UK Narrow
4. Küldd el az első üzenetedet a publikus csatornán! 👋
5. Vedd fel a [#hungary](meshcore://channel/add?name=%23hungary&secret=d2ad7e4009b727fb4ee5c1ff51694e5e) csatornát a helyi közösségi chateléshez

## Hogyan tovább?

- [Companion firmware részletesen](firmware/companion.md)
- [Repeater üzemeltetése](firmware/repeater.md)
- [GyIK](gyik.md)
