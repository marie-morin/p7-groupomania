import Vuex from "vuex";
import Vue from "vue";

import userModule from "./modules/userModule";
import postModule from "./modules/postModule";
import commentModule from "./modules/commentModule";

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    userModule,
    postModule,
    commentModule,
  },

  // action: {
  //   getToken() {
  //     const TOKEN = localStorage.getItem("jwt");
  //     const headers = {
  //       Authorization: "Bearer " + TOKEN.replace(/['"']+/g, ""),
  //     };
  //     return headers;
  //   },
  // },
});
