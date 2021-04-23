import Vue from 'vue';
import VueI18n from 'vue-i18n';
import elementJaLocale from 'element-ui/lib/locale/lang/ja';
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN';
import ElementLocale from 'element-ui/lib/locale';
import getLocale from './getLocale';
Vue.use(VueI18n);

const messages = {
  zh: {
    ...getLocale(0),
    ...elementZhLocale,
  },
  ja: {
    ...getLocale(1),
    ...elementJaLocale,
  },
};
// Create VueI18n instance with options
const lang = localStorage.getItem('custom_language');

const i18n = new VueI18n({
  locale: lang ? lang : 'zh', // set locale
  messages, // set locale messages
});
ElementLocale.i18n((key, value) => i18n.t(key, value));

export default i18n;
