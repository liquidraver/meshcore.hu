---
sidebar_position: 6
title: GyIK
description: Gyakran ismételt kérdések a MeshCore-ról — a hivatalos angol GyIK alapján.
---

# Gyakran ismételt kérdések

:::info Forrás
Ez az oldal a [hivatalos MeshCore GyIK](https://docs.meshcore.io/faq/) (MIT licenc)
szerkezetét követi. A ✍️ jellel jelölt válaszok még kidolgozásra várnak — addig
az angol eredeti a mérvadó.
:::

## 1. Bevezetés

### Mi az a MeshCore?

A MeshCore egy egyszerű, hibrid útvonalválasztású mesh protokoll LoRa
packet-rádiókhoz. Internet és mobilhálózat nélkül tesz lehetővé titkosított
üzenetküldést: a csomópontok továbbítják egymás csomagjait, így nagy területek
is lefedhetők. Nyílt forráskódú (MIT licenc).

### Mi kell a MeshCore használatához?

Egy támogatott LoRa-eszköz (lásd: [Eszközök](hardver/eszkozok.md)), rá a
Companion firmware, és a MeshCore alkalmazás a telefonodra. Részletek:
[Gyors kezdés](gyors-kezdes.md).

## 2. Első lépések

### Hány eszköz kell a kezdéshez?

Egyetlen eszközzel már tudsz csatlakozni egy meglévő hálózathoz (például a
magyar mesh-hez). Ha a környékeden
még nincs ismétlő, legalább két eszköz kellhet, hogy legyen kivel kommunikálni. (ismétlő egy magas ponton a közelben)

### Pénzbe kerül a MeshCore?

Nem. A firmware és az alkalmazások ingyenesek, előfizetés nincs — csak az
eszközök árával kell számolni. (Az appok kínálnak opcionális támogatói
vásárlásokat, amivel a fejlesztést segítheted.)

### Milyen frekvenciákat támogat a MeshCore?

**Magyarországon a 868 MHz-es (EU868) sávot használjuk.**
Eszközvásárlásnál a "868" verziót kell keresni.

**A 433-as sávon is találhatsz ismétlőket pár kísérletező kedvű felhasználó által.**

### Mi az az „advert"?

Röviden: az advert a csomópont önhirdető csomagja, ezzel tudatja a hálózattal, hogy létezik, és így kerül fel mások kapcsolatlistájára.

Advertet küldeni nem kötelező, más csatornákon is megosztható az azonosítónk a másik féllel.
Egymás kapcsolatlistájában fel kell venni a másik fleet hogy direkt, titkosított üzenetváltást kezdeményezhessünk.

### Van hop-limit (ugráskorlát)?

1-byte-on: 64 ugrás
2-byte-on: 32 ugrás
3-byte-on: 24 ugrás

### Mi az a multibyte támogatás (1-2-3 bájtos advert és üzenet)?

Haladó téma, lásd az [eredeti szakaszt](https://docs.meshcore.io/faq/#39-q-what-is-multibyte-support-what-do-1-byte-2-byte-3-byte-adverts-and-messages-mean).*

### Nyílt forráskódú a MeshCore?

Igen, MIT licenc alatt: [github.com/meshcore-dev/meshcore](https://github.com/meshcore-dev/meshcore).

### Mi a kontakt/csatorna QR-kód formátuma?

Lásd: [QR-kódok](referencia/qr-kodok.md).

### Mekkora adóteljesítményt állítsak a Station G2 / Heltec V4 / EByte E22 modulos rádiókon?

Fontos! Magyarországon (és az EU-ban) maximum 27dBm adásteljesítmény lehetséges a 868-as sáv meshcore által használt szakaszán.
Ebbe a 27dBm-be beleszámít az antenna nyeresége is! (X dBi = (X-2.25) dBm)
Szóval nagyjából:
SX1262-es adó 22dBm-el ad, rákötsz egy 6dBi-s antennát --> 22+(6-2,25)=25,75 -> legális!
Egy erősítővel felszerelt eszközt (G2, HeltecV4 stb) úgy kell beállítani hogy maximum 27dBm legyen a számítás vége.