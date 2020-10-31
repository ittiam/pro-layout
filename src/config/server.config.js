let apiconfig = window.apiconfig || {};
let env = process.env;

let serverconfig = {
  API_BASE_URL: '',
  IMG_BASE_URL: '',
  AK: ''
};

for (let key in serverconfig) {
  if (serverconfig.hasOwnProperty(key)) {
    serverconfig[key] = apiconfig[key] || env[`VUE_APP_${key}`];
  }
}

export default serverconfig;
