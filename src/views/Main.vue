<!--
 * @Author: chenzh
 * @Date: 2020-07-27 08:29:57
 * @LastEditTime: 2020-08-11 09:21:38
 * @LastEditors: chenzh
 * @Description:
 * @FilePath: /sampleforvue/src/views/Main.vue
-->
/** * @DATE: 2019-08-27 15:29 * @Version: 0.0.1 * @Author: yunchangJia * @Description: * @Update:
修改menuTab组件引入地址 by yunchangJia 2020-01-07 14:57 */

<template>
  <global-layout>
    <!---------- 标签页 begin ---------->
    <menu-tab slot="menuTab" class="tabsItemBox wbgc-tab" />
    <!---------- 标签页 end ---------->
    <!-- 内容模块 -->
    <transition name="page-toggle">
      <keep-alive :exclude="excludePageName">
        <router-view :class="{ routerViewStyle: !showFrame, 'wbgc-main': true }" />
      </keep-alive>
    </transition>
    <frame-view v-show="showFrame" />
  </global-layout>
</template>

<script>
/**
 *  引入组件
 *  GlobalLayout  外层布局组件
 *  Contextmenu   右键菜单组件
 */
import GlobalLayout from '@/layouts/BasicLayout';
import FrameView from '@/layouts/FrameView';
import MenuTab from '@/components/MenuTab';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'MenuView',
  components: { MenuTab, GlobalLayout, FrameView },
  provide: function() {
    return {
      requestLogout: this.Logout,
      changePassword: this.UpdatePassword
    };
  },
  data() {
    return {
      includePageName: '', // 只缓存得页面名称
      excludePageName: 'histogramPage,linechartPage,piechartPage' // 不会被缓存的页面名称
    };
  },
  computed: {
    ...mapGetters('page', ['currentRoute']),
    showFrame() {
      return this.currentRoute && this.currentRoute.meta && this.currentRoute.meta.iframeSrc;
    }
  },
  methods: {
    ...mapActions(['Logout', 'UpdatePassword'])
  }
};
</script>

<style lang="less">
.routerViewStyle {
  width: 100%;
  height: 100%;
  padding: 30px 0 0 30px;
}
</style>
