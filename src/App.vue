<template>
  <!-- 国际化 -->
  <a-config-provider :locale="locale">
    <div id="app" class="app">
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';

export default {
  name: 'App',
  data() {
    return { locale: zhCN };
  },

  computed: {
    ...mapState('setting', ['theme'])
  },

  watch: {
    'theme.mode': function(val) {
      this.setThemeDom(val);
    }
  },

  created() {
    this.setThemeDom(this.theme.mode);

    // setTimeout(() => {
    //   this.setTheme({
    //     ...this.theme,
    //     mode: 'night'
    //   });
    // }, 3000);

    // setTimeout(() => {
    //   this.setTheme({
    //     ...this.theme,
    //     mode: 'light'
    //   });
    // }, 6000);

    // setTimeout(() => {
    //   this.setTheme({
    //     ...this.theme,
    //     mode: 'dark'
    //   });
    // }, 10000);
  },

  methods: {
    ...mapMutations('setting', ['setTheme']),
    /**
     * @description 将 vuex 中的主题应用到 dom
     * @param {Object} state state
     */
    setThemeDom(mode) {
      document.body.className = `theme--${mode}`;
    }
  }
};
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
}
</style>
