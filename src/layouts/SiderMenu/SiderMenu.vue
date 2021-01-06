<template>
  <a-layout-sider
    v-model="collapsed"
    :theme="sideTheme"
    :class="['side-menu', `side-menu--${theme}`, 'beauty-scroll', isMobile ? '' : 'shadow']"
    width="216px"
    collapsedWidth="50px"
    :collapsible="collapsible"
    :trigger="null"
  >
    <div class="sidemenu-main">
      <base-menu
        :theme="sideTheme"
        :collapsed="collapsed"
        :options="menuData"
        class="menu"
        @select="onSelect"
      />
    </div>
  </a-layout-sider>
</template>

<script>
import BaseMenu from './RouteMenu';
import { mapState } from 'vuex';

export default {
  name: 'SiderMenu',
  components: { BaseMenu },
  props: {
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menuData: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    }
  },
  computed: {
    ...mapState('setting', ['isMobile', 'companyName']),
    sideTheme() {
      return this.theme === 'light' ? this.theme : 'dark';
    },
    logoImg() {
      return this.theme === 'dark'
        ? require('@/assets/images/logo_black.png')
        : require('@/assets/images/logo.png');
    },
    apLogoImg() {
      return this.theme === 'dark'
        ? require('@/assets/images/ap_logo_black.png')
        : require('@/assets/images/ap_logo.png');
    }
  },
  methods: {
    onSelect(obj) {
      this.$emit('menuSelect', obj);
    },
    toggleCollapse() {
      this.$emit('toggleCollapse');
    }
  }
};
</script>

<style lang="less">
@import 'index';
</style>
