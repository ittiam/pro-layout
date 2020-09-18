<template>
  <a-dropdown>
    <div class="header-avatar" style="cursor: pointer">
      <a-avatar class="avatar" size="small" shape="circle" :src="avatar" />
      <span class="name">{{ user.name }}</span>
    </div>
    <a-menu slot="overlay" :class="['avatar-menu']">
      <a-menu-item>
        <a-icon type="user" />
        <span>个人中心</span>
      </a-menu-item>
      <a-menu-item>
        <a-icon type="setting" />
        <span>设置</span>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item @click="logout">
        <a-icon style="margin-right: 8px;" type="poweroff" />
        <span>退出登录</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import defaultAvatar from '@/assets/images/avatar.png';

export default {
  name: 'HeaderAvatar',
  computed: {
    ...mapState('account', ['user']),
    avatar() {
      return this.user.avatar || defaultAvatar;
    }
  },
  methods: {
    ...mapActions('account', ['Logout']),
    logout() {
      let this_ = this;

      this.$confirm({
        title: '登出',
        content: '确认要退出登录吗？',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          this_
            .Logout()
            .then(res => {
              setTimeout(() => {
                window.location.reload();
              }, 16);
            })
            .catch(() => {
              this_.$message.error('系统异常,请重试');
            });
        },
        onCancel() {
          // console.log('Cancel');
        }
      });
    }
  }
};
</script>

<style lang="less">
.header-avatar {
  display: inline-flex;

  .avatar,
  .name {
    align-self: center;
  }

  .avatar {
    margin-right: 8px;
  }

  .name {
    font-weight: 500;
  }
}

.avatar-menu {
  width: 150px;
}
</style>
