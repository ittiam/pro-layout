import * as loginService from '@/api/login';

// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: '*',
  redirect: '/404',
  hidden: true
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
        const { resultData = [] } = res;
        const routers = generator(resultData);
        routers.push(notFoundRouter);
        console.log('routers', routers);
        resolve(routers);
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
export const generator = routerMap => {
  return routerMap.map(item => {
    const currentRouter = {
      ...item,
      meta: {
        ...item.meta,
        icon: item.icon,
        iconCls: item.iconCls,
        title: item.name
      }
    };

    currentRouter.component = () => import(`@/views/${item.component}`);
    if (item.children) {
      currentRouter.children = generator(item.children);
    }
    return currentRouter;
  });
};
