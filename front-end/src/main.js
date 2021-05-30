import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import api from "./apis"
import ElementUI from "element-ui";
require('./mock')
import 'element-ui/lib/theme-chalk/index.css'; // element-ui 样式
import "nprogress/nprogress.css"; // Progress 进度条样式

Vue.prototype.$api = api
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small' })
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
