<template>
  <a-form v-if="formData.list.length" class="dynamic-form" :form="form">
    <a-row :gutter="formData.layout.gutter">
      <a-col v-for="(formItem, index) in formData.list" :key="index" :span="formItem.layout.span">
        <a-form-item
          :label="formItem.label"
          :labelCol="formItem.layout.labelCol"
          :colon="!!formItem.layout.labelColon"
          :wrapperCol="formItem.layout.wrapperCol"
        >
          <!-- 文本输入框 -->
          <a-input
            v-if="formItem.fieldType === 'input'"
            v-decorator="[
              formItem.fieldName,
              { initialValue: formItem.initialValue, rules: formItem.rules }
            ]"
            :placeholder="formItem.placeholder"
            :disabled="formItem.disabled"
            v-bind="formItem.attrs"
            v-on="formItem.listeners"
          />
          <!-- 数字输入框 -->
          <a-input-number
            v-if="formItem.fieldType === 'inputNumber'"
            v-decorator="[
              formItem.fieldName,
              { initialValue: formItem.initialValue, rules: formItem.rules }
            ]"
            :placeholder="formItem.placeholder"
            :disabled="formItem.disabled"
            v-bind="formItem.attrs"
            v-on="formItem.listeners"
          />
          <!-- 密码输入框 -->
          <a-input-password
            v-if="formItem.fieldType === 'password'"
            v-decorator="[
              formItem.fieldName,
              { initialValue: formItem.initialValue, rules: formItem.rules }
            ]"
            :placeholder="formItem.placeholder"
            :disabled="formItem.disabled"
            v-bind="formItem.attrs"
            v-on="formItem.listeners"
          />
          <!-- 文本域输入框 -->
          <a-textarea
            v-if="formItem.fieldType === 'textarea'"
            v-decorator="[
              formItem.fieldName,
              { initialValue: formItem.initialValue, rules: formItem.rules }
            ]"
            :placeholder="formItem.placeholder"
            :disabled="formItem.disabled"
            v-bind="formItem.attrs"
            v-on="formItem.listeners"
          />
          <!-- 下拉选择框 -->
          <a-select
            v-else-if="formItem.fieldType === 'select'"
            v-decorator="[
              formItem.fieldName,
              { initialValue: formItem.initialValue, rules: formItem.rules }
            ]"
            :placeholder="formItem.placeholder"
            :disabled="formItem.disabled"
            v-bind="formItem.attrs"
            v-on="formItem.listeners"
          >
            <a-select-option v-for="opt in formItem.options" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </a-select-option>
          </a-select>
          <!-- 树选择器 -->
          <a-tree-select
            v-else-if="formItem.fieldType === 'treeSelect'"
            v-decorator="[
              formItem.fieldName,
              { initialValue: formItem.initialValue, rules: formItem.rules }
            ]"
            :placeholder="formItem.placeholder"
            :disabled="formItem.disabled"
            :treeData="formItem.options"
            :dropdownStyle="{ maxHeight: '50vh' }"
            v-bind="formItem.attrs"
            v-on="formItem.listeners"
          />
          <!-- 带搜索多选树选择器 -->

          <!-- 级联选择器 -->
          <a-cascader
            v-else-if="formItem.fieldType === 'cascader'"
            v-decorator="[
              formItem.fieldName,
              { initialValue: formItem.initialValue, rules: formItem.rules }
            ]"
            :placeholder="formItem.placeholder"
            :disabled="formItem.disabled"
            :options="formItem.options"
            :fieldNames="formItem.fieldNames"
            v-bind="formItem.attrs"
            v-on="formItem.listeners"
          />
          <!-- 单选组 -->
          <a-radio-group
            v-else-if="formItem.fieldType === 'radio'"
            v-decorator="[
              formItem.fieldName,
              { initialValue: formItem.initialValue, rules: formItem.rules }
            ]"
            :disabled="formItem.disabled"
            :options="formItem.options"
            :fieldNames="formItem.fieldNames"
            v-bind="formItem.attrs"
            v-on="formItem.listeners"
          />
          <!-- 切换按钮 -->
          <a-switch
            v-else-if="formItem.fieldType === 'switch'"
            v-decorator="[
              formItem.fieldName,
              {
                initialValue: formItem.initialValue,
                rules: formItem.rules,
                valuePropName: 'checked'
              }
            ]"
            :disabled="formItem.disabled"
            :fieldNames="formItem.fieldNames"
            v-bind="formItem.attrs"
            v-on="formItem.listeners"
          />
          <!-- 日期|日期时间选择器 -->
          <a-date-picker
            v-else-if="formItem.fieldType === 'datePicker'"
            v-decorator="[
              formItem.fieldName,
              { initialValue: formItem.initialValue, rules: formItem.rules }
            ]"
            :show-time="formItem.showTime"
            :format="formItem.format"
            :placeholder="formItem.placeholder"
            :disabled="formItem.disabled"
            v-bind="formItem.attrs"
            v-on="formItem.listeners"
          />
          <!-- 月选择器 -->
          <a-month-picker
            v-else-if="formItem.fieldType === 'monthPicker'"
            v-decorator="[
              formItem.fieldName,
              { initialValue: formItem.initialValue, rules: formItem.rules }
            ]"
            :format="formItem.format"
            :placeholder="formItem.placeholder"
            :disabled="formItem.disabled"
            v-bind="formItem.attrs"
            v-on="formItem.listeners"
          />
          <!-- 日期|日期时间范围选择器 -->
          <a-range-picker
            v-else-if="formItem.fieldType === 'rangePicker'"
            v-decorator="[
              formItem.fieldName,
              { initialValue: formItem.initialValue, rules: formItem.rules }
            ]"
            :format="formItem.format"
            :placeholder="formItem.placeholder"
            :disabled="formItem.disabled"
            v-bind="formItem.attrs"
            v-on="formItem.listeners"
          />
          <!-- 月范围选择器 -->
          <a-range-picker
            v-if="formItem.fieldType === 'monthRangePicker'"
            v-decorator="[
              formItem.fieldName,
              { initialValue: formItem.initialValue, rules: formItem.rules }
            ]"
            :format="formItem.format || 'YYYY-MM'"
            :placeholder="formItem.placeholder"
            :mode="['month', 'month']"
            :disabled="formItem.disabled"
            v-bind="formItem.attrs"
            @panelChange="handleMonthRangePanelChange(formItem.fieldName, ...arguments)"
            v-on="formItem.listeners"
          />
          <!-- 图片上传控件 -->
          <template v-else-if="formItem.fieldType === 'upload'">
            <a-upload
              v-decorator="[
                formItem.fieldName,
                { initialValue: formItem.initialValue, rules: formItem.rules }
              ]"
              list-type="picture-card"
              class="uploader"
              :show-upload-list="false"
              :action="uploaderAction"
              :before-upload="beforeUpload(formItem)"
              :disabled="formItem.disabled"
              @change="handleUploadChange($event, formItem)"
            >
              <div v-if="formItem.previewImage" class="uploader-preview">
                <img :src="formItem.previewImage" alt="preview image" />
                <div class="uploader-guide s-cover">
                  <a-icon type="plus" />
                  <p>点击重新上传</p>
                </div>
              </div>
              <div v-else class="uploader-guide wfc2">
                <a-icon type="plus" class="wfc2" />
                <p>点击上传图片</p>
              </div>
              <div v-if="formItem.loading" class="uploader-guide s-load" @click.stop>
                <a-icon type="loading" />
                <p>上传中...</p>
              </div>
            </a-upload>
            <p v-if="formItem.tip" class="uploader-tip wfc3">{{ formItem.tip }}</p>
          </template>
          <slot v-else-if="formItem.fieldType === 'slot'" :name="formItem.slotName"></slot>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import moment from 'moment';
