/** * @DATE: 2020/6/23 11:05 AM * @Version: 0.0.1 * @Author: huhaiou * @Description: * @Update:
创建关于我们 by huhaiou 2020/6/23 11:05 AM */
<template>
  <section>
    <span @click="handleMenuClick"
      ><i
        class="icon-ic_local_library wfs18"
        style="vertical-align: -0.125em;"
      />&nbsp;关于我们</span
    >
    <a-modal v-model="visible" centered width="664px">
      <template slot="title">
        <img class="title-img" :src="imgUrl" width="160" height="86" />
      </template>
      <p class="name wfs24 wfc1 modal-content-txt">{{ aboutInfo.systemName }}</p>
      <p class="version wfs14 wfc2 modal-content-txt">
        Version：{{ aboutInfo.systemCode }}.{{ aboutInfo.versionTime }}.{{ aboutInfo.version }}.{{
          aboutInfo.versionType
        }}
      </p>
      <p class="build wfs14 wfc2 modal-content-txt">
        Build：{{ aboutInfo.commitId }}.{{ aboutInfo.branch }}.{{ aboutInfo.buildDate }}.{{
          aboutInfo.versionType
        }}
      </p>
      <template slot="footer">
        <div class="wfs14 wfc3 modal-content-txt">{{ aboutInfo.copyright }}</div>
      </template>
    </a-modal>
  </section>
</template>

<script>
import moment from 'moment';
export default {
  name: 'HeaderAbout',
  data() {
    return {
      visible: false
    };
  },
  computed: {
    aboutInfo() {
      let {
        systemName,
        systemCode,
        versionTime,
        version,
        versionType,
        copyright
      } = this.$store.state.setting;

      let { buildDate, commitId, branch } = BUILD_INFO;
      buildDate = moment(buildDate).format('YYYYMMDDHHmm');
      return {
        systemName,
        systemCode,
        versionTime,
        version,
        versionType,
        copyright,
        buildDate,
        commitId,
        branch
      };
    },
    imgUrl() {
      return this.baseTheme === 'dark'
        ? require('@/assets/images/about_logo_black.png')
        : require('@/assets/images/about_logo.png');
    }
  },
  methods: {
    handleMenuClick(e) {
      this.visible = true;
    }
  }
};
</script>

<style lang="less" scoped>
.title-img {
  margin: 21px auto 14px;
}

.modal-content-txt {
  line-height: 26px;
  letter-spacing: 1px;
  text-align: center;

  &.name {
    margin: 8px auto 20px;
    font-weight: 500;
    line-height: 33px;
  }

  &.build {
    margin-bottom: 42px;
  }
}
</style>
