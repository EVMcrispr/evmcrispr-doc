// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'EVMcrispr Docs',
  tagline: "Mutate a DAO's DNA",
  url: 'https://evmcrispr.github.io',
  baseUrl: '/evmcrispr-old-docs/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'EVMcrispr', // Usually your GitHub org/user name.
  projectName: 'evmcrispr-old-docs', // Usually your repo name.
  trailingSlash: false,

  presets: [
    [
      'classic',
      {
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        },
      
        pages: {
          path: 'src/pages',
          routeBasePath: '/',
        }
      },
    ]
  ],

  themeConfig: {
    image: 'img/card.png',
    announcementBar: {
      id: 'archived-docs',
      content:
        'This documentation is archived for <strong>v0.4–v0.10</strong>. The new website is at <a target="_blank" rel="noopener noreferrer" href="https://evmcrispr.com">evmcrispr.com</a>.',
      backgroundColor: '#1f2b1a',
      textColor: '#75f248',
      isCloseable: false,
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      logo: {
        alt: 'evmcrispr logo',
        src: 'img/logo.svg'
      },
      items: [
        {
          to: 'getStarted/',
          activeBasePath: 'getStarted',
          label: 'Get Started',
          position: 'left'
        },
        {
          to: 'aragonOS/',
          activeBasePath: 'aragonOS',
          label: 'AragonOS Apps',
          position: 'left'
        },
        {
          to: 'cookbook/',
          activeBasePath: 'cookbook',
          label: 'Cookbook',
          position: 'left',
          },
          {
          href: 'https://evmcrispr.com/#/terminal',
          label: 'Terminal',
          position: 'right'
        },
        {
          label: 'Donate♥',
          href: 'https://giveth.io/project/evmcrispr-0',
          position: 'right'
        }

      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Forum',
              href: 'https://forum.1hive.org'
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/blossom_labs'
            }
          ]
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/1hive/evmcrispr'
            },
            {
              href: 'https://evmcrispr.com/#/terminal',
              label: 'Terminal',
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Blossom Labs. Built with Docusaurus.`
    }
  },
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'getStarted',
        path: 'getStarted',
        routeBasePath: 'getStarted'
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'aragonOS',
        path: 'aragonOS',
        routeBasePath: 'aragonOS',
        sidebarPath: require.resolve('./sidebarAragonOS.js')
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'cookbook',
        path: 'cookbook',
        routeBasePath: 'cookbook',
        sidebarPath: require.resolve('./sidebarCookbook.js')
      }
    ]
  ]
}

module.exports = config
