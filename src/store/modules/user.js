import storage from '@/utils/storage';
import { login, logout, changePassword } from '@/api/login';
import { ACCESS_TOKEN, APP_LOGIN_INFO, USER_INFO } from '@/store/mutation-types';

const user = {
  state: {
    roles: [],
    permissions: [],
    info: storage.get(USER_INFO, null)
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_INFO: (state, info) => {
      state.info = info;
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = [...permissions];
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

    GetInfo({ state }) {
      return new Promise((resolve, reject) => {
        let result = state.info;

        if (result) {
          resolve(result);
        } else {
          reject(new Error('获取用户信息失败'));
        }
      });
    }
  }
};

export default user;
