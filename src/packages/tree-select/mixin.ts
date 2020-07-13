const treeProps = {
  data: {
    type: Array
  },
  emptyText: {
    type: String,
    default: 'no result'
  },
  renderAfterExpand: {
    type: Boolean,
    default: true
  },
  nodeKey: String,
  checkStrictly: Boolean,
  defaultExpandAll: Boolean,
  expandOnClickNode: {
    type: Boolean,
    default: true
  },
  checkOnClickNode: Boolean,
  checkDescendants: {
    type: Boolean,
    default: false
  },
  autoExpandParent: {
    type: Boolean,
    default: true
  },
  defaultCheckedKeys: Array,
  defaultExpandedKeys: Array,
  currentNodeKey: [String, Number],
  renderContent: Function,
  showCheckbox: {
    type: Boolean,
    default: false
  },
  draggable: {
    type: Boolean,
    default: false
  },
  allowDrag: Function,
  allowDrop: Function,
  props: {
    default () {
      return {
        children: 'children',
        label: 'label',
        disabled: 'disabled'
      }
    }
  },
  lazy: {
    type: Boolean,
    default: false
  },
  highlightCurrent: Boolean,
  load: Function,
  accordion: Boolean,
  indent: {
    type: Number,
    default: 18
  },
  iconClass: String
}

const selectProps = {
  name: String,
  id: String,
  value: {
    required: true
  },
  autocomplete: {
    type: String,
    default: 'off'
  },
  automaticDropdown: Boolean,
  size: {
    type: String,
    default: 'medium'
  },
  disabled: Boolean,
  clearable: Boolean,
  filterable: {
    type: Boolean,
    default: true
  },
  allowCreate: Boolean,
  loading: Boolean,
  popperClass: String,
  remote: Boolean,
  loadingText: String,
  noMatchText: String,
  noDataText: String,
  remoteMethod: Function,
  multiple: Boolean,
  multipleLimit: {
    type: Number,
    default: 0
  },
  placeholder: {
    type: String,
    default: ''
  },
  defaultFirstOption: Boolean,
  reserveKeyword: Boolean,
  valueKey: {
    type: String,
    default: 'value'
  },
  collapseTags: Boolean,
  popperAppendToBody: {
    type: Boolean,
    default: true
  }
}

const popoverProps = {
  trigger: {
    type: String,
    default: 'click',
    validator: (value: string) => ['click', 'focus', 'hover', 'manual'].indexOf(value) > -1
  },
  openDelay: {
    type: Number,
    default: 0
  },
  closeDelay: {
    type: Number,
    default: 200
  },
  title: String,
  disabled: Boolean,
  content: String,
  reference: {},
  popperClass: String,
  visibleArrow: {
    default: true
  },
  arrowOffset: {
    type: Number,
    default: 0
  },
  transition: {
    type: String,
    default: 'fade-in-linear'
  },
  tabindex: {
    type: Number,
    default: 0
  }
}

export default {
  ...selectProps,
  ...popoverProps,
  ...treeProps
}
