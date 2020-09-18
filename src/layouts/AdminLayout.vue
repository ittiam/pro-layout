<template>
  <a-layout :class="['admin-layout', 'beauty-scroll']">
    <sider-menu
      v-if="layout === 'side' || layout === 'mix'"
      :class="[fixedSideBar ? 'fixed-side' : '']"
      :theme="theme.mode"
      :menuData="sideMenuData"
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
      <admin-header
        :menuData="headMenuData"
        :collapsed="collapsed"
        :sideMenuWidth="sideMenuWidth"
      />
      <a-layout-content class="admin-layout-content">
        <multi-tab v-if="multiPage" />
        <div class="admin-layout-main">
          <slot></slot>
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
import { mapState, mapMutations, mapGetters } from 'vuex';

const minHeight = window.innerHeight - 64 - 24 - 122;

export default {
  name: 'AdminLayout',
  components: { SiderMenu, PageFooter, AdminHeader, MultiTab },
  data() {
    return {
      minHeight: minHeight,
      collapsed: false,
      showSetting: false,
      drawerOpen: false
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
    headMenuData() {
      const { layout, menuData, firstMenu } = this;
      return layout === 'mix' ? firstMenu : menuData;
    },
    sideMenuData() {
      const { layout, menuData, subMenu } = this;
      return layout === 'mix' ? subMenu : menuData;
    }
  },
  watch: {
    $route(val) {
      this.setActivated(val);
    },
    layout() {
      this.setActivated(this.$route);
    },
    isMobile(val) {
      if (!val) {
        this.drawerOpen = false;
      }
    }
  },

  created() {
    this.setActivated(this.$route);
  },
  methods: {
    ...mapMutations('setting', ['setActivatedFirst']),
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
    onMenuSelect() {
      this.toggleCollapse();
    },
    setActivated(route) {
      if (this.layout === 'mix') {
        let matched = route.matched;
        matched = matched.slice(0, matched.length - 1);
        const { firstMenu } = this;
        for (let menu of firstMenu) {
          if (matched.findIndex(item => item.path === menu.fullPath) !== -1) {
            this.setActivatedFirst(menu.fullPath);
            break;
          }
        }
      }
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

  .admin-layout-main {
    position: relative;
    flex: 1;
    overflow: 100%;
  }
}
</style>
