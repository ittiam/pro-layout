import Vue from 'vue';
import confirm from './confirm';

// base library
import {
  ConfigProvider,
  Layout,
  Input,
  InputNumber,
  Button,
  Switch,
  Radio,
  Checkbox,
  Select,
  Cascader,
  Card,
  Form,
  FormModel,
  Row,
  Col,
  Modal,
  Table,
  Tabs,
  Icon,
  Badge,
  Popover,
  Pagination,
  Dropdown,
  List,
  Avatar,
  Breadcrumb,
  Rate,
  Steps,
  Spin,
  Slider,
  Menu,
  Drawer,
  Tooltip,
  Alert,
  Tag,
  Divider,
  DatePicker,
  TimePicker,
  Upload,
  Progress,
  Skeleton,
  Popconfirm,
  PageHeader,
  Result,
  Statistic,
  Descriptions,
  message,
  notification
} from 'ant-design-vue';

// ext library
import WpgDesign from 'wpg-design';
import VueCropper from 'vue-cropper';
import BaiduMap from '@/components/BaiduMap';
import Dialog from '@/components/Dialog';
import STable from '@/components/Table';
import TableSearch from '@/components/TableSearch';
import PageLoading from '@/components/PageLoading';
import MultiTab from '@/layouts/MultiTab/plugin';
import { VueAxios } from '@/utils/request';
import './directives/action';
import serverConfig from '@/config/server.config';

Vue.use(ConfigProvider);
Vue.use(Layout);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Button);
Vue.use(Switch);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(Select);
Vue.use(Cascader);
Vue.use(Card);
Vue.use(Form);
Vue.use(FormModel);
Vue.use(Row);
Vue.use(Col);
Vue.use(Modal);
Vue.use(Table);
Vue.use(Tabs);
Vue.use(Icon);
Vue.use(Badge);
Vue.use(Popover);
Vue.use(Pagination);
Vue.use(Dropdown);
Vue.use(List);
Vue.use(Avatar);
Vue.use(Breadcrumb);
Vue.use(Rate);
Vue.use(Steps);
Vue.use(Slider);
Vue.use(Spin);
Vue.use(Menu);
Vue.use(Drawer);
Vue.use(Tooltip);
Vue.use(Alert);
Vue.use(Tag);
Vue.use(Divider);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Skeleton);
Vue.use(Popconfirm);
Vue.use(PageHeader);
Vue.use(Result);
Vue.use(Statistic);
Vue.use(Descriptions);
Vue.use(BaiduMap, {
  ak: serverConfig.AK
});

Vue.prototype.$confirm = confirm;
Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;

Vue.use(WpgDesign);
Vue.use(Dialog); // this.$dialog func
Vue.use(STable);
Vue.use(TableSearch);
Vue.use(PageLoading);
Vue.use(VueCropper);
Vue.use(MultiTab);
Vue.use(VueAxios);

process.env.NODE_ENV !== 'production' && console.warn('[antd-pro] NOTICE: Antd use lazy-load.');
