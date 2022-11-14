// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'EVMcrispr Docs',
  tagline: "Mutate a DAO's DNA",
  url: 'https://docs.evmcrispr.blossom.software',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'BlossomLabs', // Usually your GitHub org/user name.
  projectName: 'evmcrispr-doc', // Usually your repo name.

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
