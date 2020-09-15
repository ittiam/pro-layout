/** * @DATE: 2020/3/5 3:11 PM * @Version: 0.0.1 * @Author: huhaiou * @Description: * @Update:
修复升级ant-design版本后，下拉菜单无法获取到type的问题 by huhaiou 2020/3/5 3:11 PM * @Update: 修改下拉菜单列表展示方式
by weixinqi 2020/7/15 10:48 AM */
<template>
  <section>
    <div class="header-menu" v-if="sysMenuList && sysMenuList.length">
      <div class="header-menu-item" v-for="item in sysMenuList" :key="item.type" @click="handleMenuClick(item.type)">
        <span><i :class="`icon icon-${item.icon}`"></i></span>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div style="display: inline-block; height: 100%; vertical-align: initial">
      <a-avatar class="avatar" size="small" shape="circle" :src="defaultAvatar" />
      <span class="loginName">{{ currUser.orgUser ? currUser.orgUser.loginName : currUser.loginName }}</span>
    </div>
    <a-modal title="修改密码" :visible="visible" @cancel="handleCancel" @ok="changePass">
      <a-form :form="form">
        <a-form-item label="原始密码" v-bind="formItem">
          <a-input
            v-decorator="[
              'oldPassword',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入原始密码'
                  }
                ]
              }
            ]"
            type="password"
          />
        </a-form-item>
        <a-form-item label="新密码" v-bind="formItem">
          <a-input
            v-decorator="[
              'newPassword',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入新密码'
                  },
                  {
                    validator: validateToNextPassword
                  }
                ]
              }
            ]"
            type="password"
          />
        </a-form-item>
        <a-form-item label="确认密码" v-bind="formItem">
          <a-input
            v-decorator="[
              'renewPassword',
              {
                rules: [
                  {
                    required: true,
                    message: '请确认密码'
                  },
                  {
                    validator: compareToFirstPassword
                  }
                ]
              }
            ]"
            type="password"
            @blur="handleConfirmBlur"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </section>
</template>

<script>
// import { requestLogout, changePassword} from '../../api/api';

const formItem = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};
export default {
  name: 'HeaderAvatar',
  computed: {
    currUser() {
      return this.$store.state.user.info;
    }
  },
  inject: ['requestLogout', 'changePassword'],
  data() {
    return {
      defaultAvatar: require('@/assets/images/avatar.png'),
      visible: false,
      formItem,
      form: this.$form.createForm(this),
      confirmDirty: false,
      sysMenuList: this.$store.state.setting.sysMenuList
    };
  },
  methods: {
    handleMenuClick(type) {
      if (type === 'logOut') {
        this.logout();
      } else if (type === 'changePass') {
        this.visible = true;
        this.form.resetFields();
      } else if (type === 'about') {
      }
    },
    //退出登录
    logout: function() {
      let _this = this;
      this.$confirm({
        title: '登出',
        content: '确认要退出登录吗？',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          _this
            .requestLogout()
            .then(res => {
              let { status } = res.data;
              if (status === 'complete') {
                _this.$store.commit('account/setLogout');
                _this.$store.commit('permission/setCleanMenu');
                _this.$router.push('/login');
                // 退出时刷新页面，避免浏览器缓存路由数据
                location.reload();
              }
            })
            .catch(() => {
              _this.$message.error('系统异常,请重试');
            });
        },
        onCancel() {
          // console.log('Cancel');
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('newPassword')) {
        callback('密码输入不一致');
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['renewPassword'], { force: true });
      }
      callback();
    },
    //修改密码
    changePass() {
      this.form.validateFields((err, values) => {
        Reflect.deleteProperty(values, 'renewPassword');
        if (!err) {
          this.changePassword(values)
            .then(res => {
              let { status } = res;
              if (status === 'complete') {
                this.$message.success('修改密码成功');
                this.$store.commit('account/setLogout');
                this.$store.commit('permission/setCleanMenu');
                this.$router.push('/login');
                let dsCount = JSON.stringify(values);
                document.cookie = `dsCount=${dsCount}`;
                location.reload();
              } else {
                this.$message.warning(res.errorMessage);
              }
            })
            .catch(e => {});
        }
      });
    },
    handleCancel() {
      this.visible = false;
      this.form.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.header-menu {
  display: inline-block;
  height: 100%;
  margin-right: 10px;
  color: #6281a3;

  &-item {
    display: inline-block;
    padding-right: 30px;
    font-size: 12px;
    line-height: 20px;
    vertical-align: middle;

    span:first-of-type {
      font-size: 20px;
      vertical-align: bottom;
    }
  }
}

.avatar {
  margin: 10px 10px 10px 0;
  vertical-align: middle;
}

.loginName {
  color: #6281a3;
  line-height: 18px;
}
</style>
