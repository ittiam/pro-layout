<template>
  <div class="header-about">
    <i class="icon-ic_local_library" style="cursor: pointer" @click="handleMenuClick" />
    <a-modal v-model="visible" centered width="664px">
      <template slot="title">
        <div class="modal-content-tit">
          <img class="title-img" src="@/assets/images/about_logo.png" width="160" height="86" />
        </div>
      </template>
      <p class="name modal-content-txt">{{ aboutInfo.systemName }}</p>
      <p class="version modal-content-txt">
        Version：{{ aboutInfo.systemCode }}.{{ aboutInfo.versionTime }}.{{ aboutInfo.version }}.{{
          aboutInfo.versionType
        }}
      </p>
      <p class="build modal-content-txt">
        Build：{{ aboutInfo.commitId }}.{{ aboutInfo.branch }}.{{ aboutInfo.buildDate }}.{{
          aboutInfo.versionType
        }}
      </p>
      <template slot="footer">
        <div class="modal-content-txt">{{ aboutInfo.copyright }}</div>
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
      'systemName',
      'systemCode',
      'versionTime',
      'version',
      'versionType',
      'copyright'
    ]),
    aboutInfo() {
      let { systemName, systemCode, versionTime, version, versionType, copyright } = this;

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
  color: #999;
  font-size: 14px;
  line-height: 26px;
  letter-spacing: 1px;
  text-align: center;
  word-break: break-word;

  &.name {
    margin: 8px auto 20px;
    color: #333;
    font-weight: 500;
    font-size: 24px;
    line-height: 33px;
  }

  &.build {
    margin-bottom: 42px;
    color: #666;
  }

  &.version {
    color: #666;
  }
}
</style>
