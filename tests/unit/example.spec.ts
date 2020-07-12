import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import TreeSelect from '@/components/tree-select/index.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(TreeSelect, {
      propsData: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})
