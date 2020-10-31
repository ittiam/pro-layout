import BaiduMap from './map/Map.vue';
import BmView from './map/MapView.vue';

import BmMarker from './overlays/Marker.vue';

export default {
  install(Vue, options) {
    const { ak } = options;
    Vue.prototype._BMap = () => ({ ak });

    Vue.component('BaiduMap', BaiduMap);
    Vue.component('BmView', BmView);

    Vue.component('BmMarker', BmMarker);
  }
};

export { BaiduMap, BmView };
