import { empty as EmptyIcon } from '@/core/icons';
import './index.less';

const Empty = {
  name: 'VcEmpty',

  props: {
    description: {
      type: String,
      default: '暂无数据'
    }
  },

  components: {
    EmptyIcon
  },

  render() {
    const description = this.description;
    return (
      <div class="vc-empty">
        <div class="vc-empty-image">
          <empty-icon />
          {description && <p class="vc-empty-description">{description}</p>}
        </div>
      </div>
    );
  }
};

Empty.install = function(Vue) {
  Vue.component(Empty.name, Empty);
};

export default Empty;
