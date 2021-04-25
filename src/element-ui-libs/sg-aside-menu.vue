<template>
  <el-menu
    :default-active="defaultActive"
    router
    :collapse="collapse"
    :collapse-transition="false"
    :unique-opened="uniqueOpened"
    background-color="#001529"
    active-text-color="#fff"
    text-color="#A6ADB4"
  >
    <slot></slot>
    <sub-menu v-for="item in model" :model="item" :key="item.url"> </sub-menu>
  </el-menu>
</template>
<script>
import SubMenu from './sg-aside-sub-menu.vue';
export default {
  components: { SubMenu },
  props: {
    collapse: Boolean, // 是否水平折叠收起菜单
    uniqueOpened: {
      type: Boolean, // 是否只保持一个子菜单的展开
      default: false,
    },
    model: {
      type: Array,
      default() {
        return [];
      },
    },
    defaultActive: String, // 当前激活菜单的 index
  },
};
</script>