import Vue from 'vue';
import VueI18n from 'vue-i18n';
import elementJaLocale from 'element-ui/lib/locale/lang/ja';
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN';
import ElementLocale from 'element-ui/lib/locale';
import jaLocale from './ja';
import zhLocale from './zh';

Vue.use(VueI18n);

const messages = {
  ja: {
    ...jaLocale,
    ...elementJaLocale,
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale,
  },
};
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'zh', // set locale
  messages, // set locale messages
});
ElementLocale.i18n((key, value) => i18n.t(key, value));
export default i18n;
