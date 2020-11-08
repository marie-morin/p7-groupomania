import Vuex from "vuex";
import Vue from "vue";
import user from "./modules/user";
import posts from "./modules/posts";
import comments from "./modules/comments";

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    user,
    posts,
    comments,
  },
});
