---
sidebar_position: 1
title: CLI-parancsok
description: A MeshCore repeater, room server és szenzor parancssori (CLI) parancsainak magyar referenciája.
---

# CLI-parancsok

:::info[Forrás]
A hivatalos [CLI Commands](https://docs.meshcore.io/cli_commands/) dokumentáció alapján
([meshcore-dev/MeshCore](https://github.com/meshcore-dev/MeshCore/blob/main/docs/cli_commands.md), MIT licenc).
Az itt szereplő alapértelmezések az 1.15-ös firmware-re vonatkoznak — a te eszközödön eltérhetnek,
ha korábbi verzióról frissítettél.
:::

Ezekkel a parancsokkal a **repeater**, a **room server** és a **szenzor** firmware konfigurálható.
A companion (telefonhoz párosított) eszköz nem ezt a parancskészletet használja.

## Hogyan add ki a parancsokat?

Három út vezet ugyanahhoz a parancssorhoz:

| Mód | Mikor használd |
|---|---|
| **USB soros kapcsolat** | Telepítés előtt, asztalon. Csak így érhetők el a 🔌-tel jelölt parancsok. |
| **App → admin → Command Line** | A leggyakoribb: a companion appból, BLE-n vagy a mesh-en keresztül, admin jelszóval belépve. |
| **TCP (port 23)** | Csak Ethernet-képes buildeknél (RAK4631 + RAK13800). |

:::tip[Magyar repeater alapbeállítás]
Az általános beállítások után futtasd ezeket, és utána állítsd be a [régiókat](../region-filtering.md) is:

```
set path.hash.mode 1
set loop.detect moderate
```

Minden parancs után várd meg az `OK` választ. Ha 20–30 másodpercen belül nem érkezik meg, add ki újra a parancsot.
:::

### Jelmagyarázat

| Jel | Jelentése |
|---|---|
| 🔌 | Csak soros (USB) kapcsolaton érhető el, távolról nem |
| 🔄 | Újraindítás után lép életbe |
| ⚠️ | Óvatosan — a hálózatot vagy az eszközt is elronthatod vele |
| `1.14+` | Ettől a firmware-verziótól létezik |

---

## Üzemeltetés

| Parancs | Mit csinál |
|---|---|
| `reboot` | Újraindítja az eszközt. Válasz nem érkezik rá. |
| `poweroff` / `shutdown` | Kikapcsolja az eszközt. Válasz nem érkezik rá. |
| `clkreboot` | Nullázza az órát, majd újraindít. Válasz nem érkezik rá. |
| `clock` | Kiírja az aktuális UTC időt. |
| `clock sync` | Szinkronizálja az órát a távoli (parancsot küldő) eszközzel. |
| `time <epoch_seconds>` | Beállítja az órát Unix időbélyeg alapján. |
| `advert` | Flood advertet küld (az egész hálózat felé). |
| `advert.zerohop` | Zero-hop advertet küld (csak a közvetlen szomszédoknak). |
| `start ota` | Elindítja az OTA (vezeték nélküli) firmware-frissítést. |
| `erase` | 🔌 ⚠️ Gyári visszaállítás — **minden beállítást és a kulcsot is törli**. |

## Szomszédok (csak repeater)

| Parancs | Mit csinál |
|---|---|
| `neighbors` | Kilistázza a közeli szomszédokat. Csak a **8 legutóbbi** advert látszik, soronként `pubkey-előtag:időbélyeg:snr*4` formában. |
| `neighbor.remove <pubkey_prefix>` | Törli a megadott kulcselőtagra illeszkedő szomszédokat. Szóközt megadva **az összeset** törli. |
| `discover.neighbors` | Zero-hop szomszédfelderítést indít. |

## Statisztikák

| Parancs | Mit csinál |
|---|---|
| `stats-core` | 🔌 Akku, uptime, várólista hossza, debug flagek. |
| `stats-radio` | 🔌 Zajszint, utolsó RSSI/SNR, adásidő, vételi hibák. |
| `stats-packets` | 🔌 Csomagszámlálók: fogadott és küldött. |
| `clear stats` | Nullázza az összes statisztikát. |

## Naplózás

| Parancs | Mit csinál |
|---|---|
| `log start` | Elindítja az RX-napló rögzítését az eszköz tárhelyére. |
| `log stop` | Leállítja a naplózást. |
| `log erase` | Törli a rögzített naplót. |
| `log` | 🔌 Kiírja a naplót a soros terminálra. |

## Információ

| Parancs | Mit csinál |
|---|---|
| `ver` | A firmware verziója. |
| `board` | A hardver (board) neve. |
| `get role` | Az eszköz beállított szerepe (repeater / room server / szenzor). |
| `get public.key` | Az eszköz publikus kulcsa. |

---

## Beállítások

### Rádió

| Parancs | Mit csinál | Alapérték |
|---|---|---|
| `get radio` / `set radio <freq>,<bw>,<sf>,<cr>` | 🔄 Rádióparaméterek: frekvencia (MHz), sávszélesség (kHz), spreading factor (5–12), coding rate (5–8). | `869.525,250,11,5` |
| `get freq` / `set freq <frequency>` | 🔌 (csak a `set`) 🔄 Csak a frekvencia, MHz-ben. | `869.525` |
| `get tx` / `set tx <dbm>` | Adóteljesítmény 1–22 dBm között. ⚠️ Csak a LoRa chip szintjét állítja — ha az eszközben külön végfok is van, a tényleges kimenet ennél nagyobb. Túl magas érték **jogszabályt sérthet**. | boardfüggő |
| `tempradio <freq>,<bw>,<sf>,<cr>,<timeout_mins>` | Ideiglenes rádióparaméterek a megadott percig. Nem mentődik, újraindításkor elveszik — teszteléshez ideális. | – |
| `get radio.rxgain` / `set radio.rxgain <on\|off>` | `1.14.1+` Vételi „boosted gain” mód (SX12xx és LR1110). | `on` |
| `get radio.fem.rxgain` / `set radio.fem.rxgain <on\|off>` | Külső LoRa FEM vételi erősítő (ahol a board támogatja). Ez **nem** ugyanaz, mint a `radio.rxgain`. | boardfüggő |
| `get radio.fem.txgain` / `set radio.fem.txgain <on\|off>` | Külső LoRa FEM adóoldali erősítés. Station G3-on a PA PL1 jumpert el kell távolítani a szoftveres vezérléshez. | boardfüggő |

:::warning[A rádióparaméterek hálózati beállítások]
A `set radio` értékeit **ne találd ki magadtól** — a hálózat minden eszközének azonos beállításon kell lennie.
A magyar hálózat a „Hungary” gyorsbeállítást használja, lásd a [gyors kezdés](../gyors-kezdes.md) oldalt.
:::

### Rendszer

| Parancs | Mit csinál | Alapérték |
|---|---|---|
| `get name` / `set name <name>` | Az eszköz neve. Az advertben legfeljebb 31 bájt fér el (pozícióval együtt 23), az ékezetek és emojik több bájtot foglalnak. A hosszabb nevek csonkolódnak. | boardfüggő |
| `get lat` / `set lat <degrees>` | Földrajzi szélesség fokban. | `0` |
| `get lon` / `set lon <degrees>` | Földrajzi hosszúság fokban. | `0` |
| `get prv.key` / `set prv.key <private_key>` | 🔌 (csak a `get`) 🔄 ⚠️ Az eszköz identitása, 64 hexa karakter. Cserével az eszköz „új node” lesz a hálózaton. | – |
| `password <new_password>` | Admin jelszó cseréje. A válasz visszaigazolásként visszaírja az új jelszót. Aki ezzel a jelszóval lép be, felkerül az admin ACL-listára. | `password` |
| `get guest.password` / `set guest.password <password>` | Vendégjelszó (room servernél a szoba jelszava). | üres |
| `get owner.info` / `set owner.info <text>` | `1.12+` Az üzemeltető elérhetősége. A `\|` karakterből sortörés lesz. | üres |
| `get adc.multiplier` / `set adc.multiplier <value>` | Az akkumulátorfeszültség-mérés finomhangolása (0.0–10.0). Ha a board nem támogatja, hibát ad vissza. | `0.0` |
| `powersaving` / `powersaving <on\|off>` | Csak repeateren. Bekapcsolva az eszköz alvó módba megy az adások között. | `off` |

:::tip[Töltsd ki az owner.info mezőt]
Ha a repeatered gondot okoz a hálózatban, a többiek ebből tudják meg, kit keressenek.
:::

### Útválasztás

Ez a legfontosabb szakasz repeater-üzemeltetőknek — ezek a beállítások döntik el, mit és hogyan
továbbít az eszközöd.

| Parancs | Mit csinál | Alapérték |
|---|---|---|
| `get repeat` / `set repeat <on\|off>` | Továbbítson-e egyáltalán csomagokat. | `on` |
| `get path.hash.mode` / `set path.hash.mode <0-2>` | `1.14+` Az advertben használt útvonal-hash mérete: `0` = 1 bájt (256 azonosító, max 64 hop), `1` = 2 bájt (65 536 azonosító, max 32 hop), `2` = 3 bájt (16,7 millió azonosító, max 21 hop). A `3` foglalt, ne használd. | `0` |
| `get loop.detect` / `set loop.detect <off\|minimal\|moderate\|strict>` | `1.14+` Hurokfelismerés: eldobja azokat a flood csomagokat, amelyekben a saját azonosítója már túl sokszor szerepel. | `off` |
| `get txdelay` / `set txdelay <0-2>` | Az újraadás előtti véletlen várakozási ablak szorzója flood forgalomnál — ütközések ellen. `0` kikapcsolja. | `0.5` |
| `get direct.txdelay` / `set direct.txdelay <0-2>` | Ugyanez direkt (útvonalon küldött) forgalomra. Azért kisebb, mert ott kevesebb node verseng. | `0.2` |
| `get rxdelay` / `set rxdelay <0-20>` | *Kísérleti.* A gyenge jellel vett csomagokat várólistára teszi, így az erős jelű útvonalak élveznek elsőbbséget. | `0.0` |
| `get dutycycle` / `set dutycycle <1-100>` | `1.15+` Kitöltési tényező százalékban. `100` = nincs korlát, `1` = a legszigorúbb EU-előírás. | `50` |
| `get af` / `set af <0-9>` | **Elavult** (1.15 óta) — helyette `dutycycle`. Adás után a rádió nagyjából az adásidő ennyiszeresét hallgat. | `1.0` |
| `get int.thresh` / `set int.thresh <value>` | Helyi interferenciaküszöb. | `0.0` |
| `get cad` / `set cad <on\|off>` | Hardveres csatornafigyelés (CAD) adás előtt: ha foglalt a csatorna, vár. Az `int.thresh`-től függetlenül működik. | `off` |
| `get agc.reset.interval` / `set agc.reset.interval <value>` | AGC-nullázás időköze másodpercben, 4 többszörösére lefelé kerekítve. `0` = kikapcsolva. | `0.0` |
| `get multi.acks` / `set multi.acks <0\|1>` | Multi-Ack támogatás. | `0` |
| `get flood.advert.interval` / `set flood.advert.interval <3-168>` | Flood advert időköze órában. | `12` (szenzoron `0`) |
| `get advert.interval` / `set advert.interval <60-240>` | Zero-hop advert időköze percben, 2 többszörösére lefelé kerekítve. | `0` |
| `get flood.max` / `set flood.max <0-64>` | Flood üzenetek maximális hopszáma. | `64` |
| `get flood.max.unscoped` / `set flood.max.unscoped <0-64>` | Régió (scope) nélküli flood csomagok maximális hopszáma. | `64` |
| `get flood.max.advert` / `set flood.max.advert <0-64>` | Advert floodok maximális hopszáma. | `8` |

#### Mit jelentenek a `loop.detect` szintek?

A repeater megnézi, hányszor szerepel a saját azonosítója a csomag útvonalában, és ez alapján dob el:

| Szint | 1 bájtos hash | 2 bájtos | 3 bájtos |
|---|---|---|---|
| `off` | nincs ellenőrzés | – | – |
| `minimal` | 4+ előfordulás | 2+ | 1+ |
| `moderate` | 2+ előfordulás | 1+ | 1+ |
| `strict` | 1+ előfordulás | 1+ | 1+ |

Egyetlen hibás (gyakran forkolt vagy egyedi) firmware is csomagvihart tud okozni, ha elrontja a
csomag útvonalát, és az így keletkezett „új” csomag a maximális 64 hopig terjed. A magyar hálózaton
ezért a `moderate` az ajánlott.

#### `flood.max.unscoped` a `region denyf *` helyett

Ha nem akarod teljesen eldobni a régió nélküli csomagokat, de a szomszédos hálózatok floodját sem
szeretnéd átengedni, állítsd a `flood.max.unscoped` értékét alacsonyra (például `3`) — így a helyi
régió nélküli üzenetek még elmennek, a távoli zaj viszont nem terjed tovább.

### Hozzáférés (ACL)

| Parancs | Mit csinál |
|---|---|
| `setperm <pubkey> <0-3>` | Jogosultság adása vagy módosítása: `0` = vendég, `1` = csak olvasás, `2` = írás-olvasás, `3` = admin. A jogosultság elhagyásával törli a bejegyzést. |
| `get acl` | 🔌 Az aktuális ACL-lista. |
| `get allow.read.only` / `set allow.read.only <on\|off>` | Room server „csak olvasható” mód — üzenőfalként való használathoz. Alap: `off` |

### Régiókezelés

`1.10+` A régiók döntik el, mely flood csomagokat továbbítja a repeatered. A működés logikáját a
[Régiószűrés](../region-filtering.md) oldal magyarázza el; itt csak a parancsok szerepelnek.

| Parancs | Mit csinál |
|---|---|
| `region` | 🔌 (1.12 előtt) Kiírja az összes régiót és a flood-jogosultságokat. |
| `region list <allowed\|denied>` | 🔌 `1.12+` Régiók listája jogosultság szerint. |
| `region get <name\|*>` | Egy régió adatai. |
| `region put <name> [parent_name]` | Új régió létrehozása. Szülő nélkül a `*` alá kerül. |
| `region def <token> [<token>...]` | Teljes hierarchia egyetlen sorban (lásd lentebb). |
| `region load [name] [F]` | Régiók tömeges betöltése. Név nélkül interaktív, ezért **távolról nem működik**. Az `F` engedélyezi a floodot, a behúzás szülő-gyerek kapcsolatot jelent (max. 8 szint). |
| `region remove <name>` | Régió törlése. Előbb minden gyerekét törölni kell. |
| `region allowf <name\|*>` | Flood engedélyezése a régióban. A `*`-ra állítva a régió (transport kód) nélküli csomagokat is átengedi. |
| `region denyf <name\|*>` | Flood tiltása. A `*`-ra állítva eldobja a régió nélküli csomagokat. |
| `region home [name]` | Az eszköz saját („home”) régiója. |
| `region default [name\|<null>]` | Az alapértelmezett scope régió. `<null>` törli. |
| `region save` | ⚠️ **Elmenti a változtatásokat.** Enélkül újraindításkor minden elveszik. |

#### `region def` — hierarchia egy sorban

A parancs egy képzeletbeli kurzorral dolgozik, amely a `*` gyökérnél indul:

- **`name`** — létrehozza a `name` régiót a kurzor gyerekeként, majd a kurzor rálép.
- **`name|jump`** (vagy `name,jump`) — létrehozza a `name` régiót a kurzor gyerekeként, majd a kurzort a
  már létező `jump` régióra viszi. A `jump` **nem** a szülője a `name`-nek — így lehet visszalépni egy
  szinttel feljebb, és új ágat kezdeni.

Lineáris lánc:

```
region def a b c d e
region save
```

Elágazó fa (ugyanaz, mintha `region put a`, `region put b a`, `region put c b`, `region put d c`,
`region put e b`, `region put f e` parancsokat adnál ki):

```
region def a b c d|b e f
region save
```

Lapos lista, ahol minden régió közvetlenül a `*` alá kerül:

```
region def a|* b|* c|* d|* e|* f
region save
```

:::caution[Amire figyelj]
- A soros parancssor **160 karakteres** sorokat fogad el. Nagyobb fát több `region def` parancsra kell bontani —
  a kurzor minden parancs elején visszaáll a `*`-ra, ezért a folytatást `gyerek|ős` alakkal kell kezdeni.
- A `region def` **nem törli** a meglévő fát: ha a név már létezik, csak a szülője változik.
- Hiba esetén a válasz `Err - ...`, de a hiba előtt létrehozott régiók az eszközön maradnak. Ellenőrizd a
  `region` paranccsal, majd javítsd `region remove` / `region put` parancsokkal.
- Minden token legfeljebb egyszer hasad a `|` mentén — a `region def a|b|c|d` **nem** lapos lista.
:::

#### `region load` példák

Egy régió flooddal engedélyezve:

```
region load
#Europe F
<üres sor zárja a betöltést>
region save
```

Beágyazott régiók — a gyerekek öröklik a szülő flood-beállítását:

```
region load
#Europe F
  #UK
    #London
    #Manchester
  #France
    #Paris
    #Lyon
<üres sor zárja a betöltést>
region save
```

Wildcard flooddal — minden régió floodja engedélyezett, és a transport kód nélküli csomagok is átmennek:

```
region load
* F
<üres sor zárja a betöltést>
region save
```

Az `F` elhagyásával a `*` régió létrejön, de nem enged floodot — ez a „semleges” alapállapot.

### GPS

Csak akkor érhető el, ha a firmware GPS-támogatással készült.

| Parancs | Mit csinál | Alapérték |
|---|---|---|
| `gps` / `gps <on\|off>` | GPS hardver állapota, illetve be- és kikapcsolása. Bekapcsolva a válasz formája: `on, {active\|deactivated}, {fix\|no fix}, {sat count} sats`. | `off` |
| `gps sync` | Óra szinkronizálása a GPS idejével. | – |
| `gps setloc` | Az eszköz pozíciójának beállítása a GPS koordinátáiból. | – |
| `gps advert [none\|share\|prefs]` | Mi kerüljön az advertbe: `none` = semmi, `share` = a GPS pozíciója, `prefs` = a `lat`/`lon` beállítás. | `prefs` |

### Szenzorok

Csak akkor érhető el, ha a firmware szenzortámogatással készült.

| Parancs | Mit csinál |
|---|---|
| `sensor list [start]` | Az elérhető szenzorok listája `név=érték` formában. A `start` egy opcionális kezdőindex. |
| `sensor get <key>` | Egy szenzorérték lekérdezése. |
| `sensor set <key> <value>` | Egy szenzorérték módosítása. |

### Bridge

Csak akkor érhető el, ha a firmware bridge-támogatással készült.

| Parancs | Mit csinál | Alapérték |
|---|---|---|
| `get bridge.type` | A befordított bridge típusa. | – |
| `get bridge.enabled` / `set bridge.enabled <on\|off>` | A bridge be- és kikapcsolása. | `off` |
| `get bridge.delay` / `set bridge.delay <0-10000>` | Késleltetés a bridge-elt csomagokra, ezredmásodpercben. | `500` |
| `get bridge.source` / `set bridge.source <logRx\|logTx>` | Mit küldjön át: `logRx` = a vett, `logTx` = az adott csomagokat. | `logTx` |
| `get bridge.baud` / `set bridge.baud <rate>` | RS-232 sebesség: `9600`, `19200`, `38400`, `57600` vagy `115200`. | `115200` |
| `get bridge.channel` / `set bridge.channel <1-14>` | ESPNow csatorna. | – |
| `get bridge.secret` / `set bridge.secret <secret>` | ESP-NOW jelszó, legfeljebb 15 karakter. | boardfüggő |

### Tápellátás és bootloader

| Parancs | Mit csinál |
|---|---|
| `get bootloader.ver` | A bootloader verziója (csak nRF52). |
| `get pwrmgt.support` | Van-e energiagazdálkodási támogatás. |
| `get pwrmgt.source` | Az aktuális tápforrás. |
| `get pwrmgt.bootreason` | A legutóbbi indítás és leállás oka. |
| `get pwrmgt.bootmv` | A bekapcsoláskori feszültség. |

A `pwrmgt.*` parancsok hibát adnak vissza olyan boardokon, amelyek nem támogatják az
energiagazdálkodást — a részletekért lásd az [nRF52 energiagazdálkodás](nrf52-energiagazdalkodas.md) oldalt.

### Ethernet

Csak akkor érhető el, ha a firmware Ethernet-támogatással készült: RAK4631 + RAK13800 (W5100S) modul,
`_ethernet` végű firmware-variánssal (például `RAK_4631_repeater_ethernet`).

| Parancs | Mit csinál |
|---|---|
| `eth.status` | Kapcsolat állapota: `ETH: <ip>:<port>` ha él a kapcsolat, `ETH: not connected` ha nem. |

Az interfész induláskor DHCP-vel kér IP-címet, és a 23-as porton TCP-szerverként várja a
CLI-kapcsolatokat — bármilyen TCP-klienssel (`nc`, PuTTY) ugyanaz a parancssor érhető el, mint soros
kapcsolaton. Csak repeater és room server firmware-en működik; a companion Ethernet-firmware nem
nyit CLI-t.
