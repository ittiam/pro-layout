import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Vue from 'vue';

import '@/mock';

import bootstrap from './core/bootstrap';
import '@/core/lazy_use';
import '@/utils/storage';
import './permission'; // permission control

import 'font-awesome/css/font-awesome.min.css';
import 'wpg-design/dist/index.css';
import '@/assets/style/index.less';

import store from './store';
import router from './router';
import App from './App';

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app');
