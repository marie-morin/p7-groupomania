import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";

import userModule from "./modules/userModule";
import postModule from "./modules/postModule";
import commentModule from "./modules/commentModule";

// Load Vuex
Vue.use(Vuex);

const modules = {
  userModule,
  postModule,
  commentModule,
};

const actions = {
  async fetch({ commit }, item) {
    const response = await axios.get(item.url, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem("jwt").replace(/['"']+/g, ""),
      },
    });
    commit(item.mutation, response.data);
  },

  async add({ commit }, item) {
    const response = await axios.post(
      item.url,
      { data: item.data },
      {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("jwt").replace(/['"']+/g, ""),
        },
      }
    );
    commit(item.mutation, response.data);
  },

  async delete({ commit }, item) {
    await axios.delete(item.url, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem("jwt").replace(/['"']+/g, ""),
      },
    });
    commit(item.mutation, item.id);
  },

  async rate({ commit }, item) {
    const response = await axios.post(
      item.url,
      { data: item.id },
      {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("jwt").replace(/['"']+/g, ""),
        },
      }
    );

    // const rate = {
    //   response,
    //   item.id,
    //   userId,
    // };
    commit(item.mutation, response.data);
  },

  async update({ commit }, item) {
    const response = await axios.put(
      item.url,
      { data: item.data },
      {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("jwt").replace(/['"']+/g, ""),
        },
      }
    );
    commit(item.mutation, response.data);
  },
};

// Create store
export default new Vuex.Store({
  modules,
  actions,
});
