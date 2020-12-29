<template>
  <a-dropdown v-if="isShowTheme" :trigger="['click']">
    <div class="header-menu-item">
      <span>
        <span style="margin-right: 5px;">换肤</span>
        <a-icon type="caret-down" />
      </span>
    </div>

    <a-menu slot="overlay" class="theme-ul wbg-dropdown">
      <a-menu-item
        v-for="item in themeList"
        :key="item.name"
        class="theme-li"
        :class="[item.name === theme.name ? 'theme-li-active' : null]"
        :style="{
          'background-image':
            item.active && item.name === theme.name
              ? `url(${$baseUrl}${item.active})`
              : item.preview
              ? `url(${$baseUrl}${item.preview})`
              : 'none'
        }"
        @click="setTheme(item.name)"
      >
        <span
          :class="['circular', item.theme]"
          :style="{ 'background-image': `url(${$baseUrl}${item.circular})` }"
        ></span
        ><span>&nbsp;&nbsp;{{ item.name }}</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HeaderTheme',
  computed: {
    ...mapState('setting', ['themeList', 'theme', 'isShowTheme'])
  },
  methods: {
    setTheme(value) {
      this.$store.dispatch('setting/UpdateTheme', value);
    }
  }
};
</script>

<style scoped lang="less">
.ant-dropdown-link {
  font-size: 14px;
}

.theme-ul {
  width: 146px;

  li {
    width: 100%;
    background-repeat: no-repeat;
    background-position: 90% center;
    background-size: auto 16px;

    .circular {
      display: inline-block;
      width: 14px;
      height: 14px;
      vertical-align: middle;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 14px auto;
    }

    span {
      vertical-align: middle;
    }
  }
}
</style>
