import Vue from 'vue';
import themePluginConfig from '@/config/themePluginConfig';
import { APP_THEME, APP_THEME_MODE } from '../mutation-types';

export default {
  namespaced: true,
  state: {
    list: themePluginConfig.theme,
    theme: '',
    mode: ''
  },
  mutations: {
    [APP_THEME]: (state, theme) => {
      state.theme = theme;
      Vue.ls.set(APP_THEME, theme);
    },
    [APP_THEME_MODE]: (state, mode) => {
      state.mode = mode;
      Vue.ls.set(APP_THEME_MODE, mode);
    }
  },
  actions: {
    setTheme({ commit, state }, theme) {
      const themeConfig = state.list.find(o => o.key === theme);
      const mode = themeConfig.dark ? 'dark' : 'light';

      return new Promise((resolve, reject) => {
        return Promise.all([themeConfig.theme(), themeConfig.mode()])
          .then(resolve)
          .catch(e => {
            reject(e);
          });
      }).then(() => {
        commit(APP_THEME, theme);
        commit(APP_THEME_MODE, mode);
        document.body.className = `theme-${theme} ${mode}`;
      });
    }
  }
};
