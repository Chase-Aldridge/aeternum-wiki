import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'World of LOR',
  tagline: 'D&D 5E Campaign Wiki - The Aeternum Crisis & The Plagas Prophecy',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://lor.chasealdridge.com',
  baseUrl: '/',

  organizationName: 'Chase-Aldridge',
  projectName: 'aeternum-wiki',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/lor-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'World of LOR',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'wikiSidebar',
          position: 'left',
          label: 'Wiki',
        },
        {
          to: '/docs/category/aeternum',
          label: 'Aeternum',
          position: 'left',
        },
        {
          to: '/docs/category/gulrath',
          label: "Gul'Rath",
          position: 'left',
        },
        {
          to: '/docs/category/plagas',
          label: 'Plagas',
          position: 'left',
        },
        {
          to: '/docs/category/pantheon',
          label: 'Gods',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Continents',
          items: [
            {
              label: 'Aeternum',
              to: '/docs/category/aeternum',
            },
            {
              label: "Gul'Rath",
              to: '/docs/category/gulrath',
            },
            {
              label: 'Plagas',
              to: '/docs/category/plagas',
            },
          ],
        },
        {
          title: 'Lore',
          items: [
            {
              label: 'Pantheon',
              to: '/docs/category/pantheon',
            },
            {
              label: 'The Fellowship',
              to: '/docs/aeternum/factions/the-fellowship',
            },
          ],
        },
        {
          title: 'Quick Links',
          items: [
            {
              label: 'Major Factions',
              to: '/docs/aeternum/factions/house-aetherius',
            },
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
          ],
        },
      ],
      copyright: `D&D 5E Campaign Setting by Kevin Orosz. Wiki built ${new Date().getFullYear()}.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: undefined,
  } satisfies Preset.ThemeConfig,
};

export default config;
