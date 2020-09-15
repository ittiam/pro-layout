<!--
 * @Author: lfl
 * @Date: 2019-12-04 17:42:09
 * @LastEditors: chenky
 * @LastEditTime: 2019-12-09 10:38:05
 * @Description:标签页、标签模板
 -->
<template>
  <div>
    <p>基础标签页</p>
    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="Tab 1" key="1">Content of Tab Pane 1</a-tab-pane>
      <a-tab-pane tab="Tab 2" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
      <a-tab-pane tab="Tab 3" key="3">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
    <p>滑动标签页</p><br>
    <div style="width: 500px">
    <a-radio-group v-model="mode" :style="{ marginBottom: '8px' }">
      <a-radio-button value="top">Horizontal</a-radio-button>
      <a-radio-button value="left">Vertical</a-radio-button>
    </a-radio-group>
    <a-tabs
      defaultActiveKey="1"
      :tabPosition="mode"
      :style="{ height: '200px'}"
      @prevClick="callback"
      @nextClick="callback"
    >
      <a-tab-pane tab="Tab 1" key="1">Content of tab 1</a-tab-pane>
      <a-tab-pane tab="Tab 2" key="2">Content of tab 2</a-tab-pane>
      <a-tab-pane tab="Tab 3" key="3">Content of tab 3</a-tab-pane>
      <a-tab-pane tab="Tab 4" key="4">Content of tab 4</a-tab-pane>
      <a-tab-pane tab="Tab 5" key="5">Content of tab 5</a-tab-pane>
      <a-tab-pane tab="Tab 6" key="6">Content of tab 6</a-tab-pane>
      <a-tab-pane tab="Tab 7" key="7">Content of tab 7</a-tab-pane>
      <a-tab-pane tab="Tab 8" key="8">Content of tab 8</a-tab-pane>
      <a-tab-pane tab="Tab 9" key="9">Content of tab 9</a-tab-pane>
      <a-tab-pane tab="Tab 10" key="10">Content of tab 10</a-tab-pane>
      <a-tab-pane tab="Tab 11" key="11">Content of tab 11</a-tab-pane>
    </a-tabs>
    <p>卡片页标签</p><br>
    <a-tabs type="card">
    <a-tab-pane tab="Tab 1" key="1">Content of Tab Pane 1</a-tab-pane>
    <a-tab-pane tab="Tab 2" key="2">Content of Tab Pane 2</a-tab-pane>
    <a-tab-pane tab="Tab 3" key="3">Content of Tab Pane 3</a-tab-pane>
  </a-tabs>
  </div>
  <p>tag模板</p><br>
   <div>
    <a-tag>Tag 1</a-tag>
    <a-tag><a href="https://github.com/vueComponent/ant-design">Link</a></a-tag>
    <a-tag closable >Tag 2</a-tag>
    <a-tag closable >Prevent Default</a-tag>
   </div>
   <br>
   <p>彩色标签</p>
   <div>
    <h4 style="margin-bottom: 16px">Presets:</h4>
    <div>
      <a-tag color="pink">pink</a-tag>
      <a-tag color="red">red</a-tag>
      <a-tag color="orange">orange</a-tag>
      <a-tag color="cyan">cyan</a-tag>
      <a-tag color="blue">blue</a-tag>
      <a-tag color="purple">purple</a-tag>
    </div>
    <h4 style="margin: 16px 0">Custom:</h4>
    <div>
      <a-tag color="#f50">#f50</a-tag>
      <a-tag color="#2db7f5">#2db7f5</a-tag>
      <a-tag color="#87d068">#87d068</a-tag>
      <a-tag color="#108ee9">#108ee9</a-tag>
    </div>
  </div>
  </div>
</template>
<script>
  export default {
      data() {
          return {
              mode: "top"
          };
      },
      methods: {
          callback(key) {
              console.log(key);
          }
      }
  };
</script>
