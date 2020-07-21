import Vue from 'vue';
import themePluginConfig from '@/config/themePluginConfig';
import { APP_THEME } from '../mutation-types';

export default {
  namespaced: true,
  state: {
    list: themePluginConfig.theme,
    theme: ''
  },
  mutations: {
    [APP_THEME]: (state, theme) => {
      state.theme = theme;
      Vue.ls.set(APP_THEME, theme);
    }
  },
  actions: {
    setTheme({ commit, state }, theme) {
      const themeConfig = state.list.find(o => o.key === theme);

      return new Promise((resolve, reject) => {
        return themeConfig
          .less()
          .then(() => {
            resolve();
          })
          .catch(e => {
            reject(e);
          });
      }).then(() => {
        commit(APP_THEME, theme);
        document.body.className = `theme-${theme}`;
      });
    }
  }
};
