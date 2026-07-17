---
sidebar_position: 5
title: Régiószűrés
description: A Rágiószűrés alapjai egyszerűen
---

<p align="center">
  <img src="/img/meshcore_region_filtering_logic.svg" alt="MeshCore régiószűrés logika" />
</p>

A MeshCore régió logika fordított az általános informatikai szűrésekhez képest. Itt nem a hálózati csomópont szűr, hanem te magad azzal, hogy milyen régióval cimkézed meg az üzeneted. Tehát nem valaki mondja meg mit csinálj, hanem neked kell jófejnek lenni :)

Amikor a companion rádiód egy flood csomagot küld ki, a csomagon szerepel egy "scope" mező, amely meghatározza, hogy mely repeaterek jogosultak azt továbbküldeni:

- **Scope: null (*)** - nincs régióhoz kötve. Az ilyen csomagot minden repeater automatikusan továbbküldi, függetlenül attól, milyen régiót szolgál ki. Ez a globális, régiótól független üzenetek útja.
- **Scope: konkrét régió** (pl. "budapest") - a csomag egy adott régióhoz van kötve. Ekkor minden csomagot fogadó repeater megvizsgálja, hogy a saját beállított régiói között szerepel-e ez a scope.

A repeater döntése ("Illik a repeater régiói közé?") ennek alapján:

- **Igen** - a repeater konfigurációjában szerepel a "budapest" régió -, ekkor továbbküldi a csomagot.
- **Nem** - a repeater nem ehhez a régióhoz tartozik -, ekkor eldobja a csomagot, nem terjeszti tovább.

Ennek a szűrésnek a lényege, hogy a régióhoz kötött forgalom csak az adott régió repeaterein keresztül terjedjen, ne terhelje feleslegesen a hálózat többi, más régióban lévő részét - miközben a globális (null scope) üzenetek minden repeateren szabadon átmennek.


(A beállításokról itt fogunk majd leírást közölni.)
