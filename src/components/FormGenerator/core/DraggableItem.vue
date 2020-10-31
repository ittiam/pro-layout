<script>
/* eslint-disable max-params */
import draggable from 'vuedraggable';
import { render } from 'antv-form-gen-parser';
import { deepClone } from '../utils/index';

const tagMappers = {
  'el-input': 'a-input',
  'el-input-number': 'a-input-number',
  'el-select': 'a-select',
  'el-radio-group': 'a-radio-group',
  'el-checkbox-group': 'a-checkbox-group',
  'el-cascader': 'a-cascader',
  'el-switch': 'a-switch',
  'el-slider': 'a-slider',
  'el-upload': 'a-upload',
  'el-button': 'a-button',
  'el-card': 'a-card',
  'el-table': 'vc-table',
  'el-rate': 'a-rate',
  'el-color-picker': 'vc-color-picker',
  'el-time-picker': 'a-time-picker',
  'el-date-picker': 'a-date-picker',
  'a-year-picker': 'vc-year-picker'
};

const dateModes = ['week', 'month', 'year'];
const dateRangeModes = ['daterange', 'monthrange', 'datetimerange'];

function initFormTag(cur) {
  const config = cur.__config__;

  if (config.componentName) {
    config.tag = config.componentName;
  }

  if (config.tag === 'el-input' && cur.type === 'textarea') {
    config.tag = 'a-textarea';
  }

  if (config.tag === 'el-input' && cur['show-password']) {
    config.tag = 'a-input-password';
  }

  if (config.tag === 'el-date-picker' && dateModes.includes(cur.type)) {
    config.tag = `a-${cur.type}-picker`;
  }

  if (config.tag === 'el-time-picker' && cur['is-range']) {
    config.tag = 'a-date-picker';
  }

  if (config.tag === 'el-date-picker' && dateRangeModes.includes(cur.type)) {
    config.tag = 'a-range-picker';
  }

  config.tag = tagMappers[config.tag] ? tagMappers[config.tag] : config.tag;
}

function ajax(config, options = {}, $axios) {
  let { url, method } = config;

  let params = {
    method,
    url,
    ...options
  };

  return $axios(params).then(res => res.data);
}

function renderTable(h, scheme) {
  let cloneScheme = deepClone(scheme);
  let config = cloneScheme.__config__;
  let data = cloneScheme.data;
  let { children } = config;

  let columns = children.map(item => {
    return {
      title: item.label,
      dataIndex: item.prop,
      key: item.prop
    };
  });

  cloneScheme.dataSource = data;
  cloneScheme.columns = columns;
  cloneScheme.rowKey = config.rowKey;
  cloneScheme.data = config.url
    ? parameter => {
        let params = { current: parameter.pageNo, size: parameter.pageSize };
        let prop = 'params';
        if (config.method === 'post') {
          prop = 'data';
        }

        return ajax(
          config,
          {
            [prop]: params
          },
          this.axios
        );
      }
    : null;
  cloneScheme.dataKeys = {
    current: config.currentKey,
    total: config.totalKey,
    records: config.dataKey
  };
  cloneScheme.canResize = false;

  return <render conf={cloneScheme} />;
}

const components = {
  itemBtns(h, currentItem, index, list) {
    const { copyItem, deleteItem } = this.$listeners;
    return [
      <span
        class="drawing-item-copy"
        title="复制"
        onClick={event => {
          copyItem(currentItem, list);
          event.stopPropagation();
        }}
      >
        <a-icon type="copy" />
      </span>,
      <span
        class="drawing-item-delete"
        title="删除"
        onClick={event => {
          deleteItem(index, list);
          event.stopPropagation();
        }}
      >
        <a-icon type="delete" />
      </span>
    ];
  }
};
const layouts = {
  colFormItem(h, currentItem, index, list) {
    const { activeItem } = this.$listeners;
    const config = currentItem.__config__;
    const child = renderChildren.apply(this, arguments);
    let className =
      this.activeId === config.formId ? 'drawing-item active-from-item' : 'drawing-item';
    if (this.formConf.unFocusedComponentBorder) className += ' unfocus-bordered';
    let labelWidth = config.labelWidth || this.formConf.labelWidth;
    labelWidth = labelWidth ? `${labelWidth}px` : null;

    if (config.showLabel === false) labelWidth = '0';
    let labelCol = {
      style: { width: labelWidth }
    };
    let element = null;
    if (config.tag === 'vc-table') {
      element = renderTable.call(this, h, currentItem);
    } else {
      element = (
        <render
          key={config.renderKey}
          conf={currentItem}
          onInput={event => {
            this.$set(config, 'defaultValue', event);
          }}
        >
          {child}
        </render>
      );
    }

    return (
      <a-col
        span={config.span}
        class={className}
        nativeOnClick={event => {
          activeItem(currentItem);
          event.stopPropagation();
        }}
      >
        <a-form-model-item
          label-col={labelCol}
          label={config.showLabel ? config.label : ''}
          required={config.required}
        >
          {element}
        </a-form-model-item>
        {components.itemBtns.apply(this, arguments)}
      </a-col>
    );
  },
  rowFormItem(h, currentItem, index, list) {
    const { activeItem } = this.$listeners;
    const config = currentItem.__config__;
    const className =
      this.activeId === config.formId ? 'drawing-row-item active-from-item' : 'drawing-row-item';
    let child = renderChildren.apply(this, arguments);
    if (currentItem.type === 'flex') {
      child = (
        <a-row type={currentItem.type} justify={currentItem.justify} align={currentItem.align}>
          {child}
        </a-row>
      );
    }
    return (
      <a-col span={config.span}>
        <a-row
          gutter={config.gutter}
          class={className}
          nativeOnClick={event => {
            activeItem(currentItem);
            event.stopPropagation();
          }}
        >
          <span class="component-name">{config.componentName}</span>
          <draggable
            list={config.children || []}
            animation={340}
            group="componentsGroup"
            class="drag-wrapper"
          >
            {child}
          </draggable>
          {components.itemBtns.apply(this, arguments)}
        </a-row>
      </a-col>
    );
  },
  raw(h, currentItem, index, list) {
    const config = currentItem.__config__;
    const child = renderChildren.apply(this, arguments);
    return (
      <render
        key={config.renderKey}
        conf={currentItem}
        onInput={event => {
          this.$set(config, 'defaultValue', event);
        }}
      >
        {child}
      </render>
    );
  }
};

function renderChildren(h, currentItem, index, list) {
  const config = currentItem.__config__;
  if (!Array.isArray(config.children)) return null;
  return config.children.map((el, i) => {
    const layout = layouts[el.__config__.layout];
    initFormTag(el);

    if (layout) {
      return layout.call(this, h, el, i, config.children);
    }
    return layoutIsNotFound.call(this);
  });
}

function layoutIsNotFound() {
  throw new Error(`没有与${this.currentItem.__config__.layout}匹配的layout`);
}

export default {
  components: {
    render,
    draggable
  },
  props: ['current', 'index', 'drawingList', 'activeId', 'formConf'],
  computed: {
    currentItem() {
      let current = deepClone(this.current);
      initFormTag(current);

      return current;
    }
  },
  render(h) {
    const layout = layouts[this.currentItem.__config__.layout];
    // console.log(layout);
    if (layout) {
      return layout.call(this, h, this.currentItem, this.index, this.drawingList);
    }
    return layoutIsNotFound.call(this);
  }
};
</script>
