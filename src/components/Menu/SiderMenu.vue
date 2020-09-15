<template>
  <a-layout-sider
    :key="currentTheme"
    :class="['sider', isMobile ? null : 'shadow', 'wbgc-menu wbdc']"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null"
  >
    <slot name="header"></slot>
    <i-menu :menuData="menuData" @select="onSelect" />
    <slot name="footer"></slot>
  </a-layout-sider>
</template>

<script>
import IMenu from './iMenu';

export default {
  name: 'SiderMenu',
  components: { IMenu },
  props: {
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menuData: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.setting.isMobile;
    },
    systemName() {
      return this.$store.state.setting.systemName;
    }
  },
  methods: {
    onSelect(obj) {
      this.$emit('menuSelect', obj);
    }
  }
};
</script>

<style lang="less" scoped>
.sider {
  z-index: 10;
  border-right-width: 1px;
  border-right-style: solid;
}
</style>
