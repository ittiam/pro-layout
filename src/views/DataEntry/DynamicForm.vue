<template>
  <ace-md :data="options" :md="mdData" button-title="生成表单" @change="handleAceData">
    <custom-form :options="options" @submit="submit" ref="customForm" />
    <a-row type="flex" justify="center" class="btn-wrap">
      <a-button type="primary" @click="handleSubmit">查询</a-button>
      <a-button type="primary" @click="handleReset">重置</a-button>
    </a-row>
  </ace-md>
</template>

<script>
import AceMd from '../../components/AceMd';
import CustomForm from '../../components/CustomForm';

const _customData = {
  formData() {
    return {
      list: [
        {
          fieldType: 'input',
          fieldName: 'userName',
          label: '用户名',
          placeholder: '请输入用户名',
          rules: [{ required: true, message: '请输入用户名' }]
        },
        {
          fieldType: 'select',
          fieldName: 'status',
          label: '下拉框',
          placeholder: '请选择下拉项',
          initialValue: '',
          options: [
            { label: '全部', value: '' },
            { label: '选项一', value: 'first' },
            { label: '选项二', value: 'second' }
          ]
        },
        {
          fieldType: 'xsc',
          fieldName: 'xsc',
          label: '多选搜索树选择器',
          placeholder: '请选择下拉项',
          initialValue: ['0-0-0-1'],
          options: [
            {
              title: '一级菜单',
              key: '0-0',
              children: [
                {
                  title: '二级菜单',
                  key: '0-0-0',
                  children: [
                    { title: '三级菜单1', key: '0-0-0-0' },
                    { title: '三级菜单2', key: '0-0-0-1' },
                    { title: '三级菜单3', key: '0-0-0-2' }
                  ]
                }
              ]
            }
          ]
        },
        {
          fieldType: 'radio',
          fieldName: 'userSex',
          label: '用户性别',
          initialValue: 'm',
          options: [
            { label: '男', value: 'm' },
            { label: '女', value: 'f' }
          ]
        },
        {
          fieldType: 'switch',
          fieldName: 'pay',
          label: '是否付费',
          initialValue: false,
          attrs: {
            checkedChildren: '是',
            unCheckedChildren: '否'
          },
          resultFormat: ['v', 'return +v']
        },
        {
          fieldType: 'datePicker',
          fieldName: 'date',
          label: '日期选择器',
          placeholder: '请选择日期',
          initialValue: '201903',
          format: 'YYYY/MM/DD',
          resultFormat: 'YYYY.MM.DD'
        },
        {
          fieldType: 'datePicker',
          fieldName: 'dateTime',
          label: '日期时间选择器',
          placeholder: '请选择日期时间',
          initialValue: '20190201T1025',
          format: 'YYYY/MM/DD HH:mm',
          showTime: true
        },
        {
          fieldType: 'monthPicker',
          fieldName: 'month',
          label: '月选择器',
          placeholder: '请选择月',
          format: 'YYYY-MM'
        },
        {
          fieldType: 'rangePicker',
          fieldName: 'dateRange',
          label: '日期范围选择器',
          placeholder: ['开始日期', '结束日期'],
          initialValue: ['202001', '202003'],
          format: 'YYYY-MM-DD'
        },
        {
          fieldType: 'rangePicker',
          fieldName: 'dateTimeRange',
          label: '日期时间范围选择器',
          placeholder: ['开始时间', '结束时间'],
          // initialValue: ['', ''],
          showTime: true,
          format: 'YYYY-MM-DD HH:mm'
        },
        {
          fieldType: 'upload',
          fieldName: 'avatar',
          label: '头像',
          tip: '文件限定：只能上传jpg/png文件，最佳大小112*44 且不超过2M'
        }
      ]
    };
  },
  docData: `
    ### 配置项说明
    ---
    \`\`\`
    {
        // 全局布局配置（默认配置，可覆盖）
        layout: {
            gutter: 24,                 // 表单项间距
            span: 6,                    // 表单项所占空间（一行空间为24，设置为6则显示为4列）
            labelCol: {span: 8},        // 表单项的label标签所占空间（总空间为24，与wrapperCol共同使用）
            wrapperCol: {span: 16}      // 表单项的控件所占空间（总空间24，与labelCol共同使用）
        },
        // 表单项列表
        list: [{
            fieldType: 'input',          // 控件类型，input->文本输入框，password->密码输入框，select->下拉框，treeSelect->树选择器，cascader->级联选择器，radio->单选组，switch->切换按钮，datePicker->日期选择器，monthPicker->月份选择器，rangePicker->日期范围选择器，upload->图片上传控件，xsc->多选搜索树选择器
            fieldName: 'userName',       // 字段名，必需且唯一
            label: '用户名',             // 标签文本
            placeholder: '请输入用户名',  // 提示文本
            initialValue: '',            // 默认值（没有则不需要该字段）
            disabled: false,             // 是否禁用控件
            rules: [{required: true, message: '请输入用户名'}],    // 表单项校验规则
            resultFormat: [func]         // 输出格式化方法，日期控件为字符串
            listeners: {click: [func]}   // 表单项相关事件监听
            attrs: {readOnly: true}      // 表单项额外属性统一添加（该项内的属性优先级低于直接绑定的属性）

            options: [{label: '选项一', value: '1'}],  // 选项列表，下拉框控件和单选组私有

            format: 'YYYY/MM/DD',                     // 日期格式化，日期类控件私有属性，如：YYYY/MM/DD HH:mm:ss
            showTime: true,                           // 日期时间类控件所需属性
            resultFormat: 'YYYY.MM.DD',               // 控件输出数据格式
                                                      // 日期类控件为字符串，月默认YYYY-MM，日期类默认YYYY-MM-DD，时间类默认YYYY-MM-DD HH:mm
                                                      // 其他控件需为方法或者可构造方法的字符串数组，如：v => +v或['v', 'return +v']。

            tip: '文件限定：只能上传jpg/png文件，最佳大小112*44 且不超过2M'    // 上传控件提示文本
            validator: file => {                                           // 上传控件校验方法，因为上传校验需要在上传前处理，所以不用表单验证，示例方法为默认校验方法
                if (!~['image/jpeg', 'image/png'].indexOf(file.type)) {
                    return '只能上传jpg/png图片';
                }
                if (file.size > 2 * 1024 * 1024) {
                    return '图片大小不超过2M';
                }
                return '';
            }

            layout: {                                 // 表单项私有布局，覆盖全局布局相关项
                span: 12,
                labelCol: {span: 4},
                wrapperCol: {span: 12}
            }
        }]
    }
    \`\`\`
    &nbsp;
    ### 注意：
    ---
    1 日期范围类控件，有起止两个值，所以placeholder和initialValue如需设置则必须为数组，如['startTime','endTime']；
    2 日期类控件initialValue值为字符串，格式为20200302、20200506T1056等等，详细可参见 [moment官方文档](http://momentjs.cn/docs/#/parsing/string/)；
    3 表单校验关联，如确认密码校验一致性，可以通过ref获取自定义表单内部form，获取相关表单项字段值；
        `
};

export default {
  name: 'DynamicForm',
  components: { AceMd, CustomForm },
  data() {
    return {
      options: _customData.formData(),
      mdData: _customData.docData
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.customForm.submit();
    },
    handleReset() {
      this.$refs.customForm.reset();
    },
    submit(data) {
      // 输出预览
      const h = this.$createElement;
      this.$info({
        title: '输出数据预览',
        content: h(
          'div',
          {
            style: {
              display: 'flex',
              justifyContent: 'center'
            }
          },
          [
            h(
              'pre',
              {
                style: {
                  textAlign: 'left',
                  whiteSpace: 'pre'
                }
              },
              JSON.stringify(data, null, 4)
            )
          ]
        )
      });
    },
    handleAceData(formData) {
      this.options = formData;
      this.handleReset();
    }
  }
};
</script>

<style scoped lang="less">
.wrapper {
  padding: 0;
}

.btn-wrap {
  button {
    margin: 0 10px;
  }
}
</style>
