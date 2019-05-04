import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    path: ""
  },
  mutations: {
    updateHash(state) {
      let hash = window.location.hash.substring(1);
      state.path = hash || "";
    }
  }
});
