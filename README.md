# table-form-item

适用于 vue项目中使用 element-ui组件库的项目，用于解决el-table中的表单校验的痛点，也可以在任何其他组件中使用。

## Install

```bash
npm install table-form-item
```

## Usage

全局注册组件

```js
import TableFormItem from "table-form-item";

Vue.use(TableFormItem);
```

或者局部组件中引用:

```js
import { tableFormItem as TableFormItem } from "table-form-item";

export default {
  components: {
    TableFormItem
  },
};
```

然后再模板(template)中使用:

```vue
<template>
  <TableFormItem :row="form" prop="name" required="true" label="名称">
    //插槽内容
    <el-input type="input" v-model="form.name" />
  </TableFormItem>
</template>
```
```js
export default {
  data () {
    return {
      form: { 
         value: '' 
      }
    }
  }
}
```

### Api文档
| 属性       | 描述                                                             | 类型            | 必传  | 默认值 |
|----------|----------------------------------------------------------------|---------------|-----|----|
| row      | 需要校验的对象                                                        | object        | Y   | null |
| required | 校验必填                                                           | boolean       | N   | false |
| prop     | 属性值                                                            | string        | Y   | -  |
| label    | required校验未通过时会用到，不传的话使用的是prop                                 | string        | N   | -  |
| rules    | 校验规则与el-form中rules一致                                           | array[object] | N   | -  |
| default  | 默认插槽，插槽内容可以是表单元素,默认值是<el-input v-model="row[prop]"></el-input> | ---           | Y   | -  |



## License

MIT &copy;
