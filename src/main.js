import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';

import './core/use';
import './permission'; // permission control
import './global.less';

import '@/mock';

import store from './store';
import router from './router';
import App from './App';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
