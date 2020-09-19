<template>
  <a-layout :class="['admin-layout', 'beauty-scroll']">
    <sider-menu
      v-if="layout === 'side' || layout === 'mix'"
      :class="[fixedSideBar ? 'fixed-side' : '']"
      :theme="theme.mode"
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
        <div class="admin-layout-body">
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer style="padding: 0">
        <page-footer :link-list="footerLinks" :copyright="copyright" />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import AdminHeader from './GlobalHeader/AdminHeader';
import PageFooter from './GlobalFooter/PageFooter';
import SiderMenu from './SiderMenu/SiderMenu';
import MultiTab from './MultiTab';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'AdminLayout',
  components: { SiderMenu, PageFooter, AdminHeader, MultiTab },
  data() {
    return {
      collapsed: false
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
    ...mapGetters('setting', ['firstMenu', 'subMenu', 'menuData']),
    sideMenuWidth() {
      return this.collapsed ? '50px' : '216px';
    },
    menus() {
      const routes = this.menuData.find(item => item.path === '/');
      return (routes && routes.children) || [];
    }
  },

  mounted() {
    console.log('admin laoyout');
  },

  methods: {
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
    background: @component-background;

    &.admin-header-fixed {
      position: fixed;
      top: 0;
      z-index: 2;
    }
  }

  .admin-layout-content {
    display: flex;
    flex-direction: column;
    min-height: auto;
  }

  .admin-layout-body {
    position: relative;
    flex: 1;
    height: 100%;
    padding: 12px;
    overflow: auto;
  }
}
</style>
