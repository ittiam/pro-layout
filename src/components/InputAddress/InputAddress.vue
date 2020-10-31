<template>
  <div class="vc-input-address">
    <a-input-search v-model.trim="address" :disabled="disabled" @search="onSearchAddress">
      <a-icon slot="prefix" type="environment" />
    </a-input-search>
    <baidu-map
      class="map"
      :center="center"
      :zoom="zoom"
      :scroll-wheel-zoom="true"
      @click="getLocation"
      @ready="onReady"
    >
      <bm-marker :position="markerPoint"></bm-marker>
    </baidu-map>
  </div>
</template>

<script>
export default {
  name: 'VcInputAddress',

  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    let center = {
      lng: 121.48789949,
      lat: 31.24916171
    };

    return {
      address: this.value,
      zoom: 12,
      markerPoint: center,
      center
    };
  },

  methods: {
    onReady(e) {
      this.map = e.map;
      this.BMap = e.BMap;

      if (this.address) {
        this.onSearchAddress(this.address);
      }
    },

    onSearchAddress(value) {
      let geo = new BMap.Geocoder();
      geo.getPoint(value, point => {
        if (point) {
          this.markerPoint = point;
          this.map.centerAndZoom(point, this.zoom);

          this.$emit('change', value);
        }
      });
    },

    getLocation(e) {
      if (this.disabled) return;
      const { BMap } = this;
      let point = new BMap.Point(e.point.lng, e.point.lat);
      let geoc = new BMap.Geocoder();

      geoc.getLocation(point, rs => {
        let addComp = rs.addressComponents;
        let streetAddress = addComp.district + addComp.street + addComp.streetNumber;
        let address = addComp.province + addComp.city + streetAddress;

        this.address = address;
        this.markerPoint = point;

        this.$emit('change', address);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.map {
  width: 100%;
  height: 200px;
}
</style>
