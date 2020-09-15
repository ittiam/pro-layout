/**
 * @DATE:  2020/6/30 2:38 PM
 * @Version: 0.0.1
 * @Author: huhaiou
 * @Description:
 * @Update: 更新内容 by huhaiou 2020/6/30 2:38 PM
 */

import Vue from 'vue';
import Alert from './AlertModal.vue';

// 创建并实例化一个alertModal组件并显式调用 vm.$mount(),渲染为文档之外的的元素并随后挂载
let AlertConstructor = Vue.extend(Alert); // 返回一个“扩展实例构造器”
let AlertModal = (
  type = 'info',
  message = '提示信息',
  description = '',
  closable = true,
  centered = false,
  showIcon = true,
  duration = 2
) => {
  let alertDom = new AlertConstructor({
    propsData: { visible: true, type, message, description, closable, centered, showIcon, duration }
  }).$mount();
  document.body.appendChild(alertDom.$el); //把Alert组件的dom添加到body里
  alertDom.$on('close', () => {
    // alertDom.visible = false;
    // alertDom.$destroy();
    alertDom.$el.remove();
  });
};
export default AlertModal;
