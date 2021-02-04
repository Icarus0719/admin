<template>
  <el-tree
    ref="tree"
    :data="data"
    :props="props"
    :highlight-current="highlightCurrent"
    :node-key="nodeKey"
    :accordion="accordion"
    :default-checked-keys="defaultCheckedKeys"
    :show-checkbox="showCheckbox"
    :expand-on-click-node="expandOnClickNode"
    :default-expand-all="defaultExpandAll"
    :render-content="renderContent"
    :filter-node-method="filterNode"
    :current-node-key="currentNodeKey"
    @node-click="handleNodeClick"
    @check="handleCheck"
  >
  </el-tree>
</template>
<script>
import {
  getAllCheckedNodesByTraversDown,
  getRootNodesByTraversUp,
  newSetArrayByKey,
} from "@/utils/util.about.js";
export default {
  props: {
    props: {
      type: Object, //配置选项
      default () {
        return {
          children: "children",
          label: "label"
        };
      },
    },
    model: {
      type: Array, //树形结构数据，形如[{node:{...},children:[]},...]
      default () {
        return [];
      },
    },
    showCheckbox: {
      type: Boolean, //节点是否可选
      default: false,
    },
    highlightCurrent: {
      type: Boolean, //是否高亮当前选中节点
      default: true,
    },
    accordion: {
      type: Boolean, //是否每次只打开一个同级
      default: true,
    },
    expandOnClickNode: {
      type: Boolean, //是否在点击节点的时候展开或者收缩节点
      default: true,
    },
    defaultExpandAll: {
      type: Boolean, //是否默认展开所有节点
      default: true,
    },
    nodeKey: {
      type: String, //节点唯一性标识
      required: true
    },
    currentNodeKey: [String, Number],//当前选中的节点key值
    renderContent: Function, //树节点的内容区的渲染函数
  },
  data () {
    return {
      data: [],
      defaultCheckedKeys: [],
    };
  },
  watch: {
    model (newVal) {
      this.data = newVal || [];
      this.setNodeKey();
      this.setCheckedKeys();
    },
  },
  mounted () { },
  methods: {
    // 为node设置唯一key字段
    setNodeKey () {
      const self = this;
      trverse(this.data);
      function trverse (tree) {
        for (let e of tree) {
          if (e[self.nodeKey]) return;
          e[self.nodeKey] = e.node[self.nodeKey];
          if (e.children.length) {
            trverse(e.children);
          }
        }
      }
    },
    // 设置选中节点
    setCheckedKeys () {
      if (!this.showCheckbox) return;
      this.defaultCheckedKeys = [];
      // 所有选中的节点
      const isCheckedNodes = getAllCheckedNodesByTraversDown(
        this.data,
        (e) => e.node.isCheck === 1
      );
      // 所有未选中的节点
      const isUnCheckedNodes = getAllCheckedNodesByTraversDown(
        this.data,
        (e) => e.node.isCheck === 0
      );
      // 未选中节点的父节点
      let oldRootNodes = [];
      isUnCheckedNodes.forEach((e) => {
        let nodes = getRootNodesByTraversUp(
          this.data,
          (f) => f.node[this.nodeKey] === e[this.nodeKey]
        );
        nodes.pop();
        oldRootNodes = oldRootNodes.concat(nodes);
      });
      let newRootNodes = newSetArrayByKey(oldRootNodes, "privId");
      //比较选中节点中是否存在未选中的父节点，去除这些半叶节点
      for (let i = isCheckedNodes.length - 1; i >= 0; i--) {
        let e = isCheckedNodes[i];
        if (
          newRootNodes.some((f) => {
            return e[this.nodeKey] === f[this.nodeKey];
          })
        ) {
          isCheckedNodes.splice(i, 1);
        }
      }
      // 设置节点的选中
      isCheckedNodes.forEach((e) => {
        this.defaultCheckedKeys.push(e.node[this.nodeKey]);
      });
    },
    // 点击节点事件
    handleNodeClick (data) {
      this.$emit("node-click", data);
    },
    handleCheck (data, checked) {
      // 获取选中节点+半选节点
      const checkedNodes = checked.checkedNodes.concat(
        checked.halfCheckedNodes
      );
      this.$emit("check", checkedNodes);
    },
    filterNode (value, data) {
      if (!value) return true;
      return data[this.props.label].indexOf(value) !== -1;
    },
    filter (val) {
      console.log(val)
      this.$refs.tree.filter(val);
    },
    _setCurrentKey (key) {
      this.$refs.tree.setCurrentKey(key);
    },
  },
};
</script>
