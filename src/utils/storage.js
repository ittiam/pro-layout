import Vue from 'vue';
import Storage from 'vue-ls';

import { storageOptions } from '@/config/defaultSettings';
Vue.use(Storage, storageOptions);

const storage = Vue.ls;

export default storage;
