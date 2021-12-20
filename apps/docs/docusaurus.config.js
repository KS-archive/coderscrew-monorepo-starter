const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/preset-classic').Options} */
const classicPresetConfig = {
  docs: {
    path: 'src',
    routeBasePath: '/',
    sidebarPath: require.resolve('./sidebars.js'),
    editUrl: 'https://github.com/KonradSzwarc/coderscrew-monorepo-starter/edit/main/apps/docs/',
  },
  theme: {
    customCss: require.resolve('./styles/custom.css'),
  },
};

/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
const themeConfig = {
  navbar: {
    title: 'CodersCrew Monorepo Starter Docs',
    logo: { alt: 'CodersCrew Monorepo Starter Logo', src: 'img/logo.svg' },
  },
  footer: {
    style: 'dark',
    copyright: `Copyright © ${new Date().getFullYear()} CodersCrew. Built with Docusaurus.`,
  },
  prism: { theme: lightCodeTheme, darkTheme: darkCodeTheme },
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CodersCrew Monorepo Starter',
  tagline: 'Documentation of the entire CodersCrew Monorepo Starter project',
  // TODO: Add correct URL when we deploy docs for the first time.
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'KonradSzwarc',
  projectName: 'coderscrew-monorepo-starter',
  presets: [['classic', classicPresetConfig]],
  themeConfig,
};

module.exports = config;
