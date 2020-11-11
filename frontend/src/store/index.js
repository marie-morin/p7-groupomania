import Vuex from "vuex";
import Vue from "vue";
import userModule from "./modules/userModule";
import posts from "./modules/postModule";
import comments from "./modules/commentModule";

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    userModule,
    posts,
    comments,
  },
});
