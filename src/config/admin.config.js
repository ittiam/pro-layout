// admin 配置
const ADMIN = {
  palettes: [
    '#f5222d',
    '#fa541c',
    '#fadb14',
    '#3eaf7c',
    '#13c2c2',
    '#1890ff',
    '#722ed1',
    '#eb2f96'
  ],
  theme: {
    mode: {
      DARK: 'dark',
      LIGHT: 'light',
      NIGHT: 'night'
    }
  },
  layout: {
    SIDE: 'side',
    HEAD: 'head'
  },
  storageOptions: {
    namespace: 'pro__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local' // storage name session, local, memory
  }
};

module.exports = ADMIN;
