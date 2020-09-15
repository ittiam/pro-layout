<template>
  <div :class="[currentTheme, 'footer']">
    <div class="links">
      <a
        v-for="(item, index) in linkList"
        :key="index"
        target="_blank"
        :href="item.link ? item.link : 'javascript: void(0)'"
      >
        <a-icon v-if="item.icon" :type="item.icon" />{{ item.name }}
      </a>
    </div>
    <div class="copyright">Copyright<a-icon type="copyright" />{{ copyright }}</div>
  </div>
</template>

<script>
export default {
  name: 'GlobalFooter',
  props: ['copyright', 'linkList']
};
</script>

<style lang="less" scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: @layout_footer;
  padding: 0 16px;
  font-size: 12px;

  .copyright {
    font-size: 14px;
    line-height: 20px;
  }

  .links {
    a:not(:last-child) {
      margin-right: 40px;
    }

    a {
      color: rgba(0, 0, 0, 0.45);
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
    }
  }
}
</style>
