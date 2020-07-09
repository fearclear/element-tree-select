<template>
  <div class="wrap">
    <j-el-tree-select
      :multiple="true"
      :data="options"
      :default-checked-keys="[1]"
      v-model="tt"
      node-key="id"
      placeholder="请选择你要选择的选项"
    ></j-el-tree-select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import JElTreeSelect from '@/components/tree-select/index.vue'
export default Vue.extend({
  components: {
    JElTreeSelect
  },
  props: {},
  data () {
    return {
      tt: '',
      options: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ]
    }
  }
})
</script>

<style lang="less">
</style>
