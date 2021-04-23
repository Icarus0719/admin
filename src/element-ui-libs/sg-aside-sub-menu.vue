<template>
  <el-submenu
    v-if="model.children && model.children.length && !model.notRenderChildren"
    :index="model.path"
    v-allow="model.path"
  >
    <template slot="title">
      <i class="sg-menu-icon" :class="model.icon"></i>
      <span>{{ model.title }}</span>
    </template>
    <sub-menu v-for="item in model.children" :key="item.path" :model="item">
    </sub-menu>
  </el-submenu>
  <el-menu-item v-else :index="model.path" v-allow="model.path">
    <i class="sg-menu-icon" :class="model.icon"></i>
    <span>{{ model.title }}</span>
  </el-menu-item>
</template>
<script>
import SubMenu from './sg-aside-sub-menu.vue';

export default {
  components: { SubMenu },
  name: 'sub-menu',
  props: {
    model: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style module>
.sg-menu-icon {
  width: 18px;
}
</style>