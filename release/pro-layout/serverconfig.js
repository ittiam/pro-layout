/**
 * @type         default 默认取 config 中的配置  host 取浏览器域名
 * @defaultPath  type为host时 api地址跟的二级路径 默认为 ""
 * @baseConfig   默认配置的api地址
 * @apiconfig    最终使用的api地址
 */
(function () {
  var config = {
    "type": "default",
    "baseConfig": {
      "API_BASE_URL": "",
      "IMG_BASE_URL": "http://119.3.37.131",
      "AK": "uC5txC5bpV91ALbxaH0FLhVpRDPp8SEN"
    },
    "defaultPath": {
      "API_BASE_URL": "",
      "IMG_BASE_URL": "",
      "AK": ""
    },
    "apiconfig": {}
  };
  if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location
      .port ? ':' + window.location.port : '');
  }
  if (config.type === "host") {
    Object.keys(config.baseConfig).forEach(function (key) {
      if (~key.indexOf("URL")) {
        config.apiconfig[key] = window.location.origin + config.defaultPath[key];
      }
      else {
        config.apiconfig[key] = config.baseConfig[key];
      }
    });
  }
  else {
    config.apiconfig = config.baseConfig;
  }
  window.apiconfig = config.apiconfig;
}());
