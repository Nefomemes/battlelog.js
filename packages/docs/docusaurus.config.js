/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  plugins: [
    [
      'docusaurus-plugin-typedoc',

      // Plugin / TypeDoc options
      {
        entryPoints: ['../lib/src/index.ts'],
        tsconfig: '../lib/tsconfig.json',
        out: 'reference'
      },
    ]
  ],
  title: 'battlelog.js',
  tagline: 'The first ultimate API library for Battlefield Battlelog.',
  url: 'https://bljs.nefo.land/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'BLThunderstorm', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'battlelog.js',
      logo: {
        alt: 'BattlelogJS logo',
        src: 'img/logo.svg'
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Tutorial',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/BLThunderstorm/battlelog.js',
          label: 'GitHub',
          position: 'right'
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Guide',
              to: '/docs',
            },
            {
              label: 'Reference',
              to: '/reference'
            }
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/p999mbhERP',
            },
	    {
	      label: 'GitHub Discussions',
	      href: 'https://github.com/BLThunderstorm/battlelog.js/discussions'
	    }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/BLThunderstorm/battlelog.js',
            },
          ],
        },
      ],
      copyright: `Made with ❤ by Nefomemes. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/BLThunderstorm/battlelog.js/edit/master/packages/docs/docs/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/BLThunderstorm/battlelog.js/edit/master/packages/docs/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
