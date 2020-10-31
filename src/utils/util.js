/* eslint-disable max-params */
import enquireJs from 'enquire.js';

const _toString = Object.prototype.toString;

export function isDef(v) {
  return v !== undefined && v !== null;
}

/**
 * Remove an item from an array.
 */
export function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

export function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}

export function enquireScreen(call) {
  const handler = {
    match: function() {
      call && call(true);
    },
    unmatch: function() {
      call && call(false);
    }
  };
  enquireJs.register('only screen and (max-width: 767.99px)', handler);
}

export function exportFile(data, filename, ext = 'xlsx', type = 'application/vnd.ms-excel') {
  let blob = new Blob([data], { type });
  if (window.navigator.msSaveBlob) {
    try {
      // ie浏览器自带下载文件的方法
      window.navigator.msSaveBlob(data, filename);
    } catch (e) {}
  } else {
    let elink = document.createElement('a');
    elink.download = filename + '.' + ext;
    elink.style.display = 'none';
    let href = window.URL.createObjectURL(blob);
    elink.href = href;
    document.body.appendChild(elink);
    elink.click();
    document.body.removeChild(elink);
    window.URL.revokeObjectURL(href); // 释放掉blob对象
  }
}

/**
 * 获取本地保存的配置
 * @param load {boolean} 是否加载配置中的主题
 * @returns {Object}
 */
export function getLocalSetting(loadTheme) {
  let localSetting = {};
  try {
    const localSettingStr = localStorage.getItem(process.env.VUE_APP_SETTING_KEY);
    localSetting = JSON.parse(localSettingStr);
  } catch (e) {
    console.error(e);
  }

  return localSetting;
}

/**
 * 格式化 router.options.routes，生成 fullPath
 * @param routes
 * @param parentPath
 */
export function formatFullPath(routes, parentPath = '') {
  routes.forEach(route => {
    let isFullPath = route.path.substring(0, 1) === '/';
    route.fullPath = isFullPath
      ? route.path
      : parentPath === '/'
      ? parentPath + route.path
      : parentPath + '/' + route.path;
    if (route.children) {
      formatFullPath(route.children, route.fullPath);
    }
  });
}

/**
 * url参数序列化方法
 * @param obj
 * @param type
 * @returns {string}
 */
export function serialize(obj = {}, type = '?') {
  let ary = [];
  for (let p in obj) {
    if (obj.hasOwnProperty(p) && obj[p]) {
      if (type === '/') {
        ary.push(encodeURIComponent(obj[p]));
      } else {
        ary.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
  }

  return type + ary.join(type === '/' ? type : '&');
}

// 服务器图片完整链接
export function imageFullUrl(url) {
  return url && !/http/.test(url) ? 'http://119.3.37.131' + url : url;
}

export function ellipsis(item, max) {
  return item ? (item.length > max ? item.substring(0, max) + '...' : item) : '--';
}
