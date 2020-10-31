<template>
  <div class="form-generator-container">
    <div class="left-board">
      <vc-scrollbar class="left-scrollbar">
        <div class="components-list">
          <div>
            <div class="components-title">
              <i class="wpgicon icon-ic_view_list"></i>
              <span>通用组件</span>
            </div>
            <a-radio-group v-model="generalComponent">
              <a-radio-button v-for="item in generalComponents" :key="item.type" :value="item.type">
                {{ item.title }}
              </a-radio-button>
            </a-radio-group>
            <div
              v-for="item in generalComponents"
              v-show="generalComponent === item.type"
              :key="item.type"
              class="components-container"
            >
              <draggable
                class="components-draggable"
                :list="item.list"
                :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
                :clone="cloneComponent"
                draggable=".components-item"
                :sort="false"
                @end="onEnd"
              >
                <div
                  v-for="(element, index) in item.list"
                  :key="index"
                  class="components-item"
                  @click="addComponent(element)"
                >
                  <div class="components-body">
                    {{ element.__config__.label }}
                    <svg-icon :icon-class="element.__config__.tagIcon" />
                  </div>
                </div>
              </draggable>
            </div>
          </div>
          <a-divider></a-divider>
          <div>
            <div class="components-title">
              <i class="wpgicon icon-ic_group"></i>
              <span>业务组件</span>
            </div>
            <a-radio-group v-model="businessComponent">
              <a-radio-button
                v-for="component in businessComponents"
                :key="component.type"
                :value="component.type"
              >
                {{ component.title }}
              </a-radio-button>
            </a-radio-group>
            <div
              v-for="item in businessComponents"
              v-show="businessComponent === item.type"
              :key="item.type"
              class="components-container"
            >
              <draggable
                class="components-draggable"
                :list="item.list"
                :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
                :clone="cloneComponent"
                draggable=".components-item"
                :sort="false"
                @end="onEnd"
              >
                <div
                  v-for="(element, index) in item.list"
                  :key="index"
                  class="components-item"
                  @click="addComponent(element)"
                >
                  <div class="components-body">
                    {{ element.__config__.label }}
                  </div>
                </div>
              </draggable>
            </div>
          </div>
        </div>
      </vc-scrollbar>
    </div>
    <div class="center-board">
      <div class="action-bar">
        <div class="action-bar-title">
          <i class="wpgicon icon-ic_dvr"></i>
          <span>模版可视化窗口</span>
        </div>
        <a-button v-if="defaultComponents.length" type="link" @click="previewDefault">
          <i class="wpgicon icon-ic_chrome_reader_mode"></i> 查看默认字段
        </a-button>
        <a-button type="link" @click="preview">
          <i class="wpgicon icon-ic_visibility"></i>预览
        </a-button>
        <a-button type="link" class="action-bar-empty" @click="empty">
          <i class="wpgicon icon-ic_delete"></i>清空
        </a-button>
      </div>
      <div ref="domImage" class="center-render">
        <vc-scrollbar class="center-scrollbar">
          <a-row class="center-board-row" :gutter="formConf.gutter">
            <p v-if="defaultComponents.length" class="drawing-tip">
              提示：创建节点存在默认字段信息 可点击上方查看默认字段按钮
            </p>
            <a-form-model
              :class="{ [`ant-form--label-${formConf.labelPosition}`]: formConf.labelPosition }"
              :style="formStyle"
              :layout="formLayout"
            >
              <draggable
                class="drawing-board"
                :list="drawingList"
                :animation="340"
                group="componentsGroup"
              >
                <draggable-item
                  v-for="(item, index) in drawingList"
                  :key="item.renderKey"
                  :drawing-list="drawingList"
                  :current="item"
                  :index="index"
                  :active-id="activeId"
                  :form-conf="formConf"
                  @activeItem="activeFormItem"
                  @copyItem="drawingItemCopy"
                  @deleteItem="drawingItemDelete"
                />
              </draggable>
              <div v-show="!drawingList.length" class="empty-info">
                <svg-icon icon-class="draw" />
              </div>
            </a-form-model>
          </a-row>
        </vc-scrollbar>
      </div>
    </div>
    <div class="right-board">
      <right-panel
        v-if="activeData"
        :center-height="centerHeight"
        :active-data="activeData"
        :form-conf="formConf"
        :show-field="!!drawingList.length"
        @tag-change="tagChange"
      />
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { debounce } from 'throttle-debounce';
import DraggableItem from './DraggableItem';
import RightPanel from './RightPanel';
import { deepClone } from '../utils/index';
import FormParser from 'antv-form-gen-parser';