import { imageFullUrl } from '@/utils/util';

const _customData = {
  previewPrefix: 'http://119.3.37.131',
  validateImage(file) {
    if (!~['image/jpeg', 'image/png'].indexOf(file.type)) {
      return '只能上传jpg/png图片';
    }
    if (file.size > 2 * 1024 * 1024) {
      return '图片大小不超过2M';
    }
    return '';
  },
  genFormData(formData) {
    const _formData = {
      id: Date.now(),
      layout: {
        gutter: 24,
        span: 6,
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
      },
      list: []
    };
    if (formData && formData.list && formData.list.length) {
      // 全局配置（约定配置，潜拷贝即可）
      _formData.layout = { ..._formData.layout, ...formData.layout };
      // 表单项
      formData.list.forEach((v, i) => {
        // 保持单向数据流，浅拷贝
        v = { ...v };
        v.layout = { ..._formData.layout, ...v.layout };
        if (
          ~['datePicker', 'monthPicker', 'rangePicker', 'monthRangePicker'].indexOf(v.fieldType)
        ) {
          // 初始值格式化
          if (v.initialValue) {
            if (Array.isArray(v.initialValue)) {
              v.initialValue = v.initialValue.map(vv => moment(vv));
            } else {
              v.initialValue = moment(v.initialValue);
            }
          }
          // 输出格式化
          if (!v.resultFormat) {
            if (v.fieldType === 'monthPicker' || v.fieldType === 'monthRangePicker') {
              v.resultFormat = 'YYYY-MM';
            } else if (v.showTime) {
              v.resultFormat = 'YYYY-MM-DD HH:mm';
            } else {
              v.resultFormat = 'YYYY-MM-DD';
            }
          }
        } else if (v.fieldType === 'upload') {
          // 上传控件初始化预览图
          v.previewImage = imageFullUrl(v.initialValue);
          v.loading = false;
          v.validator = v.validator || _customData.validateImage;
        } else if (v.fieldType === 'cascader') {
          // 级联选择器初始化字段映射
          v.fieldNames = { label: 'label', value: 'value', children: 'children', ...v.fieldNames };
        }

        _formData.list.push(v);
      });
    }
    return _formData;
  },
  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
};

