<template>
  <a-tooltip placement="bottom">
    <span slot="title">{{ isFullScreen ? '退出全屏' : '全屏' }}</span>
    <i :class="iconCls" @click="toggleFullScreen"></i>
  </a-tooltip>
</template>

<script>
import screenfull from 'screenfull';

export default {
  name: 'TabFullscreen',

  data() {
    return {
      isFullScreen: false
    };
  },

  computed: {
    iconCls() {
      return [
        'pro-multi-action-item',
        'fullscreen',
        'wpgicon',
        this.isFullScreen ? 'icon-ic_fullscreen_exit' : 'icon-ic_zoom_out_map'
      ];
    }
  },

  mounted() {
    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        if (!screenfull.isFullscreen) this.isFullScreen = false;
      });
    }
  },

  methods: {
    toggleFullScreen() {
      if (this.isFullScreen) {
        screenfull.exit();
        this.isFullScreen = false;
      } else {
        screenfull.request();
        this.isFullScreen = true;
      }
    }
  }
};
</script>
