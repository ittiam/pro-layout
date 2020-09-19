let apiconfig = window.apiconfig || {};
let env = process.env;

let serverconfig = {
  BUILD_INFO: '',
  API_BASE_URL: '',
  IMG_BASE_URL: '',
  AK: '',
  CTI_SOCKET: '',
  CTI_HTTP: '',
  CTI_RESTFULL: '',
  CTI_LOGIN_PASSWORD: '',
  REPORT_URL: '',
  YINGSHOU_URL: ''
};

for (let key in serverconfig) {
  if (serverconfig.hasOwnProperty(key)) {
    serverconfig[key] = apiconfig[key] || env[`VUE_APP_${key}`];
  }
}

module.exports = serverconfig;
