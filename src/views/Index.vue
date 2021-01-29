<template>
  <div class="content-box sg-container">
    <AsideMenu
      :model="asideData"
      :collapse="isCollapse"
      :default-active="asideActivePath"
      class="sg-aside"
      :style="{ width: isCollapse ? '64px' : '220px', overflow: 'auto' }"
    >
      <div class="aside-logo" v-if="!isCollapse">后台管理系统</div>
    </AsideMenu>
    <div class="sg-container is-vertical">
      <Header>
        <div
          slot="collapse"
          class="sg-font-s20 pointer"
          :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          @click="collapseOpt"
        ></div>
      </Header>
      <Breadcrumb :model="breadData" v-if="showBread"></Breadcrumb>
      <div class="main-box">
        <router-view class="content-main" />
      </div>
    </div>
    <el-backtop target=".main-box"></el-backtop>
  </div>
</template>
<script>
import Header from "@/components/AdminHeader.vue";
import AsideMenu from "@/libs/sg-asideMenu.vue";
import Breadcrumb from "@/libs/sg-breadcrumb.vue";
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
      showBread: true,
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
    collapseOpt () {
      this.isCollapse = !this.isCollapse;
    },
    initTreeData (route) {
      // 对详情，事务审核，保证金审核页面做过滤
      let filters = [];
      if (
        filters.some((e) => {
          return route.path.indexOf(e) > -1;
        })
      ) {
        this.showBread = false;
      } else {
        this.showBread = true;
      }

      const treeData = getRootNodesByTraversUp(
        this.asideData,
        (e) => e.path === route.path
      );
      if (!treeData.length) return;
      this.breadData = treeData;
      if (
        treeData.length > 2 ||
        (treeData.slice(-2, -1)[0] && treeData.slice(-2, -1)[0].asideFold)
      ) {
        this.asideActivePath = treeData.slice(-2, -1)[0].path;
      } else {
        this.asideActivePath = treeData.slice(-1)[0].path;
      }
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
