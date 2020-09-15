/** * @DATE: 2019-09-02 16:53 * @Version: 0.0.1 * @Author: yunchangJia * @Description: 登录页面 *
@Update: 更新内容 by yunchangJia 2019-09-02 16:53 */

<template>
  <div class="login-container">
    <div class="middle-con">
      <!-- 左侧图片部分 -->
      <div class="img-con">
        <img class="logo-img" :src="logoImg" alt="" />
        <img class="backg-img" :src="textImg" alt="" />
      </div>

      <!-- 右侧登录部分 -->
      <div class="userinfo-con">
        <span class="icon" :class="{ hide: isshow }" @click="changeEqCode">
          <img :src="imgsrc" alt="" />
          <img :src="coversrc" alt="" />
        </span>
        <div :class="{ hide: !iscode }">
          <!-- 用户名或手机号登录 -->
          <div class="name-ipone-login" :class="{ hide: !isphone }">
            <a-form :form="form" class="login-form">
              <a-tabs defaultActiveKey="1" @change="Loginmethod">
                <a-tab-pane key="1" tab="用户名">
                  <div class="form-con">
                    <a-form-item>
                      <a-input
                        v-decorator="[
                          'loginName',
                          { rules: [{ required: username, message: '用户名称不能为空!' }] }
                        ]"
                        size="large"
                        autocomplete="off"
                        placeholder="请输入用户名称"
                      >
                        <template v-slot:prefix>
                          <i class="wpgicon icon-ic_account_circle"></i>
                        </template>
                      </a-input>
                    </a-form-item>
                    <a-form-item>
                      <a-input
                        v-decorator="[
                          'password',
                          { rules: [{ required: username, message: '密码不能为空!' }] }
                        ]"
                        size="large"
                        type="password"
                        autocomplete="off"
                        placeholder="请输入密码"
                      >
                        <template v-slot:prefix>
                          <i class="wpgicon icon-ic_lock_outline"></i>
                        </template>
                      </a-input>
                    </a-form-item>
                  </div>
                </a-tab-pane>
                <a-tab-pane key="2" tab="手机号" forceRender>
                  <div class="form-con">
                    <a-form-item>
                      <a-input
                        v-decorator="[
                          'phoneNumber',
                          {
                            rules: [
                              {
                                required: phone,
                                message: '手机号不能为空或格式不正确!',
                                pattern: /^1[34578]\d{9}$/
                              }
                            ]
                          }
                        ]"
                        size="large"
                        autocomplete="off"
                        placeholder="请输入手机号"
                      >
                        <template v-slot:prefix>
                          <i class="wpgicon icon-ic_stay_current_portrait"></i>
                        </template>
                      </a-input>
                    </a-form-item>
                    <a-form-item>
                      <a-input
                        v-decorator="[
                          'code',
                          { rules: [{ required: phone, message: '验证码不能为空!' }] }
                        ]"
                        size="large"
                        type="text"
                        autocomplete="off"
                        placeholder="输入手机验证码"
                      >
                        <template v-slot:prefix>
                          <i class="wpgicon icon-ic_number_box"></i>
                        </template>
                        <template v-slot:addonAfter>
                          <span class="send-code" @click="sendcode">
                            {{ message }}
                          </span>
                        </template>
                      </a-input>
                    </a-form-item>
                  </div>
                </a-tab-pane>
              </a-tabs>
            </a-form>
            <div class="submit">
              <a-checkbox
                v-decorator="['remember', { valuePropName: 'checked' }]"
                class="remb-Pswd"
              >
                记住密码
              </a-checkbox>
              <a-button type="primary" class="login-form-button" @click="handleSubmit">
                登录
              </a-button>
            </div>
          </div>

          <!-- 用户名登录 -->
          <div :class="{ 'name-login': true, hide: isphone }">
            <div class="title-con">
              用户名登录
              <img :src="bottomsrc" />
            </div>
            <a-form :form="form" class="login-form">
              <div class="form-con">
                <a-form-item>
                  <a-input
                    v-decorator="[
                      'loginName',
                      { rules: [{ required: username, message: '用户名称不能为空!' }] }
                    ]"
                    size="large"
                    autocomplete="off"
                    placeholder="请输入用户名称"
                  >
                    <template v-slot:prefix>
                      <i class="wpgicon icon-ic_account_circle"></i>
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-input
                    v-decorator="[
                      'password',
                      { rules: [{ required: username, message: '密码不能为空!' }] }
                    ]"
                    size="large"
                    type="password"
                    autocomplete="off"
                    placeholder="请输入密码"
                    @keyup.enter="handleSubmit"
                  >
                    <template v-slot:prefix>
                      <i class="wpgicon icon-ic_lock_outline"></i>
                    </template>
                  </a-input>
                </a-form-item>
              </div>
            </a-form>
            <div class="submit">
              <a-checkbox v-decorator="['remember', { valuePropName: 'checked' }]" class="remb-Pswd"
                >记住密码
              </a-checkbox>
              <a-button type="primary" class="login-form-button" @click="handleSubmit"
                >登录</a-button
              >
            </div>
          </div>
        </div>

        <!-- 二维码登录 -->
        <div :class="{ 'eqcode-login': true, hide: iscode }">
          <div class="title-con">
            二维码登录
            <img :src="bottomsrc" alt="" />
          </div>
          <div class="code-con">
            <img :src="ercode" alt="" />
            打开[手机]扫一扫 屏幕上方二维码，即可登录智慧平台，尽享多维数据~
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Base64 } from 'js-base64';
import { APP_LOGIN_INFO } from '@/store/mutation-types';

