import Vue from "vue";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

const app = new Vue({
  store,
  created() {
    store.commit("updateHash");
  },
  render: h => h(App)
}).$mount("#app");

window.onhashchange = () => {
  app.$store.commit("updateHash");
};
