<template>
  <section class="secWrap">
    <a-spin :spinning="spinning">
      <div id="mapContain" ref="allmap" class="map-container"></div>
    </a-spin>
  </section>
</template>
<script>
import { loadBaiDuMap } from '@/utils/bMap.js';

export default {
  data() {
    return {
      newMap: null,
      spinning: false,
      defaultLoc: {
        // 默认初始化中心点----上海威派格
        lati: '39.9152108931',
        longi: '116.4039006839'
      }
    };
  },
  computed: {},
  methods: {
    /**
     * toInitMap 初始化地图--自定义地图，默认加载第一个测点的热力图
     *
     */
    toInitMap() {
      loadBaiDuMap().then(() => {
        this.newMap = new BMap.Map('mapContain', { enableMapClick: false });
        this.NavigationControl = new BMap.NavigationControl({
          /* eslint-disable */
          anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
          offset: new BMap.Size(0, 0)
        });
        this.newMap.addControl(this.NavigationControl); //添加平移缩放控件
        this.newMap.enableScrollWheelZoom(true);
        this.newMap.centerAndZoom(new BMap.Point(this.defaultLoc.longi, this.defaultLoc.lati), 12);
        this.newMap.setMapStyle({
          style: this.baseTheme === 'dark' ? 'midnight' : ''
        });
        this.spinning = false;
      });
    }
  },
  mounted() {
    this.toInitMap();
  },
  beforeDestroy() {}
};
</script>

<style lang="less" scoped>
section.secWrap {
  width: 100%;
  height: 100%;
  overflow-y: hidden;

  .map-container {
    width: 100%;
    height: 100%;
  }
}
</style>
<style lang="less">
// 清除百度地图logo
.anchorBL {
  display: none;
}
</style>
