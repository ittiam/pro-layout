/* 用户信息 */
export const userInfo = {
  loginName: 'admin',
  token: 'ZHNVc2VyOi9sb2dpblVzZXIvYWRtaW4vMjc5OTE1N2YtN2QzMC00NGE2LTk1ODMtNzkyZDA4ZjY0YzJl',
  userId: '1',
  userName: '管理员'
};

/* 菜单 */
export const menu = [
  {
    component: 'Main',
    iconCls: 'icon-ic_developer_board',
    id: '1',
    parentId: '',
    name: 'General',
    path: '/Button',
    children: [
      {
        component: 'General/Button',
        id: '11',
        parentId: '',
        name: 'Button 按钮',
        path: '/Button'
      }
    ]
  },
  {
    component: 'Main',
    iconCls: 'icon-wpg_water_quality',
    id: '2',
    parentId: '',
    name: 'Navigation',
    path: '/Breadcrumb',
    children: [
      {
        component: 'Navigation/Breadcrumb',
        id: '21',
        parentId: '',
        name: 'Breadcrumb 面包屑',
        path: '/Breadcrumb'
      },
      {
        component: 'Navigation/Dropdown',
        id: '22',
        parentId: '',
        name: 'Dropdown 下拉菜单',
        path: '/Dropdown'
      },
      {
        component: 'Navigation/Menu',
        id: '23',
        parentId: '',
        name: 'Menu 导航',
        path: '/Menu'
      },
      {
        component: 'Navigation/Pagination',
        id: '24',
        parentId: '',
        name: 'Pagination 分页',
        path: '/Pagination'
      }
    ]
  },
  {
    component: 'Main',
    iconCls: 'icon-ic_area',
    id: '3',
    parentId: '',
    name: 'DataEntry',
    path: '/Cascader',
    children: [
      {
        component: 'DataEntry/Cascader',
        id: '31',
        parentId: '',
        name: 'Cascader 级联选择',
        path: '/Cascader'
      },
      {
        component: 'DataEntry/Checkbox',
        id: '32',
        parentId: '',
        name: 'Checkbox / radio',
        path: '/Checkbox'
      },
      {
        component: 'DataEntry/DatePicker',
        id: '33',
        parentId: '',
        name: 'DatePicker / TimePicker',
        path: '/DatePicker'
      },
      {
        component: 'DataEntry/Input',
        id: '34',
        parentId: '',
        name: 'Input / InputNumber / rate',
        path: '/Input'
      },
      {
        component: 'DataEntry/Select',
        id: '35',
        parentId: '',
        name: 'Select 选择器',
        path: '/Select'
      },
      {
        component: 'DataEntry/Transfer',
        id: '36',
        parentId: '',
        name: 'Transfer 穿梭框',
        path: '/Transfer'
      },
      {
        component: 'DataEntry/TreeSelect',
        id: '37',
        parentId: '',
        name: 'TreeSelect 树选择',
        path: '/TreeSelect'
      },
      {
        component: 'DataEntry/upload',
        id: '38',
        parentId: '',
        name: 'upload / switch',
        path: '/upload'
      },
      {
        component: 'DataEntry/Form',
        id: '37',
        leaf: true,
        name: 'Form 表单',
        path: '/Form'
      },
      {
        component: 'DataEntry/DynamicForm',
        id: '370',
        leaf: true,
        name: 'Form 动态表单',
        path: '/DynamicForm'
      },
      {
        component: 'DataEntry/DynamicLayout',
        id: '371',
        leaf: true,
        name: 'Form 动态布局',
        path: '/DynamicLayout'
      }
    ]
  },
  {
    component: 'Main',
    iconCls: 'icon-wpg_workorder_payout',
    id: '4',
    parentId: '',
    name: 'DataDisplay',
    path: '/Badge',
    children: [
      {
        component: 'DataDisplay/Calendar',
        id: '41',
        parentId: '',
        name: 'Calendar 日历',
        path: '/Calendar'
      },
      {
        component: 'DataDisplay/Badge',
        id: '42',
        parentId: '',
        name: 'Badge / Card',
        path: '/Badge'
      },
      {
        component: 'DataDisplay/Collapse',
        id: '43',
        parentId: '',
        name: 'Collapse 折叠面板',
        path: '/Collapse'
      },
      {
        component: 'DataDisplay/Popover',
        id: '44',
        parentId: '',
        name: 'Popover / Tooltip',
        path: '/Popover'
      },
      {
        component: 'DataDisplay/Table',
        id: '45',
        parentId: '',
        name: 'Table 表格',
        path: '/Table'
      },
      {
        component: 'DataDisplay/Tabs',
        id: '46',
        parentId: '',
        name: 'Tabs / Tag',
        path: '/Tabs'
      },
      {
        component: 'DataDisplay/Tree',
        id: '47',
        parentId: '',
        name: 'Tree 树形控件',
        path: '/CTreeCtrl'
      }
    ]
  },
  {
    component: 'Main',
    iconCls: 'icon-ic_face',
    id: '5',
    parentId: '',
    name: 'Feedback',
    path: '/Alert',
    children: [
      {
        component: 'Feedback/Alert',
        id: '51',
        parentId: '',
        name: 'Alert / Message',
        path: '/Alert'
      },
      {
        component: 'Feedback/Modal',
        id: '52',
        parentId: '',
        name: 'Modal / Progress',
        path: '/Modal'
      },
      {
        component: 'Feedback/Notification',
        id: '53',
        parentId: '',
        name: 'Notification / Popconfirm',
        path: '/Notification'
      },
      {
        component: 'Feedback/Drawer',
        id: '54',
        parentId: '',
        name: 'Drawer',
        path: '/Drawer'
      }
    ]
  },
  {
    component: 'Main',
    iconCls: 'icon-wpg_workorder_transform',
    id: '6',
    parentId: '',
    name: 'HelperClasses',
    path: '/fonts',
    children: [
      {
        component: 'HelperClasses/fonts',
        id: '61',
        parentId: '',
        name: '字体图标',
        path: '/fonts'
      },
      {
        component: 'HelperClasses/resetClass',
        id: '62',
        parentId: '',
        name: '颜色类',
        path: '/resetClass'
      }
    ]
  },
  {
    component: 'Main',
    iconCls: 'icon-wpg_workorder_customization',
    id: '7',
    parentId: '',
    name: 'Echarts',
    path: '/histogram',
    children: [
      {
        component: 'Echarts/histogram',
        id: '71',
        parentId: '',
        name: '柱状图',
        path: '/histogram'
      },
      {
        component: 'Echarts/pieChart',
        id: '72',
        parentId: '',
        name: '饼状图',
        path: '/pieChart'
      },
      {
        component: 'Echarts/lineChart',
        id: '73',
        parentId: '',
        name: '折线图',
        path: '/lineChart'
      },
      {
        component: 'Echarts/radarChart',
        id: '74',
        parentId: '',
        name: '雷达图',
        path: '/radarChart'
      },
      {
        component: 'Echarts/dashBoard',
        id: '75',
        parentId: '',
        name: '仪表盘',
        path: '/dashBoard'
      },
      {
        component: 'Echarts/test',
        id: '76',
        parentId: '',
        name: '测试页面',
        path: '/test'
      }
    ]
  }
];
