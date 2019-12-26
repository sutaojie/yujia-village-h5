import Vue from 'vue'
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
// 全局注册
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Collapse);
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
