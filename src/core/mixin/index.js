export default {
  computed: {
    /* 主题（多种颜色主题：deepBlue、wpgRed...） */
    currentTheme() {
      return this.$store.state.setting.theme;
    },
    /* 基础主题（主体内容部分：黑白（深浅）主题） */
    baseTheme() {
      return this.$store.state.setting.darkTheme.indexOf(this.currentTheme) > -1 ? 'dark' : 'light';
    },
    /* 菜单布局方式 */
    layoutSite() {
      /* html 标签添加 布局方式 */
      document.getElementsByTagName('html')[0].className =
        this.$store.state.setting.layout + ' ' + this.currentTheme + ' ' + this.baseTheme;
      return this.$store.state.setting.layout;
    }
  },
  methods: {
    /**
     * 动态加载样式--文件无法获取时捕获异常，并默认设置主题为wpg红色主题，并加载对应该样式
     */
    getLess() {
      if (this.currentTheme === '') return false;
      try {
        return require(`@/themes/${this.currentTheme}/index.less`);
      } catch (e) {
        this.$store.commit('setting/setTheme', 'wpgRed');
        return require('@/themes/wpgRed/index.less');
      }
    },

    /**
     * 动态图片 （非seo项目建议图片放到背景图片中通过css加载 防止主题过多公用图片重复）--图片无法获取时捕获异常，并默认不加载
     * @param filePath 【文件路径】
     * @param fileName 【图片全称】
     */
    getImg(filePath, fileName) {
      if (this.currentTheme === '') return false;
      try {
        return require(`@/themes/${this.currentTheme}/${filePath}/${fileName}`);
      } catch (e) {
        return '';
      }
    }
  }
};
