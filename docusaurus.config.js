// @ts-check
// Docusaurus konfiguráció — https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

const GITHUB_REPO = 'https://github.com/liquidraver/meshcore.hu';
const NEWS_ROUTE_BASE_PATH = 'hirek';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'MeshCore Magyarország',
  tagline: 'A MeshCore magyarországi közösségének dokumentációja',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://meshcore.hu',
  baseUrl: '/',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'hu',
    locales: ['hu'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // "Oldal szerkesztése" link minden oldal alján
          editUrl: `${GITHUB_REPO}/tree/main/`,
        },
        blog: {
          routeBasePath: NEWS_ROUTE_BASE_PATH,
          blogTitle: 'Hírek',
          blogDescription: 'MeshCore Magyarország hírei',
          showReadingTime: false,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    ['./src/plugins/news-feed', {routeBasePath: NEWS_ROUTE_BASE_PATH}],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/mesh-network.svg',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        logo: {
          alt: 'MeshCore Magyarország',
          src: 'img/meshcore.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Dokumentáció',
          },
          {
            to: `/${NEWS_ROUTE_BASE_PATH}`,
            label: 'Hírek',
            position: 'left',
          },
          {
            href: 'https://map.meshcore.hu/',
            label: 'Élő térkép',
            position: 'right',
          },
          {
            href: 'https://github.com/meshcore-dev/MeshCore',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Dokumentáció',
            items: [
              {
                label: 'Bevezetés',
                to: '/docs/bevezetes',
              },
              {
                label: 'Gyors kezdés',
                to: '/docs/gyors-kezdes',
              },
              {
                label: 'GyIK',
                to: '/docs/gyik',
              },
            ],
          },
          {
            title: 'Közösség',
            items: [
              {
                label: 'Telegram',
                href: 'https://t.me/+T_a1IA5HyKY5OWE0',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/F62aq2FTA',
              },
              {
                label: 'Facebook',
                href: 'https://www.facebook.com/groups/421299027712536',
              },
            ],
          },
          {
            title: 'Továbbiak',
            items: [
              {
                label: 'Élő térkép (https://map.meshcore.hu/)',
                href: 'https://map.meshcore.hu/',
              },
              {
                label: 'MeshCore hivatalos oldal',
                href: 'https://meshcore.io',
              },
              {
                label: 'Oldal forráskódja',
                href: GITHUB_REPO,
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} MeshCore Magyarország — a magyar MeshCore közösség.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
