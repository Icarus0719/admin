import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'
import '@/assets/css/iconfont/iconfont.css'
import '@/assets/css/libs/index.less'
import '@/assets/css/theme/index.less'
import '@/assets/css/business/common.less'

import '@/assets/js/myDirective.js'
import UserInfo from '@/assets/js/userInfo.js'
import md5 from 'js-md5'
import {
  eventBus
} from '@/assets/js/eventBus.js'
Vue.use(Element)
Vue.prototype.$user = new UserInfo();
Vue.prototype.$eventbus = eventBus;
Vue.prototype.$md5 = md5;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
