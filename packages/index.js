import tableFormItem1 from './component/tableFormItem'

export const tableFormItem = tableFormItem1

function install(Vue) {
  Vue.component(tableFormItem1.name, tableFormItem1)
}

export default install