import storage from '@/utils/storage';
import { login, logout, tokenLogin, changePassword } from '@/api/login';
import { ACCESS_TOKEN, APP_LOGIN_INFO, USER_INFO } from '@/store/mutation-types';

const account = {
  namespaced: true,

  state: {
    token: storage.get(ACCESS_TOKEN, ''),
    user: storage.get(USER_INFO, null)
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_INFO: (state, info) => {
      state.info = info;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(res => {
            const { status, errorMessage, resultData } = res;
            if (status === 'complete') {
              storage.set(ACCESS_TOKEN, resultData.token);
              storage.set(USER_INFO, resultData);

              commit('SET_TOKEN', resultData.token);
              commit('SET_INFO', resultData);
              resolve();
            } else {
              reject(errorMessage);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise(resolve => {
        logout(state.token)
          .then(() => {
            resolve();
          })
          .catch(() => {
            resolve();
          })
          .finally(() => {
            commit('SET_TOKEN', '');
            storage.remove(ACCESS_TOKEN);
            storage.remove(USER_INFO);
          });
      });
    },

    UpdatePassword({ commit }, values) {
      return new Promise((resolve, reject) => {
        changePassword(values)
          .then(result => {
            console.log(result);
            storage.remove(ACCESS_TOKEN);
            storage.remove(APP_LOGIN_INFO);
            storage.remove(USER_INFO);

            commit('SET_TOKEN', '');
            resolve(result);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        tokenLogin().then(res => {
          let result = res.resultData;

          if (result) {
            storage.set(USER_INFO, result);
            commit('SET_INFO', result);
            resolve(result);
          } else {
            reject(new Error('获取用户信息失败'));
          }
        });
      });
    }
  }
};

export default account;
