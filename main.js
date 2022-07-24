import Vue from "vue";
import Example from "./example";
// import tableFormItem from "./packages";

Vue.config.productionTip = false;
// Vue.use(tableFormItem)
new Vue({
  render: (h) => h(Example),
}).$mount("#app");
