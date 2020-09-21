import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Vue from 'vue';

import '@/mock';

import '@/core/lazy_use';
import '@/utils/storage';
import './permission'; // permission control

import 'font-awesome/css/font-awesome.min.css';
import '@/assets/style/index.less';

import store from './store';
import router from './router';
import App from './App';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
