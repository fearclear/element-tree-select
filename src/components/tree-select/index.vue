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
      :value="value"
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
        />
      </el-popover>
    </el-select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import props from './mixin'
const TreeSelectProps = Vue.extend({
  props: {
    ...props
  }
})

@Component({
  name: 'j-el-tree-select'
})
export default class TreeSelect extends TreeSelectProps {
  $refs!: {
    select: Vue;
  };

  private popoverVisible = false;
  private width = 200;
  private left = 0;

  private resize () {
    console.log('resize')
    this.width = (this.$refs.select?.$el as HTMLSelectElement)?.offsetWidth
    this.left = (this.$refs.select?.$el as HTMLSelectElement)?.offsetLeft
  }

  private visibleChange (visible: boolean) {
    console.log(this.popoverVisible, visible)
    this.popoverVisible = visible
  }

  created () {
    console.log(this.$props)
  }
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
