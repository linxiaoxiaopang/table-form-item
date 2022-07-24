<template>
  <div id="app">
    <div></div>
    <TableFormItem :row="form" :required="true">
      <input type="text" v-model="form.value">
    </TableFormItem>
  </div>
</template>

<script>
import { tableFormItem as TableFormItem } from './tableFormItem'
// import { tableFormItem as TableFormItem } from '../packages'
export default {
  name: "App",
  components: {
    TableFormItem
  },

  data () {
    return {
      form: {}
    }
  }
};
</script>

