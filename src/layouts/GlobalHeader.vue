/** * @DATE: 2019-08-28 15:21 * @Version: 0.0.1 * @Author: yunchangJia * @Description: * @Update: 整理内容 by
yunchangJia 2019-08-28 15:21 * @Update: 删除不必要的注释代码 by huhaiou 2020/3/5 11:10 AM */
<template>
  <a-layout-header class="global-header">
    <div class="global-header-wide">
      <a-divider v-if="isMobile" type="vertical" />
      <a-icon
        v-if="layoutSite === 'side'"
        class="trigger wfs20"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="toggleCollapse"
      />
      <div :class="['logo', currentTheme]">
        <img class="logoStyle" src="@/assets/images/logo.png" />
        <span class="wfs16">{{ systemName }}</span>
      </div>

      <div v-if="layoutSite === 'head'" class="global-header-menu">
        <i-menu :mode="menuMode" :collapsed="collapsed" :menuData="menuData" @select="onSelect" />
      </div>

      <div :class="['global-header-right']">
        <header-theme class="header-item" />
        <header-avatar class="header-item" />
        <header-about class="header-item"></header-about>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
/**
 *  引入组件
 *  HeaderAvatar   【个人设置组件】
 *  IMenu          【菜单组件】
 *  HeaderSelect   【换肤组件】
 */
import HeaderAvatar from './HeaderlAvatar';
import IMenu from '../components/Menu/iMenu';
import HeaderTheme from './HeaderTheme';
import HeaderAbout from './HeaderAbout';

export default {
  name: 'GlobalHeader',
  components: { IMenu, HeaderAvatar, HeaderTheme, HeaderAbout },
  props: ['collapsed', 'menuData'],
  mounted() {},
  computed: {
    isMobile() {
      return this.$store.state.setting.isMobile;
    },
    systemName() {
      return this.$store.state.setting.systemName;
    },
    menuMode() {
      let menu = 'inline';
      if (this.$store.state.setting.layout === 'head') {
        menu = 'horizontal';
      }
      return menu;
    }
  },
  created() {},
  methods: {
    toggleCollapse() {
      this.$emit('toggleCollapse');
    },

    /**
     * 调用父组件进行路由跳转
     * @param obj
     */
    onSelect(obj) {
      this.$emit('menuSelect', obj);
    },
    areaChange(value) {
      this.$notification.open({
        message: `当前选中的大区为${value}`,
        description: '',
        onClick: () => {}
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
