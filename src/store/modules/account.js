import storage from '@/utils/storage';
import { login, logout, changePassword, getUserRoles } from '@/api/login';
import { ACCESS_TOKEN, APP_LOGIN_INFO, USER_INFO, PAGE_OPENED } from '@/store/mutation-types';

const SET_TOKEN = 'set_token';
const SET_USER = 'set_user';
const SET_PERMISSIONS = 'set_permissions';
const SET_ROLES = 'set_roles';

const state = {
  roles: [],
  permissions: [],
  token: storage.get(ACCESS_TOKEN, ''),
  user: storage.get(USER_INFO)
};

const getters = {
  token: state => state.token,
  roles: state => state.roles,
  permissions: state => state.permissions,
  info: state => state.info
};

const mutations = {
  [SET_TOKEN]: (state, token) => {
    state.token = token;
  },
  [SET_USER]: (state, info) => {
    state.user = info;
  },
  [SET_PERMISSIONS]: (state, permissions) => {
    state.permissions = [...permissions];
  },
  [SET_ROLES]: (state, roles) => {
    state.roles = [...roles];
  }
};

const actions = {
  // 登录
  Login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then(res => {
          const { status, errorMessage, resultData } = res;
          if (status === 'complete') {
            const { token, tenantId, userName, loginName, userId } = resultData;
            const userInfo = {
              tenantId,
              userName,
              loginName,
              token,
              userId
            };
            storage.set(ACCESS_TOKEN, token);
            storage.set(USER_INFO, userInfo);
            commit(SET_TOKEN, token);
            commit(SET_USER, userInfo);
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
          commit(SET_TOKEN, '');
          storage.remove(ACCESS_TOKEN);
          storage.remove(USER_INFO);
          storage.remove(PAGE_OPENED);
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
          storage.remove(PAGE_OPENED);

          commit(SET_TOKEN, '');
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 根据token获取用户信息
  async GetInfo({ dispatch, commit, state }) {
    await dispatch('GetUserRoles');
    return new Promise((resolve, reject) => {
      if (state) {
        resolve(state);
      } else {
        reject(new Error('获取用户信息失败'));
      }
    });
  },
  // 获取用户角色
  GetUserRoles({ commit }) {
    return new Promise((resolve, reject) => {
      getUserRoles()
        .then(res => {
          const { status, errorMessage, resultData } = res;
          if (status === 'complete') {
            commit(SET_ROLES, resultData);
            resolve(resultData);
          } else {
            reject(errorMessage);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
};
