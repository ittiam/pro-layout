/* 用户信息 */
export const userInfo = {
  loginName: 'admin',
  token: 'ZHNVc2VyOi9sb2dpblVzZXIvYWRtaW4vMjc5OTE1N2YtN2QzMC00NGE2LTk1ODMtNzkyZDA4ZjY0YzJl',
  userId: '1',
  userName: '管理员'
};

/* 菜单 */
export const menu = {
  buttonCodes: [],
  menuTrees: [
    {
      component: 'home/Workspace',
      iconCls: 'icon-ic_home',
      id: '99',
      parentId: '',
      name: '工作台',
      path: '/workspace',
      showFlag: true,
      isPublic: true,
      menuButtonFlag: '0'
    },
    {
      component: 'general/Button',
      iconCls: 'icon-ic_developer_board',
      id: '1',
      parentId: '',
      name: 'Button 按钮',
      path: '/general',
      showFlag: true,
      isPublic: true,
      menuButtonFlag: '0'
    },
    {
      component: 'navigation/Breadcrumb',
      iconCls: 'icon-ic_computer',
      id: '21',
      parentId: '',
      name: 'Breadcrumb 面包屑',
      path: '/breadcrumb',
      showFlag: true,
      isPublic: true,
      menuButtonFlag: '0'
    },
    {
      component: 'RouteLayout',
      iconCls: 'icon-wpg_water_quality',
      id: '2',
      parentId: '',
      name: 'Navigation',
      path: '/navigation',
      showFlag: true,
      isPublic: true,
      menuButtonFlag: '0',
      children: [
        {
          component: 'navigation/Dropdown',
          id: '22',
          parentId: '',
          name: 'Dropdown 下拉菜单',
          path: '/navigation/dropdown',
          showFlag: true,
          isPublic: true,
          menuButtonFlag: '0'
        },
        {
          component: 'navigation/Menu',
          id: '23',
          parentId: '',
          name: 'Menu 导航',
          path: '/navigation/menu',
          showFlag: true,
          isPublic: true,
          menuButtonFlag: '0'
        },
        {
          component: 'navigation/Pagination',
          id: '24',
          parentId: '',
          name: 'Pagination 分页',
          path: '/navigation/pagination',
          showFlag: true,
          isPublic: true,
          menuButtonFlag: '0'
        }
      ]
    },
    {
      component: 'RouteLayout',
      iconCls: 'icon-wpg_water_quality',
      id: '3',
      parentId: '',
      name: 'List',
      path: '/list',
      showFlag: true,
      isPublic: true,
      menuButtonFlag: '0',
      children: [
        {
          component: 'list/BasicList',
          id: '31',
          parentId: '',
          name: 'List 基本列表',
          path: '/list/basic',
          showFlag: true,
          isPublic: true,
          menuButtonFlag: '0'
        }
      ]
    }
  ]
};
