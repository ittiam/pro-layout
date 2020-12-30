<template>
  <!-- 国际化 -->
  <a-config-provider :locale="locale">
    <div id="app" class="app">
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>

<script>
import moment from 'moment';
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

export default {
  name: 'App',
  data() {
    return { locale: zhCN };
  }
};
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
}
</style>
