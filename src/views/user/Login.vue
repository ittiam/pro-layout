<template>
  <div class="login-container">
    <div class="middle-con">
      <!-- 左侧图片部分 -->
      <div class="img-con">
        <img class="logo-img" src="@/assets/login/text.png" alt="" />
        <img class="backg-img" src="@/assets/login/icon_font.png" alt="" />
      </div>
      <!-- 右侧登录部分 -->
      <div class="userinfo-con">
        <!-- 用户名登录 -->
        <div class="name-ipone-login">
          <div class="title-icon">
            <p class="">用户登录</p>
            <img src="@/assets/login/Rectangle2.png" alt="" />
          </div>

          <a-form-model ref="loginForm" :model="form" :rules="rules" class="login-form">
            <a-form-model-item prop="loginName">
              <a-input
                v-model.trim="form.loginName"
                size="large"
                autocomplete="off"
                placeholder="请输入账户名/手机号"
              >
                <template v-slot:prefix>
                  <i class="wpgicon icon-ic_account_circle"></i>
                </template>
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="password" class="form-item-password">
              <a-input-password
                v-model.trim="form.password"
                size="large"
                type="password"
                autocomplete="off"
                placeholder="请输入密码"
                :visibilityToggle="false"
                @keydown.enter="handleSubmit"
              >
                <template v-slot:prefix>
                  <i class="wpgicon icon-ic_lock_outline"></i>
                </template>
              </a-input-password>
            </a-form-model-item>
            <a-form-model-item prop="remember" class="form-item-remember">
              <a-checkbox v-model="form.remember" class="remb-Pswd"> 记住密码 </a-checkbox>
            </a-form-model-item>
            <!-- </div> -->
            <div class="submit">
              <a-button
                type="primary"
                class="login-form-button"
                :loading="loading"
                @click="handleSubmit"
              >
                登录
              </a-button>
            </div>
          </a-form-model>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import storage from '@/utils/storage';
import { Base64 } from 'js-base64';
import { APP_LOGIN_INFO } from '@/store/mutation-types';
import { setting } from '@/config';

const defaultForm = {
  loginName: undefined,
  // tenantName: undefined,
  password: undefined,
  remember: false
};
export default {
  data() {
    return {
      loading: false, // 登录 loading
      systemName: setting.systemName,
      form: { ...defaultForm },
      rules: {
        loginName: [{ required: true, message: '该项不能为空!', trigger: 'change' }],
        // tenantName: [{ required: true, message: '该项不能为空!', trigger: 'change' }],
        password: [{ required: true, message: '该项不能为空!', trigger: 'change' }]
      }
    };
  },
  mounted() {
    this.restore();
  },
  methods: {
    ...mapActions('account', ['Login']),

    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.Login(this.form)
            .then(() => {
              this.loading = false;
              this.form.remember && this.remember(this.form);

              this.$router.push(this.$route.query.redirect || '/');
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
    remember(data = {}) {
      let info = Base64.encode(JSON.stringify(data));
      storage.set(APP_LOGIN_INFO, info);
    },
    restore() {
      let info = storage.get(APP_LOGIN_INFO);
      if (info) {
        try {
          this.form = JSON.parse(Base64.decode(info));
        } catch (e) {
          this.form = { ...defaultForm };
        }
      }
    }
  }
};
</script>
<style lang="less">
.login-container {
  width: 100%;
  height: 100%;
  background: url('~@/assets/login/icon_bg_compression.png') no-repeat;
  background-size: cover;

  .middle-con {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 85.5%;
    height: 526px;
    margin-top: -263px;
    margin-left: -42.75%;
  }

  .img-con {
    position: absolute;
    top: 0;
    left: 0;
    width: 520px;
    height: 525px;

    .logo-img {
      position: absolute;
      left: 12%;
      height: 33px;
    }

    .backg-img {
      position: absolute;
      top: -15%;
      left: -15%;
      height: 550px;
    }
  }

  .userinfo-con {
    position: absolute;
    top: 50%;
    right: 0;
    width: 468px;
    margin-top: -210px;

    // height: 383px;
    // padding-top: 20px;
    padding: 35px 23px 35px 23px;
    background: rgba(2, 23, 40, 0.1);

    .icon {
      position: absolute;
      top: 0;
      right: 0;
      width: 65px;
      height: 65px;
      cursor: pointer;

      img {
        position: absolute;
        top: 0;
      }

      img:nth-child(2) {
        display: none;
      }
    }

    .icon:hover img:nth-child(2) {
      display: block;
    }

    /deep/ .ant-form-explain {
      margin-top: 2px;
    }

    .name-ipone-login {
      // width: 75%;
      // margin: 5% auto;
      // margin: 0 auto;
      color: #85b4ff;

      .title-icon {
        text-align: center;

        > p {
          color: #fff;
          font-size: 22px;
        }

        > img {
          // width: 60%;
          width: 100%;

          height: 1.4px;
          margin: 22px 0 25px;
          // outline: 1px solid #f40;
        }
      }

      .login-form {
        width: 82%;
        margin: 0 auto;
      }

      .ant-tabs-bar {
        margin-bottom: 64px;
        border: 0;

        .ant-tabs-tab {
          margin-right: 0;
          color: #85b4ff;
          font-size: 16px;
        }

        .ant-tabs-tab-active {
          color: #85b4ff;
        }

        .ant-tabs-ink-bar {
          bottom: -2px;
          z-index: 99;
          background: #85b4ff;
        }
      }

      .ant-tabs-nav {
        border-bottom: 3px solid #264069;
      }

      .ant-form-item {
        margin-bottom: 0;
      }

      .ant-form-item-control {
        height: 86px;
      }

      .ant-tabs-content {
        height: 177px;
      }
    }

    .name-login,
    .eqcode-login {
      width: 300px;
      margin: 0 85px;
      color: #85b4ff;

      .title-con {
        font-size: 20px;
        text-align: center;

        img {
          height: 2px;
        }
      }

      .login-form {
        margin-top: 20px;
      }

      img {
        width: 100%;
        margin: 20px 0;
      }
    }

    .remb-Pswd {
      color: #85b4ff;
      font-size: 14px;

      span {
        color: #ccc;
      }
    }

    .login-form-button {
      width: 100%;
      height: 50px;
      margin-top: 10px;
      color: #85b4ff;
      font-size: 20px;
      background: none;
      border: 1px solid #85b4ff;
      border-radius: 4px;

      &.ant-btn-loading {
        &::before {
          background: #85b4ff;
        }
      }
    }

    .form-item-remember {
      /deep/ .ant-form-item-control {
        height: auto;
        line-height: 20px;
      }
    }

    /* input 默认提示信息颜色 */

    input::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #adb5bd;
    }

    input:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #adb5bd;
    }

    input::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #adb5bd;
    }

    input::-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: #adb5bd;
    }

    .ant-input {
      height: 50px;
      padding-left: 52px;
      color: #fff;
      font-size: 14px;
      background: rgba(2, 23, 40, 0.1);
      border: 0;
      border-radius: 4px;

      &:focus {
        border: 0;
        box-shadow: none;
      }
    }

    .ant-input-prefix {
      left: 16px;
      color: #a2b0c6;
    }

    .ant-input-group-addon {
      background: rgba(10, 22, 33, 0.3);
      border: 0;
      cursor: pointer;

      .send-code {
        padding: 2px 0 2px 10px;
        color: #85b4ff;
        border-left: 3px solid #264069;
      }
    }
  }
}

.hide {
  display: none;
}
</style>
