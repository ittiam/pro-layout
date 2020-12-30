/*
 * @Author: chenzh
 * @Date: 2020-12-30 13:22:48
 * @LastEditTime: 2020-12-30 13:23:34
 * @LastEditors: chenzh
 * @Description:
 * @FilePath: /pro-layout/src/api/manage.js
 */
import { axios } from '@/utils/request';

const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree'
};

export default api;

export function getRoleList(parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  });
}

export function getServiceList(parameter) {
  return axios({
    url: api.service,
    method: 'get',
    params: parameter
  });
}
