import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementJaLocale from 'element-ui/lib/locale/lang/ja'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import jaLocale from './ja'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
  ja: {
    ...jaLocale,
    ...elementJaLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}
const lang = localStorage.getItem('erp_language')
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: lang ? lang : 'ja', // set locale
  messages // set locale messages
})

export default i18n
