<template>
  <admin-layout>
    <div class="seat-box">
      <a-keep-alive v-if="multiPage" v-model="clearCaches">
        <router-view :key="$route.fullPath" />
      </a-keep-alive>
      <router-view v-else />
    </div>
  </admin-layout>
</template>

<script>
import { mapState } from 'vuex';
import AdminLayout from '@/layouts/AdminLayout';
import AKeepAlive from '@/components/Cache/AKeepAlive';

export default {
  name: 'TabsView',
  components: { AdminLayout, AKeepAlive },
  data() {
    return {
      clearCaches: [],
      cachedKeys: []
    };
  },
  computed: {
    ...mapState('setting', ['multiPage', 'animate'])
  }
};
</script>

<style scoped lang="less">
.seat-box {
  height: 100%;
  padding: 12px;
  overflow: auto;
  background: #edf1f7;
}
</style>
