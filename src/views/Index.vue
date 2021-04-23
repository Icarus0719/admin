<template>
  <div class="content-box sg-container">
    <AsideMenu
      :model="asideData"
      :collapse="isCollapse"
      :default-active="asideActivePath"
      :style="{ width: isCollapse ? '64px' : '220px' }"
    >
      <div class="aside-logo" v-if="!isCollapse">后台管理系统</div>
    </AsideMenu>
    <div class="sg-container is-vertical">
      <Header>
        <div
          slot="collapse"
          class="sg-font-s20 pointer"
          :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          @click="isCollapse = !isCollapse"
        ></div>
      </Header>
      <Breadcrumb :data="breadData"></Breadcrumb>
      <div class="main-box">
        <router-view class="content-main" />
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/TheHeader.vue";
import AsideMenu from "@/element-ui-libs/sg-aside-menu.vue";
import Breadcrumb from "@/element-ui-libs/sg-breadcrumb.vue";
import { superAdminPathList, changeLang } from "@/auth/routerTree.js";
import { getRootNodesByTraversUp } from "@/utils/util.about.js";
export default {
  components: {
    Header,
    AsideMenu,
    Breadcrumb,
  },
  data () {
    return {
      asideData: superAdminPathList,
      isCollapse: false,
      breadData: [],
      asideActivePath: "",
    };
  },
  watch: {
    $route (to) {
      this.initTreeData(to);
    },
    "$i18n.locale" (newVal) {
      if (newVal) {
        this.asideData = changeLang();
        this.initTreeData(this.$route);
      }
    },
  },
  mounted () {
    this.initTreeData(this.$route);
  },
  methods: {
    initTreeData (route) {
      const treeData = getRootNodesByTraversUp(
        this.asideData,
        (e) => e.path === route.path
      );
      if (!treeData.length) return;
      this.breadData = treeData;
      this.asideActivePath = treeData.slice(-1)[0].path;
    },
  },
};
</script>
<style lang="less">
.content-box {
  height: 100%;
}
.main-box {
  flex: 1;
  padding: 20px;
  background: #f0f2f5;
  overflow: auto;
}
.content-main {
  height: auto;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.aside-logo {
  height: 64px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
}
</style>
