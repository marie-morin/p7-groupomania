import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";

import userModule from "./modules/userModule";
import postModule from "./modules/postModule";
import commentModule from "./modules/commentModule";

Vue.use(Vuex);

const state = {
  popup: {
    isDisplayed: false,
    message: "",
    intention: "",
    confirmed: false,
    options: {},
    emailRegex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%?]{6,}$/,
    textRegex: /^[A-Za-z\d\s.,;:!?"()/%-_']*$/,
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
    if (!response.data.message) {
      commit(item.mutation, response.data);
    }
  },

  async add({ commit }, item) {
    const response = await axios.post(item.url, item.data, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem("jwt").replace(/['"']+/g, ""),
      },
    });
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

  // async update({ commit }, item) {
  //   const response = await axios.put(item.url, item.data, {
  //     headers: {
  //       Authorization:
  //         "Bearer " + localStorage.getItem("jwt").replace(/['"']+/g, ""),
  //     },
  //   });
  //   commit(item.mutation, response.data);
  // },

  update({ commit }, item) {
    axios
      .put(item.url, item.data, {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("jwt").replace(/['"']+/g, ""),
        },
      })
      .then((response) => {
        commit(item.mutation, response.data);
      })
      .catch((error) => {
        if (error.response) {
          const contexte = {
            intention: "alert",
            message: "",
          };
          if (error.response.status === 403) {
            contexte.message =
              "Le mot de passe est invalide ou vous n'êtes pas autorisé à effectuer cette action !";
          } else {
            contexte.message = "Une erreur est survenu";
          }
          commit("displayPopup", contexte);
        }
      });
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

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules,
});
