/**
 * @DATE:  2019/6/26 14:31
 * @Version: 0.0.1
 * @Author: yunchangJia
 * @Description: 项目配置项
 * @Update: 新增darkTheme--用来设置主体内容为黑（深）色的主题 by huhaiou 2020/1/8 11:31 AM
 */
/**
 * 项目配置
 * companyName  【展示在菜单栏左侧顶部的文字】
 * systemName   【项目名称】
 * copyright    【底部版权信息】
 * layout       【页面布局方式 菜单左侧 side || 菜单顶部 head 】
 * menuCollapsed【菜单是否折叠】
 * theme        【主题】
 * darkTheme    【主体内容为黑（深）色的主题】
 * isShowTheme  【是否展示切换主题功能】
 * isMobile     【是否是移动端 默认 false】
 * multipage    【是否显示标签页 默认 true】
 * sysMenuList    【系统操作菜单】
 */

const projectConfig = {
  companyName: '威派格智慧水务',
  name: 'mobanxiangmu',
  systemName: '模板项目',
  systemCode: 'CAMP',
  versionTime: '202007',
  version: '1.0.0',
  versionType: 'release',
  copyright: '版权所有©上海威派格智慧水务股份有限公司',
  layout: 'side',
  menuCollapsed: false,
  theme: 'seaBlue', // 主题不要变动，会影响左侧菜单导航的颜色
  darkTheme: ['deepBlue', 'starBlue', 'knightBlack'],
  isShowTheme: false, // 新顶部布局暂时不启用换肤，后期可支持
  isMobile: false,
  multipage: true,
  sysMenuList: [
    { type: 'changePass', icon: 'edit', name: '修改密码' },
    { type: 'logOut', icon: 'poweroff', name: '退出登录' }
  ],
  footerLinks: []
};

export const storageOptions = {
  namespace: 'pro__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local' // storage name session, local, memory
};

export const pageOpened = [
  {
    name: 'index',
    fullPath: '/dashboard',
    meta: {
      closable: false,
      title: '工作台'
    }
  }
];

export default projectConfig;
