// 此配置为系统默认设置
module.exports = {
  lang: 'CN', // 语言，可选 CN(简体)、HK(繁体)、US(英语)，也可扩展其它语言
  name: 'pro-layout',
  companyName: '威派格智慧水务', // 公司名称
  systemName: '模板项目', // 系统名称
  systemCode: 'CAMP',
  versionTime: '202007',
  version: 'V1.0.0',
  versionType: 'release',
  platform: 'V1.0',
  isShowTheme: true, // 是否显示多主题
  isHeaderColor: true, // 多主题时头部是否启用背景
  theme: {
    name: 'stone-white',
    sideMode: 'dark', // 左边菜单栏主题
    // 主题
    mode: 'light' // 主题模式 可选 dark、 light
  },
  layout: 'side', // 导航布局，可选 side 和 head，分别为侧边导航和顶部导航
  fixedHeader: true, // 固定头部状态栏，true:固定，false:不固定
  fixedSideBar: true, // 固定侧边栏，true:固定，false:不固定
  pageWidth: 'fixed', // 内容区域宽度，fixed:固定宽度，fluid:流式宽度
  multiPage: true, // 多页签模式，true:开启，false:不开启
  hideSetting: false, // 隐藏设置抽屉，true:隐藏，false:不隐藏
  copyright: '版权所有©上海威派格智慧水务股份有限公司', // copyright
  asyncRoutes: true, // 异步加载路由，true:开启，false:不开启
  showPageTitle: true, // 是否显示页面标题（PageLayout 布局中的页面标题），true:显示，false:不显示
  filterMenu: true, // 根据权限过滤菜单，true:过滤，false:不过滤
  footerLinks: []
};
