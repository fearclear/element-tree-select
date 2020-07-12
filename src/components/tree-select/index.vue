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
        />
      </el-popover>
    </el-select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import props from './mixin'
import { treeToArray, Collection } from './util'
const TreeSelectProps = Vue.extend({
  props: {
    ...props,
    cc: {
      type: String,
      default: ''
    }
  },
  computed: {
    allList () {
      return treeToArray(this.data as Collection[])
    }
  },
  watch: {
    value (value) {
      const item = this.allList.find(item => item.id === value)
      console.log(item, 'item')
      this.selectData = {
        value: item.id,
        label: item.label
      }
    }
  }
})

@Component({
  name: 'j-el-tree-select'
})
export default class TreeSelect extends TreeSelectProps {
  private selectData = {
    value: null,
    label: ''
  }

  private popoverVisible = false;
  private width = 200;
  private left = 0;

  private resize () {
    this.width = ((this.$refs.select as Vue)
      ?.$el as HTMLSelectElement)?.offsetWidth
    this.left = ((this.$refs.select as Vue)
      ?.$el as HTMLSelectElement)?.offsetLeft
  }

  private visibleChange (visible: boolean) {
    this.popoverVisible = visible
  }

  created () {
    console.log(this.$props)
    console.log(this.multiple)
    console.log(treeToArray(this.data as Collection[]))
  }

  handleNodeClick (data: any) {
    if (!this.multiple && data.choose) {
      this.selectData = {
        value: data.id,
        label: data.label
      }
      this.$emit('change', data.id)
      this.$emit('input', data.id);
      (this.$refs.select as HTMLSelectElement).blur()
    }
  }

  handleCheckChange () {}
}
</script>

<style lang="less">
.wrap {
  .el-select-dropdown {
    margin-top: 0;
    border: none;

    .popper__arrow {
      display: none;
    }
  }
  .el-popover {
    box-sizing: border-box;
  }
}
</style>
