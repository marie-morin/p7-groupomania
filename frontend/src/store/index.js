import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";

import userModule from "./modules/userModule";
import postModule from "./modules/postModule";
import commentModule from "./modules/commentModule";

// Load Vuex
Vue.use(Vuex);

const state = {
  popup: {
    isDisplayed: false,
    message: "",
    intention: "",
    confirmed: false,
    options: {},
  },
};

const getters = {
  popup: (state) => state.popup,
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
      { data: JSON.stringify(item.data) },
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
      { data: JSON.stringify(item.id) },
      {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("jwt").replace(/['"']+/g, ""),
        },
      }
    );
    const rate = {
      response: response,
      itemId: item.id,
      userId: item.user,
    };
    commit(item.mutation, rate);
  },

  async update({ commit }, item) {
    const response = await axios.put(
      item.url,
      { data: JSON.stringify(item.data) },
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

const mutations = {
  displayPopup: (state, contexte) => {
    state.popup.isDisplayed = true;
    state.popup.message = contexte.message;
    state.popup.intention = contexte.intention;
    state.popup.options = contexte.options;
    state.popup.origin = contexte.origin;
  },
  hidePopup: (state) => {
    state.popup.isDisplayed = false;
    state.popup.message = "";
    state.popup.intention = "";
    state.popup.options = {};
  },
};

const modules = {
  userModule,
  postModule,
  commentModule,
};

// Create store
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules,
});
