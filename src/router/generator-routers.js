import * as loginService from '@/api/login';
import { AdminLayout, BlankLayout, RouteLayout } from '@/layouts';

const constantRouterComponents = {
  AdminLayout: AdminLayout,
  BlankLayout: BlankLayout,
  RouteLayout: RouteLayout
};

// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: '*',
  redirect: '/404',
  hidden: true
};

// 根级菜单
const rootRouter = {
  key: '',
  name: 'index',
  path: '/',
  component: 'AdminLayout',
  redirect: '/workspace',
  meta: {
    title: '首页'
  },
  children: []
};

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = token => {
  return new Promise((resolve, reject) => {
    loginService
      .getCurrentUserNav(token)
      .then(res => {
        console.log('res', res);
        const { resultData } = res;
        const menuNav = [];
        const childrenNav = resultData.menuTrees || [];
        const buttonCodes = resultData.buttonCodes || [];
        rootRouter.children = childrenNav;
        menuNav.push(rootRouter);
        console.log('menuNav', menuNav);
        const routers = generator(menuNav);
        routers.push(notFoundRouter);
        console.log('routers', routers);
        resolve({ routers, buttonCodes });
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent) => {
  return routerMap.map(item => {
    const { name, target, icon, iconCls, showFlag } = item || {};
    const { title } = item.meta || {};
    const hidden = !showFlag;

    const currentRouter = {
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.path || `${(parent && parent.path) || ''}/${item.key}`,
      // 路由名称，建议唯一
      name: item.id || item.name || '',
      component:
        constantRouterComponents[item.component || item.key] ||
        (() => import(`@/views/${item.component}`)),
      hidden: hidden,

      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: title || name,
        icon: icon || undefined,
        iconCls,
        target: target,
        hidden: hidden
      }
    };

    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/');
    }
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect);

    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter);
    }

    return currentRouter;
  });
};
