/*
 * @Author: chenzh
 * @Date: 2020-12-30 13:27:48
 * @LastEditTime: 2020-12-30 13:37:21
 * @LastEditors: chenzh
 * @Description:
 * @FilePath: /pro-layout/src/mock/util.js
 */
const responseBody = {
  errorMessage: '',
  timestamp: 0,
  status: 'complete',
  resultData: null,
  code: 0
};

export const builder = (data, message, code = 0, headers = {}) => {
  responseBody.result = data;
  if (message !== undefined && message !== null) {
    responseBody.message = message;
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code;
    responseBody._status = code;
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody._headers = headers;
  }
  responseBody.timestamp = new Date().getTime();
  return responseBody;
};

export const getQueryParameters = options => {
  const url = options.url;
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
};

export const getBody = options => {
  return options.body && JSON.parse(options.body);
};
