/* eslint-disable object-curly-newline */
import storage from '@/utils/storage';
import { PAGE_OPENED } from '@/store/mutation-types';
import uniq from 'lodash.uniq';
import cloneDeep from 'lodash.clonedeep';
import get from 'lodash.get';

// 判定是否需要缓存
const isKeepAlive = data => get(data, 'meta.cache', false);

export default {
  namespaced: true,
  state: {
    opened: storage.get(PAGE_OPENED, []),
    clearCaches: [],
    keepAlive: [],
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
     * @class keepAlive
     * @description 从已经打开的页面记录中更新需要缓存的页面记录
     * @param {Object} state state
     */
    keepAliveRefresh(state) {
      state.keepAlive = state.opened.filter(item => isKeepAlive(item)).map(e => e.name);
    },
    /**
     * @description 删除一个页面的缓存设置
     * @param {Object} state state
     * @param {String} name name
     */
    keepAliveRemove(state, name) {
      const list = cloneDeep(state.keepAlive);
      const index = list.findIndex(item => item === name);
      if (index !== -1) {
        list.splice(index, 1);
        state.keepAlive = list;
      }
    },
    /**
     * @description 增加一个页面的缓存设置
     * @param {Object} state state
     * @param {String} name name
     */
    keepAlivePush(state, name) {
      const keep = cloneDeep(state.keepAlive);
      keep.push(name);
      state.keepAlive = uniq(keep);
    },
    /**
     * @description 清空页面缓存设置
     * @param {Object} state state
     */
    keepAliveClean(state) {
      state.keepAlive = [];
    },
    /**
     * @description 设置当前激活的页面 fullPath
     * @param {Object} state state
     * @param {String} fullPath new fullPath
     */
    setCurrent(state, fullPath) {
      state.current = fullPath;
    },

    setClearCaches(state, clearCaches) {
      state.clearCaches = [...clearCaches];
    },

    addOpened(state, newTag) {
      state.opened.push(newTag);
    },

    removeOpened(state, index) {
      state.opened.splice(index, 1);
    },

    replaceOpened(state, { index, page }) {
      state.opened.splice(index, 1, page);
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
