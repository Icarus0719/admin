<template>
  <el-dialog
    :custom-class="customClass"
    :title="title"
    :visible="value"
    :width="width"
    :show-close="showClose"
    :append-to-body="true"
    :close-on-click-modal="false"
    @close="dialogCancle"
  >
    <slot></slot>
    <template slot="footer" v-if="showFooter">
      <el-button size="small" type="primary" @click="confirmDialog" v-oneClick>
        确定
      </el-button>
      <el-button size="small" @click="dialogCancle">取消</el-button>
    </template>
  </el-dialog>
</template>
<script>
export default {
  model: {
    event: 'cancel'
  },
  props: {
    customClass: String,
    title: String,
    value: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean, //是否显示底部操作按钮
      default: true
    },
    width: {
      type: String,
      default: '400px'
    }
  },
  data() {
    return {}
  },
  methods: {
    confirmDialog() {
      this.dialogCancle()
      this.$emit('confirm')
    },
    dialogCancle() {
      this.$emit('cancel', false)
    }
  }
}
</script>