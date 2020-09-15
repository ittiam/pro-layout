import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import setting from './modules/setting';
import user from './modules/user';
import permission from './modules/permission';
import page from './modules/page';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    setting,
    user,
    page,
    permission
  },
  getters
});
