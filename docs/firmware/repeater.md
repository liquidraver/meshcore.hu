---
sidebar_position: 2
title: Repeater
description: A Repeater firmware — a hálózat lefedettségét növelő ismétlőállomás.
---

# Repeater firmware

A **Repeater** (ismétlő) firmware-rel futó eszköz továbbítja a hálózat üzeneteit, így növeli a lefedettséget. Jellemzően magas pontokra (tetők, hegyek, tornyok) telepítik, napelemes tápellátással.

## Mikor válaszd?

- Ha szeretnél hozzájárulni a magyar hálózat **lefedettségéhez**
- Ha van elérhető magas pontod jó rálátással egy nagyobb területre

## Telepítés előtt

Egyeztess a közösséggel, hogy hová érdemes repeatert telepíteni, mert egy rosszul elhelyezett repeater gondot is okozhat — a térképet a [meshcore.hu](https://map.meshcore.hu/#/map) oldalon találod.

## Beállítás

Az alap beállításokat követően:

Lépj be az adminba, válaszd a Command Line lehetőséget, és vidd be ezeket a parancsokat:

- set path.hash.mode 1
- set loop.detect moderate

Minden parancs után meg kell várni az OK választ. Ha nem jön 20-30 másodpercen belül, ismételd meg a parancsot.

A [régió beállításokat](/region-filtering.md) itt találod, azt is állítsd be!