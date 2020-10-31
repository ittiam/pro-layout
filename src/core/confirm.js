import { Modal } from 'ant-design-vue';
import modalConfirm from 'ant-design-vue/es/modal/confirm';

const iconColorMap = {
  primary: '#0ACC9D',
  danger: '#F64357',
  warning: '#FFBF00'
};

// confirm图标全局替换
function confirm(props) {
  let config = {
    type: 'confirm',
    closable: true,
    icon: h =>
      h('i', {
        style: {
          display: 'block',
          margin: '15px',
          color: iconColorMap.warning
        },
        class: ['icon-ic_report_problem', 'wfs48']
      }),
    okCancel: true,
    ...props
  };

  return modalConfirm(config);
}

// 路由切换Modal关闭
Modal.watch.$route = function() {
  if (this.visible) {
    this.handleCancel();
  }
};

export default confirm;
