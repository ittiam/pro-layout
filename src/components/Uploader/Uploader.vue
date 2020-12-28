<template>
  <div class="vc-image-upload">
    <div v-if="readonly" class="vc-upload-preview">
      <div
        v-for="(item, index) in defaultFileList"
        :key="item.uid"
        class="vc-upload-preview-picture-card"
        @click="preview(index)"
      >
        <img :src="item.url" alt="preview image" />
      </div>
    </div>
    <div v-else>
      <a-upload
        list-type="picture-card"
        class="vc-upload"
        :default-file-list="defaultFileList"
        :file-list="fileList"
        :headers="headers"
        :show-upload-list="multiple"
        :disabled="disabled"
        :multiple="multiple"
        :action="uploadAction"
        :accept="uploadAccept"
        :before-upload="beforeUpload"
        @change="handleUploadChange($event)"
        @preview="handlePreview"
      >
        <div v-if="!multiple && picUrl" class="vc-upload-select">
          <img :src="imageSrc" alt="preview image" />
          <div class="vc-upload-guide s-cover">
            <a-icon type="plus" />
            <p>点击重新上传</p>
          </div>
        </div>
        <div
          v-else-if="(multiple && fileList.length < limit) || (!multiple && !picUrl)"
          class="vc-upload-guide wfc2"
        >
          <a-icon type="plus" class="wfc2" />
          <p>{{ text }}</p>
        </div>
        <div v-if="loading" class="vc-upload-guide s-load" @click.stop>
          <a-icon type="loading" />
          <p>上传中...</p>
        </div>
      </a-upload>
      <p v-if="tip" class="vc-upload-tip wfc3">{{ tip }}</p>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-regex-literals */
import serverConfig from '@/config/server.config';
import { ACCESS_TOKEN } from '@/store/mutation-types';
import storage from '@/utils/storage';

const uidGenerator = () => {
  return '-' + parseInt(Math.random() * 10000 + 1, 10);
};

const getFileAccessHttpUrl = (avatar, subStr) => {
  if (!subStr) subStr = 'http';
  if (avatar && avatar.startsWith(subStr)) {
    return avatar;
  } else {
    return serverConfig.API_BASE_URL + avatar;
  }
};

const getFileName = path => {
  if (path.lastIndexOf('\\') >= 0) {
    let reg = new RegExp('\\\\', 'g');
    path = path.replace(reg, '/');
  }
  return path.substring(path.lastIndexOf('/') + 1);
};

