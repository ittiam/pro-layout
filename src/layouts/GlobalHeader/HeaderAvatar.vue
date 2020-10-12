<template>
  <div class="header-avatar">
    <span class="name">{{ currUser.userName || currUser.loginName }}</span>
    <a-dropdown style="display: inline-block; height: 100%; vertical-align: initial">
      <span style="cursor: pointer">
        <a-avatar class="avatar" size="small" shape="circle" :src="defaultAvatar" />
        <!-- <span class="name">{{ currUser.userName || currUser.loginName }}</span> -->
        <a-icon type="caret-down" />
      </span>
      <a-menu slot="overlay" style="width: 150px" @click="handleMenuClick">
        <a-menu-item v-for="item in sysMenuList" :key="item.type">
          <a-icon :type="item.icon" />
          <span>{{ item.name }}</span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <a-modal
      title="修改密码"
      :visible="visible"
      class="modal-update-password"
      @cancel="handleCancel"
      @ok="changePass"
    >
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
                    whitespace: true,
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
                    message: '请输入确认密码'
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { validPassword } from '@/utils/validator';

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
      sysMenuList: [
        { type: 'changePass', icon: 'edit', name: '修改密码' },
        { type: 'logOut', icon: 'poweroff', name: '退出登录' }
      ]
    };
  },
  computed: {
    ...mapState('account', {
      currUser: 'user'
    })
  },
  methods: {
    ...mapActions('account', ['Logout', 'changePassword']),

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
      this.$confirm({
        title: '登出',
        content: '确认要退出登录吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.Logout()
            .then(res => {
              setTimeout(() => {
                window.location.reload();
              }, 16);
            })
            .catch(() => {
              this.$message.error('系统异常,请重试');
            });
        },
        onCancel: () => {
          // console.log('Cancel');
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, v, callback) {
      const value = v || '';
      const form = this.form;

      if (value && value !== form.getFieldValue('newPassword')) {
        callback(new Error('密码输入不一致'));
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, v, callback) {
      const value = v || '';
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['renewPassword'], { force: true });
      }

      if (value.length < 8) {
        callback(new Error('密码长度需大于等于8'));
      } else if (!validPassword(value)) {
        callback(new Error('密码必须包含大写小写字母和数字'));
      } else {
        callback();
      }
    },
    // 修改密码
    changePass() {
      this.form.validateFields({ firstFields: true }, (err, values) => {
        Reflect.deleteProperty(values, 'renewPassword');
        if (!err) {
          this.changePassword({
            newPwd: values.newPassword,
            oldPwd: values.oldPassword
          })
            .then(res => {
              let { status } = res;
              if (status === 'complete') {
                this.$message.success('修改密码成功');

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

.name {
  margin-right: 12px;
}

.modal-update-password {
  .ant-form-item {
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
