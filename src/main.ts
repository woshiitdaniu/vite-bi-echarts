/*
 * @Description:
 * @Autor: Bingo
 * @Date: 2022-12-12 09:48:36
 * @LastEditors: Bingo
 * @LastEditTime: 2024-04-29 14:55:58
 */
import { createApp } from "vue";
import { createPinia } from 'pinia'
import { Watermark,Popup,Cell,Dialog,Sticky ,PullRefresh,Backtop,Toast,Collapse, CollapseItem,Tour,Popover,Radio, RadioGroup,DatePicker,Checkbox, CheckboxGroup,Overlay       } from '@nutui/nutui';
import "@nutui/nutui/dist/style.css";
import "./style.less";
import './utils/rem'
import App from "./App.vue";
import router from "./route";

const app = createApp(App);
app.use(router)
// pinia 类似vuex 用于深层组件交互
app.use(createPinia())
// 下拉刷新组件
app.use(PullRefresh)
// 回到顶部
app.use(Backtop)
// 弹出框
app.use(Toast)
// 折叠面板
app.use(Collapse)
app.use(CollapseItem)
// 引导
app.use(Tour)
// 气泡弹出框
app.use(Popover)
// 单选按钮
app.use(Radio)
app.use(RadioGroup)
// 时间选择器
app.use(DatePicker)
// 多选
app.use(Checkbox)
app.use(CheckboxGroup)
// 吸顶
app.use(Sticky)
// 对话框
app.use(Dialog)
app.use(Overlay)
app.use(Cell)
app.use(Popup)
app.use(Watermark)
app.mount("#app");
