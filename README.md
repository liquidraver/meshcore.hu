# MeshCore Magyarország — meshcore.hu

[Docusaurus](https://docusaurus.io/) alapú dokumentációs oldal a magyar
MeshCore közösségnek.

## Tartalom szerkesztése (admin útmutató)

A tartalom sima **Markdown** fájlokban van a `docs/` mappában:

```
docs/
├── bevezetes.md        ← Bevezetés
├── gyors-kezdes.md     ← Gyors kezdés
├── firmware/           ← Firmware kategória
│   ├── companion.md
│   ├── repeater.md
│   └── room-server.md
├── hardver/            ← Hardver kategória
│   ├── eszkozok.md
│   └── antennak.md
└── gyik.md             ← GyIK
```

**Szerkesztés a böngészőből:** nyisd meg a fájlt GitHubon, kattints a ceruza
ikonra, szerkeszd, majd *Commit changes*. A Cloudflare 1-2 percen belül
automatikusan újraépíti és élesíti az oldalt.

**Új oldal:** hozz létre egy új `.md` fájlt a megfelelő mappában, az elejére
tedd ezt a fejlécet:

```md
---
sidebar_position: 3
title: Az oldal címe
---
```

**Új kategória:** hozz létre egy mappát a `docs/` alatt egy
`_category_.json` fájllal (minta: `docs/firmware/_category_.json`).

## Helyi futtatás

```bash
npm install
npm start        # fejlesztői szerver: http://localhost:3000
npm run build    # éles build a build/ mappába
```

## Telepítés (Cloudflare Workers)

A repó a Cloudflare Workers Buildshez van kötve — minden push a `main` ágra
automatikusan buildel és élesít.

- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`
- A statikus kiszolgálást a `wrangler.jsonc` állítja be (`build/` mappa)
