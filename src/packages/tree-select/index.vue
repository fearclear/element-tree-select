<template>
  <div class="wrap">
    <el-select
      ref="select"
      :id="id"
      :name="name"
      :auto-complete="autocomplete"
      :automatic-dropdown="automaticDropdown"
      :multiple="multiple"
      :filterable="filterable"
      :value="selectData.label"
      :popper-append-to-body="false"
      :size="size"
      :disabled="disabled"
      :clearable="clearable"
      :allow-create="allowCreate"
      :loading="loading"
      :popper-class="popperClass"
      :remote="remote"
      :loading-text="loadingText"
      :no-match-text="noMatchText"
      :no-data-text="noDataText"
      :remote-method="remoteMethod"
      :filter-method="filterMethod"
      :multiple-limit="multipleLimit"
      :placeholder="placeholder"
      :default-first-option="defaultFirstOption"
      :reserve-keyword="reserveKeyword"
      :value-key="valueKey"
      :collapse-tags="collapseTags"
      @visible-change="visibleChange"
      @remove-tag="removeTag"
    >
      <el-popover
        slot="empty"
        ref="popover"
        v-model="popoverVisible"
        placement="bottom"
        popper-class="el-tree-select-popover"
        :trigger="trigger"
        :open-delay="openDelay"
        :close-delay="closeDelay"
        :title="title"
        :content="content"
        :reference="reference"
        :popperClass="popperClass"
        :visibleArrow="visibleArrow"
        :arrowOffset="arrowOffset"
        :transition="transition"
        :tabindex="tabindex"
        :visible-arrow="false"
        :width="width"
        :style="`left: ${left}`"
        :disabled="disabled"
        @show="resize"
      >
        <el-tree
          ref="tree"
          :data="data"
          :empty-text="emptyText"
          :redner-after-expand="renderAfterExpand"
          :check-strictly="checkStrictly"
          :show-checkbox="multiple"
          :node-key="nodeKey"
          :default-expanded-keys="defaultExpandedKeys"
          :default-expand-all="defaultExpandAll"
          :default-checked-keys="defaultCheckedKeys"
          :expand-on-click-node="expandOnClickNode"
          :check-on-click-node="checkOnClickNode"
          :check-descendants="checkDescendants"
          :auto-expand-parent="autoExpandParent"
          :current-node-key="currentNodeKey"
          :render-content="renderContent"
          :draggable="draggable"
          :allow-drag="allowDrag"
          :allow-drop="allowDrop"
          :props="props"
          :lazy="lazy"
          :highlight-current="highlightCurrent"
          :load="load"
          :filter-node-method="filterNodeMethod"
          :accordion="accordion"
          :indent="indent"
          :icon-class="iconClass"
          @node-click="handleNodeClick"
          @check-change="handleCheckChange"
        >
          <span
            slot-scope="{ node, data }"
            class="custom-tree-node">
            <span :class="{disableChoose: disableChoose(data)}">{{ node.label }}</span>
            <span
              v-if="showCount"
              class="count">{{ getCount(data) }}</span>
          </span>
        </el-tree>
      </el-popover>
    </el-select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import props from './mixin'
import { treeToArray, isArrayString } from './util'
import { SelectData, TreeSelectData } from './type'
import { Select, Popover, Tree, Option } from 'element-ui'
const TreeSelectProps = Vue.extend({
  props: {
    ...props
  }
})

@Component({
  name: 'tree-select',
  components: {
    [Select.name]: Select,
    [Popover.name]: Popover,
    [Tree.name]: Tree,
    [Option.name]: Option
  }
})
export default class TreeSelect extends TreeSelectProps {
  $refs!: Vue['$refs'] & {
    select: {
      $el: HTMLSelectElement;
      blur: Function;
    };
    tree: {
      setCheckedKeys: Function;
      getCheckedNodes: (type: boolean) => TreeSelectData[];
      filter: (value: string) => {};
    };
  };

  private selectData: SelectData = {
    value: undefined,
    label: ''
  };

  private popoverVisible = false;
  private width = 200;
  private left = 0;

  private resize () {
    this.width = this.$refs.select?.$el?.offsetWidth
    this.left = this.$refs.select?.$el?.offsetLeft
  }

  private visibleChange (visible: boolean) {
    this.popoverVisible = visible
    if (visible) {
      this.$refs.tree.filter('')
    }
  }

  get allList () {
    return treeToArray(this.data)
  }

  @Watch('selectData')
  onSelectedDataChange (data: SelectData) {
    this.emit(data.value)
  }

  @Watch('value')
  onValueChange (value: SelectData['value']) {
    this.checkValue(value)
  }

  mounted () {
    this.checkValue(this.$props.value)
  }

  checkValue (value: SelectData['value']) {
    if (this.multiple) {
      this.$refs.tree.setCheckedKeys(value)
    } else {
      const item = this.allList.find(item => item.id === value) || {}
      this.selectData = {
        value: item.id,
        label: item.label
      }
    }
  }

  handleNodeClick (data: TreeSelectData) {
    if (!this.multiple && data.choose) {
      this.selectData = {
        value: data.id,
        label: data.label || ''
      }
      this.$refs.select.blur()
    }
  }

  handleCheckChange () {
    const data = this.$refs.tree.getCheckedNodes(true)
    this.selectData = {
      label: data.reduce((results: string[], item) => {
        if (item.label) {
          return [...results, item.label]
        }
        return results
      }, []),
      value: data.map(item => item.id)
    }
  }

  filterMethod (value: string) {
    this.$refs.tree.filter(value)
  }

  filterNodeMethod (value: string, data: TreeSelectData) {
    if (!value) return true
    return data.label?.indexOf(value) !== -1
  }

  removeTag (value: SelectData['label']) {
    if (isArrayString(this.selectData.label)) {
      const index = this.selectData.label?.findIndex(
        (item: string) => item === value
      )
      this.selectData.label.splice(index, 1)
      if (isArrayString(this.selectData.value)) {
        this.selectData.value?.splice(index, 1)
      }
      this.$refs.tree.setCheckedKeys(this.selectData.value)
    }
  }

  disableChoose (data: any) {
    return !data.choose && !data.children?.length
  }

  getCount (data: any) {
    try {
      if (data.children?.length) {
        return `(${data.children?.length})`
      } else {
        return ''
      }
    } catch (e) {
      if (data.children?.length) {
        return `(${data.children.length})`
      } else {
        return ''
      }
    }
  }

  emit (value: SelectData['value']) {
    this.$emit('change', value)
    this.$emit('input', value)
  }
}
</script>

<style lang="less">
.wrap {
  user-select: none;
  .el-select-dropdown {
    margin-top: 0;
    border: none;

    .popper__arrow {
      display: none;
    }
  }
  .el-popover {
    box-sizing: border-box;
    top: 1px;
  }

  .disableChoose {
    color: #d2d2d2;
  }

  .count {
    margin-left: 5px;
  }

}
</style>
