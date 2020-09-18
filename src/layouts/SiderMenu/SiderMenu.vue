<template>
  <a-layout-sider
    v-model="collapsed"
    :theme="sideTheme"
    :class="['side-menu', 'beauty-scroll', isMobile ? null : 'shadow']"
    width="216px"
    collapsedWidth="50px"
    :collapsible="collapsible"
    :trigger="null"
  >
    <slot name="header">
      <div class="sidemenu-header" :class="{ collapsed: collapsed }">
        <div v-if="!collapsed" :class="['logo', 'sidemenu-logo-txt']">
          <img class="logo-img" src="@/assets/images/logo.png" />
          <span class="title">{{ companyName }}</span>
        </div>
        <img v-else src="@/assets/images/ap_logo.png" />
        <div class="divider-border"></div>
      </div>
    </slot>

    <div class="sidemenu-main">
      <base-menu
        :theme="theme"
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
    sideTheme() {
      return this.theme === 'light' ? this.theme : 'dark';
    },
    ...mapState('setting', ['isMobile', 'companyName'])
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
