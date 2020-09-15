<template>
  <div>
    <a-tabs
      v-if="multipage"
      id="menuTabs"
      slot="menuTab"
      :active-key="current"
      :hide-add="true"
      type="editable-card"
      :class="{ deepBule: isdeepBlue }"
      @contextmenu.native="e => onContextmenu(e)"
      @change="changePage"
      @edit="editPage"
    >
      <a-tab-pane id="/" key="/" :closable="indexClosable">
        <span slot="tab" class="homePageIcon" pagekey="/">
          <a-icon class="wfc2" theme="filled" type="home" />
        </span>
      </a-tab-pane>
      <a-tab-pane
        v-for="page in opened"
        :id="page.id"
        :key="page.fullPath"
        :closable="page.meta && page.meta.closable"
      >
        <span slot="tab" :pagekey="page.path">
          {{ page.meta && page.meta.title ? page.meta.title : page.name }}
        </span>
      </a-tab-pane>
    </a-tabs>
    <div class="handleIconBox wbgc-tab">
      <a-tooltip v-if="currentBrowserType !== 'IE'" placement="bottom">
        <span slot="title">{{ isFullScreen ? '退出全屏' : '全屏' }}</span>
        <i
          :class="
            'fullScreen wpgicon wfc3 wfc-hover ' +
              (isFullScreen ? 'icon-ic_fullscreen_exit' : 'icon-ic_zoom_out_map')
          "
          @click="handleFullScreen"
        ></i>
      </a-tooltip>
      <a-tooltip placement="bottomRight">
        <span slot="title">关闭标签页</span>
        <i
          class="closeRoute wpgicon icon-ic_bookmark_border wfc3 wfc-hover"
          @click="toClosePage"
        ></i>
      </a-tooltip>
    </div>
    <div v-show="tabRouterVisible" class="tabRouteBox" @click="toClosePage">
      <ul class="contextMenuList wbgc-dropdown wfc2">
        <li
          v-for="item in tabRouteItemList"
          :key="item.key"
          class="wbgc-dropdown-hover wfc1-hover wfs14"
          @click="onMenuSelect(item.key)"
        >
          <i class="wpgicon" :class="'icon-' + item.icon"></i>
          <span>{{ item.text }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'MenuTab',
  data() {
    return {
      darkTheme: ['deepBlue'],
      isDark: false,
      tabRouterVisible: false, // 关闭标签页的操作窗口
      indexClosable: false,
      menuVisible: false,
      tabRouteItemList: [
        // { key: '0', icon: 'ic_refresh', text: '刷新当前页面' },
        { key: '1', icon: 'ic_chevron_left', text: '关闭左侧页面' },
        { key: '2', icon: 'ic_chevron_right', text: '关闭右侧页面' },
        { key: '3', icon: 'ic_close', text: '关闭其它页面' }
      ],
      isFullScreen: false
    };
  },
  computed: {
    ...mapState('page', ['opened', 'current']),
    multipage() {
      return this.$store.state.setting.multipage;
    },
    theme() {
      return this.$store.state.setting.theme;
    },
    /**
     * 监听当前主题
     */
    isdeepBlue() {
      if (this.baseTheme === 'dark') {
        return true;
      } else {
        return false;
      }
    },
    currentBrowserType() {
      return this.getBrowserType();
    }
  },
  created() {
    this.isDark = this.darkTheme.includes(this.theme);
  },
  mounted() {
    window.onresize = () => {
      if (!this.ifFullScreenFunc()) {
        this.isFullScreen = false;
      }
    };
  },
  methods: {
    ...mapActions('page', ['close', 'closeLeft', 'closeRight', 'closeOther']),
    changePage(key) {
      // 找到点击的页面在 tag 列表里是哪个
      const page = this.opened.find(page => page.fullPath === key);
      const { name, params, query } = page;
      if (page) {
        this.$router.push({ name, params, query });
      }
    },
    editPage(key, action) {
      this[action](key);
    },
    remove(tagName) {
      if (this.opened.length === 1) {
        this.$message.warning('这是最后一页，不能再关闭了啦');
        return;
      }
      this.close({ tagName });
    },
    onContextmenu(e) {
      const pagekey = this.getPageKey(e.target);
      if (pagekey !== null) {
        e.preventDefault();
        this.menuVisible = true;
      }
    },
    /**
     * 由于ant-design-vue组件库的TabPane组件暂不支持自定义监听器，无法直接获取到右键target所在标签页的 pagekey 。故增加此方法用于
     * 查询右键target所在标签页的标识 pagekey ，以用于自定义右键菜单的事件处理。
     * 注：TabPane组件支持自定义监听器后可去除该方法并重构 ‘自定义右键菜单的事件处理’
     * @param target 查询开始目标
     * @param count 查询层级深度 （查找层级最多不超过3层，超过3层深度直接返回 null）
     * @returns {String}
     */
    getPageKey(target, depth) {
      depth = depth || 0;
      if (depth > 2) {
        return null;
      }
      let pageKey = target.getAttribute('pagekey');
      pageKey =
        pageKey ||
        (target.previousElementSibling
          ? target.previousElementSibling.getAttribute('pagekey')
          : null);
      return (
        pageKey ||
        (target.firstElementChild ? this.getPageKey(target.firstElementChild, ++depth) : null)
      );
    },
    onMenuSelect(key, tagName) {
      // let pageKey = this.getPageKey(target);
      // let pageKey = this.activePage;
      const params = {
        pageSelect: tagName
      };
      switch (key) {
        case '0':
          this.refreshCurr(this.activePage);
          break;
        case '1':
          this.closeLeft(params);
          break;
        case '2':
          this.closeRight(params);
          break;
        case '3':
          this.closeOther(params);
          break;
        default:
          break;
      }
      this.tabRouterVisible = false;
    },
    refreshCurr(pageKey) {},

    // 操作关闭其他页面
    toClosePage() {
      this.tabRouterVisible = !this.tabRouterVisible;
    },
    // 全屏
    fullScreen() {
      // alert('full')
      let el = document.documentElement;
      let rfs =
        el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullScreen;
      if (typeof rfs !== 'undefined' && rfs) {
        rfs.call(el);
      } else if (typeof window.ActiveXObject !== 'undefined') {
        // for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
        let wscript = new ActiveXObject('WScript.Shell');
        if (wscript !== null) {
          wscript.SendKeys('{F11}');
        }
      }
    },
    // 退出全屏
    exitFullScreen() {
      // alert('exit')
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    },
    // 判断是否全屏
    ifFullScreenFunc() {
      return !!(
        window.fullScreen ||
        document.webkitIsFullScreen ||
        document.mozFullScreen ||
        document.msFullscreenElement ||
        document.fullscreenElement
      );
    },
    handleFullScreen() {
      if (!this.ifFullScreenFunc()) {
        this.fullScreen();
        this.isFullScreen = true;
      } else {
        this.exitFullScreen();
        this.isFullScreen = false;
      }
      // this.isFullScreen = !this.isFullScreen;
    },
    getBrowserType() {
      let userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
      let isOpera = userAgent.indexOf('Opera') > -1;
      if (isOpera) {
        return 'Opera';
      } // 判断是否Opera浏览器
      if (userAgent.indexOf('Firefox') > -1) {
        return 'FF';
      } // 判断是否Firefox浏览器
      if (userAgent.indexOf('Chrome') > -1) {
        return 'Chrome';
      }
      if (userAgent.indexOf('Safari') > -1) {
        return 'Safari';
      } // 判断是否Safari浏览器
      if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
        return 'IE';
      } // 判断是否IE浏览器
      if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        // 判断是否是IE11
        return 'IE';
      }
      if (userAgent.indexOf('MSIE') > -1) {
        return 'IE';
      }
      return '';
    }
  }
};
</script>

<style lang="less" scoped>
.tabRouteBox {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 111;
  width: 100%;
  height: 100%;

  .contextMenuList {
    position: fixed;
    top: 70px;
    right: 10px;
    z-index: 222;
    width: 150px;
    height: auto;
    border-radius: 4px;

    li {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      height: 50px;
      cursor: pointer;

      i {
        display: flex;
        flex: none;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
      }

      span {
        flex: 1;
      }
    }
  }
}

.tabsItemBox {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: @layout_slideMenu;

  .handleIconBox {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80px;
    height: 100%;
    font-size: 14px;

    .handleItem {
      cursor: pointer;
    }
  }
}
</style>
