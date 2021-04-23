<template>
  <el-dialog
    :custom-class="customClass"
    :title="title"
    :model-value="visible"
    :width="width"
    :show-close="showClose"
    :append-to-body="true"
    :close-on-click-modal="false"
    @close="dialogCancle"
  >
    <slot></slot>
    <template #footer v-if="showFooter">
      <el-button size="small" type="primary" @click="confirmDialog"
        >确定</el-button
      >
      <el-button size="small" @click="dialogCancle">取消</el-button>
    </template>
  </el-dialog>
</template>
<script>
export default {
  props: {
    customClass: String,
    title: String,
    visible: {
      type: Boolean,
      default: false,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    showFooter: {
      type: Boolean, //是否显示底部操作按钮
      default: false,
    },
    width: {
      type: String,
      default: '600px',
    },
  },
  emits: ['confirm', 'update:visible'],
  setup(props, { emit }) {
    const confirmDialog = () => {
      dialogCancle();
      emit('confirm');
    };
    const dialogCancle = () => {
      emit('update:visible', false);
    };

    return {
      confirmDialog,
      dialogCancle,
      props,
    };
  },
};
</script>

