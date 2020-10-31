import Modal from 'ant-design-vue/es/modal';

export default Vue => {
  function dialog(component, componentProps, modalProps = {}) {
    // eslint-disable-next-line no-invalid-this
    const _vm = this;
    if (!_vm || !_vm._isVue) {
      return;
    }
    let dialogDiv = document.querySelector('body>div[type=dialog]');
    if (!dialogDiv) {
      dialogDiv = document.createElement('div');
      dialogDiv.setAttribute('type', 'dialog');
      document.body.appendChild(dialogDiv);
    }

    const handle = function(checkFunction, afterHandel) {
      if (checkFunction instanceof Function) {
        const res = checkFunction();
        if (res instanceof Promise) {
          res.then(c => {
            c && afterHandel();
          });
        } else {
          res && afterHandel();
        }
      } else {
        // checkFunction && afterHandel()
        checkFunction || afterHandel();
      }
    };

    const dialogInstance = new Vue({
      data() {
        return {
          visible: true
        };
      },
      router: _vm.$router,
      store: _vm.$store,
      mounted() {
        this.$on('close', v => {
          this.handleClose();
        });
      },
      methods: {
        handleClose() {
          handle(this.$refs._component.onCancel, () => {
            this.visible = false;
            this.$refs._component.$emit('close');
            this.$refs._component.$emit('cancel');
            dialogInstance.$destroy();
          });
        },
        handleOk() {
          handle(this.$refs._component.onOK || this.$refs._component.onOk, () => {
            this.visible = false;
            this.$refs._component.$emit('close');
            this.$refs._component.$emit('ok');
            dialogInstance.$destroy();
          });
        }
      },
      render: function(h) {
        const that = this;
        const modalModel = modalProps && modalProps.model;
        if (modalModel) {
          delete modalProps.model;
        }
        const ModalProps = {
          ...((modalModel && { model: modalModel }) || {}),
          attrs: { ...(modalProps.attrs || modalProps), visible: this.visible },
          on: {
            ...(modalProps.on || {}),
            ok: () => {
              that.handleOk();
            },
            cancel: () => {
              that.handleClose();
            }
          }
        };

        const componentModel = componentProps && componentProps.model;
        if (componentModel) {
          delete componentProps.model;
        }
        const ComponentProps = {
          ...((componentModel && { model: componentModel }) || {}),
          ref: '_component',
          attrs: { ...((componentProps && componentProps.attrs) || componentProps) },
          on: { ...((componentProps && componentProps.on) || componentProps) }
        };

        return h(Modal, ModalProps, [h(component, ComponentProps)]);
      }
    }).$mount(dialogDiv);
  }

  Object.defineProperty(Vue.prototype, '$dialog', {
    get: () => {
      return function() {
        // eslint-disable-next-line no-invalid-this
        dialog.apply(this, arguments);
      };
    }
  });
};
