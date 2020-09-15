<template>
  <div class="ant-pro-iframe-content">
    <iframe :src="src" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="less">
.ant-pro-iframe-content {
  // position: absolute;
  // top: 0;
  // left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
