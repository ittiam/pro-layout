import Vue from 'vue';
import Storage from 'vue-ls';

// use antd
// import './antd/normal'
// lazyload antd
import './antd/lazyload';
import { storageOptions } from '@config/defaultSettings';
import { DocumentTitle } from 'pro-layout';

Vue.use(DocumentTitle);
Vue.use(Storage, storageOptions);
