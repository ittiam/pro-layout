<template>
  <a-layout :class="['admin-layout', 'beauty-scroll']">
    <sider-menu
      v-if="layout === 'side' || layout === 'mix'"
      :class="[fixedSideBar ? 'fixed-side' : '']"
      :theme="theme.sideMode"
      :menuData="menus"
      :collapsed="collapsed"
      :collapsible="true"
      @toggleCollapse="toggleCollapse"
    />
    <div
      v-if="fixedSideBar && !isMobile"
      :style="`width: ${sideMenuWidth}; min-width: ${sideMenuWidth};max-width: ${sideMenuWidth};`"
      class="virtual-side"
    ></div>
    <a-layout class="admin-layout-main beauty-scroll">
      <admin-header :menuData="menus" :collapsed="collapsed" :sideMenuWidth="sideMenuWidth" />
      <a-layout-content class="admin-layout-content">
        <multi-tab v-if="multiPage" />
        <div class="admin-layout-body" :class="{ 'admin-layout-frame': showFrame }">
          <a-keep-alive v-model="closed" :exclude="exclude">
            <router-view :key="$route.fullPath" />
          </a-keep-alive>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import AdminHeader from './GlobalHeader/AdminHeader';
import SiderMenu from './SiderMenu/SiderMenu';
import MultiTab from './MultiTab';
import AKeepAlive from './AKeepAlive';
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'AdminLayout',
  components: { SiderMenu, AdminHeader, MultiTab, AKeepAlive },
  data() {
    return {
      collapsed: false,
      refreshing: false,
      closed: [],
      exclude: ['FormManage', 'FlowManage']
    };
  },
  computed: {
    ...mapState('setting', [
      'isMobile',
      'theme',
      'layout',
      'multiPage',
      'footerLinks',
      'copyright',
      'fixedHeader',
      'fixedSideBar',
      'hideSetting'
    ]),
    ...mapState('page', ['opened', 'clearCaches']),
    ...mapGetters('page', ['currentRoute']),
    ...mapGetters('setting', ['firstMenu', 'subMenu', 'menuData']),
    sideMenuWidth() {
      return this.collapsed ? '50px' : '216px';
    },
    menus() {
      const routes = this.menuData.find(item => item.path === '/');
      return (routes && routes.children) || [];
    },
    showFrame() {
      return this.currentRoute && this.currentRoute.meta && this.currentRoute.meta.iframeSrc;
    }
  },

  watch: {
    clearCaches(val) {
      this.closed = val;
    }
  },

  methods: {
    ...mapMutations('page', ['setCachedKey']),
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
    onMenuSelect() {
      this.toggleCollapse();
    }
  }
};
</script>

<style lang="less">
.admin-layout {
  height: 100%;

  .side-menu {
    &.fixed-side {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
    }
  }

  .virtual-side {
    transition: all 0.2s;
  }

  .ant-layout-header {
    height: @pro-header-height;
    line-height: @pro-header-height;
    background: #fff;

    &.admin-header-fixed {
      position: fixed;
      top: 0;
      z-index: 2;
    }
  }

  .admin-layout-content {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: auto;
    overflow: hidden;
  }

  .admin-layout-body {
    position: relative;
    flex: 1;
    height: 100%;
    padding: 12px;
    overflow: auto;
  }

  .admin-layout-footer {
    background: #fff;
  }
}
</style>
