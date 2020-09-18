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
    path: '/General',
    children: [
      {
        component: 'General/Button',
        id: '11',
        parentId: '',
        name: 'Button 按钮',
        path: '/General/Button'
      }
    ]
  },
  {
    component: 'Main',
    iconCls: 'icon-wpg_water_quality',
    id: '2',
    parentId: '',
    name: 'Navigation',
    path: '/Navigation',
    children: [
      {
        component: 'Navigation/Breadcrumb',
        id: '21',
        parentId: '',
        name: 'Breadcrumb 面包屑',
        path: '/Navigation/Breadcrumb'
      },
      {
        component: 'Navigation/Dropdown',
        id: '22',
        parentId: '',
        name: 'Dropdown 下拉菜单',
        path: '/Navigation/Dropdown'
      },
      {
        component: 'Navigation/Menu',
        id: '23',
        parentId: '',
        name: 'Menu 导航',
        path: '/Navigation/Menu'
      },
      {
        component: 'Navigation/Pagination',
        id: '24',
        parentId: '',
        name: 'Pagination 分页',
        path: '/Navigation/Pagination'
      }
    ]
  }
];
