/* eslint-disable object-curly-newline */
import storage from '@/utils/storage';
import { PAGE_OPENED } from '@/store/mutation-types';

export default {
  namespaced: true,
  state: {
    opened: storage.get(PAGE_OPENED, []),
    current: ''
  },
  getters: {
    currentRoute: state => {
      let currentRoute = null;
      state.opened.forEach(page => {
        if (page.fullPath === state.current) currentRoute = page;
      });

      return currentRoute;
    }
  },
  mutations: {
    /**
     * @description 设置当前激活的页面 fullPath
     * @param {Object} state state
     * @param {String} fullPath new fullPath
     */
    setCurrent(state, fullPath) {
      state.current = fullPath;
    },

    addOpened(state, newTag) {
      state.opened.push(newTag);
    },

    removeOpenen(state, index) {
      state.opened.splice(index, 1);
    },

    editOpened(state, { fullPath, params, query, meta }) {
      const index = state.opened.findIndex(page => page.fullPath === fullPath);
      const page = state.opened[index];
      page.params = params || page.params;
      page.query = query || page.query;
      page.fullPath = fullPath || page.fullPath;
      page.meta = meta || page.meta;

      state.opened.splice(index, 1, page);
    }
  },
  actions: {
    /**
     * 将 opened 属性赋值并持久化 在这之前请先确保已经更新了 state.opened
     * @param {Object} context
     */
    opened2db({ state }) {
      return new Promise(resolve => {
        // 设置数据
        storage.set(PAGE_OPENED, state.opened);
        // end
        resolve();
      });
    }
  }
};
