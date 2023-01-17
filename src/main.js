import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import reset from "./assets/css/reset.css"
import rem from './assets/js/rem'


// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
Vue.use(VXETable)

// vue-particles
import VueParticles from "vue-particles";
Vue.use(VueParticles)

// echarts
Vue.prototype.$echarts = window.echarts

//dataV
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

// 颜色选择器
import vcolorpicker from 'vcolorpicker'
Vue.use(vcolorpicker)

// 在线代码编辑器
import VueCodemirror from "vue-codemirror";
Vue.use(VueCodemirror)
import 'codemirror/lib/codemirror.css'

import $ from 'jquery'
import WebUploader from 'webuploader'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
