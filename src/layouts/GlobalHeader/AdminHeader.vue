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
        <h1 v-if="layout !== 'head'" class="admin-header-title">
          {{ systemName }}
        </h1>
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
          <header-search class="header-item" @active="val => (searchActive = val)" />
          <a-tooltip class="header-item" title="帮助文档" placement="bottom">
            <a href="https://iczer.github.io/vue-antd-admin/" target="_blank">
              <a-icon type="question-circle-o" />
            </a>
          </a-tooltip>
          <header-notice class="header-item" />
          <header-avatar class="header-item" />
        </div>
      </div>
    </a-layout-header>
  </div>
</template>

<script>
import HeaderSearch from './HeaderSearch';
import HeaderNotice from './HeaderNotice';
import HeaderAvatar from './HeaderAvatar';
import BaseMenu from '@/layouts/SiderMenu/RouteMenu';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'AdminHeader',
  components: { BaseMenu, HeaderAvatar, HeaderNotice, HeaderSearch },
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
      'isMobile',
      'fixedHeader',
      'layout',
      'isMobile',
      'systemName',
      'lang',
      'pageWidth'
    ]),
    headerTheme() {
      if (this.layout === 'side' && this.theme.mode === 'dark' && !this.isMobile) {
        return 'light';
      }
      return this.theme.mode;
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
      let width =
        this.fixedHeader && this.layout !== 'head' && !this.isMobile
          ? `calc(100% - ${this.sideMenuWidth})`
          : '100%';

      let transition = this.fixedHeader ? 'transition: width 0.2s' : '';
      return `width: ${width}; padding: 0; transition: ${transition}`;
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

<style lang="less" scoped>
@import 'index';
</style>