export default {
  name: 'VcUpload',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    tip: {
      type: String,
      default: ''
    },
    accept: {
      type: String,
      default: '.png, .jpg, .jpeg, .gif, .bmp, .ico, .webp'
    },
    action: {
      type: String,
      default: `${serverConfig.API_BASE_URL}/uploadFile/uploadFile`
    },
    text: {
      type: String,
      default: '点击上传图片'
    },
    value: {
      type: [String, Array],
      require: false
    },
    maxSize: {
      type: Number,
      default: 1024 * 1024 * 10
    },
    // 是否多图
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    // 多图情况下限制图片张数
    limit: {
      type: Number,
      required: false,
      default: 9
    }
  },

  data() {
    return {
      headers: {},
      defaultFileList: [],
      fileList: [],
      loading: false,
      picUrl: false,
      uploadAccept: '.png, .jpg, .jpeg, .gif, .bmp, .ico, .webp',
      uploadAction: `${serverConfig.API_BASE_URL}/uploadFile/uploadFile`
    };
  },

  computed: {
    imageSrc() {
      if (this.defaultFileList.length > 0) {
        let url = this.defaultFileList[this.defaultFileList.length - 1].url;

        return getFileAccessHttpUrl(url);
      }

      return '';
    }
  },

  watch: {
    value: {
      handler(val) {
        if (val instanceof Array) {
          this.initFileList(val.join(','));
        } else {
          this.initFileList(val);
        }
      },
      deep: true,
      immediate: true
    }
  },

  created() {
    const token = storage.get(ACCESS_TOKEN);
    this.headers = { Authorization: token };
  },

  methods: {
    // 显示已有图片
    initFileList(paths) {
      if (!paths || paths.length === 0) {
        this.fileList = [];
        return;
      }

      let fileList = [];
      let arr = paths.split(',');
      for (let a = 0; a < arr.length; a++) {
        let url = getFileAccessHttpUrl(arr[a]);
        fileList.push({
          uid: uidGenerator(),
          name: getFileName(arr[a]),
          status: 'done',
          netUrl: arr[a],
          url: url
        });
      }

      this.picUrl = true;

      this.defaultFileList = fileList;
    },

    beforeUpload: function(file) {
      let fileType = file.type;
      if (fileType.indexOf('image') < 0) {
        this.$message.warning('请上传图片！');
        return false;
      }
      let max = this.maxSize / 1024 / 1024;
      if (file.size > this.maxSize) {
        this.$message.warning(`文件大小需要小于${max}M！`);
        return false;
      }
      if (this.fileList.length > this.limit) {
        this.$message.warning(`最多上传${this.limit}张图`);
        return false;
      }
    },

    // 图片上传回调
    handleUploadChange(info) {
      let fileList = [...info.fileList];

      if (fileList.length > this.limit) {
        fileList.length = this.limit;
        this.$message.warning(`最多上传${this.limit}张图`);
      }

      this.picUrl = false;
      if (info.file.status === 'uploading') {
        this.loading = true;
      } else if (info.file.status === 'done') {
        let response = info.file.response;

        if (response && response.resultData && response.resultData.netUrl) {
          this.picUrl = true;

          fileList = fileList.map(file => {
            if (file.response) {
              file.netUrl = file.response.resultData.netUrl;
              file.url = getFileAccessHttpUrl(file.response.resultData.netUrl);
            }
            return file;
          });

          this.loading = false;
        }
      } else if (info.file.status === 'error') {
        this.$message.error('图片上传失败');
        this.loading = false;
      } else if (info.file.status === 'removed') {
        this.handleDelete(info.file);
        this.loading = false;
      }

      this.fileList = fileList;
      if (info.file.status === 'done' || info.file.status === 'removed') {
        this.handlePathChange();
      }
    },

    // 回传父组件
    handlePathChange() {
      let uploadFiles = this.fileList;
      let path = '';
      if (!uploadFiles || uploadFiles.length === 0) {
        path = '';
      }

      let arr = [];
      if (!this.multiple) {
        arr.push(uploadFiles[uploadFiles.length - 1].netUrl);
      } else {
        for (let a = 0; a < uploadFiles.length; a++) {
          if (uploadFiles[a].status === 'done') {
            arr.push(uploadFiles[a].netUrl);
          }
        }
      }
      if (arr.length > 0) {
        path = arr.join(',');
      }

      this.$emit('change', path);
    },

    // 删除
    handleDelete(file) {
      console.log(file);
    },

    handlePreview() {},

    preview(index) {
      let items = this.defaultFileList.map(el => {
        return {
          src: el.url
        };
      });

      this.$Pswp.open({
        items,
        options: {
          index
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.vc-upload {
  display: block;

  /deep/ .ant-upload {
    background: #fff;

    &-select-picture-card {
      width: 100px;
      height: 100px;
      margin: 4px 0;

      & > span {
        position: relative;
        padding: 9px;
      }
    }
  }

  /deep/ .ant-upload-disabled {
    background: #f5f5f5;

    &:hover {
      border-color: #d9d9d9;
    }

    .vc-upload-guide {
      color: rgba(0, 0, 0, 0.25);

      i {
        color: rgba(0, 0, 0, 0.25);
      }
    }
  }

  &-select {
    height: 80px;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:hover {
      .vc-upload-guide {
        display: flex;
      }
    }
  }

  &-guide {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    font-size: 12px;
    user-select: none;

    i {
      margin-bottom: 8px;
      font-size: 18px;
    }

    &.s-load,
    &.s-cover {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      z-index: 3;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.25);

      i {
        color: #fff;
      }
    }

    &.s-cover {
      display: none;
    }
  }

  &-tip {
    font-size: 12px;
    line-height: 1.5;
  }

  &-preview {
    overflow: hidden;

    &-picture-card {
      float: left;
      width: 100px;
      height: 100px;
      margin-right: 10px;
      margin-bottom: 10px;
      padding: 10px;
      background: #f7faff;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
