/** * @DATE: 2020/5/20 2:35 PM * @Version: 0.0.1 * @Author: huhaiou * @Description:
logo在左侧导航内部的basicLayout布局头部 * @Update: 更新内容 by huhaiou 2020/5/20 2:35 PM * @Update: 添加头部左侧文案 by
weixinqi 2020/7/9 5:11 PM * @Update: 引入新的个人设置组件 by weixinqi 2020/7/15 10:48 AM
<template>
  <a-layout-header class="global-header">
    <div class="global-header-wide">
      <div v-if="layoutSite === 'head'" class="global-header-menu">
        <i-menu :mode="menuMode" :collapsed="collapsed" :menuData="menuData" @select="onSelect" />
      </div>
      <div class="global-header-left">
        <span>{{ systemName }} 欢迎您</span>
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
    }
  }
};
</script>

<style lang="less" scoped>
.global-header-left {
  display: inline-block;
  padding-left: 40px;
}
</style>
