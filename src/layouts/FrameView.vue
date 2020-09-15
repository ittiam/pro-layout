<template>
  <div class="iframe-view">
    <div
      v-for="page in openedFrame"
      v-show="page.fullPath === current"
      :key="page.fullPath"
      class="ant-pro-iframe-content"
    >
      <iframe v-if="rendered[page.fullPath]" :src="page.meta.iframeSrc" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'FrameView',
  data() {
    return {
      rendered: {}
    };
  },
  computed: {
    ...mapState('page', ['current', 'opened']),
    openedFrame() {
      return this.opened.filter(page => {
        return page.meta && page.meta.iframeSrc;
      });
    }
  },
  watch: {
    current: function(val) {
      this.rendered[val] = true;
    }
  }
};
</script>

<style lang="less">
.iframe-view,
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
