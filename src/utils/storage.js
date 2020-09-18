import Vue from 'vue';
import Storage from 'vue-ls';

import { storageOptions } from '@/config/admin.config';
Vue.use(Storage, storageOptions);

const storage = Vue.ls;

export default storage;
