<template>
  <div class="footer">
    <!-- <div class="links">
      <a
        v-for="(item, index) in linkList"
        :key="index"
        target="_blank"
        :href="item.link ? item.link : 'javascript: void(0)'"
      >
        <a-icon v-if="item.icon" :type="item.icon" />{{ item.name }}
      </a>
    </div> -->
    <div class="copyright">Copyright<a-icon type="copyright" />{{ copyright }}</div>
  </div>
</template>

<script>
export default {
  name: 'PageFooter',
  props: ['copyright', 'linkList']
};
</script>

<style lang="less" scoped>
.footer {
  margin: 0;
  padding: 0 16px;
  text-align: center;

  .copyright {
    color: @color-text-second;
    font-size: 12px;
  }

  .links {
    margin-bottom: 8px;

    a:not(:last-child) {
      margin-right: 40px;
    }

    a {
      color: @color-text-second;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
    }
  }
}
</style>
