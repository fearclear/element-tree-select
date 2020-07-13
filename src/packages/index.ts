import Vue from 'vue'
import TreeSelect from './tree-select'
const components: { [propsName: string]: any } = {
  TreeSelect
}

const install = (vue: typeof Vue): void => {
  Object.keys(components).forEach((key) => {
    vue.component(key, components[key])
  })
}

export default {
  install,
  ...components
}
