/*
 * @Author: chenzh
 * @Date: 2020-07-27 08:29:57
 * @LastEditTime: 2020-08-18 17:11:52
 * @LastEditors: chenzh
 * @Description:
 * @FilePath: /sampleforvue/src/permission.js
 */
import router from './router';
import store from './store';
import storage from '@/utils/storage';
import NProgress from 'nprogress'; // progress bar
import '@/components/NProgress/nprogress.less'; // progress bar custom style
import notification from 'ant-design-vue/es/notification';
import { ACCESS_TOKEN } from '@/store/mutation-types';
import { dynamicRouterMap } from '@/config/router.config';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['Login', 'Register', 'RegisterResult']; // no redirect whitelist
const loginRoutePath = '/login';
const defaultRoutePath = '/Button';

router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar
  console.log(to);
  /* has token */
  if (storage.get(ACCESS_TOKEN)) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath });
      NProgress.done();
    } else {
      // check login addRouters is null
      if (store.getters.addRouters.length === 0) {
        // request login userInfo
        store
          .dispatch('GetInfo')
          .then(res => {
            const roles = res.result && res.result.role;
            // generate dynamic router
            store.dispatch('GenerateRoutes', { roles }).then(() => {
              // 根据roles权限生成可访问的路由表
              store.commit('page/init', dynamicRouterMap.concat(store.getters.addRouters));
              router.addRoutes(dynamicRouterMap);
              // 动态添加可访问路由表
              router.addRoutes(store.getters.addRouters);
              // 请求带有 redirect 重定向时，登录自动重定向到该地址
              const redirect = decodeURIComponent(from.query.redirect || to.path);
              if (to.path === redirect) {
                // set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true });
              } else {
                // 跳转到目的路由
                next({ path: redirect });
              }
            });
          })
          .catch(() => {
            notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试'
            });
            // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
            store.dispatch('Logout').then(() => {
              next({ path: loginRoutePath, query: { redirect: to.fullPath } });
            });
          });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } });
      // if current page is login will not trigger afterEach hook, so manually handle it
      NProgress.done();
    }
  }
});

router.afterEach(to => {
  NProgress.done(); // finish progress bar
  store.dispatch('page/open', to);
});
