// A főoldali galéria képei (lásd Gallery az src/pages/index.js-ben).
// - src: saját hosztolású kép (/img/gallery/… → static/img/gallery/) vagy külső URL
// - caption: képaláírás (kötelező)
// - alt: alternatív szöveg, ha nincs megadva, a caption lesz
// - credit: opcionális szerzői/forrás megjelölés, sima szövegként jelenik meg
export const galleryImages = [
  {
    src: 'https://cam.idokep.hu/kamera.php?user=naszaly&token=c99aa74aa5d5021ad956ef47a97d5294616dac83e35f9421a7d61a51d5f9669d',
    caption: 'HU-PE-NaszEye repeater - ezt látja most',
  },
  {
    src: '/img/gallery/HU-HE-Sarud.png',
    caption: 'HU-HE-Sarud repeater - lokális kiszolgálás és közvetlen link HU-HE-Kiskohat felé',
  },
  {
    src: '/img/gallery/HU-BAZ-Tiszakeszi.png',
    caption: 'HU-BAZ-Tiszakeszi repeater',
  },
  {
    src: '/img/gallery/HU-HB-Hajdunanas.png',
    caption: 'HU-HB-Hajdunanas repeater',
  },
  {
    src: '/img/gallery/HU-HE-Kiskohat.png',
    caption: 'HU-HE-Kiskohat repeater',
  },
  {
    src: '/img/gallery/HU-PE-Albertirsa.png',
    caption: 'HU-PE-Albertirsa repeater',
  },
  {
    src: '/img/gallery/HU-PE-Pilis.png',
    caption: 'HU-PE-Pilis repeater',
  },
  {
    src: '/img/gallery/HU-VE-HA2GY.png',
    caption: 'HU-VE-HA2GY repeater - a Gyulafirátóti Ifjúsági Rádióklub állomása',
  },
  {
    src: '/img/gallery/HU-VE-Veszprem.png',
    caption: 'HU-VE-Veszprem repeater',
  },
];
