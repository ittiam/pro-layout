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
    component: 'general/Button',
    iconCls: 'icon-ic_developer_board',
    id: '1',
    parentId: '',
    name: 'Button 按钮',
    path: '/general'
  },
  {
    component: 'navigation/Breadcrumb',
    iconCls: 'icon-ic_computer',
    id: '21',
    parentId: '',
    name: 'Breadcrumb 面包屑',
    path: '/breadcrumb'
  },
  {
    component: 'RouteLayout',
    iconCls: 'icon-wpg_water_quality',
    id: '2',
    parentId: '',
    name: 'Navigation',
    path: '/navigation',
    children: [
      {
        component: 'navigation/Dropdown',
        id: '22',
        parentId: '',
        name: 'Dropdown 下拉菜单',
        path: '/navigation/dropdown'
      },
      {
        component: 'navigation/Menu',
        id: '23',
        parentId: '',
        name: 'Menu 导航',
        path: '/navigation/menu'
      },
      {
        component: 'navigation/Pagination',
        id: '24',
        parentId: '',
        name: 'Pagination 分页',
        path: '/navigation/pagination'
      }
    ]
  }
];
