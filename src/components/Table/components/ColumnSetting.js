import { genColumnKey } from '../util';

export default {
  name: 'ColumnSetting',
  props: {
    columns: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      indeterminate: true,
      checkAll: false,
      checkedList: this.columns.map(({ key, dataIndex }, index) =>
        genColumnKey(key, dataIndex, index)
      )
    };
  },
  methods: {
    setColumns(columnMap) {
      Object.assign(this, columnMap);
      this.$emit('change', this.checkedList);
    },
    resetAllChange() {
      const checkedList = this.columns.map(({ key, dataIndex }, index) =>
        genColumnKey(key, dataIndex, index)
      );
      this.setColumns({
        checkedList,
        indeterminate: false,
        checkAll: true
      });
    },
    onCheckAllChange(e) {
      let columns = [];
      if (e.target.checked) {
        columns = this.columns;
      } else {
        columns = this.columns.filter(({ defaultChecked }) => !!defaultChecked);
      }

      const checkedList = columns.map(({ key, dataIndex }, index) =>
        genColumnKey(key, dataIndex, index)
      );
      this.setColumns({
        checkedList: checkedList,
        indeterminate: false,
        checkAll: e.target.checked
      });
    },
    onChange(checkedList) {
      this.setColumns({
        indeterminate: !!checkedList.length && checkedList.length < this.columns.length,
        checkAll: checkedList.length === this.columns.length
      });
    }
  },
  render() {
    const className = 'ant-pro-table-column-setting';
    const options = this.columns.map(({ key, dataIndex, title, defaultChecked }, index) => {
      return {
        disabled: defaultChecked,
        label: title,
        value: genColumnKey(key, dataIndex, index)
      };
    });
    const { indeterminate, checkAll } = this;

    return (
      <a-popover
        overlayClassName={`${className}-overlay`}
        trigger="click"
        arrowPointAtCenter
        placement="bottomRight"
      >
        <span class="ant-pro-table-toolbar-item-icon">
          <a-icon type="setting" />
        </span>
        <div class={`${className}-title`} slot="title">
          <a-checkbox
            indeterminate={indeterminate}
            checked={checkAll}
            onChange={this.onCheckAllChange}
          >
            列展示
          </a-checkbox>
          <a onClick={this.resetAllChange}>重置</a>
        </div>
        <a-checkbox-group
          slot="content"
          vModel={this.checkedList}
          options={options}
          class={`${className}`}
          onChange={this.onChange}
        />
      </a-popover>
    );
  }
};
