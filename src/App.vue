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
import themeUtil from '@/utils/theme';

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
      let closeMessage = this.$message.loading(`您选择了主题模式 ${val}, 正在切换...`);
      themeUtil
        .changeThemeColor(this.theme.color, val)
        .then(closeMessage)
        .then(() => this.setThemeDom());
    },
    'theme.color': function(val) {
      let closeMessage = this.$message.loading(`您选择了主题色 ${val}, 正在切换...`);
      themeUtil.changeThemeColor(val, this.theme.mode).then(closeMessage);
    }
  },

  created() {
    this.setThemeDom();

    // setTimeout(() => {
    //   this.setTheme({
    //     ...this.theme,
    //     mode: 'night'
    //   });
    // }, 3000);
  },

  methods: {
    ...mapMutations('setting', ['setTheme']),
    /**
     * @description 将 vuex 中的主题应用到 dom
     * @param {Object} state state
     */
    setThemeDom(state) {
      document.body.className = `theme-${this.theme.mode}`;
    }
  }
};
</script>
