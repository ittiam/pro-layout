import './index.less';

import Steps from './Steps';
import Step from './Step';

Steps.install = function(Vue) {
  Vue.component(Step.name, Step);
  Vue.component(Steps.name, Steps);
};

export default Steps;
