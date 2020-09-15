/**
 * @DATE:  2019/6/26 13:42
 * @Version: 0.0.1
 * @Author: yunchangJia
 * @Description: 登录登出以及相关接口
 * @Update:  更新内容 by yunchangJia 2019/7/2 11:44
 */

const Mock = require('mockjs');
import { menu, userInfo } from '../common';

/**
 * 登录
 */
Mock.mock('/sso/login', 'post', ({ body }) => {
  const result = {};
  const { loginName, password } = JSON.parse(body);
  if (loginName !== 'admin' || password !== '888888') {
    result.status = 'error';
    result.errorMessage = '账户名或密码错误（admin/888888）';
  } else {
    result.status = 'complete';
    result.resultData = userInfo;
  }
  return result;
});

/**
 * 检测 token
 */
Mock.mock('/sso/checkToken', 'get', () => {
  const result = {
    status: 'complete'
  };
  return result;
});

/**
 * token登录
 */
Mock.mock('/sso/tokenLogin', 'post', ({ body }) => {
  const result = {
    status: 'complete',
    resultData: userInfo
  };
  return result;
});

/**
 * 获取菜单
 */
Mock.mock('/sysUser/getMenu', 'get', () => {
  const result = {
    status: 'complete',
    resultData: menu
  };
  return result;
});

/**
 * 退出
 */
Mock.mock('/sso/logout', 'get', () => {
  const result = {
    status: 'complete'
  };
  return result;
});