export default {
  data() {
    return {
      loginMethod: 1,
      username: true,
      phone: false,
      message: '发送验证码',
      imgsrc: require('../assets/login/icon_code.png'),
      coversrc: require('../assets/login/icon_uncover.png'),
      ercode: require('../assets/login/qrcode.png'),
      bottomsrc: require('../assets/login/Rectangle 2.png'),
      isshow: false, // 是否可切换二维码
      isphone: true, // 是否显示手机号登录
      iscode: true, // 是否切换到二维码登录
      logoImg: require('../assets/login/text.png'),
      textImg: require('../assets/login/icon_font.png')
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  mounted() {
    this.restore();
  },
  methods: {
    ...mapActions(['Login']),
    /**
     * 提交登录
     * @param e
     */
    handleSubmit: function(e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          // eslint-disable-next-line eqeqeq
          if (this.loginMethod == 1) {
            // 用户名登录
            let loginParams = {
              loginName: values.loginName,
              password: values.password
            };

            this.Login(loginParams).then(() => {
              this.remember();

              this.$router.push(this.$route.query.redirect || '/');
            });
          }
        }
      });
    },

    remember(data = {}) {
      let loginInfo = data;

      if (!loginInfo.remember) {
        loginInfo = { ...loginInfo, loginName: '', password: '' };
      }

      let info = Base64.encode(JSON.stringify(loginInfo));
      this.$ls.set(APP_LOGIN_INFO, info);
    },

    restore() {
      let info = this.$ls.get(APP_LOGIN_INFO);

      if (info) {
        let loginInfo = Base64.decode(info);

        this.form.setFieldsValue(loginInfo);
      }
    },

    sendcode() {
      if (this.message === '发送验证码' || this.message === '重新发送') {
        // let sendParams = {
        //     phone: this.form.getFieldValue('phoneNumber')
        // };
        // sendMessage(sendParams).then(data => {
        //     let {errorMessage, resultData, status} = data;
        //     if (status === 'complete') {
        //         //验证码发送成功
        //         let time = 60 * 1000;
        //         this._showTime(time);
        //         this.$message.success('验证码发送成功');
        //     } else {
        //         //验证码发送失败
        //         this.$message.error(errorMessage);
        //     }
        // });
      }
    },

    /**
     * 切换登录方法
     */
    Loginmethod(key) {
      this.loginMethod = key;
      if (key === 1) {
        // 用户名登录，手机号和短信验证码可以不输入
        this.username = true;
        this.phone = false;
      } else {
        // 手机号登录，用户名和密码可以不输入
        this.username = false;
        this.phone = true;
      }
      // 将表单置空
      this.form.resetFields();
    },

    /**
     *切换登录方式
     */
    changeEqCode() {
      // 修改图片src
      if (this.ishide) {
        this.imgsrc = require('../assets/login/icon_username.png');
      } else {
        this.imgsrc = require('../assets/login/icon_code.png');
      }
      this.iscode = !this.iscode;
    }
  }
};
</script>
<style lang="less">
.login-container {
  width: 100%;
  height: 100%;
  background: url('../assets/login/icon_bg.png') no-repeat;
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
    top: 0;
    right: 0;
    width: 468px;
    height: 525px;
    padding-top: 52px;
    background: rgba(2, 23, 40, 0.5);

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

    .name-ipone-login {
      width: 358px;
      margin: 0 56px;

      .ant-tabs-bar {
        margin-bottom: 64px;
        border: 0;

        .ant-tabs-tab {
          margin-right: 0;
          color: #3b5e95;
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
      font-size: 12px;
    }

    .login-form-button {
      width: 100%;
      height: 50px;
      margin-top: 40px;
      color: #85b4ff;
      font-size: 20px;
      background: none;
      border: 1px solid #85b4ff;
      border-radius: 4px;
    }

    /* input 默认提示信息颜色 */

    input::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #3b5e95;
    }

    input:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #3b5e95;
    }

    input::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #3b5e95;
    }

    input::-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: #3b5e95;
    }

    .ant-input {
      height: 50px;
      padding-left: 52px;
      color: #85b4ff;
      font-size: 14px;
      background: rgba(10, 22, 33, 0.3);
      border: 0;
      border-radius: 4px;

      &:focus {
        border: 0;
        box-shadow: none;
      }
    }

    .ant-input-prefix {
      left: 16px;
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
