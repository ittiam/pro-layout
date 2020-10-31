import './icons';

import FormGenerator from './core/Generator';

/* istanbul ignore next */
FormGenerator.install = function(Vue) {
  Vue.component(FormGenerator.name, FormGenerator);
};

export default FormGenerator;
