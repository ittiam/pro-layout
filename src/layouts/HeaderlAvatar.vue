/** * @DATE: 2020/3/5 3:11 PM * @Version: 0.0.1 * @Author: huhaiou * @Description: * @Update:
修复升级ant-design版本后，下拉菜单无法获取到type的问题 by huhaiou 2020/3/5 3:11 PM */
<template>
  <section>
    <a-dropdown style="display: inline-block; height: 100%; vertical-align: initial">
      <span style="cursor: pointer">
        <a-avatar class="avatar" size="small" shape="circle" :src="defaultAvatar" />
        <span>{{ currUser.userName || currUser.loginName }}</span>
        <a-icon type="caret-down" />
      </span>
      <a-menu slot="overlay" style="width: 150px" @click="handleMenuClick">
        <a-menu-item v-for="item in sysMenuList" :key="item.type">
          <a-icon :type="item.icon" />
          <span>{{ item.name }}</span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
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
const formItem = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};
export default {
  name: 'HeaderAvatar',
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
  computed: {
    currUser() {
      return this.$store.state.user.info;
    }
  },
  inject: ['requestLogout', 'changePassword'],
  methods: {
    handleMenuClick(e) {
      let type = e.key;
      if (type === 'logOut') {
        this.logout();
      } else if (type === 'changePass') {
        this.visible = true;
        this.form.resetFields();
      }
    },
    // 退出登录
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
              setTimeout(() => {
                window.location.reload();
              }, 16);
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
    // 修改密码
    changePass() {
      this.form.validateFields((err, values) => {
        Reflect.deleteProperty(values, 'renewPassword');
        if (!err) {
          this.changePassword(values)
            .then(res => {
              let { status } = res;
              if (status === 'complete') {
                this.$message.success('修改密码成功');
                // let dsCount = JSON.stringify(values);
                // document.cookie = `dsCount=${dsCount}`;
                setTimeout(() => {
                  window.location.reload();
                }, 500);
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
.avatar {
  margin: 10px 4px 10px 0;
  vertical-align: middle;
}
</style>
