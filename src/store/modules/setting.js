/**
 * @DATE:  2019/6/26 15:16
 * @Version: 0.0.1
 * @Author: yunchangJia
 * @Description: 设置页面信息
 * @Update: 主题禁止展示优化 by yunchangJia 2020-03-03 10:01
 */

/**
 * config require project config
 */
import config from '@/config/defaultSettings';

/* 页面一些设置的状态管理 */
const state = {
  companyName: config.companyName,
  isMobile: config.isMobile,
  theme: config.theme,
  darkTheme: config.darkTheme,
  isShowTheme: config.isShowTheme,
  layout: config.layout,
  menuCollapsed: config.menuCollapsed,
  systemName: config.systemName,
  copyright: config.copyright,
  sysMenuList: config.sysMenuList,
  footerLinks: [
    // {link: 'https://pro.ant.design', name: 'Pro首页'},
    // {link: 'https://github.com/iczer/vue-antd-admin', icon: 'github'},
    // {link: 'https://ant.design', name: 'Ant Design'}
  ],
  multipage: config.multipage
};

if (localStorage.getItem('theme') && config.theme !== '' && config.isShowTheme) {
  state.theme = localStorage.getItem('theme');
}

export default {
  namespaced: true,
  state,
  mutations: {
    setDevice(state, isMobile) {
      state.isMobile = isMobile;
    },
    setTheme(state, theme) {
      state.theme = theme;
      localStorage.setItem('theme', theme);
    },
    setLayout(state, layout) {
      state.layout = layout;
    },
    setMenuCollapsed(state, menuCollapsed) {
      state.menuCollapsed = menuCollapsed;
    },
    setMultipage(state, multipage) {
      state.multipage = multipage;
    }
  }
};