import {
  getDrawingList,
  saveDrawingList,
  getIdGlobal,
  saveIdGlobal,
  getFormConf
} from '../utils/db';

import {
  inputComponents,
  selectComponents,
  layoutComponents,
  productionComponents,
  pipeComponents,
  marketingComponents,
  formConf
} from '../generator/config';

import drawingDefalut from '../generator/drawingDefalut';

import './index.scss';

const layoutMappers = {
  top: 'vertical',
  left: 'horizontal',
  right: 'horizontal'
};

let tempActiveData;
let oldActiveId;
const drawingListInDB = getDrawingList();
const formConfInDB = getFormConf();
const idGlobal = getIdGlobal();

export default {
  name: 'FormGenerator',

  components: {
    draggable,
    RightPanel,
    DraggableItem
  },

  props: {
    defaultComponents: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  data() {
    return {
      idGlobal,
      formConf,
      inputComponents,
      selectComponents,
      layoutComponents,
      labelWidth: 100,
      drawingList: [],
      drawingData: {},
      activeId: '',
      drawerVisible: false,
      formData: {},
      dialogVisible: false,
      jsonDrawerVisible: false,
      generateConf: null,
      showFileName: false,
      activeData: null,
      saveIdGlobalDebounce: debounce(340, saveIdGlobal),
      centerHeight: 0,
      generalComponent: 'input',
      generalComponents: [
        {
          title: '输入型',
          type: 'input',
          list: inputComponents
        },
        {
          title: '选择型',
          type: 'select',
          list: selectComponents
        },
        {
          title: '布局型',
          type: 'layout',
          list: layoutComponents
        }
      ],
      businessComponent: 'production',
      businessComponents: [
        {
          title: '生产类',
          type: 'production',
          list: productionComponents
        },
        {
          title: '管网类',
          type: 'pipe',
          list: pipeComponents
        },
        {
          title: '营销类',
          type: 'marketing',
          list: marketingComponents
        }
      ]
    };
  },

  computed: {
    formStyle() {
      return {
        height: `${this.centerHeight}px`
      };
    },

    formLayout() {
      return layoutMappers[this.formConf.labelPosition];
    }
  },

  watch: {
    // eslint-disable-next-line func-names
    'activeData.__config__.label': function(val, oldVal) {
      if (
        this.activeData.placeholder === undefined ||
        !this.activeData.__config__.tag ||
        oldActiveId !== this.activeId
      ) {
        return;
      }
      this.activeData.placeholder = this.activeData.placeholder.replace(oldVal, '') + val;
    },

    activeId: {
      handler(val) {
        oldActiveId = val;
      },
      immediate: true
    },

    idGlobal: {
      handler(val) {
        this.saveIdGlobalDebounce(val);
      },
      immediate: true
    }
  },

  mounted() {
    let domImage = this.$refs.domImage;
    this.centerHeight = domImage.clientHeight;

    if (Array.isArray(drawingListInDB) && drawingListInDB.length > 0) {
      // this.drawingList = drawingListInDB
    } else {
      this.drawingList = drawingDefalut;
    }

    if (formConfInDB) {
      this.formConf = formConfInDB;
    }
  },

  methods: {
    activeFormItem(currentItem) {
      this.activeData = currentItem;
      this.activeId = currentItem.__config__.formId;
    },

    onEnd(obj) {
      if (obj.from !== obj.to) {
        this.activeData = tempActiveData;
        this.activeId = this.idGlobal;
      }
    },

    addComponent(item) {
      const clone = this.cloneComponent(item);
      this.drawingList.push(clone);
      this.activeFormItem(clone);
    },

    cloneComponent(origin) {
      const clone = deepClone(origin);
      const config = clone.__config__;
      config.span = this.formConf.span; // 生成代码时，会根据span做精简判断
      this.createIdAndKey(clone);
      clone.placeholder !== undefined && (clone.placeholder += config.label);
      tempActiveData = clone;
      return tempActiveData;
    },

    createIdAndKey(item) {
      const config = item.__config__;
      config.formId = ++this.idGlobal;
      config.renderKey = `${config.formId}${Number(new Date())}`; // 改变renderKey后可以实现强制更新组件
      if (config.layout === 'colFormItem') {
        item.__vModel__ = `field${this.idGlobal}`;
      } else if (config.layout === 'rowFormItem') {
        config.componentName = `row${this.idGlobal}`;
        !Array.isArray(config.children) && (config.children = []);
        delete config.label; // rowFormItem无需配置label属性
      }
      if (Array.isArray(config.children)) {
        config.children = config.children.map(childItem => this.createIdAndKey(childItem));
      }
      return item;
    },

    AssembleFormData() {
      this.formData = {
        fields: deepClone(this.drawingList),
        ...this.formConf
      };
    },

    previewDefault() {
      this.$dialog(
        FormParser,
        {
          formConf: {
            fields: this.defaultComponents,
            formRef: 'elForm',
            formModel: 'formData',
            labelPosition: 'right',
            labelWidth: 120,
            disabled: true
          }
        },
        {
          width: 790,
          footer: null,
          dialogClass: 'dialog-preview-form',
          title: '查看默认字段'
        }
      );
    },

    preview() {
      this.AssembleFormData();

      this.$dialog(
        FormParser,
        {
          formConf: this.formData
        },
        {
          width: 790,
          footer: null,
          dialogClass: 'dialog-preview-form',
          title: '预览表单'
        }
      );
    },

    empty() {
      this.$confirm({
        title: '提示',
        content: '确定要清空所有组件吗？',
        onOk: () => {
          this.drawingList = [];
          this.idGlobal = 100;
          // this.activeData = null;
          // this.activeId = '';
        }
      });
    },

    drawingItemCopy(item, list) {
      let clone = deepClone(item);
      clone = this.createIdAndKey(clone);
      list.push(clone);
      this.activeFormItem(clone);
    },

    drawingItemDelete(index, list) {
      list.splice(index, 1);
      this.$nextTick(() => {
        const len = this.drawingList.length;
        if (len) {
          this.activeFormItem(this.drawingList[len - 1]);
        }
      });
    },

    tagChange(newTag) {
      newTag = this.cloneComponent(newTag);
      const config = newTag.__config__;
      newTag.__vModel__ = this.activeData.__vModel__;
      config.formId = this.activeId;
      config.span = this.activeData.__config__.span;
      this.activeData.__config__.tag = config.tag;
      this.activeData.__config__.tagIcon = config.tagIcon;
      this.activeData.__config__.document = config.document;
      if (typeof this.activeData.__config__.defaultValue === typeof config.defaultValue) {
        config.defaultValue = this.activeData.__config__.defaultValue;
      }
      Object.keys(newTag).forEach(key => {
        if (this.activeData[key] !== undefined) {
          newTag[key] = this.activeData[key];
        }
      });
      this.activeData = newTag;
      this.updateDrawingList(newTag, this.drawingList);
    },

    updateDrawingList(newTag, list) {
      const index = list.findIndex(item => item.__config__.formId === this.activeId);
      if (index > -1) {
        list.splice(index, 1, newTag);
      } else {
        list.forEach(item => {
          if (Array.isArray(item.__config__.children)) {
            this.updateDrawingList(newTag, item.__config__.children);
          }
        });
      }
    },

    refreshJson(data) {
      this.drawingList = deepClone(data.fields);
      delete data.fields;
      this.formConf = data;
    },

    refreshForm(resultData) {
      this.formDataObj = resultData;
      if (resultData.formJson) {
        this.formData = resultData.formJson;
        this.drawingList = this.formData.fields;
        this.activeFormItem(this.drawingList[0]);
      }
    }
  }
};
</script>
