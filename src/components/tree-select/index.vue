<template>
  <div class="wrap">
    <el-select
      ref="select"
      :multiple="multiple"
      :filterable="filterable"
      :value="value"
      :popper-append-to-body="false"
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
          :show-checkbox="multiple"
          :node-key="nodeKey"
          :default-expanded-keys="defaultExpandedKeys"
          :default-expand-all="defaultExpandAll"
          :default-checked-keys="defaultCheckedKeys"
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
  .el-tree-select-popover {
    box-sizing: border-box;
  }
}
</style>
