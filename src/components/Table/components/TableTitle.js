import { isFunction } from '../util';

export default {
  name: 'TableTitle',

  props: {
    helpMessage: {
      type: [String, Array]
    },
    title: {
      type: [Function, String]
    },
    selectedRows: {
      type: Array
    }
  },

  render() {
    const prefixCls = `ant-pro-table-title`;

    const { title, selectedRows } = this;
    let tit = title;
    if (isFunction(title)) {
      tit = title({
        selectedRows: selectedRows
      });
    }
    return (
      <div class={prefixCls}>
        {tit && <span class={`${prefixCls}__title`}>{tit}</span>}
        {!tit && <span>&nbsp;</span>}
        <div class={`${prefixCls}__toolbar`}>{this.$slots.default}</div>
      </div>
    );
  }
};
