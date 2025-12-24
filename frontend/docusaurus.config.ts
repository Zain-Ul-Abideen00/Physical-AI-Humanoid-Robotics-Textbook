import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Physical AI & Humanoid Robotics Textbook',
  tagline: 'A comprehensive resource for learning physical AI and humanoid robotics.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: process.env.SITE_URL || 'https://zain-humanoid-robotics.vercel.app',
  baseUrl: '/',

  organizationName: 'Zain-Ul-Abideen00', // Usually your GitHub org/user name.
  projectName: 'Physical-AI-Humanoid-Robotics-Textbook', // Usually your repo name.
  deploymentBranch: 'master',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: {
  hooks: {
    onBrokenMarkdownLinks: 'warn',
  },
  mermaid: true,
},

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: ['@docusaurus/theme-mermaid'],

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

  scripts: [
    {
      src: 'https://cdn.platform.openai.com/deployments/chatkit/chatkit.js',
      async: true,
    },
  ],

  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        searchBarShortcut: false,
      },
    ],
  ],

  customFields: {
    chatKitUrl: process.env.CHATKIT_URL || 'http://localhost:8000/chatkit',
    chatKitDomainKey: process.env.CHATKIT_DOMAIN_KEY || 'localhost',
    betterAuthUrl: process.env.BETTER_AUTH_URL || 'http://localhost:3001',
  },

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Robotics Textbook',
      logo: {
        alt: 'Robotics Textbook Logo',
        src: 'img/cyber-logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'modulesSidebar',
          position: 'left',
          label: 'Modules',
        },
        {
          type: 'docSidebar',
          sidebarId: 'weeksSidebar',
          position: 'left',
          label: 'Schedule',
        },
        {
          type: 'docSidebar',
          sidebarId: 'hardwareSidebar',
          position: 'left',
          label: 'Hardware',
        },
        {
          href: 'https://github.com/Zain-Ul-Abideen00/Physical-AI-Humanoid-Robotics-Textbook',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'custom-auth',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Curriculum',
          items: [
            { label: 'Modules', to: '/docs/modules/module-1-ros2/intro' },
            { label: 'Weeks', to: '/docs/weeks/week-01' },
          ],
        },
        {
          title: 'Resources',
          items: [
            { label: 'Hardware Guides', to: '/docs/hardware/intro' },
            { label: 'GitHub', href: 'https://github.com/Zain-Ul-Abideen00/Physical-AI-Humanoid-Robotics-Textbook' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Discord', href: '#' },
            { label: 'Forum', href: '#' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Physical AI & Humanoid Robotics Textbook. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'diff', 'json', 'yaml', 'python', 'cpp', 'docker'],
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'forest'},
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
