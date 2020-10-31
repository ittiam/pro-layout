<template>
  <div class="table-dialog">
    <a-modal v-bind="$attrs" width="980px" title="表格配置" v-on="$listeners">
      <a-tabs v-model="activeName" type="card">
        <a-tab-pane key="column" tab="表头配置">
          <el-table-draggable>
            <el-table :data="columns">
              <el-table-column label="表头名称" prop="label" width="280">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.label" />
                </template>
              </el-table-column>
              <el-table-column label="绑定字段名" prop="prop" width="280">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.prop" />
                </template>
              </el-table-column>
              <el-table-column label="数据类型" prop="type" width="280">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.type">
                    <el-option label="无" value=""></el-option>
                    <el-option label="文本" value="text"></el-option>
                    <el-option label="富文本" value="html"></el-option>
                    <el-option label="下拉选择" value="select"></el-option>
                    <el-option label="日期" value="date"></el-option>
                    <el-option label="操作" value="action"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <i class="el-icon-remove remove" @click="removeColumn(scope.$index)" />
                </template>
              </el-table-column>
            </el-table>
          </el-table-draggable>

          <!-- 添加变量按钮 -->
          <el-link
            class="form-item-content"
            type="primary"
            :underline="false"
            icon="el-icon-circle-plus"
            @click.native="addColumn"
          >
            添加表头
          </el-link>
        </a-tab-pane>
        <a-tab-pane key="static" tab="静态数据">
          <el-table :data="dataSource">
            <el-table-column
              v-for="col in columns"
              :key="col.prop"
              :label="col.label"
              :prop="col.prop"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row[col.prop]" />
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <i class="el-icon-remove remove" @click="removeRowData(scope.$index)" />
              </template>
            </el-table-column>
          </el-table>
          <!-- 添加变量按钮 -->
          <el-link
            class="form-item-content"
            type="primary"
            :underline="false"
            icon="el-icon-circle-plus"
            @click.native="addRowData"
          >
            添加数据
          </el-link>
        </a-tab-pane>
        <a-tab-pane key="dynamic" tab="动态数据">
          <el-form>
            <a-form-model-item label="rowKey">
              <a-input v-model="config.rowKey" />
            </a-form-model-item>
            <a-form-model-item label="接口地址">
              <el-input
                v-model="config.url"
                :title="config.url"
                placeholder="请输入接口地址"
                clearable
              >
                <el-select slot="prepend" v-model="config.method" :style="{ width: '85px' }">
                  <el-option label="get" value="get" />
                  <el-option label="post" value="post" />
                  <el-option label="put" value="put" />
                  <el-option label="delete" value="delete" />
                </el-select>
              </el-input>
            </a-form-model-item>
            <a-form-model-item label="数据字段">
              <a-input v-model="config.dataKey" placeholder="请输入标签键名" />
            </a-form-model-item>
            <a-form-model-item label="总条数字段">
              <a-input v-model="config.totalKey" placeholder="请输入标签键名" />
            </a-form-model-item>
            <a-form-model-item label="当前页字段">
              <a-input v-model="config.currentKey" placeholder="请输入标签键名" />
            </a-form-model-item>
          </el-form>
        </a-tab-pane>
      </a-tabs>

      <span slot="footer" class="dialog-footer">
        <a-button type="primary" @click="submit">确 定</a-button>
      </span>
    </a-modal>
  </div>
</template>

<script>
import ElTableDraggable from 'element-ui-el-table-draggable';

export default {
  components: {
    ElTableDraggable
  },
  inheritAttrs: false,
  props: ['config', 'data-source'],
  data() {
    return {
      activeName: 'column',
      columns: []
    };
  },
  methods: {
    close() {
      this.$emit('update:visible', false);
    },
    submit() {
      let children = this.columns.map(col => {
        let child = this.config.children.find(o => o.prop === col.prop);
        let ret = this.createColumn(col);

        return ret;
      });

      this.config.children = children;

      this.$emit('update', this.config);
      this.close();
    },
    createColumn(col) {
      return {
        __config__: {
          layout: 'raw',
          tag: 'el-table-column',
          type: col.type
          // renderKey: new Date().getTime()
        },
        prop: col.prop,
        label: col.label
      };
    },
    onOpen() {
      let children = this.config.children || [];
      this.columns = children.map(item => {
        return {
          label: item.label,
          prop: item.prop,
          type: item.__config__.type
        };
      });
    },
    removeColumn(index) {
      this.columns.splice(index, 1);
    },
    addColumn() {
      this.columns.push({
        label: '',
        prop: '',
        type: 'text'
      });
    },
    removeRowData(index) {
      this.dataSource.splice(index, 1);
    },
    addRowData() {
      let data = {};
      this.columns.forEach(el => {
        data[el.prop] = '';
      });

      this.dataSource.push(data);
    }
  }
};
</script>

<style lang="less" scoped>
.form-item-content {
  margin-top: 15px;
}

.el-icon-remove {
  color: #f00;
}
</style>
