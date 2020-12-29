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
    <slot name="header">
      <div class="sidemenu-header" :class="[collapsed ? 'collapsed' : null]">
        <div v-if="!collapsed" :class="['logo', 'sidemenu-logo-txt']">
          <img class="logo-img" :src="logoImg" />
          <span class="title">{{ companyName }}</span>
        </div>
        <img v-else :src="apLogoImg" />
        <div class="divider-border"></div>
      </div>
    </slot>

    <div class="sidemenu-main">
      <base-menu
        :theme="sideTheme"
        :collapsed="collapsed"
        :options="menuData"
        class="menu"
        @select="onSelect"
      />
    </div>

    <slot name="footer">
      <div class="sidemenu-footer">
        <div class="divider-border"></div>
        <div :class="['logo', 'sidemenu-logo-txt']" @click="toggleCollapse">
          <i
            :class="[
              'trigger',
              'sidemenu-icon',
              collapsed ? 'icon-ic_fullscreen' : 'icon-ic_fullscreen_exit'
            ]"
          ></i>
          <span class="sidemenu-text">{{ collapsed ? '' : '收起导航' }}</span>
        </div>
      </div>
    </slot>
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
