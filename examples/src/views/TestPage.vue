<template>
  <document-title title="我是PAGE1">
    <div class="page-test-wrapper">
      <h1>Test Page keepAlive: {{ $route.meta.keepAlive }}</h1>
      <div class="box">
        <div style="margin: 1em 0">
          <a-input placeholder="home" />
        </div>
        <a-button @click="handleClick">Click Me!</a-button><a-divider type="vertical" />
        <a-button @click="handleRefresh">Refresh Current</a-button><a-divider type="vertical" />
        <a-button @click="handleGetAllCache">Get All Cache</a-button><a-divider type="vertical" />
        <a-button @click="handleChangeLang('zh-CN')">Lang zh-CN</a-button
        ><a-divider type="vertical" />
        <a-button @click="handleChangeLang('en-US')">Lang en-US</a-button>
        <a-divider />
      </div>
      <a-row>
        <a-col class="tree-wrap">
          <STree
            :treeData="treeData"
            :addExpandedKeys="expandedKeys"
            @updateNode="updateTreeNode"
            @selectNode="onSelectNode"
          ></STree>
        </a-col>
      </a-row>
    </div>
  </document-title>
</template>

<script>
import { loadLanguageAsync } from '@/locales';
import STree from '@/components/Tree';
import treeData from '@/config/tree.config';

export default {
  components: {
    STree
  },
  data() {
    return {
      treeData,
      expandedKeys: []
    };
  },
  methods: {
    handleClick(e) {
      this.$router.push({ path: '/page2' });
    },
    handleClearPage1() {},
    handleGetAllCache() {
      this.$tab.caches(data => {});
    },
    handleRefresh() {
      // this.$tab.refresh('/page2')
      this.$tab.refresh();
    },
    handleChangeLang(lang) {
      loadLanguageAsync(lang);
    },
    updateTreeNode() {},
    onSelectNode() {}
  }
};
</script>

<style lang="less" scoped>
.page-test-wrapper {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
</style>
