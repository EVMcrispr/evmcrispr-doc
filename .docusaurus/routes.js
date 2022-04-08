
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug','efa'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config','beb'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content','8b2'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData','bc0'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata','9cd'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry','079'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes','a42'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog','1c2'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive','584'),
    exact: true
  },
  {
    path: '/blog/first-blog-post',
    component: ComponentCreator('/blog/first-blog-post','ae8'),
    exact: true
  },
  {
    path: '/blog/long-blog-post',
    component: ComponentCreator('/blog/long-blog-post','08d'),
    exact: true
  },
  {
    path: '/blog/mdx-blog-post',
    component: ComponentCreator('/blog/mdx-blog-post','186'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags','751'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus','005'),
    exact: true
  },
  {
    path: '/blog/tags/facebook',
    component: ComponentCreator('/blog/tags/facebook','7ac'),
    exact: true
  },
  {
    path: '/blog/tags/hello',
    component: ComponentCreator('/blog/tags/hello','361'),
    exact: true
  },
  {
    path: '/blog/tags/hola',
    component: ComponentCreator('/blog/tags/hola','8c5'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome','02c'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page','e31'),
    exact: true
  },
  {
    path: '/aragonOS',
    component: ComponentCreator('/aragonOS','326'),
    routes: [
      {
        path: '/aragonOS/',
        component: ComponentCreator('/aragonOS/','192'),
        exact: true
      }
    ]
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs','492'),
    routes: [
      {
        path: '/docs/intro',
        component: ComponentCreator('/docs/intro','5ba'),
        exact: true,
        sidebar: "defaultSidebar"
      },
      {
        path: '/docs/tutorial-basics/congratulations',
        component: ComponentCreator('/docs/tutorial-basics/congratulations','f00'),
        exact: true,
        sidebar: "defaultSidebar"
      },
      {
        path: '/docs/tutorial-basics/create-a-blog-post',
        component: ComponentCreator('/docs/tutorial-basics/create-a-blog-post','859'),
        exact: true,
        sidebar: "defaultSidebar"
      },
      {
        path: '/docs/tutorial-basics/create-a-document',
        component: ComponentCreator('/docs/tutorial-basics/create-a-document','35e'),
        exact: true,
        sidebar: "defaultSidebar"
      },
      {
        path: '/docs/tutorial-basics/create-a-page',
        component: ComponentCreator('/docs/tutorial-basics/create-a-page','2c8'),
        exact: true,
        sidebar: "defaultSidebar"
      },
      {
        path: '/docs/tutorial-basics/deploy-your-site',
        component: ComponentCreator('/docs/tutorial-basics/deploy-your-site','732'),
        exact: true,
        sidebar: "defaultSidebar"
      },
      {
        path: '/docs/tutorial-basics/markdown-features',
        component: ComponentCreator('/docs/tutorial-basics/markdown-features','072'),
        exact: true,
        sidebar: "defaultSidebar"
      },
      {
        path: '/docs/tutorial-extras/manage-docs-versions',
        component: ComponentCreator('/docs/tutorial-extras/manage-docs-versions','048'),
        exact: true,
        sidebar: "defaultSidebar"
      },
      {
        path: '/docs/tutorial-extras/translate-your-site',
        component: ComponentCreator('/docs/tutorial-extras/translate-your-site','a66'),
        exact: true,
        sidebar: "defaultSidebar"
      }
    ]
  },
  {
    path: '/gardens',
    component: ComponentCreator('/gardens','19a'),
    routes: [
      {
        path: '/gardens/',
        component: ComponentCreator('/gardens/','9ae'),
        exact: true
      }
    ]
  },
  {
    path: '/getStarted',
    component: ComponentCreator('/getStarted','262'),
    routes: [
      {
        path: '/getStarted/',
        component: ComponentCreator('/getStarted/','71d'),
        exact: true,
        sidebar: "getStarted"
      }
    ]
  },
  {
    path: '/helpers',
    component: ComponentCreator('/helpers','023'),
    routes: [
      {
        path: '/helpers/',
        component: ComponentCreator('/helpers/','6c3'),
        exact: true
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/','bd7'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
