<template>
  <ul class="sg-header admin-header">
    <slot name="collapse"></slot>
    <li class="flex-space"></li>
    <li class="user-item">
      <ChangeLang></ChangeLang>
      <span class="el-icon-user sg-box-mr10"></span>
      <Dropdown :value="dropdownValue" :data="dropdownData" class="sg-box-mr10">
        <div class="el-icon-edit dropdown-edit" @click="toPage">&nbsp;{{ $t("User.edit") }}</div>
      </Dropdown>
      <span class="el-icon-switch-button pointer" @click="dialogVisible = true"></span>
    </li>

    <!-- 退出弹窗 -->
    <Dialog title="确定要退出登录吗？" :visible.sync="dialogVisible" @confirm="confirmDialog"></Dialog>
  </ul>
</template>
<script>
import * as API from "@/api/api.account.js";
import Dialog from "@/libs/sg-dialog.vue";
import Dropdown from "@/libs/sg-dropdown.vue";
import ChangeLang from "@/components/ChangeLang.vue";

export default {
  components: { Dialog, Dropdown, ChangeLang },
  data () {
    return {
      dialogVisible: false,
      dropdownData: [],
      dropdownValue: "",
    };
  },
  mounted () {
    this.userInfo = this.$user.getInfo();
    this.setDropdownData();
  },
  methods: {
    setDropdownData () {
      const showLabels = [
        { text: "用户：", keyName: "name" },
        { text: "公司：", keyName: "deptName" },
        { text: "电话：", keyName: "phone" },
        { text: "邮箱：", keyName: "email" },
      ];
      showLabels.forEach((e) => {
        const item = `${e.text}${this.userInfo[e.keyName] || '--'}`;
        this.dropdownData.push({ value: item });
      });
      this.dropdownValue = this.userInfo.name;
    },
    async confirmDialog () {
      await API.logout();
      this.$user.exitLogin();
    },
    toPage () {
      console.log("edit")
    },
  },
};
</script>
<style lang="less">
.admin-header {
  padding: 0 24px;
  .header-title {
    height: 26px;
    line-height: 26px;
    font-size: 18px;
    padding-left: 16px;
    font-weight: 700;
    color: #252525;
  }
  .user-item {
    display: flex;
    align-items: center;
  }
}
.dropdown-edit {
  line-height: 26px;
  padding: 0 20px;
  color: #338aff;
  cursor: pointer;
}
</style>