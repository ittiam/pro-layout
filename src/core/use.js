import Vue from 'vue';
import Antd from 'ant-design-vue';
import { VueAxios } from '@/utils/request';
import mixin from '@/core/mixin';
import '@/utils/storage';

import 'ant-design-vue/dist/antd.css';
import 'font-awesome/css/font-awesome.min.css';

Vue.mixin(mixin);

Vue.use(Antd);
Vue.use(VueAxios);
