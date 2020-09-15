/** * @DATE: 2019/12/16 16:55 * @Version: 0.0.1 * @Author: lmz * @Description: button 组件 *
@Update: 更新内容 by lmz 2019/12/16 16:55 */
<template>
  <div>
    <!------- 单个按钮 -------->
    <div>
      <a-row> 普通按钮(Primary): <a-button type="primary" @click="push">Primary</a-button> </a-row>
      <a-row> 默认按钮(Default): <a-button>Default</a-button> </a-row>
      <a-row> 虚线框按钮(Dashed): <a-button type="dashed">Dashed</a-button> </a-row>
      <a-row> 告警按钮(Danger): <a-button type="danger">Danger</a-button> </a-row>
      <a-row> link按钮: <a-button type="link">Link</a-button> </a-row>
      <a-row>
        禁用按钮(disabled):
        <a-button type="primary" disabled>disabled</a-button>
      </a-row>
      <a-row
        >不同尺寸按钮:
        <a-button size="large">大按钮</a-button>
        <a-button size="default">默认尺寸</a-button>
        <a-button size="small">小按钮</a-button>
      </a-row>
      <a-row>
        带 icon 按钮:
        <a-button type="primary" shape="circle" icon="search"></a-button>
        <a-button type="primary" icon="search">Search</a-button>
      </a-row>
    </div>

    <!-------- 幽灵按钮 -------->
    <div style="margin-bottom: 10px;">
      幽灵按钮:
      <a-button type="primary" ghost>Primary</a-button>
      <a-button ghost>Default</a-button>
      <a-button type="dashed" ghost>Dashed</a-button>
      <a-button type="danger" ghost>Danger</a-button>
      <a-button type="link" ghost>Link</a-button>
    </div>

    <!------- 按钮组合 -------->
    <div>
      <a-row>
        组合按钮:
        <a-button-group>
          <a-button>one</a-button>
          <a-button>two</a-button>
          <a-button>three</a-button>
        </a-button-group>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {};
  },
  mounted() {},
  methods: {
    push() {
      this.$router.push({ path: '/DynamicRoute', query: { id: 1 } });
    }
  }
};
</script>

<style lang="less" scoped></style>
