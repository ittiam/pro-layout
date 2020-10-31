<template>
  <div>
    <a-upload
      list-type="picture-card"
      class="vc-upload"
      :show-upload-list="false"
      :disabled="disabled"
      :action="action"
      @change="handleUploadChange($event)"
    >
      <div v-if="previewImage" class="vc-upload-preview">
        <img :src="previewImage" alt="preview image" />
        <div class="vc-upload-guide s-cover">
          <a-icon type="plus" />
          <p>点击重新上传</p>
        </div>
      </div>
      <div v-else class="vc-upload-guide wfc2">
        <a-icon type="plus" class="wfc2" />
        <p>{{ buttonText }}</p>
      </div>
      <div v-if="loading" class="vc-upload-guide s-load" @click.stop>
        <a-icon type="loading" />
        <p>上传中...</p>
      </div>
    </a-upload>
    <p v-if="tip" class="vc-upload-tip wfc3">{{ tip }}</p>
  </div>
</template>

<script>
import serverConfig from '@/api/serverConfig';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  name: 'VcUpload',

  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    tip: {
      type: String,
      default: ''
    },
    action: {
      type: String,
      default: 'http://122.112.215.244/machine/fileUpload'
    },
    buttonText: {
      type: String,
      default: '点击上传图片'
    }
  },

  data() {
    return {
      previewImage: '',
      loading: false
    };
  },

  methods: {
    // 图片上传回调
    handleUploadChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
      } else if (info.file.status === 'done') {
        if (info.file.response && info.file.response.fileUrl) {
          this.previewImage = serverConfig.IMG_BASE_URL + info.file.response.fileUrl;
          this.loading = false;
        } else {
          getBase64(info.file.originFileObj, imageUrl => {
            this.previewImage = imageUrl;
            this.loading = false;
          });
        }
      } else if (info.file.status === 'error' || info.file.status === 'removed') {
        this.$message.error('图片上传失败');
        this.loading = false;
      }
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

  &-preview {
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
}
</style>
