<template>
  <div class="header-about">
    <div class="header-menu-item" @click="handleMenuClick">
      <span class="header-menu-lc">
        <i class="icon-ic_local_library" style="cursor: pointer" />
      </span>
      <span>关于</span>
    </div>
    <a-modal v-model="visible" centered width="664px">
      <template slot="title">
        <div class="modal-content-tit">
          <img class="title-img" :src="logoImg" width="160" height="86" />
        </div>
      </template>
      <p class="wfc1 name modal-content-txt">{{ aboutInfo.systemName }}</p>
      <p class="wfc2 version modal-content-txt">Version：{{ aboutInfo.version }}</p>
      <p class="wfc2 platform modal-content-txt">Platform：{{ aboutInfo.platform }}</p>
      <p class="wfc2 build modal-content-txt">
        Build：{{ aboutInfo.commitId }}.{{ aboutInfo.branch }}.{{ aboutInfo.buildDate }}.{{
          aboutInfo.versionType
        }}
      </p>
      <template slot="footer">
        <div class="wfc3 about-footer modal-content-txt">{{ aboutInfo.copyright }}</div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
export default {
  name: 'HeaderAbout',
  data() {
    return {
      visible: false
    };
  },
  computed: {
    ...mapState('setting', [
      'theme',
      'systemName',
      'systemCode',
      'versionTime',
      'version',
      'versionType',
      'platform',
      'copyright'
    ]),
    logoImg() {
      return this.theme.mode === 'dark'
        ? require('@/assets/images/about_logo_black.png')
        : require('@/assets/images/about_logo.png');
    },
    aboutInfo() {
      let { systemName, systemCode, versionTime, version, versionType, platform, copyright } = this;

      let { buildDate, commitId, branch } = BUILD_INFO;
      buildDate = moment(buildDate).format('YYYYMMDDHHmm');
      commitId = commitId.slice(0, 8);

      return {
        systemName,
        systemCode,
        versionTime,
        version,
        versionType,
        copyright,
        buildDate,
        commitId,
        platform,
        branch
      };
    }
  },
  watch: {
    $route() {
      this.visible = false;
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
.icon-ic_local_library {
  font-size: 20px;
}

.modal-content-tit {
  text-align: center;

  .title-img {
    margin: 21px auto 14px;
  }
}

.modal-content-txt {
  color: @color-text-normal;
  font-size: 14px;
  line-height: 26px;
  letter-spacing: 1px;
  text-align: center;
  word-break: break-word;

  &.name {
    margin: 8px auto 20px;
    font-weight: 500;
    font-size: 24px;
    line-height: 33px;
  }

  &.build {
    margin-bottom: 42px;
  }
}
</style>
