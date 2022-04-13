// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'EVMcrispr Docs',
  tagline: "Mutate a DAO's DNA",
  url: 'https://docs.evm-crispr.blossom.software',
  baseUrl: '/',
  onBrokenLinks: 'throw',
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
        }
      }
    ]
  ],

  themeConfig: {
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
          label: 'Aragon DAOs',
          position: 'left'
        },
        {
          to: 'gardens/',
          activeBasePath: 'gardens',
          label: 'Gardens',
          position: 'left'
        },
        {
          to: 'helpers/',
          activeBasePath: 'helpers',
          label: 'Helper Functions',
          position: 'left'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus'
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus'
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus'
            }
          ]
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog'
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Blossom Labs. Built with Docusaurus.`
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme
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
        id: 'gardens',
        path: 'gardens',
        routeBasePath: 'gardens',
        sidebarPath: require.resolve('./sidebarGardens.js')
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'helpers',
        path: 'helpers',
        routeBasePath: 'helpers',
        sidebarPath: require.resolve('./sidebarHelpers.js')
      }
    ]
  ]
}

module.exports = config
