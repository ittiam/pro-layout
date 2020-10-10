// admin 配置
const ADMIN = {
  theme: {
    mode: {
      DARK: 'dark',
      LIGHT: 'light'
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
