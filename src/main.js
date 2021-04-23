import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/element-ui'
import '@/assets/css/custom-base/index.less';
import '@/assets/css/business/common.less';
import i18n from'@/element-ui-lang';

import '@/assets/js/directive.js';
import UserInfo from '@/assets/js/userInfo.js';
import md5 from 'js-md5';
import { eventBus } from '@/assets/js/eventBus.js';

// 非生产环境，适配mockjs模拟
if (process.env.NODE_ENV !== 'production') {
  require('@/mock');
}
Vue.prototype.$user = new UserInfo();
Vue.prototype.$eventbus = eventBus;
Vue.prototype.$md5 = md5;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
