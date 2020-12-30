import Vue from 'vue';
import store from '@/store';
import config from '@/config/setting.config';
import storage from '@/utils/storage';
import { TOGGLE_THEME } from '@/store/mutation-types';

export default function Initializer() {
  // 当前的 baseUrl
  Vue.prototype.$baseUrl = process.env.BASE_URL;

  store.dispatch('setting/UpdateTheme', storage.get(TOGGLE_THEME, config.theme.name));
}
