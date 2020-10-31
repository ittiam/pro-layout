<template>
  <div class="table-search-layout">
    <div class="wbgc-card table-page-search-wrapper">
      <a-form layout="inline">
        <slot name="form"></slot>
      </a-form>
    </div>
    <div class="wbgc-card table-page-list-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableSearch',

  data() {
    return {
      // 高级搜索 展开/关闭
      collapsed: false
    };
  },

  beforeCreate() {},

  methods: {}
};
</script>

<style lang="less">
.table-search-layout {
  display: flex;
  flex-direction: column;
  height: 100%;

  .table-page-list-wrapper {
    flex: 1;
    margin-top: 12px;
    border-radius: 4px;
  }

  .table-page-list-head {
    display: flex;
    align-items: center;
    height: 40px;
    padding-right: 12px;
    padding-left: 20px;

    .ant-tabs-bar {
      margin-bottom: 0;
    }

    .ant-tabs-nav {
      .ant-tabs-tab {
        padding-top: 10px;
        padding-bottom: 9px;
      }
    }

    .table-page-list-actions {
      display: flex;
      flex: 1;
      justify-content: flex-end;

      .ant-btn {
        width: 100px;
        height: 28px;
        margin-left: 8px;
        font-size: 12px;
      }
    }
  }
}

.table-page-search-wrapper {
  padding: 5px 20px;
  border-radius: 4px;

  .ant-form-inline {
    .ant-form-item {
      display: flex;
      margin-top: 5px;
      margin-right: 0;
      margin-bottom: 5px;

      .ant-form-item-control-wrapper {
        display: inline-block;
        flex: 1 1;
        vertical-align: middle;
      }

      > .ant-form-item-label {
        width: auto;
        // padding-right: 8px;
        line-height: 36px;
      }

      .ant-form-item-control {
        // display: flex;
        // align-items: center;
        // justify-content: flex-start;
        height: 36px;
        line-height: 36px;

        .ant-form-item-children {
          min-width: 160px;
        }
      }
    }
  }

  .table-page-search-submitButtons {
    float: right;
    margin-top: 5px;
    margin-bottom: 5px;
    white-space: nowrap;
    text-align: right;

    .ant-btn {
      margin-left: 20px;

      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>
