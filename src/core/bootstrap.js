import Vue from 'vue';
// import store from '@/store';
// import storage from '@/utils/storage';

export default function Initializer() {
  // 当前的 baseUrl
  Vue.prototype.$baseUrl = process.env.BASE_URL;
}
