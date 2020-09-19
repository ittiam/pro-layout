<template>
  <div class="iframe-content">
    <div
      v-for="page in openedFrame"
      v-show="page.fullPath === current"
      :key="page.fullPath"
      class="ant-pro-iframe-content"
    >
      <iframe :src="page.meta.iframeSrc" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'FrameContent',
  data() {
    return {
      active: '',
      isShow: false
    };
  },
  computed: {
    ...mapState('page', ['current', 'opened']),
    openedFrame() {
      return this.opened.filter(page => {
        return page.meta && page.meta.iframeSrc;
      });
    }
  }
};
</script>

<style lang="less">
.iframe-content,
.ant-pro-iframe-content {
  width: 100%;
  height: 100%;
  overflow: hidden;

  iframe {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
