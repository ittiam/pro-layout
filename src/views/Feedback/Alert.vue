/** * @DATE: 2019/12/16 16:54 * @Version: 0.0.1 * @Author: lmz * @Description: alert / message 组件 * @Update: 更新内容
by lmz 2019/12/16 16:54 */
<template>
  <div>
    <a-row>Alert / Message</a-row>
    <a-row>
      （非浮层的静态展现形式）
      <a-col :span="24">
        <a-alert message="操作成功" type="success" showIcon closable>
          <i slot="icon" class="icon-ic_check_circle"> </i>
          <i slot="closeText" class="icon-ic_clear"></i>
        </a-alert>
        <a-alert message="操作成功" type="success" showIcon closable>
          <i slot="icon" class="icon-ic_check_circle"> </i>
          <i slot="closeText" class="icon-ic_clear"></i>
          <p slot="description">
            Success Description Success Description Success Description
          </p>
        </a-alert>

        <a-alert message="信息提示" type="info" showIcon>
          <i slot="icon" class="icon-ic_error"> </i>
          <i slot="closeText" class="icon-ic_clear"></i>
        </a-alert>
        <a-alert message="操作提示" type="warning" showIcon>
          <i slot="icon" class="icon-ic_error"> </i>
          <i slot="closeText" class="icon-ic_clear"></i>
        </a-alert>
        <a-alert message="操作失败" type="error" showIcon>
          <i slot="icon" class="icon-ic_cancel"> </i>
          <i slot="closeText" class="icon-ic_clear"></i>
        </a-alert>
        <a-alert
          message="信息提示"
          description="Info Description Info Description Info Description Info Description"
          type="info"
          showIcon
        >
          <i slot="icon" class="icon-ic_error"> </i>
          <i slot="closeText" class="icon-ic_clear"></i>
        </a-alert>
        <a-alert
          message="操作提示"
          description="Warning Description Warning Description Warning Description Warning Description"
          type="warning"
          showIcon
        >
          <i slot="icon" class="icon-ic_error"> </i>
          <i slot="closeText" class="icon-ic_clear"></i>
        </a-alert>
        <a-alert
          message="操作失败"
          description="Error Description Error Description Error Description Error Description"
          type="error"
          showIcon
        >
          <i slot="icon" class="icon-ic_cancel"> </i>
          <i slot="closeText" class="icon-ic_clear"></i>
        </a-alert>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="10">
        <b>alertModal浮层提示</b><br />
        <br />
        说明：全局展示操作反馈信息（弹窗需手动关闭/自动消失）<br />
        动效方式：离页面顶部100px<br />
        使用场景：保存结果提示、查询结果提示、添加结果提示、成功提示、警告提示、错误提示、读取提示
      </a-col>
      <a-col :span="6" :offset="1">
        浮层宽度：宽度1000(弹窗需手动关闭)<br />
        <a-button @click="$alertModal('success', '操作成功')">Success</a-button><br />
        <a-button @click="$alertModal('error', '操作失败')">Error</a-button><br />
        <a-button @click="$alertModal('warning', '操作提示')">Warning</a-button><br />
        <a-button @click="$alertModal('info', '信息提示')">Info</a-button><br />
        <a-button @click="$alertModal('success', '操作成功', '此处为注释说明文案区域')">Success</a-button><br />
        <a-button @click="$alertModal('error', '操作失败', '此处为注释说明文案区域')">Error</a-button><br />
        <a-button @click="$alertModal('warning', '操作提示', '此处为注释说明文案区域')">Warning</a-button><br />
        <a-button @click="$alertModal('info', '信息提示', '此处为注释说明文案区域')">Info</a-button>
      </a-col>
      <a-col :span="6" :offset="1">
        浮层宽度：宽度300（有描述信息）宽度260（无描述信息）（自动闪现2s消失--可设置时间）<br />
        <a-button @click="$alertModal('success', '操作成功', '此处为注释说明文案区域', false)">Success</a-button><br />
        <a-button @click="$alertModal('error', '操作失败', '此处为注释说明文案区域', false)">Error</a-button><br />
        <a-button @click="$alertModal('warning', '操作提示', '此处为注释说明文案区域', false)">Warning</a-button><br />
        <a-button @click="$alertModal('info', '信息提示', '此处为注释说明文案区域', false)">Info</a-button><br />
        <a-button @click="$alertModal('success', '操作成功', '', false)">Success</a-button><br />
        <a-button @click="$alertModal('error', '操作失败', '', false)">Error</a-button><br />
        <a-button @click="$alertModal('warning', '操作提示', '', false)">Warning</a-button><br />
        <a-button @click="$alertModal('info', '信息提示', '', false)">Info</a-button>
      </a-col>
    </a-row>
    <a-row>
      Messaage（信息提示，无详细描述信息）<br />
      说明：全局展示操作反馈信息(闪现2秒后自动消失)<br />
      浮层宽度：236px<br />
      动效方式：从页面顶部推出并自动消失<br />
      使用场景：是一种不打断用户操作的轻量级提示方式
      <a-col :span="8">
        宽度260<br />
        <a-button @click="success">Success</a-button><br />
        <a-button @click="error">Error</a-button><br />
        <a-button @click="warning">Warning</a-button><br />
        <a-button @click="info">Info</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Vue from 'vue';
import AlertModal from '@/components/Modal';
Vue.prototype.$alertModal = AlertModal;

export default {
  name: '',
  data() {
    return {
      visible: false
    };
  },
  methods: {
    info() {
      this.$message.info({
        content: 'This is a normal message',
        duration: 2000,
        icon: h => {
          return h('i', {
            class: 'icon-ic_error'
          });
        }
      });
    },
    success() {
      this.$message.success({
        content: 'This is a message of success',
        duration: 2,
        icon: h => {
          return h('i', {
            class: 'icon-ic_check_circle'
          });
        }
      });
    },
    error() {
      this.$message.error({
        content: 'This is a message of error',
        duration: 2,
        icon: h => {
          return h('i', {
            class: 'icon-ic_cancel'
          });
        }
      });
    },
    warning() {
      this.$message.warning({
        content: 'This is message of warning',
        duration: 2,
        icon: h => {
          return h('i', {
            class: 'icon-ic_error'
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.ant-alert {
  margin: 10px 0;
}
</style>
