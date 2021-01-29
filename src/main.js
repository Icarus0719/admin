import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'
import VueI18n from 'vue-i18n'
import i18n from '@/lang'
import '@/assets/css/libs/index.less'
import '@/assets/css/theme/index.less'
import '@/assets/css/business/common.less'

import '@/assets/js/directive.js'
import UserInfo from '@/assets/js/userInfo.js'
import md5 from 'js-md5'
import { eventBus } from '@/assets/js/eventBus.js'

Vue.use(VueI18n)
Vue.use(Element)
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.prototype.$user = new UserInfo()
Vue.prototype.$eventbus = eventBus
Vue.prototype.$md5 = md5
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
