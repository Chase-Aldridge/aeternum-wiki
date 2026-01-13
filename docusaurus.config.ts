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

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: '/docs',
        indexBlog: false,
        searchBarShortcutHint: true,
        searchBarPosition: 'right',
      },
    ],
  ],

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
          to: '/docs/aeternum',
          label: 'Aeternum',
          position: 'left',
        },
        {
          to: '/docs/gulrath',
          label: "Gul'Rath",
          position: 'left',
        },
        {
          to: '/docs/plagas',
          label: 'Plagas',
          position: 'left',
        },
        {
          to: '/docs/gods',
          label: 'Gods',
          position: 'left',
        },
        {
          href: 'https://lor2.chasealdridge.com',
          label: '📖 Complete Edition',
          position: 'right',
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
              to: '/docs/aeternum',
            },
            {
              label: "Gul'Rath",
              to: '/docs/gulrath',
            },
            {
              label: 'Plagas',
              to: '/docs/plagas',
            },
          ],
        },
        {
          title: 'Lore',
          items: [
            {
              label: 'Gods & Deities',
              to: '/docs/gods',
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
              label: 'Mechanics',
              to: '/docs/mechanics',
            },
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
          ],
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
