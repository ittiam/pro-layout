// 表单属性【右面板】
export const formConf = {
  formRef: 'elForm',
  formModel: 'formData',
  size: 'medium',
  labelPosition: 'right',
  labelWidth: 100,
  formRules: 'rules',
  gutter: 15,
  column: 2,
  disabled: false,
  span: 24,
  formBtns: false
};

// 输入型组件 【左面板】
export const inputComponents = [
  {
    // 组件的自定义配置
    __config__: {
      label: '单行文本',
      labelWidth: null,
      showLabel: true,
      changeTag: true,
      tag: 'el-input',
      tagIcon: 'input',
      defaultValue: undefined,
      required: true,
      layout: 'colFormItem',
      span: 24,
      document: 'https://element.eleme.cn/#/zh-CN/component/input',
      // 正则校验规则
      regList: [],
      renderItem: true,
      showItem: true
    },
    __readonly__: {
      span: 1
    },
    // 组件的插槽属性
    __slot__: {
      prepend: '',
      append: '',
      suffix: ''
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: '请输入',
    style: { width: '100%' },
    clearable: true,
    'prefix-icon': '',
    'suffix-icon': '',
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false
  },
  {
    __config__: {
      label: '多行文本',
      labelWidth: null,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'textarea',
      defaultValue: undefined,
      required: true,
      layout: 'colFormItem',
      span: 24,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/input',
      renderItem: true,
      showItem: true
    },
    __readonly__: {
      span: 1
    },
    type: 'textarea',
    placeholder: '请输入',
    autosize: {
      minRows: 4,
      maxRows: 4
    },
    style: { width: '100%' },
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false
  },
  {
    __config__: {
      label: '密码',
      showLabel: true,
      labelWidth: null,
      changeTag: true,
      tag: 'el-input',
      tagIcon: 'password',
      defaultValue: undefined,
      layout: 'colFormItem',
      span: 24,
      required: true,
      regList: [],
      document: 'https://element.eleme.cn/#/zh-CN/component/input',
      renderItem: true,
      showItem: true
    },
    __readonly__: {
      span: 1
    },
    __slot__: {
      prepend: '',
      append: ''
    },
    placeholder: '请输入',
    'show-password': true,
    style: { width: '100%' },
    clearable: true,
    'prefix-icon': '',
    'suffix-icon': '',
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false
  },
  {
    __config__: {
      label: '计数器',
      showLabel: true,
      changeTag: true,
      labelWidth: null,
      tag: 'el-input-number',
      tagIcon: 'number',
      defaultValue: undefined,
      span: 24,
      layout: 'colFormItem',
      required: true,
      regList: [],
      document: 'https://element.eleme.cn/#/zh-CN/component/input-number',
      renderItem: true,
      showItem: true
    },
    __readonly__: {
      span: 1
    },
    placeholder: '',
    min: undefined,
    max: undefined,
    step: 1,
    'step-strictly': false,
    precision: undefined,
    'controls-position': '',
    disabled: false
  },
  {
    __config__: {
      label: '编辑器',
      showLabel: true,
      changeTag: true,
      labelWidth: null,
      tag: 'tinymce',
      tagIcon: 'rich-text',
      defaultValue: null,
      span: 24,
      layout: 'colFormItem',
      required: true,
      regList: [],
      document: 'http://tinymce.ax-z.cn',
      renderItem: true,
      showItem: true
    },
    __readonly__: {
      span: 1
    },
    placeholder: '请输入',
    height: 300, // 编辑器高度
    branding: false // 隐藏右下角品牌烙印
  }
];

// 选择型组件 【左面板】
export const selectComponents = [
  {
    __config__: {
      label: '下拉选择',
      showLabel: true,
      labelWidth: null,
      tag: 'el-select',
      tagIcon: 'select',
      layout: 'colFormItem',
      span: 24,
      required: true,
      regList: [],
      dataType: 'dynamic',
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/select',
      renderItem: true,
      showItem: true,
      dataKey: 'resultData',
      url: '',
      method: ''
    },
    __readonly__: {
      span: 1
    },
    __slot__: {
      options: [
        {
          label: '选项一',
          value: 1
        },
        {
          label: '选项二',
          value: 2
        }
      ]
    },
    props: {
      props: {
        multiple: false,
        label: 'label',
        value: 'value',
        children: 'children'
      }
    },
    placeholder: '请选择',
    style: { width: '100%' },
    clearable: true,
    disabled: false,
    filterable: false,
    multiple: false
  },
  {
    __config__: {
      label: '级联选择',
      url: '',
      method: 'get',
      dataKey: 'resultData',
      showLabel: true,
      labelWidth: null,
      tag: 'el-cascader',
      tagIcon: 'cascader',
      layout: 'colFormItem',
      defaultValue: [],
      dataType: 'dynamic',
      span: 24,
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/cascader',
      renderItem: true,
      showItem: true
    },
    options: [
      {
        id: 1,
        value: 1,
        label: '选项1',
        children: [
          {
            id: 2,
            value: 2,
            label: '选项1-1'
          }
        ]
      }
    ],
    __readonly__: {
      span: 1
    },
    placeholder: '请选择',
    style: { width: '100%' },
    props: {
      props: {
        multiple: false,
        label: 'label',
        value: 'value',
        children: 'children'
      }
    },
    'show-all-levels': true,
    disabled: false,
    clearable: true,
    filterable: false,
    separator: '/'
  },
  {
    __config__: {
      label: '单选框组',
      labelWidth: null,
      showLabel: true,
      tag: 'el-radio-group',
      tagIcon: 'radio',
      changeTag: true,
      defaultValue: undefined,
      layout: 'colFormItem',
      span: 24,
      optionType: 'default',
      regList: [],
      required: true,
      border: false,
      document: 'https://element.eleme.cn/#/zh-CN/component/radio',
      renderItem: true,
      showItem: true
    },
    __readonly__: {
      span: 1
    },
    __slot__: {
      options: [
        {
          label: '选项一',
          value: 1
        },
        {
          label: '选项二',
          value: 2
        }
      ]
    },
    style: {},
    size: 'medium',
    disabled: false
  },
  {
    __config__: {
      label: '多选框组',
      tag: 'el-checkbox-group',
      tagIcon: 'checkbox',
      defaultValue: [],
      span: 24,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      optionType: 'default',
      required: true,
      regList: [],
      changeTag: true,
      border: false,
      document: 'https://element.eleme.cn/#/zh-CN/component/checkbox',
      renderItem: true,
      showItem: true
    },
    __readonly__: {
      span: 1
    },
    __slot__: {
      options: [
        {
          label: '选项一',
          value: 1
        },
        {
          label: '选项二',
          value: 2
        }
      ]
    },
    style: {},
    size: 'medium',
    min: null,
    max: null,
    disabled: false
  },
  {
    __config__: {
      label: '开关',
      tag: 'el-switch',
      tagIcon: 'switch',
      defaultValue: false,
      span: 24,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/switch',
      renderItem: true,
      showItem: true
    },
    __readonly__: {
      span: 1
    },
    style: {},
    disabled: false,
    'active-text': '',
    'inactive-text': '',
    'active-color': null,
    'inactive-color': null,
    'active-value': true,
    'inactive-value': false
  },
  {
    __config__: {
      label: '滑块',
      tag: 'el-slider',
      tagIcon: 'slider',
      defaultValue: 0,
      span: 24,
      showLabel: true,
      layout: 'colFormItem',
      labelWidth: null,
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/slider',
      renderItem: true,
      showItem: true
    },
    __readonly__: {
      span: 1
    },
    disabled: false,
    min: 0,
    max: 100,
    step: 1,
    'show-stops': false,
    range: false
  },
  {
    __config__: {
      label: '时间选择',
      tag: 'el-time-picker',
      tagIcon: 'time',
      defaultValue: null,
      span: 24,
      showLabel: true,
      layout: 'colFormItem',
      labelWidth: null,
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/time-picker',
      renderItem: true,
      showItem: true
    },
    __readonly__: {
      span: 1
    },
    placeholder: '请选择',
    style: { width: '100%' },
    disabled: false,
    clearable: true,
    'picker-options': {
      selectableRange: '00:00:00-23:59:59'
    },
    format: 'HH:mm:ss',
    'value-format': 'HH:mm:ss'
  },
  // {
  //   __config__: {
  //     label: '时间范围',
  //     tag: 'el-time-picker',
  //     tagIcon: 'time-range',
  //     span: 24,
  //     showLabel: true,
  //     labelWidth: null,
  //     layout: 'colFormItem',
  //     defaultValue: null,
  //     required: true,
  //     regList: [],
  //     changeTag: true,
  //     document: 'https://element.eleme.cn/#/zh-CN/component/time-picker'
  //   },
  //   style: { width: '100%' },
  //   disabled: false,
  //   clearable: true,
  //   'is-range': true,
  //   'range-separator': '至',
  //   'start-placeholder': '开始时间',
  //   'end-placeholder': '结束时间',
  //   format: 'HH:mm:ss',
  //   'value-format': 'HH:mm:ss'
  // },
  {
    __config__: {
      label: '日期选择',
      tag: 'el-date-picker',
      tagIcon: 'date',
      defaultValue: null,
      showLabel: true,
      labelWidth: null,
      span: 24,
      layout: 'colFormItem',
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/date-picker',
      renderItem: true,
      showItem: true
    },
    __readonly__: {
      span: 1
    },
    placeholder: '请选择',
    type: 'date',
    style: { width: '100%' },
    disabled: false,
    clearable: true,
    format: 'yyyy-MM-dd',
    'value-format': 'yyyy-MM-dd',
    readonly: false
  },
  {
    __config__: {
      label: '日期范围',
      tag: 'el-date-picker',
      tagIcon: 'date-range',
      defaultValue: null,
      span: 24,
      showLabel: true,
      labelWidth: null,
      required: true,
      layout: 'colFormItem',
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/date-picker',
      renderItem: true,
      showItem: true
    },
    __readonly__: {
      span: 1
    },
    style: { width: '100%' },
    type: 'daterange',
    'range-separator': '至',
    'start-placeholder': '开始日期',
    'end-placeholder': '结束日期',
    disabled: false,
    clearable: true,
    format: 'yyyy-MM-dd',
    'value-format': 'yyyy-MM-dd',
    readonly: false
  },
  {
    __config__: {
      label: '评分',
      tag: 'el-rate',
      tagIcon: 'rate',
      defaultValue: 0,
      span: 24,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/rate',
      renderItem: true,
      showItem: true
    },
    __readonly__: {
      span: 1
    },
    style: {},
    max: 5,
    'allow-half': false,
    'show-text': false,
    'show-score': false,
    disabled: false
  },
  {
    __config__: {
      label: '颜色选择',
      tag: 'el-color-picker',
      tagIcon: 'color',
      span: 24,
      defaultValue: null,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/color-picker',
      renderItem: true,
      showItem: true
    },
    __readonly__: {
      span: 1
    },
    'show-alpha': false,
    'color-format': '',
    disabled: false,
    size: 'medium'
  },
  {
    __config__: {
      label: '上传',
      tag: 'el-upload',
      tagIcon: 'upload',
      layout: 'colFormItem',
      defaultValue: null,
      showLabel: true,
      labelWidth: null,
      required: true,
      span: 24,
      buttonText: '点击上传',
      regList: [],
      changeTag: true,
      fileSize: 2,
      sizeUnit: 'MB',
      document: 'https://element.eleme.cn/#/zh-CN/component/upload',
      renderItem: true,
      showItem: true
    },
    __slot__: {
      'list-type': true
    },
    __readonly__: {
      span: 2
    },
    action: 'https://jsonplaceholder.typicode.com/posts/',
    tip: '',
    buttonText: '',
    disabled: false,
    accept: '',
    name: 'file',
    'auto-upload': true,
    'list-type': 'text',
    multiple: false
  }
];

// 布局型组件 【左面板】
export const layoutComponents = [
  {
    __config__: {
      layout: 'rowFormItem',
      tagIcon: 'row',
      label: '行容器',
      layoutTree: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/layout#row-attributes'
    },
    type: 'default',
    justify: 'start',
    align: 'top'
  },
  {
    __config__: {
      label: '按钮',
      showLabel: false,
      changeTag: true,
      labelWidth: null,
      tag: 'el-button',
      tagIcon: 'button',
      span: 24,
      layout: 'colFormItem',
      document: 'https://element.eleme.cn/#/zh-CN/component/button'
    },
    __events__: {
      click: {
        type: '',
        url: '',
        method: '',
        'content-type': '',
        params: [],
        script: ''
      }
    },
    __slot__: {
      default: '主要按钮'
    },
    type: 'primary',
    icon: 'el-icon-search',
    round: false,
    size: 'medium',
    plain: false,
    circle: false,
    disabled: false
  },
  {
    __config__: {
      label: '卡片',
      tag: 'el-card',
      tagIcon: 'card',
      span: 24,
      showLabel: false,
      labelWidth: null,
      layout: 'colFormItem',
      required: false,
      regList: [],
      changeTag: true,
      renderItem: true,
      showItem: true,
      children: [
        {
          __config__: {
            layout: 'rowFormItem',
            tagIcon: 'row',
            label: '行容器',
            layoutTree: true
          },
          type: 'default',
          justify: 'start',
          align: 'top'
        }
      ]
    },
    __readonly__: {
      span: 2
    },
    style: {},
    header: '卡片'
  },
  {
    __config__: {
      layout: 'colFormItem',
      tagIcon: 'table',
      tag: 'el-table',
      span: 24,
      formId: 101,
      renderKey: 1595761764203,
      showLabel: false,
      labelWidth: null,
      label: '表格',
      dataType: 'dynamic',
      rowKey: null,
      method: 'get',
      dataKey: 'list',
      totalKey: 'total',
      currentKey: 'current',
      url: 'https://www.fastmock.site/mock/484f1d4f4870ef9cd93bc8950b1f5ade/form/table',
      children: []
    },
    data: [],
    border: true,
    type: 'default',
    justify: 'start',
    align: 'top'
  }
];

// 生产类业务组件【左面板】
export const productionComponents = [
  {
    __config__: {
      label: '业务组件',
      tagIcon: 'table',
      span: 24,
      // defaultValue: null,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      componentName: '组件名称',
      changeTag: true,
      renderItem: true,
      showItem: true
      // required: true,
      // regList: [],
    },
    __readonly__: {
      span: 2
    },
    size: 'medium'
  },
  {
    __config__: {
      label: '文本',
      tag: 'form-text',
      tagIcon: 'text',
      defaultValue: '展示文字',
      span: 24,
      showLabel: false,
      layout: 'colFormItem',
      renderItem: true,
      showItem: true,
      className: ''
    },
    __readonly__: {
      span: 2
    },
    style: {},
    color: '#141414',
    'font-size': 14,
    align: 'left',
    italic: false,
    bold: false,
    through: false,
    underline: false
  },
  {
    __config__: {
      label: '泵机开停',
      tag: 'punp-switch',
      tagIcon: 'punp',
      defaultValue: [],
      span: 24,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      required: false,
      regList: [],
      changeTag: true,
      renderItem: true,
      showItem: true
    },
    __readonly__: {
      span: 2
    },
    style: {},
    max: 5,
    disabled: false
  },
  {
    __config__: {
      label: '位置',
      tag: 'vc-input-address',
      tagIcon: 'text',
      defaultValue: '',
      span: 24,
      showLabel: true,
      layout: 'colFormItem',
      renderItem: true,
      showItem: true,
      className: ''
    },
    __readonly__: {
      span: 2
    },
    style: {}
  }
];

// 管网类业务组件【左面板】
export const pipeComponents = [
  {
    __config__: {
      label: '客户信息',
      tag: 'punp-switch',
      tagIcon: 'punp',
      defaultValue: [],
      span: 24,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      required: false,
      regList: [],
      changeTag: true,
      renderItem: true,
      showItem: true
    },
    __readonly__: {
      span: 2
    },
    style: {},
    max: 5,
    disabled: false
  },
  {
    __config__: {
      label: '水表型号',
      tag: 'punp-switch',
      tagIcon: 'punp',
      defaultValue: [],
      span: 24,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      required: false,
      regList: [],
      changeTag: true,
      renderItem: true,
      showItem: true
    },
    __readonly__: {
      span: 2
    },
    style: {},
    max: 5,
    disabled: false
  },
  {
    __config__: {
      label: '水表故障类型',
      tag: 'punp-switch',
      tagIcon: 'punp',
      defaultValue: [],
      span: 24,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      required: false,
      regList: [],
      changeTag: true,
      renderItem: true,
      showItem: true
    },
    __readonly__: {
      span: 2
    },
    style: {},
    max: 5,
    disabled: false
  }
];

// 营销类业务组件【左面板】
export const marketingComponents = [];
