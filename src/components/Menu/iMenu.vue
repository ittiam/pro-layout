/** * @DATE: 2020/3/5 2:57 PM * @Version: 0.0.1 * @Author: huhaiou * @Description: * @Update:
去掉了菜单图标的wic1类名 by huhaiou 2020/3/5 2:57 PM */
<template>
  <a-menu
    :selectedKeys="selectedKeys"
    :openKeys="openKeys"
    :mode="mode"
    :class="[currentTheme, layoutSite]"
    @openChange="onOpenChange"
    @select="handleSelect"
  >
    <template v-for="(item, index) in menuListData">
      <a-menu-item
        v-if="item.typeCode && layoutSite === 'side'"
        :key="item.typeCode"
        class="menuGroup"
        disabled
      >
        <span class="wfc2">{{ item.typeCode }}</span>
      </a-menu-item>

      <a-sub-menu v-if="item.children" :key="'menu' + index" :menu-info="item">
        <div slot="title" class="title-icon">
          <i
            :class="
              'icon ' +
                (item.iconCls || item.icon) +
                (layoutSite === 'side' ? ' wic1 fs20' : ' fs20')
            "
          ></i>
          <p class="title">{{ (item.meta && item.meta.title) || item.name }}</p>
        </div>
        <a-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
          <i :class="'icon ' + child.iconCls"></i>
          <span>{{ (child.meta && child.meta.title) || child.name }}</span>
        </a-menu-item>
      </a-sub-menu>

      <!-- 没有子级菜单时，只显示父级名称 -->
      <a-sub-menu v-else-if="item.name" :key="'menu' + index" :menu-info="item">
        <span slot="title" class="wfc2">
          <i :class="'usericon ' + item.iconCls"></i>
          <span>{{ item.name }}</span>
        </span>
      </a-sub-menu>
    </template>
  </a-menu>
</template>

<script>
export default {
  name: 'IMenu',
  props: {
    menuData: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: []
    };
  },
  computed: {
    menuListData() {
      let menuDataObjList = {};
      let menuDataArrList = [];
      this.menuData
        .sort((prev, next) => {
          return prev.typeSort - next.typeSort;
        })
        .map(item => {
          if (menuDataObjList[item.typeCode]) {
            menuDataObjList[item.typeCode].push(item);
          } else {
            menuDataObjList[item.typeCode] = [item];
          }
        });
      for (let i in menuDataObjList) {
        if (menuDataObjList[i] && menuDataObjList[i].length) {
          for (let l = 0; l < menuDataObjList[i].length; l++) {
            const item = menuDataObjList[i][l];
            if (l !== 0) {
              item.typeCode = '';
            }
            menuDataArrList.push(item);
          }
        }
      }
      return menuDataArrList;
      // return this.menuData.filter((item) => {
      //     if (!item.hidden && item.name !== '个人中心') return item;
      // });
    },
    rootSubmenuKeys: vm => {
      let keys = [];
      vm.menuData.forEach((item, idx) => {
        keys.push('menu' + idx);
      });
      return keys;
    }
  },
  watch: {
    collapsed(val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys;
        this.openKeys = [];
      } else {
        this.openKeys = this.cachedOpenKeys;
      }
    },
    $route: function() {
      this.updateMenu();
    }
  },
  created() {
    this.updateMenu();
  },
  methods: {
    handleSelect(obj) {
      this.selectedKeys = obj.selectedKeys;
      this.$emit('select', obj);
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    updateMenu() {
      let routes = this.$route.matched.concat();
      this.selectedKeys = [
        '/' +
          routes
            .pop()
            .path.substring(1)
            .split('?')[0]
      ]; // 路径match时二级可能会变成如'/role/'
      // let [{path}] = routes.slice(-1);
      // path = path.match(/^(\/\w+)\/?/)[1];
      let openKeys = [];
      this.menuListData.forEach((item, idx) => {
        if (item.children && item.children.length) {
          item.children.forEach(child => {
            if (child.path.indexOf(this.selectedKeys) > -1) openKeys.push('menu' + idx);
            // if (child.path === path) openKeys.push('menu' + idx);
          });
        }
      });
      // this.selectedKeys = [path];
      this.collapsed || this.mode === 'horizontal'
        ? (this.cachedOpenKeys = openKeys)
        : (this.openKeys = openKeys);
    }
  }
};
</script>
<style lang="less"></style>