export default {
  name: 'CustomForm',
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      form: this.$form.createForm(this, {
        name: `custom_form_${Math.random()
          .toString(16)
          .slice(2)}`
      }),
      formData: _customData.genFormData(this.options),
      uploaderAction: 'http://122.112.215.244/machine/fileUpload'
    };
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.formData = _customData.genFormData(this.options);
      }
    }
  },
  methods: {
    submit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          // 日期类型输出值格式化
          // eslint-disable-next-line guard-for-in
          for (let k in values) {
            const v = values[k];
            const item = this.formData.list.find(vv => vv.fieldName === k);
            if (item) {
              // 上传控件提取远程图片链接
              if (item.fieldType === 'upload') {
                if (typeof v === 'object') {
                  values[k] = (v.file && v.file.response && v.file.response.fileUrl) || '';
                }
              }
              // 输入结果格式化
              if (item.resultFormat) {
                // 日期类型值可能为单一值或数组
                if (v instanceof moment || (Array.isArray(v) && v[0] instanceof moment)) {
                  values[k] = Array.isArray(v)
                    ? v.map(vv => vv.format(item.resultFormat))
                    : v.format(item.resultFormat);
                } else if (typeof item.resultFormat === 'function') {
                  values[k] = item.resultFormat(v);
                } else if (
                  Array.isArray(item.resultFormat) &&
                  item.resultFormat.every(v => typeof v === 'string')
                ) {
                  // eslint-disable-next-line
                  values[k] = new Function(...item.resultFormat)(v);
                } else {
                  values[k] = v;
                }
              }
            }
          }
          this.$emit('submit', values);
        }
      });
    },
    reset() {
      this.form.resetFields();
      // 上传控件重置
      this.formData.list.forEach(v => {
        if (v.fieldType === 'upload') {
          v.previewImage = imageFullUrl(v.initialValue);
          v.loading = false;
          this.form.setFields({
            [v.fieldName]: {
              errors: []
            }
          });
        }
      });
    },
    // 图片上传前校验
    beforeUpload(formItem) {
      return file => {
        const msg = formItem.validator(file);
        this.$nextTick(() => {
          this.form.setFields({
            [formItem.fieldName]: {
              errors: msg ? [new Error(msg)] : []
            }
          });
        });
        return !msg;
      };
    },
    // 图片上传回调
    handleUploadChange(info, formItem) {
      if (info.file.status === 'uploading') {
        formItem.loading = true;
      } else if (info.file.status === 'done') {
        if (info.file.response && info.file.response.fileUrl) {
          formItem.previewImage = _customData.previewPrefix + info.file.response.fileUrl;
          formItem.loading = false;
        } else {
          _customData.getBase64(info.file.originFileObj, imageUrl => {
            formItem.previewImage = imageUrl;
            formItem.loading = false;
          });
        }
      } else if (info.file.status === 'error' || info.file.status === 'removed') {
        this.$message.error('图片上传失败');
        formItem.loading = false;
      }
    },
    // 月范围选择器
    handleMonthRangePanelChange(fieldName, val) {
      this.form.setFieldsValue({
        [fieldName]: val
      });
    }
  }
};
</script>

<style scoped lang="less">
.ant-form {
  /* a-row 会有左右12px的负margin */
  padding: 12px;

  /deep/ &-item-children {
    background: transparent;
  }
}

.ant-row {
  /* 主题全局样式，modal下无效，内部添加 */
  margin: 10px 0;
}

/deep/ .ant-form-explain {
  /* 避免破坏布局 */
  position: absolute;
}

/deep/ .ant-input-number {
  width: 100%;
}

.ant-calendar-picker {
  width: 100% !important;
}

/deep/ .ant-cascader-picker {
  /* 主题全局样式下颜色偏灰，此处重置 */
  /*color: inherit;*/
}

.uploader {
  /deep/ .ant-upload {
    &-select-picture-card {
      width: 100px;
      height: 100px;
      margin: 4px 0;
      border-style: solid;

      & > span {
        position: relative;
        padding: 9px;
      }
    }
  }

  &-preview {
    height: 80px;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:hover {
      .uploader-guide {
        display: flex;
      }
    }
  }

  &-guide {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    font-size: 12px;
    user-select: none;

    i {
      margin-bottom: 8px;
      font-size: 18px;
    }

    &.s-load,
    &.s-cover {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      z-index: 3;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.25);

      i {
        color: #fff;
      }
    }

    &.s-cover {
      display: none;
    }
  }

  &-tip {
    font-size: 12px;
    line-height: 1.5;
  }
}
</style>
