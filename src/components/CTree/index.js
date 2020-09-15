/*
 * @Date: 2019-11-19 14:27:46
 * @Version: 0.0.1
 * @Author: chenhengling
 * @Description:
 * @LastEditTime: 2019-11-20 16:02:16
 * @LastEditors: chenhengling
 */
import Tree from './Tree.vue';

/* istanbul ignore next */
Tree.install = function(Vue) {
  Vue.component(Tree.name, Tree);
};

export default Tree;
