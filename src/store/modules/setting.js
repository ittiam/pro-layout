import { constantRouterMap } from '@/config/router.config';
import { generatorDynamicRouter } from '@/router/generator-routers';
import { formatFullPath } from '@/utils/util';
import config from '@/config/setting.config';

export default {
  namespaced: true,
  state: {
    isMobile: false,
    routers: constantRouterMap,
    addRouters: [],
    activatedFirst: undefined,
    ...config
  },
  getters: {
    menuData(state) {
      return state.addRouters;
    },
    firstMenu(state) {
      const { addRouters: menuData } = state;
      if (menuData.length > 0 && !menuData[0].fullPath) {
        formatFullPath(menuData);
      }
      return menuData.map(item => {
        const menuItem = { ...item };
        delete menuItem.children;
        return menuItem;
      });
    },
    subMenu(state) {
      const { addRouters: menuData, activatedFirst } = state;
      if (!menuData[0].fullPath) {
        formatFullPath(menuData);
      }
      const current = menuData.find(menu => menu.fullPath === activatedFirst);
      return current && current.children ? current.children : [];
    }
  },
  mutations: {
    setDevice(state, isMobile) {
      state.isMobile = isMobile;
    },
    setTheme(state, theme) {
      state.theme = theme;
    },
    setLayout(state, layout) {
      state.layout = layout;
    },
    setMenuCollapsed(state, menuCollapsed) {
      state.menuCollapsed = menuCollapsed;
    },
    setMultipage(state, multipage) {
      state.multipage = multipage;
    },
    setRouters: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    },
    setActiveedFirst: (state, fullPath) => {
      state.activatedFirst = fullPath;
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { token } = data;
        generatorDynamicRouter(token).then(routers => {
          commit('setRouters', routers);
          resolve();
        });
      });
    }
  }
};
