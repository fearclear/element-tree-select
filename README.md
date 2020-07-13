# 说明

- 本组件基于elementUI开发
- 用于补充elementUI缺少的treeSelect插件
- 接收的属性为select/popover/tree三个组件结合起来的属性
- 对于接收的属性做了一些处理，具体接收的参数在[mixin](src/packages/tree-select/mixin.ts)中
- 方法没有全部暴露，需要的话可以自行扩展
- `tests`文件夹里面包含e2e测试和unit测试，e2e基于[cypress](https://www.cypress.io/)，unit测试基于[mocha](https://mochajs.org/)

## 补充

- 只测试了single select，multiple模式未完全测试
