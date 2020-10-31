import { axios } from '@/utils/request';

const userApi = {
  Login: '/sso/login',
  TokenLogin: '/sso/tokenLogin',
  Logout: '/sso/logout',
  CheckToken: '/sso/checkToken',
  ChangePassword: '/sysUser/changePassword',
  // get my info
  UserMenu: '/sysUser/getMenu',
  getUserRoles: '/sysUser/userClient/getRoleCode'
};

export function login(parameter) {
  return axios({
    url: userApi.Login,
    method: 'post',
    data: parameter
  });
}

export function tokenLogin(parameter) {
  return axios({
    url: userApi.TokenLogin,
    method: 'post',
    data: parameter
  });
}

export function changePassword(parameter) {
  return axios({
    url: userApi.ChangePassword,
    method: 'post',
    data: parameter
  });
}

export function logout() {
  return axios({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

export function checkToken() {
  return axios({
    url: userApi.CheckToken,
    method: 'get'
  });
}

export function getCurrentUserNav() {
  return axios({
    url: userApi.UserMenu,
    method: 'get'
  });
}

export function getUserRoles() {
  return axios({
    url: userApi.getUserRoles,
    method: 'get'
  });
}
