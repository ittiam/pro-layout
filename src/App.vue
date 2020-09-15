/** * @DATE: 2019-08-27 14:03 * @Version: 0.0.1 * @Author: yunchangJia * @Description: aplication
entrance * @Update: 将公共样式文件从项目内部迁移到外层，故在此文件修改加载路径 by huhaiou
2020/1/81:24 PM */
<template>
  <!-- 国际化 -->
  <a-config-provider :locale="locale">
    <div id="app" class="app">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

export default {
  name: 'App',
  components: {},
  data() {
    return { locale: zhCN };
  },
  watch: {
    /* 监听主题变化 加载相应的css、js */
    currentTheme() {
      this.getThemeLess();
      // this.getThemeJs();
    },

    /* 监听黑白基础主体变化 加载相应的css、js */
    baseTheme() {
      this.getBaseLess();
      // this.getBaseThemeJs();
    }
  },
  created() {
    this.getThemeLess();
    // this.getThemeJs();
    this.getBaseLess();
    // this.getBaseThemeJs();
  },
  methods: {
    /**
     * 动态加载主题样式--文件无法获取时捕获异常，并默认设置主题为wpg红色主题，并加载对应样式
     */
    getThemeLess() {
      if (this.currentTheme === '') return false;
      try {
        return require(`@/themes/${this.currentTheme}/index.less`);
      } catch (e) {
        this.$store.commit('setting/setTheme', 'wpgRed');
        return require('@/themes/wpgRed/index.less');
      }
    },

    /**
     * 动态加载主体样式--文件无法获取时捕获异常，并默认设置主题为dark主题，并加载对应样式
     */
    getBaseLess() {
      if (this.baseTheme === '') return false;
      try {
        return require(`@/themes/${this.baseTheme}/index.less`);
      } catch (e) {
        this.$store.commit('setting/setTheme', 'dark');
        return require('@/themes/dark/index.less');
      }
    },

    /**
     * 动态加载主题图表样式--文件无法获取时捕获异常，并默认设置主题为wpg红色主题，并加载对应样式
     */
    getThemeJs() {
      // if (this.currentTheme === '') return false;
      // try {
      //   return require(`@/themes/${this.currentTheme}/index.js`);
      // } catch (e) {
      //   this.$store.commit('setting/setTheme', 'wpgRed');
      //   return require('@/themes/wpgRed/index.js');
      // }
    },

    /**
     * 动态加载主题图表样式--文件无法获取时捕获异常，并默认设置主题为dark主体，并加载对应样式
     */
    getBaseThemeJs() {
      // if (this.baseTheme === '') return false;
      // try {
      //   return require(`@/themes/${this.baseTheme}/index.js`);
      // } catch (e) {
      //   this.$store.commit('setting/setTheme', 'dark');
      //   return require('@/themes/dark/index.js');
      // }
    }
  }
};
</script>

<style lang="less">
@import '~@/assets/style/public'; // 引入基础样式
.app {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
