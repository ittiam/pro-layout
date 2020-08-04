<template>
  <div class="out-wrapper">
    <div class="treebox edit-tree wbgc-tree">
      <div class="search-input-wrapper">
        <a-input-search placeholder="关键字搜索" @change="onChange" />
      </div>
      <div class="tree-outer-wrapper">
        <div class="tree-inner-wrapper">
          <a-tree
            class="ant-tree-directory"
            :selectedKeys="selectedKeys"
            :expandedKeys="expandedKeys"
            :autoExpandParent="autoExpandParent"
            :treeData="treeData"
            :replaceFields="{ children: 'child', key: 'id' }"
            @expand="onExpand"
            @select="onSelect"
          >
            <template slot="name" slot-scope="item">
              <!-- 编辑节点 -->
              <div v-if="editable && currentTreeNode && currentTreeNode.id === item.id">
                <a-input
                  ref="editInput"
                  :maxLength="20"
                  :defaultValue="item.name"
                  @pressEnter="updateTree($event, item.id)"
                  @blur="blurEditInput($event)"
                />
              </div>
              <!-- 节点标题 -->
              <div v-else style="display: flex;">
                <div v-if="item.id" class="title">
                  <span v-if="item.name.indexOf(searchValue) > -1">
                    {{ item.name.substr(0, item.name.indexOf(searchValue)) }}
                    <span style="color: #f50">{{ searchValue }}</span>
                    {{ item.name.substr(item.name.indexOf(searchValue) + searchValue.length) }}
                  </span>
                  <span v-else>{{ item.name }}</span>
                </div>
                <div v-if="item.id" class="toolbox fr">
                  <span v-if="item.isDirectory === '1'" @click="handleAdd(item)"
                    ><i class="wfs14 wpgicon icon-ic_add_circle_outline"
                  /></span>
                  <span @click="handleEdit(item)"><i class="wfs14 wpgicon icon-ic_editor"/></span>
                  <span @click="handleDelete(item)"><i class="wfs14 wpgicon icon-ic_delete"/></span>
                </div>
              </div>

              <!-- 新增子节点 -->
              <div
                v-if="addInputType === 2 && currentTreeNode && item.pid === currentTreeNode.id"
                class="tree-input"
              >
                <a-input
                  ref="input"
                  :maxLength="20"
                  placeholder="目录不能大于20个字符"
                  @pressEnter="addTreeNode($event, item.pid)"
                  @blur="blurTreeNode($event)"
                />
              </div>
            </template>
          </a-tree>
          <div v-if="addInputType === 1" class="tree-input">
            <a-input
              ref="inputParent"
              :maxLength="20"
              placeholder="目录不能大于20个字符"
              @pressEnter="addTreeNode($event, '0')"
              @blur="blurTreeNode($event)"
            />
          </div>
          <div class="tree-add-btn wfc2" @click="handleAddParent">
            <span><i class="wfs18 wpgicon icon-ic_add_circle_outline"></i>新增</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const dataList = [];
const generateList = data => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const id = node.id;
    data[i].title = data[i].name;
    data[i].scopedSlots = {
      title: 'name'
    };
    dataList.push({ id, title: id });
    if (node.child) {
      generateList(node.child, node.id);
    }
  }
};
/**
 * 获取节点name中含有value的所有key集合
 * * */
const getkeyList = (value, tree, keyList) => {
  for (let i = 0; i < tree.length; i++) {
    let node = tree[i];
    if (node.name.indexOf(value) > -1) {
      keyList.push(node.id);
    }
    // 如果拥有孩子继续遍历
    if (node.child) {
      getkeyList(value, node.child, keyList);
    }
  }
  return keyList;
};
/**
 * 该递归主要用于获取key的父亲节点的key值
 * * */
const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.child) {
      if (node.child.some(item => item.id === key)) {
        parentKey = node.id;
      } else if (getParentKey(key, node.child)) {
        parentKey = getParentKey(key, node.child);
      }
    }
  }
  return parentKey;
};

