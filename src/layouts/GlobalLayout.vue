/** * @DATE: 2019-08-28 15:11 * @Version: 0.0.1 * @Author: yunchangJia * @Description: * @Update:
整理内容 by yunchangJia 2019-08-28 15:11 */
<template>
  <a-layout>
    <!-- 头部信息 -->
    <global-header
      class="header-box"
      :menuData="menuData"
      :collapsed="collapsed"
      @menuSelect="onMenuSelect"
      @toggleCollapse="toggleCollapse"
    />

    <a-layout class="content-box">
      <!-- 菜单列表当布局为 side 时显示 -->
      <sider-menu
        v-if="layout === 'side'"
        class="menu-fixed"
        :menuData="menuData"
        :collapsed="collapsed"
        :collapsible="true"
        @menuSelect="onMenuSelect"
      />

      <!-- 标签页的插槽位置 -->
      <a-layout class="tab-page-slot">
        <slot name="menuTab"></slot>
        <div class="seatBox">
          <slot></slot>
        </div>
      </a-layout>
    </a-layout>

    <!-- 底部信息 -->
    <a-layout-footer style="padding: 0">
      <global-footer :link-list="linkList" :copyright="copyright" />
    </a-layout-footer>
  </a-layout>
</template>

<script>
/**
 * 组件引入
 * GlobalHeader   头部组件
 * GlobalFooter   底部组件
 * Drawer         底部组件
 * SiderMenu      菜单组件
 */

import GlobalHeader from './GlobalHeader';
import GlobalFooter from './GlobalFooter';
import SiderMenu from '../components/Menu/SiderMenu';

export default {
  name: 'GlobalLayout',
  components: { SiderMenu, GlobalFooter, GlobalHeader },
  data() {
    return {
      menuData: [],
      showSetting: false
    };
  },
  computed: {
    mainMenu() {
      return this.$store.state.permission.addRouters;
    },
    isMobile() {
      return this.$store.state.setting.isMobile;
    },
    layout() {
      return this.$store.state.setting.layout;
    },
    collapsed() {
      return this.$store.state.setting.menuCollapsed;
    },
    linkList() {
      return this.$store.state.setting.footerLinks;
    },
    copyright() {
      return this.$store.state.setting.copyright;
    }
  },
  created() {
    this.menuData = this.mainMenu;
  },
  methods: {
    toggleCollapse() {
      this.$store.commit('setting/setMenuCollapsed', !this.collapsed);
    },
    onDrawerChange(show) {
      this.collapsed = show;
    },

    /**
     * 选择菜单，打开对应路径
     * @param obj
     */
    onMenuSelect(obj) {
      this.$router.push({ path: obj.key });
    },
    onSettingDrawerChange(val) {
      this.showSetting = val;
    }
  }
};
</script>

<style lang="less" scoped>
.header-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
}

.content-box {
  position: relative;
  height: calc(100vh - @layout_header - @layout_footer);
  margin-top: @layout_header;
}

.menu-fixed {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.tab-page-slot {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.seatBox {
  width: 100%;
  height: calc(100vh - @layout_header - @layout_footer - @layout_slideMenu); // 顶部 导航 底部
  overflow: auto;
}
</style>
