<template>
  <!-- 国际化 -->
  <a-config-provider :locale="locale">
    <div id="app" class="app">
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>

<script>
import moment from 'moment';
import { mapState, mapActions } from 'vuex';
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

export default {
  name: 'App',
  data() {
    return { locale: zhCN };
  },

  computed: {
    ...mapState('setting', ['theme'])
  },

  watch: {
    'theme.name': function(val) {
      this.UpdateTheme(val);
    }
  },

  created() {
    this.UpdateTheme(this.theme.name);
  },

  methods: {
    ...mapActions('setting', ['UpdateTheme'])
  }
};
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
}
</style>
