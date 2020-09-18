import 'core-js/stable';
import 'regenerator-runtime/runtime';

import 'font-awesome/css/font-awesome.min.css';
import './theme/index.less';

import '@/mock';

import Vue from 'vue';
import Antd from 'ant-design-vue';

import { VueAxios } from '@/utils/request';
import MultiTab from '@/layouts/MultiTab/plugin';

import '@/utils/storage';
import './permission'; // permission control

import store from './store';
import router from './router';
import App from './App';

Vue.use(Antd);
Vue.use(VueAxios);
Vue.use(MultiTab);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
