import { cloneDeep } from 'lodash-es';
import { constantRouterMap } from '@/config/router.config';
import { generatorDynamicRouter } from '@/router/generator-routers';
import { formatFullPath } from '@/utils/util';
import config from '@/config/setting.config';
import theme from '@/config/theme.config';

export default {
  namespaced: true,
  state: {
    isMobile: false,
    routers: constantRouterMap,
    addRouters: [],
    buttonCodes: [],
    menuBadge: [],
    themeList: theme.list,
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
      state.theme = {
        ...theme
      };
    },
    setThemeBody(state) {
      document.body.className = `theme--${state.theme.mode} theme--${state.theme.name}`;
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
    setFixedHeader(state, fixedHeader) {
      state.fixedHeader = fixedHeader;
    },
    setFixedSideBar(state, fixedSideBar) {
      state.fixedSideBar = fixedSideBar;
    },
    setLang(state, lang) {
      state.lang = lang;
    },
    setRouters: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    },
    setButtonCodes: (state, buttonCodes) => {
      state.buttonCodes = buttonCodes;
    },
    setActiveedFirst: (state, fullPath) => {
      state.activatedFirst = fullPath;
    },
    setAllMenuBadge(state, menuBadge) {
      state.menuBadge = menuBadge;
    },
    setMenuBadge(state, badgeData) {
      const badgePath = badgeData.path;
      const badge = badgeData.badge;
      const menuBadge = cloneDeep(state.menuBadge);
      const badgeIndex = menuBadge.findIndex(badge => badge.path === badgePath);
      if (badgeIndex >= 0) {
        menuBadge[badgeIndex] = badge;
        state.menuBadge = menuBadge;
      } else {
        state.menuBadge.push(badge);
      }
    },
    removeMenuBadge(state, badgePath) {
      const badgeIndex = state.menuBadge.findIndex(badge => {
        return badge.path === badgePath;
      });

      if (badgeIndex >= 0) {
        state.menuBadge.splice(badgeIndex, 1);
      }
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise((resolve, reject) => {
        generatorDynamicRouter()
          .then(({ routers, buttonCodes }) => {
            commit('setRouters', routers);
            commit('setButtonCodes', buttonCodes);
            resolve(routers);
          })
          .catch(e => {
            reject(new Error('获取当前用户菜单失败'));
          });
      });
    },

    UpdateTheme({ state, commit }, themeName) {
      return new Promise(resolve => {
        let theme = state.themeList.find(e => e.name === themeName);
        if (!theme) {
          theme = state.themeList[0];
        }

        commit('setTheme', theme);
        commit('setThemeBody');

        // 加载主题
        import(`@/assets/style/theme/${themeName}/index.less`);

        // 加载黑白主题 JS
        import(`@/assets/style/mode/${theme.mode}/index.js`);
      });
    }
  }
};
