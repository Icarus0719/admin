<template>
  <el-tree
    ref="tree"
    :data="value"
    :props="props"
    :highlight-current="highlightCurrent"
    :node-key="nodeKey"
    :accordion="accordion"
    :default-checked-keys="defaultCheckedKeys"
    :show-checkbox="showCheckbox"
    :expand-on-click-node="expandOnClickNode"
    :default-expand-all="defaultExpandAll"
    :render-content="renderContent"
    :filter-node-method="filterNodeMethod"
    :current-node-key="currentNodeKey"
    @node-click="handleNodeClick"
    @check="handleCheck"
  >
  </el-tree>
</template>
<script>
export default {
  props: {
    props: {
      type: Object, //配置选项
      default() {
        return {
          children: 'children',
          label: 'label'
        }
      }
    },
    value: {
      type: Array, //树形结构数据，形如[{...{},children:[]},...]
      default() {
        return []
      }
    },
    showCheckbox: {
      type: Boolean, //节点是否可选
      default: false
    },
    highlightCurrent: {
      type: Boolean, //是否高亮当前选中节点
      default: true
    },
    accordion: {
      type: Boolean, //是否每次只打开一个同级
      default: true
    },
    expandOnClickNode: {
      type: Boolean, //是否在点击节点的时候展开或者收缩节点
      default: true
    },
    defaultExpandAll: {
      type: Boolean, //是否默认展开所有节点
      default: true
    },
    nodeKey: {
      type: String, //节点唯一性标识
      required: true
    },
    currentNodeKey: [String, Number], //当前选中的节点key值
    renderContent: Function //树节点的内容区的渲染函数
  },
  data() {
    return {
      defaultCheckedKeys: []
    }
  },
  mounted() {
    this._setCheckedNodes()
  },
  methods: {
    _setCheckedNodes() {
      const hasCheckedNodes = this._getAllNodesByFilterFunc(
        this.value,
        (e) => e.isCheck === 1
      )
      const hasCheckedkeys = hasCheckedNodes.map((e) => {
        return e[this.nodeKey]
      })
      this.$refs.tree.setCheckedKeys(hasCheckedkeys)
    },
    // 获取所有符合条件的节点
    _getAllNodesByFilterFunc(treeData, callback) {
      function traverse(tree, func, checkedNodes = []) {
        if (Object.prototype.toString.call(tree) !== '[object Array]')
          return false
        if (typeof func !== 'function') return false
        for (let i = 0; i < tree.length; i++) {
          let node = tree[i]
          if (func(node)) {
            checkedNodes.push(node)
          }
          if (node.children && node.children.length) {
            traverse(node.children, func, checkedNodes)
          }
        }
        return checkedNodes
      }
      return traverse(treeData, callback)
    },
    // 点击节点事件
    handleNodeClick(data) {
      this.$emit('node-click', data)
    },
    handleCheck(data, checked) {
      // 获取选中节点+半选节点
      const checkedNodes = checked.checkedNodes.concat(checked.halfCheckedNodes)
      this.$emit('check', checkedNodes)
    },
    filterNodeMethod(value, data) {
      if (!value) return true
      return data[this.props.label].toLocaleLowerCase().indexOf(value) !== -1
    },
    filter(val) {
      this.$refs.tree.filter(val.toLocaleLowerCase())
    },
    setCurrentKey(key) {
      this.$refs.tree.setCurrentKey(key)
    }
  }
}
</script>
