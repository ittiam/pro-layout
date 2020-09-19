/*
 * @Author: chenzh
 * @Date: 2020-07-27 10:06:57
 * @LastEditTime: 2020-09-18 22:27:30
 * @LastEditors: chenzh
 * @Description:
 * @FilePath: /pro-layout/src/config/router.config.js
 */
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/user/Login'),
    name: 'Login'
  },
  {
    path: '/404',
    component: () => import('@/views/exception/404'),
    name: 'NotFound'
  }
];
