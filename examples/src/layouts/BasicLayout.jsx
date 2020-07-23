import './BasicLayout.less';

import { Avatar, Dropdown, Menu, Icon, Modal } from 'ant-design-vue';
import { asyncRouterMap } from '../config/router.config.js';
import { i18nRender } from '../locales';
import ProLayout, { GlobalFooter, SettingDrawer } from '@ant-design-vue/pro-layout';
import SelectLang from '../components/SelectLang';
import SwitchThem from '../components/SwitchTheme';
import LogoSvg from '../assets/logo.svg?inline';
// import defaultSettings from '@config/defaultSettings'

const Account = {
  name: 'Account',
  render() {
    const accountMenu = (
      <Menu class="drop-down menu">
        <Menu.Item key="info">
          <Icon type={'user'} />
          个人信息
        </Menu.Item>
        <Menu.Item key="settings">
          <Icon type={'setting'} />
          个人设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          key="logout"
          onClick={() => {
            Modal.confirm({
              title: i18nRender('layouts.usermenu.dialog.title'),
              content: i18nRender('layouts.usermenu.dialog.content'),
              onOk: () => {
                return new Promise((resolve, reject) => {
                  setTimeout(Math.random() > 0.5 ? resolve : reject, 1500);
                }).catch(() => console.log('Oops errors!'));
              },
              onCancel() {}
            });
          }}
        >
          <Icon type={'logout'} />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={accountMenu} placement="bottomRight">
        <span class={'account'}>
          <Avatar
            size="small"
            src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
            class="antd-pro-global-header-index-avatar"
          />
          <span>Serati Ma</span>
        </span>
      </Dropdown>
    );
  }
};

// render logo and title
const menuHeaderRender = (h, logo, title) => {
  return (
    <div>
      <LogoSvg />
      <h1>Ant Design Pro</h1>
    </div>
  );
};

const rightContentRender = (h, props) => {
  const cls = {
    'ant-pro-global-header-index-right': true,
    'ant-pro-global-header-topmenu': props.isTop,
    [`ant-pro-global-header-index-${props.theme}`]: true
  };
  return (
    <div class={cls}>
      <SwitchThem class={'ant-pro-global-header-index-action'} />
      <Account class={'ant-pro-global-header-index-action'} />
      <SelectLang class={'ant-pro-global-header-index-action'} />
    </div>
  );
};

const footerRender = (h, props) => {
  return (
    <GlobalFooter class={'footer custom-render'}>
      <template slot="links">
        <a href="https://www.github.com/vueComponent/" target="_self">
          Github
        </a>
        <a href="https://www.github.com/sendya/" target="_self">
          @Sendya
        </a>
      </template>
      <template slot="copyright">
        <a href="https://github.com/vueComponent">vueComponent</a>
      </template>
    </GlobalFooter>
  );
};

export default {
  name: 'BasicLayout',
  data() {
    return {
      // 侧栏收起状态
      collapsed: false,
      // 媒体查询
      query: {},

      settings: {
        // 布局类型
        layout: 'sidemenu', // 'sidemenu', 'topmenu'
        // 定宽: true / 流式: false
        contentWidth: false,
        fixedHeader: true,
        fixSiderbar: true,
        headerSticky: true,
        // 主题 'dark' | 'light'
        theme: 'dark',
        // 主色调
        primaryColor: '#1890ff',
        colorWeak: false,

        hideHintAlert: false,
        hideCopyButton: false
      },
      // 是否手机模式
      isMobile: false
    };
  },
  render(h) {
    const handleMediaQuery = val => {
      this.query = val;
      if (this.isMobile && !val['screen-xs']) {
        this.isMobile = false;
        return;
      }
      if (!this.isMobile && val['screen-xs']) {
        this.isMobile = true;
        this.collapsed = false;
      }
    };
    const handleCollapse = val => {
      this.collapsed = val;
    };

    const menus = asyncRouterMap.find(item => item.path === '/').children;

    const handleSettingChange = ({ type, value, ...args }) => {
      this.settings[type] = value;

      if (type === 'contentWidth') {
        this.settings.contentWidth = value === 'Fixed';
      }
      if (type === 'layout') {
        if (value === 'sidemenu') {
          this.settings.contentWidth = false;
        } else {
          this.settings.fixSiderbar = false;
          this.settings.contentWidth = true;
        }
      }
    };

    // eslint-disable-next-line no-unused-vars
    const breadcrumbRender = ({ route, params, routes, paths, h }) => {
      return (
        (routes.indexOf(route) === routes.length - 1 && <span>{route.breadcrumbName}</span>) || (
          <router-link to={{ path: route.path || '/' }}>{route.breadcrumbName}</router-link>
        )
      );
    };

    const cdProps = {
      props: {
        ...this.settings,
        menus,
        collapsed: this.collapsed,
        mediaQuery: this.query,
        handleMediaQuery,
        handleCollapse,
        isMobile: this.isMobile,
        // custom render
        rightContentRender,
        footerRender,
        // i18nRender: false,
        i18nRender,
        menuHeaderRender,
        breadcrumbRender,

        logo: LogoSvg,
        title: 'Ant Design Pro'
      }
    };

    return (
      <ProLayout {...cdProps}>
        <SettingDrawer settings={this.settings} onChange={handleSettingChange} />
        <router-view />
      </ProLayout>
    );
  }
};
