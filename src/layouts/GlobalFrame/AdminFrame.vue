<template>
  <div class="iframe-view">
    <div
      v-for="page in openedFrame"
      v-show="page.fullPath === current"
      :key="page.fullPath"
      class="ant-pro-iframe-content"
    >
      <template v-if="page.meta && page.meta.iframeSrc">
        <iframe :src="`${page.meta.iframeSrc}${param}?token=${token}`" frameborder="0"></iframe>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import storage from '@/utils/storage';
import { ACCESS_TOKEN } from '@/store/mutation-types';
import { serialize } from '@/utils/util';

export default {
  name: 'AdminFrame',
  data() {
    return {
      token: storage.get(ACCESS_TOKEN)
    };
  },
  computed: {
    ...mapState('page', ['current', 'opened']),
    openedFrame() {
      return this.opened.filter(page => {
        return page.meta && page.meta.iframeSrc;
      });
    },
    param() {
      const { params, query } = this.$route;

      return serialize(query ? query : params, '/') || '/';
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
