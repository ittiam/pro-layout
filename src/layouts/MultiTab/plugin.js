import events from './events';

const api = {
  /**
   * open new tab on route fullPath
   * @param config
   */
  open: function(config) {
    events.$emit('open', config);
  },
  rename: function(key, name) {
    events.$emit('rename', { key: key, name: name });
  },
  /**
   * close current page
   */
  closeCurrentPage: function() {
    this.close();
  },
  /**
   * close route fullPath tab
   * @param config
   */
  close: function(config) {
    events.$emit('close', config);
  },
  redirect: function(config) {
    this.close();
    this.open(config);
  }
};

export default {
  install(Vue) {
    if (Vue.prototype.$multiTab) {
      return;
    }
    api.instance = events;
    Vue.prototype.$multiTab = api;
  }
};
