import axios from 'axios';
import store from '@/store';
import storage from '@/utils/storage';
import message from 'ant-design-vue/es/message';
import { VueAxios } from './axios';
import { ACCESS_TOKEN, JWT_TOKEN_EXPIRED } from '@/store/mutation-types';

const logout = () => {
  store.dispatch('account/Logout').then(() => {
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  });
};

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000 // 请求超时时间
});

// 异常拦截处理器
const errorHandler = error => {
  if (error.response) {
    const data = error.response.data;

    if (error.response.status === 403) {
      message.error(data.message);
    }
    if (error.response.status === 401) {
      message.error('授权失败，请重新登录');
      logout();
    }
  }
  return Promise.reject(error);
};

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN);
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
}, errorHandler);

// response interceptor
request.interceptors.response.use(response => {
  let dataAxios = response.data;
  const { errorCode, status } = dataAxios;

  if (errorCode === JWT_TOKEN_EXPIRED) {
    logout();
  } else if (status !== 'complete') {
    message.error(dataAxios.errorMessage);
  }

  return dataAxios;
}, errorHandler);

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, request);
  }
};

export default request;

export { installer as VueAxios, request as axios };
