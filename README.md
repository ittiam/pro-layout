English | [简体中文](./README.zh-CN.md)

<h1 align="center">Ant Design Pro Layout</h1>

## Usage

```bash
npm i pro-layout --save
// or
yarn add pro-layout
```

```jsx
import ProLayout from 'pro-layout';

// by jsx
export default {
  name: 'BasicLayout',
  render() {
    return (
      <ProLayout>
        <router-view />
      </ProLayout>
    );
  }
};
```

```vue
<template>
  <pro-layout
    title="Ant Design Pro"
    :menus="menus"
    :collapsed="collapsed"
    :theme="theme"
    :layout="layout"
    :contentWidth="contentWidth"
    :auto-hide-header="autoHideHeader"
    :mediaQuery="query"
    :isMobile="isMobile"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
    :logo="logoRender"
  >
    <template v-slot:rightContentRender>
      <div
        :class="[
          'ant-pro-global-header-index-right',
          layout === 'topmenu' && `ant-pro-global-header-index-${theme}`
        ]"
      >
        rightContentRender
      </div>
    </template>
    <template v-slot:footerRender>
      <div>footerRender</div>
    </template>
    <setting-drawer navTheme="dark" />
    <router-view />
  </pro-layout>
</template>

<script>
// by template
import ProLayout, { SettingDrawer } from 'pro-layout';
import { asyncRouterMap } from '../config/router.config';

// import svg file
import LogoSvg from '../assets/logo.svg?inline';

export default {
  name: 'BasicLayout',
  data() {
    return {
      menus: [],
      collapsed: false,
      autoHideHeader: false,
      query: {},
      layout: 'sidemenu',
      contentWidth: true,
      theme: 'dark',
      isMobile: false
    };
  },
  created() {
    this.menus = asyncRouterMap.find(item => item.path === '/').children;
  },
  methods: {
    handleMediaQuery(query) {
      this.query = query;
      if (this.isMobile && !query['screen-xs']) {
        this.isMobile = false;
        return;
      }
      if (!this.isMobile && query['screen-xs']) {
        this.isMobile = true;
        this.collapsed = false;
      }
    },
    handleCollapse(collapsed) {
      this.collapsed = collapsed;
    },
    logoRender() {
      return <LogoSvg />;
    }
  },
  components: {
    SettingDrawer
  }
};
</script>
```

## API

### ProLayout

| Property              | Description                                                           | Type                                             | Default Value      |
| --------------------- | --------------------------------------------------------------------- | ------------------------------------------------ | ------------------ |
| title                 | layout in the upper left corner title                                 | VNode \| String                                  | `'Ant Design Pro'` |
| logo                  | layout top left logo url                                              | VNode \| render                                  | -                  |
| loading`*`            | layout loading status                                                 | boolean                                          | -                  |
| layout                | layout menu mode, sidemenu: right navigation, topmenu: top navigation | 'sidemenu' \| 'topmenu'                          | `'sidemenu'`       |
| contentWidth          | content mode of layout, Fluid: fixed width 1200px, Fixed: adaptive    | true \| false                                    | `false`            |
| theme                 | Navigation menu theme                                                 | 'light' \| 'dark'                                | `'dark'`           |
| menus                 | Vue-router `routes` prop                                              | Object                                           | `[{}]`             |
| collapsed             | control menu's collapse and expansion                                 | boolean                                          | true               |
| isMobile              | is mobile                                                             | boolean                                          | false              |
| handleCollapse        | folding collapse event of menu                                        | (collapsed: boolean) => void                     | -                  |
| menuHeaderRender      | render logo and title                                                 | VNode \| (logo,title)=>VNode                     | -                  |
| headerRender          | custom header render method                                           | (props: BasicLayoutProps) => VNode               | -                  |
| rightContentRender    | header right content render method                                    | (props: HeaderViewProps) => VNode                | -                  |
| collapsedButtonRender | custom collapsed button method                                        | (collapsed: boolean) => VNode                    | -                  |
| footerRender          | custom footer render method                                           | (props: BasicLayoutProps) => VNode               | -                  |
| breadcrumbRender      | custom breadcrumb render method                                       | ({ route, params, routes, paths, h }) => VNode[] | -                  |
| i18nRender            | i18n                                                                  | Function (key: string) => string \| `false`      | `false`            |
| handleMediaQuery      | media matchs callback                                                 | (querys: []) => void                             | -                  |
| mediaQuery            | media matchs                                                          | Array                                            | -                  |

### PageHeaderWrapper

| Property       | Description                                      | Type                               | Default Value |
| -------------- | ------------------------------------------------ | ---------------------------------- | ------------- |
| content        | Content area                                     | VNode \| v-slot                    | -             |
| extra          | Extra content area, on the right side of content | VNode \| v-slot                    | -             |
| extraContent   | Extra content area, on the right side of content | VNode \| v-slot                    | -             |
| tabList        | Tabs title list                                  | `Array<{key: string, tab: sting}>` | -             |
| tab-change     | Switch panel callback                            | (key) => void                      | -             |
| tab-active-key | The currently highlighted tab item               | string                             | -             |

### SettingDrawer

#### {settings}

| Property     | Description                        | Type                      | Default Value |
| ------------ | ---------------------------------- | ------------------------- | ------------- |
| theme        | Theme                              | `dark` `light` `realDark` | `light`       |
| layout       | Sider Layout                       | `sidemenu` `topmenu`      | `sidemenu`    |
| primaryColor | Primary color (\*development only) | `#1890ff`                 |               |
