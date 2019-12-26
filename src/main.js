/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Vue from 'vue'
import App from './App.vue'
import request from './utils/request'
import router from './router/index'
import './assets/css/common.css'
import './assets/font_1300707_w58sw6y12uk/iconfont.css'
import './assets/font_jx305aumbc/iconfont.css'
import store from './store'
import 'amfe-flexible'
import 'vant/lib/button/style';
import './plugins/index'
import Share from 'vue-social-share'
import 'vue-social-share/dist/client.css';
import {
  Tab, Tabs, Tabbar, TabbarItem, 
  Collapse, CollapseItem,
  NavBar, Icon, Cell, CellGroup, Button, 
  AddressEdit, Dialog, Checkbox, CheckboxGroup,
  Stepper, Rate, Field, Popup, Area ,Toast ,
  Uploader ,Picker ,DatetimePicker, Swipe, SwipeItem,
  List, ActionSheet, Overlay, PasswordInput, NumberKeyboard,
  DropdownMenu, DropdownItem, Loading,
  CountDown, RadioGroup, Radio, Search } from 'vant';

import 'swiper/dist/css/swiper.min.css';
// 全局配置 lrz，上传图片压缩，不要删了
import lrz from 'lrz';
// 一键复制的依赖包
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

// import VConsole from 'vconsole';

// if (process.env.NODE_ENV !== 'production') {
//   new VConsole()
// }
// 全局注册
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Collapse);
Vue.use(Share)
Vue.use(ActionSheet);
Vue.use(CollapseItem);
Vue.use(Swipe).use(SwipeItem);
Vue.use(List);
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Button);
Vue.use(AddressEdit);
Vue.use(Dialog);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Stepper);
Vue.use(Rate);
Vue.use(Field);
Vue.use(Popup);
Vue.use(Area);
Vue.use(Toast);
Vue.use(Uploader);
Vue.use(Picker);
Vue.use(Uploader);
Vue.use(DatetimePicker);
Vue.use(DropdownMenu).use(DropdownItem); 
Vue.use(Overlay);
Vue.use(PasswordInput).use(NumberKeyboard);
Vue.use(CountDown);
Vue.use(Loading);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Search);

require('./mock')

Object.defineProperty(Vue.prototype, '$request', { value: request })
Vue.config.productionTip = false
var qs = require('querystringify');
Vue.prototype.qs = qs;
// 注册工具库至 Vue 原型
Object.defineProperty(Vue.prototype, '$request', { value: request });
var vue = new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
export default vue
