/* eslint-disable object-curly-newline */
import router from '@/router';
import storage from '@/utils/storage';
import { pageOpened } from '@/config/defaultSettings';

const PAGE_OPENED = 'page_opened';

export default {
  namespaced: true,
  state: {
    pool: [],
    opened: storage.get(PAGE_OPENED, pageOpened),
    openedLoaded: false,
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
    /**
     * @description 保存 pool (候选池)
     * @param {Object} state state
     * @param {Array} routes routes
     */
    init(state, routes) {
      const pool = [];
      const push = function(routes) {
        routes.forEach(route => {
          if (route.children && route.children.length > 0) {
            push(route.children);
          } else {
            if (!route.hidden) {
              const { meta, name, path } = route;
              pool.push({ meta, name, path });
            }
          }
        });
      };
      push(routes);
      state.pool = pool;
    }
  },
  actions: {
    /**
     * @param {Object} context
     */
    isLoaded({ state }) {
      if (state.openedLoaded) return Promise.resolve();
      return new Promise(resolve => {
        const timer = setInterval(() => {
          if (state.openedLoaded) resolve(clearInterval(timer));
        }, 10);
      });
    },
    /**
     * @description 从持久化数据载入标签页列表
     * @param {Object} context
     */
    async openedLoad({ state, commit, dispatch }) {
      // store 赋值
      const value = storage.get(PAGE_OPENED, pageOpened);
      // 在处理函数中进行数据优化 过滤掉现在已经失效的页签或者已经改变了信息的页签
      // 以 fullPath 字段为准
      // 如果页面过多的话可能需要优化算法
      // valid 有效列表 1, 1, 0, 1 => 有效, 有效, 失效, 有效
      const valid = [];
      // 处理数据
      state.opened = value
        .map(opened => {
          // 忽略首页
          if (opened.fullPath === '/index') {
            valid.push(1);
            return opened;
          }
          // 尝试在所有的支持多标签页的页面里找到 name 匹配的页面
          const find = state.pool.find(item => item.name === opened.name);
          // 记录有效或无效信息
          valid.push(find ? 1 : 0);
          // 返回合并后的数据 新的覆盖旧的
          // 新的数据中一般不会携带 params 和 query, 所以旧的参数会留存
          return { ...opened, ...find };
        })
        .filter((opened, index) => valid[index] === 1);

      state.openedLoaded = true;
    },
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
    },

    /**
     * @description 更新页面列表上的某一项
     * @param {Object} context
     * @param {Object} payload { index, params, query, fullPath, meta } 路由信息
     */
    async openedUpdate({ state, commit, dispatch }, { index, params, query, fullPath }) {
      // 更新页面列表某一项
      const page = state.opened[index];
      page.params = params || page.params;
      page.query = query || page.query;
      page.fullPath = fullPath || page.fullPath;
      state.opened.splice(index, 1, page);
      // 持久化
      await dispatch('opened2db');
    },

    /**
     * @description 新增一个 tag (打开一个页面)
     * @param {Object} context
     * @param {Object} payload new tag info
     */
    async add({ commit, dispatch }, { tag, params, query, fullPath }) {
      // 设置新的 tag 在新打开一个以前没打开过的页面时使用
      const newTag = tag;
      newTag.params = params || newTag.params;
      newTag.query = query || newTag.query;
      newTag.fullPath = fullPath || newTag.fullPath;
      // 添加进当前显示的页面数组
      commit('addOpened', newTag);
      // 持久化
      await dispatch('opened2db');
    },

    /**
     * @description 打开一个新的页面
     * @param {Object} context
     * @param {Object} payload 从路由钩子的 to 对象上获取 { name, params, query, fullPath, meta } 路由信息
     */
    async open({ state, commit, dispatch }, { name, params, query, fullPath, meta }) {
      // 已经打开的页面
      const opened = state.opened;
      // 判断此页面是否已经打开 并且记录位置
      let pageOpendIndex = 0;
      const pageOpend = opened.find((page, index) => {
        const same = page.fullPath === fullPath;
        pageOpendIndex = same ? index : pageOpendIndex;
        return same;
      });

      if (!pageOpend) {
        // 如果这里没有找到 page 代表这个路由虽然在框架内 但是不参与标签页显示
        let page = state.pool.find(t => t.name === name);

        if (page) {
          await dispatch('add', {
            tag: { ...page },
            params,
            query,
            fullPath
          });
        }
      }

      // 设置当前的页面
      commit('setCurrent', fullPath);
    },

    /**
     * @description 关闭一个 tag (关闭一个页面)
     * @param {Object} context
     * @param {Object} payload { tagName: 要关闭的标签名字 }
     */
    async close({ state, commit, dispatch }, { tagName }) {
      // 预定下个新页面
      let newPage = {};
      const isCurrent = state.current === tagName;
      // 如果关闭的页面就是当前显示的页面
      if (isCurrent) {
        // 去找一个新的页面
        const len = state.opened.length;
        for (let i = 0; i < len; i++) {
          if (state.opened[i].fullPath === tagName) {
            newPage = i < len - 1 ? state.opened[i + 1] : state.opened[i - 1];
            break;
          }
        }
      }
      // 找到这个页面在已经打开的数据里是第几个
      const index = state.opened.findIndex(page => page.fullPath === tagName);
      if (index >= 0) {
        // 更新数据 删除关闭的页面
        commit('removeOpenen', index);
      }

      // 持久化
      await dispatch('opened2db');
      // 决定最后停留的页面
      if (isCurrent) {
        const { name = 'index', params = {}, query = {} } = newPage;
        const routerObj = { name, params, query };
        await router.push(routerObj);
      }
    },
    /**
     * @class opened
     * @description 关闭当前标签左边的标签
     * @param {Object} context
     * @param {Object} payload { pageSelect: 当前选中的tagName }
     */
    async closeLeft({ state, commit, dispatch }, { pageSelect } = {}) {
      const pageAim = pageSelect || state.current;
      let currentIndex = 0;
      state.opened.forEach((page, index) => {
        if (page.fullPath === pageAim) currentIndex = index;
      });
      if (currentIndex > 0) {
        // 删除打开的页面 并在缓存设置中删除
        for (let i = state.opened.length - 1; i >= 0; i--) {
          if (state.opened[i].name === 'index' || i >= currentIndex) {
            continue;
          }

          commit('removeOpenen', i);
        }
      }

      // 持久化
      await dispatch('opened2db');
      // 设置当前的页面
      commit('setCurrent', pageAim);
      if (router.app.$route.fullPath !== pageAim) await router.push(pageAim);
    },
    /**
     * @description 关闭当前标签右边的标签
     * @param {Object} context
     * @param {Object} payload { pageSelect: 当前选中的tagName }
     */
    async closeRight({ state, commit, dispatch }, { pageSelect } = {}) {
      const pageAim = pageSelect || state.current;
      let currentIndex = 0;
      state.opened.forEach((page, index) => {
        if (page.fullPath === pageAim) currentIndex = index;
      });
      // 删除打开的页面 并在缓存设置中删除
      for (let i = state.opened.length - 1; i >= 0; i--) {
        if (state.opened[i].name === 'index' || currentIndex >= i) {
          continue;
        }

        commit('removeOpenen', i);
      }

      // 持久化
      await dispatch('opened2db');
      // 设置当前的页面
      commit('setCurrent', pageAim);
      if (router.app.$route.fullPath !== pageAim) await router.push(pageAim);
    },
    /**
     * @description 关闭当前激活之外的 tag
     * @param {Object} context
     * @param {Object} payload { pageSelect: 当前选中的tagName }
     */
    async closeOther({ state, commit, dispatch }, { pageSelect } = {}) {
      const pageAim = pageSelect || state.current;
      let currentIndex = 0;
      state.opened.forEach((page, index) => {
        if (page.fullPath === pageAim) currentIndex = index;
      });
      // 删除打开的页面数据 并更新缓存设置
      for (let i = state.opened.length - 1; i >= 0; i--) {
        if (state.opened[i].name === 'index' || currentIndex === i) {
          continue;
        }

        commit('removeOpenen', i);
      }
      // 设置新的页面
      commit('setCurrent', pageAim);
      if (router.app.$route.fullPath !== pageAim) await router.push(pageAim);
      // 持久化
      await dispatch('opened2db');
    },
    /**
     * @description 关闭所有 tag
     * @param {Object} context
     */
    async closeAll({ state, commit, dispatch }) {
      // 删除打开的页面
      for (let i = state.opened.length - 1; i >= 0; i--) {
        if (state.opened[i].name === 'index') {
          continue;
        }

        commit('removeOpenen', i);
      }
      // 持久化
      await dispatch('opened2db');
      // 关闭所有的标签页后需要判断一次现在是不是在首页
      if (router.app.$route.name !== 'index') {
        await router.push({ name: 'index' });
      }
    }
  }
};
