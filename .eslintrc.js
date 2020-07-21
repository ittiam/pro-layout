/*
 * @Author: your name
 * @Date: 2020-04-21 09:01:50
 * @LastEditTime: 2020-04-30 10:51:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 */
module.exports = {
  extends: ['mixup', 'mixup/vue'],
  env: {
    // 你的环境变量（包含多个预定义的全局变量）
    //
    // browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // 你的全局变量（设置为 false 表示它不允许被重新赋值）
    BMap: true,
    BMapLib: true
  },
  rules: {
    // 自定义你的规则
    'vue/no-deprecated-slot-attribute': 'off'
  }
};
