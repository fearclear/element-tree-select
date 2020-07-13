<template>
  <div class="wrap">
    <tree-select
      :data="options"
      node-key="id"
      v-model="tt"
      placeholder="请选择你要选择的选项"
      :multiple="true"
    ></tree-select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TreeSelect from '@/packages/tree-select/index.vue'
export default Vue.extend({
  components: {
    TreeSelect
  },
  props: {},
  data () {
    return {
      tt: [9],
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
                  label: '三级 1-1-1',
                  choose: true
                },
                {
                  id: 10,
                  label: '三级 1-1-2',
                  choose: true
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
              label: '二级 2-1',
              choose: true
            },
            {
              id: 6,
              label: '二级 2-2',
              choose: true
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1',
              choose: true
            },
            {
              id: 8,
              label: '二级 3-2',
              choose: true
            }
          ]
        }, {
          id: 11,
          label: '一级 4',
          children: []
        }
      ]
    }
  },
  mounted () {
    setTimeout(() => {
      this.tt = [8]
    }, 2000)
  },
  watch: {
    tt: (o, v) => {
      console.log(o, v)
    }
  }
})
</script>

<style lang="less">
</style>
