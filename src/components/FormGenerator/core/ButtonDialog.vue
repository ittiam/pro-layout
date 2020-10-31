<template>
  <div class="linkage-dialog">
    <a-modal v-bind="$attrs" width="650px" title="按钮配置" v-on="$listeners" @cancel="onClose">
      <a-tabs v-model="activeName" type="card">
        <a-tab-pane key="action" tab="操作配置">
          <a-form-model>
            <a-form-model-item label="操作类型">
              <a-select v-model="events.click.type">
                <a-select-option label="导出" value="export">导出</a-select-option>
                <a-select-option label="上传" value="upload">上传</a-select-option>
                <a-select-option label="自定义" value="custom">自定义</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="接口地址">
              <a-input v-model="events.click.url" placeholder="请输入接口地址" clearable>
                <a-select slot="prepend" v-model="events.click.method" :style="{ width: '120px' }">
                  <a-select-option label="get" value="get">get</a-select-option>
                  <a-select-option label="post" value="post">post</a-select-option>
                  <a-select-option label="put" value="put">put</a-select-option>
                  <a-select-option label="delete" value="delete">delete</a-select-option>
                </a-select>
              </a-input>
            </a-form-model-item>
            <a-form-model-item v-if="events.click.method === 'post'" label="Content-Type">
              <a-radio-group v-model="events.click['content-type']">
                <a-radio value="application/json">json</a-radio>
                <a-radio value="multipart/form-data">form-data</a-radio>
                <a-radio value="application/x-www-form-urlencoded">x-www-form-urlencoded</a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="自定义接口参数">
              <a-input placeholder="请输入接口地址" clearable> </a-input>
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>
        <a-tab-pane key="callback" tab="回调函数"> </a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: ['events'],
  data() {
    return {
      activeName: 'action'
    };
  },
  methods: {
    onOpen() {},
    onClose() {
      this.$emit('update:visible', false);
    }
  }
};
</script>
