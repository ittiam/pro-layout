import './index.less';

import PropTypes from 'ant-design-vue/es/_util/vue-types';

const IFrameContent = {
  name: 'IFrameContent',
  functional: true,
  props: {
    src: PropTypes.string
  },
  render(h, content) {
    const { src } = content.props;

    const classNames = {
      'ant-pro-iframe-content': true
    };

    return <iframe class={classNames} src={src} frameborder="0"></iframe>;
  }
};

export default IFrameContent;