export default {
  name: 'STree',

  props: {
    /**
     * 多层节点树数据
     * */
    treeData: {
      type: Array
    },
    /**
     * 新增要打开的expandedKeys
     * */
    addExpandedKeys: {
      type: Array,
      require: true,
      default: () => []
    },
    selectedKeys: {
      type: Array,
      require: true,
      default: () => []
    }
  },

  data() {
    return {
      /**
       * 树节点
       * */
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      currentTreeNode: null, // 当前正在编辑的 tree node
      addInputType: 0, // 是否添加 0： 不显示, 1 添加 root, 2: 添加 child
      editable: false // 是否编辑
    };
  },
  watch: {
    treeData(newVal) {
      generateList(newVal);
    },
    addExpandedKeys(newVal) {
      this.expandedKeys = this.expandedKeys.concat(newVal);
    }
  },

  methods: {
    /**
     * @description: 树节点展开onExpand、选择onSelect、搜索框onChange
     * @param {expandedKeys: 展开的节点 e:事件对象}
     * @return: void
     */
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },

    onSelect(selectedKeys, e) {
      this.$emit('selectNode', e.selectedNodes);
    },

    onChange(e) {
      const value = e.target.value.trim();
      let backupsExpandedKeys = [];
      if (value === '') {
        this.expandedKeys = [];
      } else {
        this.expandedKeys = [];
        let candidateKeysList = getkeyList(value, this.treeData, []); // 获取节点name中含有value的所有key集合
        candidateKeysList.map(item => {
          let key = getParentKey(item, this.treeData);
          // 当item是最高一级，父key为undefined，将不存在的父亲key放入到数组中
          if (key && !backupsExpandedKeys.some(item => item === key)) {
            backupsExpandedKeys.push(key);
          }
        });
      }
      Object.assign(this, {
        expandedKeys: backupsExpandedKeys.slice(),
        searchValue: value,
        autoExpandParent: true
      });
    },

    deleteInputNode() {
      if (this.currentTreeNode) {
        this.currentTreeNode.child.splice(0, 1);
      }
      this.currentTreeNode = null;
    },

    addNewInputNode(item) {
      const newChild = {
        title: '',
        id: '',
        pid: item.id,
        scopedSlots: { title: 'name' },
        child: []
      };
      if (!item.child) {
        this.$set(item, 'child', []);
      }
      item.child.splice(0, 0, newChild);

      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },

    handleAddParent() {
      this.addInputType = 1;
      this.$nextTick(() => {
        this.$refs.inputParent.focus();
      });
    },

    handleAdd(item) {
      if (this.currentTreeNode) {
        if (this.currentTreeNode.id !== item.id) {
          this.deleteInputNode();
          this.addNewInputNode(item);
        }
      } else {
        this.addNewInputNode(item);
      }
      this.currentTreeNode = item;
      this.addInputType = 2;
      this.expandedKeys.push(item.id);
    },

    handleEdit(item) {
      this.editable = true;
      this.currentTreeNode = item;

      this.$nextTick(() => {
        this.$refs.editInput.focus();
      });
    },

    handleDelete(item) {
      this.$confirm({
        title: '删除目录',
        content: '确认要删除' + item.name + '目录吗?',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          let param = {
            id: item.id,
            action: 'delete'
          };
          this.$emit('updateNode', param);
        },
        onCancel: () => {}
      });
    },

    addTreeNode($event, id) {
      let value = $event.target.value.trim();

      if (!value) {
        this.$message.warn('目录不能为空！请重新填写');
        return;
      }

      this.$confirm({
        title: '添加目录',
        content: '确认要添加这个目录吗?',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          let param = {
            isDirectory: '1',
            parentId: id,
            name: value,
            action: 'add'
          };
          this.addInputType = 0;
          this.deleteInputNode();
          this.$emit('updateNode', param);
        },
        onCancel: () => {
          this.addInputType = 0;
          this.deleteInputNode();
          this.editable = false;
        }
      });
    },

    /**
     * @description：更新树目录
     * @param {$event:事件对象 info：更新数据信息}
     * @return: void
     * */
    updateTree($event, id) {
      this.showUpdateConfirm = true;
      let value = $event.target.value.trim();

      if (!value) {
        this.$message.warn('目录不能为空！请重新填写');
        return;
      }
      this.$confirm({
        title: '更新目录',
        content: '确认要更新该目录吗?',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          let param = {
            id: id,
            name: value,
            action: 'edit'
          };
          this.editable = false;
          this.currentTreeNode = null;
          this.showUpdateConfirm = false;
          this.$emit('updateNode', param);
        },
        onCancel: () => {
          this.showUpdateConfirm = false;
        }
      });
    },

    blurEditInput($event) {
      if (!this.showUpdateConfirm) {
        this.editable = false;
        this.currentTreeNode = null;
      }
    },

    blurTreeNode($event) {
      let value = $event.target.value.trim();

      if (!value) {
        this.addInputType = 0;
        this.deleteInputNode();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.out-wrapper {
  height: 100%;

  .edit-tree {
    height: 100%;

    .search-input-wrapper {
      padding: 12px 16px 4px;
    }

    .tree-outer-wrapper {
      // position: absolute;
      // width: 100%;
      // height: calc(100% - 48px);
      // overflow: auto;

      // .tree-inner-wrapper {
      //   position: absolute;
      //   min-width: 100%;
      // }
    }

    .tree-add-btn {
      padding: 7px 15px;
      cursor: pointer;

      span i {
        margin-right: 10px;
        vertical-align: text-top;
      }
    }
  }

  .tree-input {
    padding: 10px 16px;
  }

  /deep/ .ant-tree-title {
    .tree-input {
      padding: 0;
    }
  }
}
</style>
<style lang="less">
.edit-tree {
  .tree-outer-wrapper {
    .ant-tree {
      min-width: 100%;

      .ant-tree-node-content-wrapper {
        width: auto !important;
        padding-right: 60px;

        &:hover {
          .toolbox {
            display: inline-block;
          }
        }

        .ant-tree-title {
          display: flex;
          height: 100%;

          .title {
            flex: 1 1 auto;
            padding-right: 20px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .edit-input {
            display: block !important;
            width: 100%;
            height: 24px;
            margin-top: 8px;
          }

          .edit-input + .toolbox {
            display: none !important;
          }
        }

        .toolbox {
          display: none;
          flex: 0 0 auto;
        }
      }
    }
  }
}
</style>
