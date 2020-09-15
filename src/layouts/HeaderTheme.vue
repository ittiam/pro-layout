<template>
  <a-dropdown v-if="isShowTheme" :trigger="['click']">
    <span class="ant-dropdown-link">
      <span>换肤</span>
      <a-icon type="caret-down" />
    </span>
    <a-menu slot="overlay" class="theme-ul wbg-dropdown">
      <a-menu-item
        v-for="item in themeList"
        :key="item.theme"
        class="theme-li"
        :current-theme="item.theme"
        :active-bg="item.theme === currentTheme ? 'active' : ''"
        @click="setTheme(item.theme)"
      >
        <span :class="['circular', item.theme]"></span><span>&nbsp;&nbsp;{{ item.name }}</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
export default {
  name: 'HeaderTheme',
  data() {
    return {
      /* 定义主题列表 */
      themeList: [
        {
          name: '深奥蓝',
          theme: 'deepBlue'
        },
        {
          name: '星空蓝',
          theme: 'starBlue'
        },
        {
          name: 'WPG红',
          theme: 'wpgRed'
        },
        {
          name: '阳光橙',
          theme: 'sunnyOrange'
        },
        {
          name: '海洋蓝',
          theme: 'seaBlue'
        },
        {
          name: '骑士黑',
          theme: 'knightBlack'
        },
        {
          name: '晴空蓝',
          theme: 'sunnyBlue'
        },
        {
          name: '玉石白',
          theme: 'stoneWhite'
        },
        {
          name: '罗兰紫',
          theme: 'rolandPurple'
        }
      ]
    };
  },
  computed: {
    isShowTheme() {
      return this.$store.state.setting.isShowTheme;
    }
  },
  methods: {
    setTheme(value) {
      this.$store.commit('setting/setTheme', value);
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

    &[active-bg='active'] {
      &[current-theme='deepBlue'] {
        background-image: url(~@/assets/images/header/icon_moon_on.png);
      }
    }

    &[current-theme='deepBlue'] {
      background: url(~@/assets/images/header/icon_moon_off.png) no-repeat 90% center;
      background-size: auto 16px;
      border-bottom: 1px solid;
    }

    .circular {
      display: inline-block;
      width: 14px;
      height: 14px;
      vertical-align: middle;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 14px auto;

      &.deepBlue {
        background-image: url(~@/assets/images/header/icon_sal_color.png);
      }

      &.starBlue {
        background-image: url(~@/assets/images/header/icon_xkl_color.png);
      }

      &.sunnyOrange {
        background-image: url(~@/assets/images/header/icon_ygc_color.png);
      }

      &.wpgRed {
        background-image: url(~@/assets/images/header/icon_wpg_color.png);
      }

      &.seaBlue {
        background-image: url(~@/assets/images/header/icon_hyl_color.png);
      }

      &.knightBlack {
        background-image: url(~@/assets/images/header/icon_qsh_color.png);
      }

      &.sunnyBlue {
        background-image: url(~@/assets/images/header/icon_xkl_color.png);
      }

      &.stoneWhite {
        background-image: url(~@/assets/images/header/icon_ysb_color.png);
      }

      &.rolandPurple {
        background-image: url(~@/assets/images/header/icon_llz_color.png);
      }
    }

    span {
      vertical-align: middle;
    }
  }
}
</style>
