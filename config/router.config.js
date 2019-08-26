export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'coco'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './Welcome',
          }, // user manage
          {
            path: '/third',
            name: 'third',
            icon: 'usergroup-add',
            routes: [
              {
                path: '/third/list',
                name: 'list',
                component: './third/index',
              },
            ],
          }, // article
          {
            path: '/article',
            name: 'article',
            icon: 'file-markdown',
            routes: [
              {
                path: '/article/list',
                name: 'list',
                component: './article/index',
              },
            ],
          }, // message
          {
            path: '/message',
            name: 'message',
            icon: 'message',
            routes: [
              {
                path: '/message/list',
                name: 'list',
                component: './message/index',
              },
            ],
          }, // tag
          {
            path: '/tag',
            name: 'tag',
            icon: 'tags',
            routes: [
              {
                path: '/tag/list',
                name: 'list',
                component: './tag/index',
              },
            ],
          }, // categery
          {
            path: '/category',
            name: 'category',
            icon: 'qrcode',
            routes: [
              {
                path: '/category/list',
                name: 'list',
                component: './category/index',
              },
            ],
          }, // project
          {
            path: '/project',
            name: 'project',
            icon: 'project',
            routes: [
              {
                path: '/project/list',
                name: 'list',
                component: './project/index',
              },
            ],
          }, // account
          {
            path: './account',
            name: 'account',
            icon: 'user',
            routes: [
              {
                name: 'center',
                path: '/account/center',
                component: './account/center',
              },
              {
                name: 'settings',
                path: '/account/settings',
                component: './account/settings',
              },
            ],
          }, // exception
          {
            path: './exception',
            name: 'exception',
            icon: 'exception',
            hideInMenu: true,
            routes: [
              {
                name: '403',
                path: '/exception/403',
                component: './exception/403',
              },
              {
                name: '404',
                path: '/exception/404',
                component: './exception/404',
              },
              {
                name: '500',
                path: '/exception/500',
                component: './exception/500',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
