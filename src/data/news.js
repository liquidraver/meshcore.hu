// Főoldali "Hírek" doboz tartalma.
// Új hír közzététele: vegyél fel egy új elemet a lista ELEJÉRE.
//   date  – megjelenített dátum (pl. '2026-07-30')
//   title – rövid cím
//   text  – (opcionális) egy-két mondatos leírás
//   to    – (opcionális) belső link, pl. '/docs/gyors-kezdes'
//   href  – (opcionális) külső link, pl. 'https://map.meshcore.hu'

const news = [
  {
    date: '2026-07-29',
    title: 'Szavazás Telegram-on',
    text: 'Teszteltük a "Netherlands" gyorsbeállításokat (SF7) és a hálózat átállításáról szavazás van kiírva a telegram-on. Kattint a címre a szavazáshoz való ugráshoz.',
    href: 'https://t.me/c/2516495224/1/56911',
  },
  {
    date: '2026-07-22',
    title: 'Elindult a #veszhelyzet csatorna',
    text: 'A csatorna az OKF VÉSZ alkalmazásának híreit küldi ki MeshCore-on. Kattints a címre a felvételhez. A csatornaüzenetek "hu" régióval vannak korlátozva.',
    href: 'meshcore://channel/add?name=%23veszhelyzet&secret=e90c4e4cae41b0d87464fec164c01131',
  },
];

export default news;
