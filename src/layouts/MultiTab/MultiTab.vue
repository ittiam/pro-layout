<script>
import './index.less';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import events from './events';
import FullScreen from './FullScreen';

export default {
  name: 'MultiTab',
  components: {
    FullScreen
  },
  data() {
    return {
      pool: [],
      menuEventEnum: [
        { action: 'closeThat', name: '关闭当前标签' },
        { action: 'closeRight', name: '关闭右侧' },
        { action: 'closeLeft', name: '关闭左侧' },
        { action: 'closeOther', name: '关闭其他' }
      ]
    };
  },
  computed: {
    ...mapState('page', ['current', 'opened']),
    ...mapGetters('setting', ['menuData'])
  },
  watch: {
    $route: function(newVal) {
      this.open(newVal);
    }
  },
  created() {
    // bind event
    events
      .$on('open', val => {
        let page = null;
        if (!val) {
          throw new Error(`multi-tab: open tab ${val} err`);
        }
        if (typeof val === 'string') {
          page = this.opened.find(page => page.fullPath === val);
        } else {
          page = val;
        }

        const { name, params, query } = page;
        this.$router.push({ name, params, query });
      })
      .$on('close', val => {
        if (!val) {
          this.remove(this.current);
          return;
        }
        this.remove(val);
      })
      .$on('rename', ({ key, name }) => {
        try {
          const item = this.opened.find(item => item.path === key);

          this.editOpened({ fullPath: key, meta: { ...item.meta, customTitle: name } });
          this.opened2db();
          this.$forceUpdate();
        } catch (e) {}
      });

    this.init(this.menuData);
    this.open(this.$route);
  },
  methods: {
    ...mapMutations('page', ['setCurrent', 'addOpened', 'removeOpenen', 'editOpened']),
    ...mapActions('page', ['opened2db']),
    init(routes) {
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
      this.pool = pool;
    },

    /**
     * @description 更新页面列表上的某一项
     * @param {Object} context
     * @param {Object} payload { index, params, query, fullPath, meta } 路由信息
     */
    async openedUpdate({ params, query, fullPath }) {
      // 更新页面列表某一项
      this.editOpened({ params, query, fullPath });
      // 持久化
      await this.opened2db();
    },

    /**
     * @description 新增一个 tag (打开一个页面)
     * @param {Object} context
     * @param {Object} payload new tag info
     */
    async add({ tag, params, query, fullPath }) {
      // 设置新的 tag 在新打开一个以前没打开过的页面时使用
      const newTag = tag;
      newTag.params = params || newTag.params;
      newTag.query = query || newTag.query;
      newTag.fullPath = fullPath || newTag.fullPath;
      // 添加进当前显示的页面数组
      this.addOpened(newTag);
      // 持久化
      await this.opened2db();
    },

    /**
     * @description 打开一个新的页面
     * @param {Object} context
     * @param {Object} payload 从路由钩子的 to 对象上获取 { name, params, query, fullPath, meta } 路由信息
     */
    async open({ name, params, query, fullPath, meta }) {
      // 已经打开的页面
      const opened = this.opened;
      // 判断此页面是否已经打开 并且记录位置
      let pageOpendIndex = 0;
      const pageOpend = opened.find((page, index) => {
        const same = page.fullPath === fullPath;
        pageOpendIndex = same ? index : pageOpendIndex;
        return same;
      });

      if (pageOpend) {
        await this.openedUpdate({
          params,
          query,
          fullPath
        });
      } else {
        // 如果这里没有找到 page 代表这个路由虽然在框架内 但是不参与标签页显示
        let page = this.pool.find(t => t.name === name);

        if (page) {
          await this.add({
            tag: { ...page },
            params,
            query,
            fullPath
          });
        }
      }

      // 设置当前的页面
      this.setCurrent(fullPath);
    },

    /**
     * @description 关闭一个 tag (关闭一个页面)
     * @param {Object} context
     * @param {Object} payload { tagName: 要关闭的标签名字 }
     */
    async close({ tagName }) {
      // 预定下个新页面
      let newPage = {};
      const isCurrent = this.current === tagName;
      // 如果关闭的页面就是当前显示的页面
      if (isCurrent) {
        // 去找一个新的页面
        const len = this.opened.length;
        for (let i = 0; i < len; i++) {
          if (this.opened[i].fullPath === tagName) {
            newPage = i < len - 1 ? this.opened[i + 1] : this.opened[i - 1];
            break;
          }
        }
      }
      // 找到这个页面在已经打开的数据里是第几个
      const index = this.opened.findIndex(page => page.fullPath === tagName);
      if (index >= 0) {
        // 更新数据 删除关闭的页面
        this.removeOpenen(index);
      }

      // 持久化
      await this.opened2db();
      // 决定最后停留的页面
      if (isCurrent) {
        const { name = 'index', params = {}, query = {} } = newPage;
        const routerObj = { name, params, query };
        await this.$router.push(routerObj);
      }
    },

    /**
     * @class opened
     * @description 关闭当前标签左边的标签
     * @param {Object} context
     * @param {Object} payload { pageSelect: 当前选中的tagName }
     */
    async closeLeft({ pageSelect } = {}) {
      const pageAim = pageSelect || this.current;
      let currentIndex = 0;
      this.opened.forEach((page, index) => {
        if (page.fullPath === pageAim) currentIndex = index;
      });
      if (currentIndex > 0) {
        // 删除打开的页面 并在缓存设置中删除
        for (let i = this.opened.length - 1; i >= 0; i--) {
          if (this.opened[i].name === 'index' || i >= currentIndex) {
            continue;
          }

          this.removeOpenen(i);
        }
      }

      // 持久化
      await this.opened2db();
      // 设置当前的页面
      this.setCurrent(pageAim);
      if (this.$route.fullPath !== pageAim) await this.$router.push(pageAim);
    },
    /**
     * @description 关闭当前标签右边的标签
     * @param {Object} context
     * @param {Object} payload { pageSelect: 当前选中的tagName }
     */
    async closeRight({ pageSelect } = {}) {
      const pageAim = pageSelect || this.current;
      let currentIndex = 0;
      this.opened.forEach((page, index) => {
        if (page.fullPath === pageAim) currentIndex = index;
      });
      // 删除打开的页面 并在缓存设置中删除
      for (let i = this.opened.length - 1; i >= 0; i--) {
        if (this.opened[i].name === 'index' || currentIndex >= i) {
          continue;
        }

        this.removeOpenen(i);
      }

      // 持久化
      await this.opened2db();
      // 设置当前的页面
      this.setCurrent(pageAim);
      if (this.$route.fullPath !== pageAim) await this.$router.push(pageAim);
    },
    /**
     * @description 关闭当前激活之外的 tag
     * @param {Object} context
     * @param {Object} payload { pageSelect: 当前选中的tagName }
     */
    async closeOther({ pageSelect } = {}) {
      const pageAim = pageSelect || this.current;
      let currentIndex = 0;
      this.opened.forEach((page, index) => {
        if (page.fullPath === pageAim) currentIndex = index;
      });
      // 删除打开的页面数据 并更新缓存设置
      for (let i = this.opened.length - 1; i >= 0; i--) {
        if (this.opened[i].name === 'index' || currentIndex === i) {
          continue;
        }

        this.removeOpenen(i);
      }
      // 设置新的页面
      this.setCurrent(pageAim);
      if (this.$route.fullPath !== pageAim) await this.$router.push(pageAim);
      // 持久化
      await this.opened2db();
    },
    /**
     * @description 关闭所有 tag
     * @param {Object} context
     */
    async closeAll() {
      // 删除打开的页面
      for (let i = this.opened.length - 1; i >= 0; i--) {
        if (this.opened[i].name === 'index') {
          continue;
        }

        this.removeOpenen(i);
      }
      // 持久化
      await this.opened2db();
      // 关闭所有的标签页后需要判断一次现在是不是在首页
      if (this.$route.name !== 'index') {
        await this.$router.push({ name: 'index' });
      }
    },

    onEdit(targetKey, action) {
      this[action](targetKey);
    },

    onChange(name) {
      // 找到点击的页面在 tag 列表里是哪个
      const page = this.opened.find(page => page.fullPath === name);
      if (page) {
        const { name, params, query } = page;
        this.$router.push({ name, params, query });
      }
    },

    remove(tagName) {
      if (this.opened.length === 1) {
        this.$message.warning('这是最后一页，不能再关闭了啦');
        return;
      }
      this.close({ tagName });
    },

    closeThat({ pageSelect } = {}) {
      this.remove(pageSelect);
    },

    closeMenuClick(key, route) {
      this[key]({
        pageSelect: route
      });
    },

    renderTabPaneMenu(e) {
      const menus = this.menuEventEnum.map(item => {
        return <a-menu-item key={item.action}>{item.name}</a-menu-item>;
      });
      return (
        <a-menu
          {...{
            on: {
              click: ({ key, item, domEvent }) => {
                this.closeMenuClick(key, e);
              }
            }
          }}
        >
          {menus}
        </a-menu>
      );
    },
    // render
    renderTabPane(title, keyPath) {
      const menu = this.renderTabPaneMenu(keyPath);
      return (
        <a-dropdown overlay={menu} trigger={['contextmenu']}>
          <span style={{ userSelect: 'none' }}>{title}</span>
        </a-dropdown>
      );
    }
  },

  render() {
    const { onEdit, onChange, opened } = this;

    const panes = opened.map(page => {
      return (
        <a-tab-pane
          style={{ height: 0 }}
          tab={this.renderTabPane(page.meta.customTitle || page.meta.title, page.fullPath)}
          key={page.fullPath}
          // closable={pages.length > 1}
        ></a-tab-pane>
      );
    });

    const extraMenus = this.renderTabPaneMenu(this.$route.fullPath);

    return (
      <div class="pro-multi-tab">
        <div class="pro-multi-tab-wrapper">
          <a-tabs
            hideAdd
            type={'editable-card'}
            activeKey={this.current}
            tabBarStyle={{ margin: 0 }}
            {...{ on: { edit: onEdit, change: onChange } }}
          >
            <a-tab-pane class="pro-multi-tab-home" closable={false}>
              <span slot="tab">
                <a-icon theme="filled" type="home" />
              </span>
            </a-tab-pane>
            {panes}
          </a-tabs>
        </div>
        <div class="pro-multi-tab-action">
          <full-screen />
          <a-dropdown overlay={extraMenus}>
            <i class="pro-multi-action-item wpgicon icon-ic_bookmark_border"></i>
          </a-dropdown>
        </div>
      </div>
    );
  }
};
</script>
