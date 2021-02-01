<template>
  <el-menu
    :default-active="activePath"
    router
    :collapse="collapse"
    :collapse-transition="false"
    :unique-opened="uniqueOpened"
    :default-openeds="
      model.map((e, i) => {
        return String(i);
      })
    "
    background-color="#001529"
    active-text-color="#fff"
    text-color="#A6ADB4"
    class="sg-aside"
  >
    <slot></slot>
    <template v-for="(item, index) in model">
      <el-submenu
        v-if="item.children.length && !item.asideFold"
        :key="index"
        :index="`${index}`"
        v-allow="item.path"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item
          v-for="innerItem in item.children"
          :key="innerItem.path"
          :index="innerItem.path"
          v-allow="innerItem.path"
        >
          <span>&middot;</span>
          <span class="sg-box-ml10" slot="title">{{ innerItem.title }}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :key="index" :index="item.path" v-allow="item.path">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script>
export default {
  props: {
    collapse: Boolean,//是否折叠收起
    uniqueOpened: {
      type: Boolean, //是否只保持一个子菜单的展开
      default: true,
    },
    model: {
      type: Array, //路由对象树节点值,数据结构参见auth模块的routerTree
      default () {
        return [];
      },
    },
    defaultActive: String, //当前激活菜单的index
  },
  data () {
    return {
      activePath: this.$route.path,
    };
  },
  watch: {
    defaultActive (newVal) {
      if (newVal) {
        this.activePath = newVal;
      }
    },
  },
  mounted () { },
};
</script>