/*
 * @Author: chenzh
 * @Date: 2020-07-27 10:06:57
 * @LastEditTime: 2020-08-18 17:17:02
 * @LastEditors: chenzh
 * @Description:
 * @FilePath: /sampleforvue/src/config/router.config.js
 */
export const constantRouterMap = [
  {
    path: '/',
    redirect: {
      path: '/dashboard'
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login'),
    name: 'Login'
  },
  {
    path: '/404',
    component: import('@/views/404'),
    name: 'NotFound'
  }
];

export const dynamicRouterMap = [
  {
    component: () => import('@/views/Main'),
    id: '8',
    parentId: '',
    name: 'DynamicRoute',
    path: '/DynamicRoute',
    children: [
      {
        component: () => import('@/views/DynamicRoute/Page'),
        id: '81',
        parentId: '',
        name: '动态页面',
        path: '/DynamicRoute'
      }
    ]
  }
];
