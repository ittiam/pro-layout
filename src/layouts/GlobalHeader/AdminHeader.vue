<template>
  <div>
    <a-layout-header v-if="fixedHeader"></a-layout-header>
    <a-layout-header
      :class="[headerTheme, 'admin-header', fixedHeader ? 'admin-header-fixed' : '']"
      :style="headerStyle"
    >
      <div :class="['admin-header-wide', layout, pageWidth]">
        <router-link
          v-if="isMobile || layout === 'head'"
          to="/"
          :class="['logo', isMobile ? null : 'pc', headerTheme]"
        >
          <img width="32" src="@/assets/images/logo.png" />
          <h1 v-if="!isMobile">{{ systemName }}</h1>
        </router-link>
        <a-divider v-if="isMobile" type="vertical" />
        <div v-if="layout !== 'head'" class="admin-header-title">
          <i class="trigger sidemenu-icon wpgicon icon-ic_open_with"></i>
          <img class="logo-img" :src="logoImg" />
          <span class="system-name">{{ systemName }}</span>
        </div>
        <div
          v-if="layout !== 'side' && !isMobile"
          class="admin-header-menu"
          :style="`width: ${menuWidth};`"
        >
          <base-menu
            class="head-menu"
            :theme="headerTheme"
            mode="horizontal"
            :options="menuData"
            @select="onSelect"
          />
        </div>
        <div :class="['admin-header-right', headerTheme]">
          <header-theme class="header-item" />
          <header-about class="header-item" />
          <header-avatar class="header-item" />
        </div>
      </div>
    </a-layout-header>
  </div>
</template>

<script>
import HeaderAbout from './HeaderAbout';
import HeaderNotice from './HeaderNotice';
import HeaderAvatar from './HeaderAvatar';
import HeaderTheme from './HeaderTheme';
import BaseMenu from '@/layouts/SiderMenu/RouteMenu';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'AdminHeader',
  components: { BaseMenu, HeaderAvatar, HeaderNotice, HeaderTheme, HeaderAbout },
  props: ['collapsed', 'menuData', 'fixed', 'sideMenuWidth'],
  data() {
    return {
      langList: [
        { key: 'CN', name: '简体中文', alias: '简体' },
        { key: 'HK', name: '繁體中文', alias: '繁體' },
        { key: 'US', name: 'English', alias: 'English' }
      ],
      searchActive: false
    };
  },
  computed: {
    ...mapState('setting', [
      'theme',
      'isShowTheme',
      'isHeaderColor',
      'isMobile',
      'fixedHeader',
      'layout',
      'isMobile',
      'systemName',
      'lang',
      'pageWidth'
    ]),
    headerTheme() {
      if (this.isShowTheme && this.isHeaderColor) {
        return 'header-color';
      }

      return this.theme.mode === 'light' ? this.theme.mode : 'dark';
    },
    langAlias() {
      let lang = this.langList.find(item => item.key === this.lang);
      return lang.alias;
    },
    menuWidth() {
      const { layout, searchActive } = this;
      const headWidth = layout === 'head' ? '1236px' : '100%';
      const extraWidth = searchActive ? '564px' : '364px';
      return `calc(${headWidth} - ${extraWidth})`;
    },
    headerStyle() {
      let width = '100%';

      let transition = this.fixedHeader ? 'transition: width 0.2s' : '';
      return `width: ${width}; padding: 0; transition: ${transition}`;
    },
    logoImg() {
      return this.theme.mode === 'dark'
        ? require('@/assets/images/logo_black.png')
        : require('@/assets/images/logo.png');
    }
  },
  methods: {
    onSelect(obj) {
      this.$emit('menuSelect', obj);
    },
    ...mapMutations('setting', ['setLang'])
  }
};
</script>

<style lang="less">
@import 'index';
</style>
