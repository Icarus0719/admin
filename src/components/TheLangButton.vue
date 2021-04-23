<template>
  <span class="language-btn" @click="changeLangOpt($i18n.locale === 'zh')">
    {{ $i18n.locale === 'zh' ? '中文' : '日本語' }}
  </span>
</template>
<script>
import i18n from '@/element-ui-lang';

export default {
  methods: {
    changeLangOpt(isZh) {
      this.$i18n.locale = isZh ? 'ja' : 'zh';
      i18n.locale = isZh ? 'ja' : 'zh';
      localStorage.setItem('custom_language', i18n.locale);
    },
  },
};
</script>
<style lang="less" scoped>
.language-btn {
  cursor: pointer;
  margin: 0 20px;
  line-height: 64px;
  color: #67c23a;
}
</style>