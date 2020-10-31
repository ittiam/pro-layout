<template>
  <div>
    <template v-if="fieldOptions.fieldName && fieldOptions.type === 'text'">
      <a-col v-bind="fieldOptions.responsive">
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          :label="fieldOptions.labelText"
        >
          <a-input
            v-decorator="[
              fieldOptions.fieldName,
              { initialValue: fieldOptions.defaultValue ? fieldOptions.defaultValue : '' }
            ]"
            :size="fieldOptions.size ? fieldOptions.size : 'default'"
            :placeholder="fieldOptions.placeholder"
          />
        </a-form-item>
      </a-col>
    </template>
    <template v-if="fieldOptions.fieldName && fieldOptions.type === 'select'">
      <a-col v-bind="fieldOptions.responsive">
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          :label="fieldOptions.labelText"
        >
          <a-select
            v-decorator="[
              fieldOptions.fieldName,
              { initialValue: fieldOptions.defaultValue ? fieldOptions.defaultValue : undefined }
            ]"
            style="width: 100%"
            showSearch
            :filterOption="selectFilterOption"
            :size="fieldOptions.size ? fieldOptions.size : 'default'"
            allowClear
            :placeholder="fieldOptions.placeholder"
          >
            <template v-for="(item, index) in fieldOptions.options">
              <a-select-option :key="index" :value="item.value">
                {{ item.label }}
              </a-select-option>
            </template>
          </a-select>
        </a-form-item>
      </a-col>
    </template>
    <template v-if="fieldOptions.fieldName && fieldOptions.type === 'number'">
      <a-col v-bind="fieldOptions.responsive">
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          :label="fieldOptions.labelText"
        >
          <a-input-number
            v-decorator="[
              fieldOptions.fieldName,
              { initialValue: fieldOptions.defaultValue ? fieldOptions.defaultValue : '' }
            ]"
            :size="fieldOptions.size ? fieldOptions.size : 'default'"
            :min="fieldOptions.min ? fieldOptions.min : 1"
            style="width: 100%"
            :placeholder="fieldOptions.placeholder"
          />
        </a-form-item>
      </a-col>
    </template>
    <template
      v-if="
        fieldOptions.fieldName &&
          fieldOptions.type === 'radio' &&
          Array.isArray(fieldOptions.options)
      "
    >
      <a-col v-bind="fieldOptions.responsive">
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          :label="fieldOptions.labelText"
        >
          <a-radio-group
            v-decorator="[
              fieldOptions.fieldName,
              { initialValue: fieldOptions.defaultValue ? fieldOptions.defaultValue : '' }
            ]"
            :size="fieldOptions.size ? fieldOptions.size : 'default'"
            buttonStyle="solid"
          >
            <template v-for="(item, index) in fieldOptions.options">
              <a-radio-button :key="index" :value="item.value">{{ item.label }} </a-radio-button>
            </template>
          </a-radio-group>
        </a-form-item>
      </a-col>
    </template>
    <template v-if="fieldOptions.fieldName && fieldOptions.type === 'datetime'">
      <a-col v-bind="fieldOptions.responsive">
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          :label="fieldOptions.labelText"
        >
          <a-date-picker
            v-decorator="[
              fieldOptions.fieldName,
              { initialValue: fieldOptions.defaultValue ? fieldOptions.defaultValue : null }
            ]"
            :size="fieldOptions.size ? fieldOptions.size : 'default'"
            :placeholder="fieldOptions.placeholder"
          />
        </a-form-item>
      </a-col>
    </template>
    <template v-if="fieldOptions.fieldName && fieldOptions.type === 'datetimeRange'">
      <a-col v-bind="fieldOptions.responsive">
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          :label="fieldOptions.labelText"
        >
          <a-range-picker
            v-decorator="[
              fieldOptions.fieldName,
              { initialValue: fieldOptions.defaultValue ? fieldOptions.defaultValue : null }
            ]"
            :size="fieldOptions.size ? fieldOptions.size : 'default'"
            :placeholder="fieldOptions.placeholder"
          />
        </a-form-item>
      </a-col>
    </template>
    <template v-if="fieldOptions.fieldName && fieldOptions.type === 'cascader'">
      <a-col v-bind="fieldOptions.responsive">
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          :label="fieldOptions.labelText"
        >
          <a-cascader
            v-decorator="[
              fieldOptions.fieldName,
              { initialValue: fieldOptions.defaultValue ? fieldOptions.defaultValue : [] }
            ]"
            :size="fieldOptions.size ? fieldOptions.size : 'default'"
            :options="fieldOptions.options"
            :showSearch="{ cascaderFilter }"
            :placeholder="fieldOptions.placeholder"
          />
        </a-form-item>
      </a-col>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    itemOptions: {
      // 控件的基本参数
      type: Object,
      default: function() {
        return {
          type: 'text', // 控件类型
          defaultValue: '', // 默认值
          label: '控件名称', // 控件显示的文本
          value: '', // 控件的值
          responsive: {
            md: 8,
            sm: 24
          },
          size: '', // 控件大小
          placeholder: '' // 默认控件的空值文本
        };
      }
    }
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };
  },
  computed: {
    fieldOptions() {
      return this.itemOptions;
    }
  },
  methods: {
    selectFilterOption(input, option) {
      // 下拉框过滤函数
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    cascaderFilter(inputValue, path) {
      // 级联过滤函数
      return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    }
  }
};
</script>
