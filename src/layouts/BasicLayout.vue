<template>
  <a-layout :class="['basic-layout', isShowTheme ? '' : 'default-color']">
    <!-- 头部信息 -->
    <global-header
      :class="['header-box', collapsed ? 'collapsed' : '']"
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
      >
        <template slot="header">
          <div class="sidemenu-header" :class="{ collapsed: collapsed }">
            <div v-if="!collapsed" :class="['logo', 'sidemenu-logo-txt', currentTheme]">
              <img class="logoStyle" src="@/assets/images/logo.png" />
              <span class="wfs14">{{ companyName }}</span>
            </div>
            <img v-else src="@/assets/images/logo_collapsed.png" />
            <div class="divider-border"></div>
          </div>
        </template>
        <template slot="footer">
          <div class="sidemenu-footer">
            <div class="divider-border"></div>
            <div :class="['logo', 'sidemenu-logo-txt', currentTheme]" @click="toggleCollapse">
              <i
                :class="[
                  'trigger',
                  'wfs20',
                  'sidemenu-icon',
                  collapsed ? 'icon-ic_fullscreen' : 'icon-ic_fullscreen_exit'
                ]"
              ></i>
              <span v-if="!collapsed" class="wfs14">{{ collapsed ? '展开导航' : '收起导航' }}</span>
            </div>
          </div>
        </template>
      </sider-menu>

      <!-- 标签页的插槽位置 -->
      <a-layout class="tab-page-slot">
        <slot name="menuTab"></slot>
        <div class="seatBox">
          <slot></slot>
        </div>
      </a-layout>
    </a-layout>

    <!-- 底部信息 -->
    <a-layout-footer v-if="" :class="['footer-box', collapsed ? 'collapsed' : '']">
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

import GlobalHeader from './BasicHeader';
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
    companyName() {
      return this.$store.state.setting.companyName;
    },
    isShowTheme() {
      return this.$store.state.setting.isShowTheme;
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
@layout_footer: 0;

.basic-layout {
  height: 100%;
}

.header-box {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 99;
  width: calc(100% - @menu-width);
  height: @layout_header;

  &.collapsed {
    width: calc(100% - @menu-collapsed-width);
  }
}

.footer-box {
  position: fixed;
  right: 0;
  bottom: 0;
  width: calc(100% - @menu-width);
  height: @layout_footer;
  padding: 0;
  overflow: hidden;

  &.collapsed {
    width: calc(100% - @menu-collapsed-width);
  }
}

.content-box {
  position: relative;
  height: 100% !important;

  /deep/ .menu-fixed {
    height: auto;
  }
}

.menu-fixed {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  .sidemenu-header {
    padding: 22px 14px 0;

    .divider-border {
      padding-top: 22px;
      border-bottom-width: 1px;
    }
  }

  .sidemenu-footer {
    padding: 0 14px 11px;

    .divider-border {
      padding-bottom: 11px;
      border-top-width: 1px;
    }
  }

  .sidemenu-header,
  .sidemenu-footer {
    .logo {
      display: inline-block;
      height: 26px;
      line-height: 26px;
      white-space: nowrap;

      img {
        width: auto;
        height: 26px;
      }

      * {
        vertical-align: middle;
      }
    }

    .divider-border {
      border-style: solid;
      opacity: 0.3;
    }
  }
}

.tab-page-slot {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: @layout_header;
  padding-bottom: @layout_footer;
  overflow: hidden;
}

.seatBox {
  width: 100%;
  height: calc(100vh - @layout_header - @layout_footer - @layout_slideMenu); // 顶部 导航 底部
  overflow: auto;
}
</style>
