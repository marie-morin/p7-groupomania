import axios from "axios";
import router from "../../router";

const state = {
  user: {},
  isLoged: false,
};

const getters = {
  currentUser: (state) => state.user,
  isLoged: (state) => state.isLoged,
};

const actions = {
  async registerUser({ dispatch }, { url, user }) {
    const response = await axios.post(url, {
      method: "POST",
      data: user,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    localStorage.setItem("jwt", response.data.token);
    dispatch("getUserInfos", response.data.token);
  },

  async getUserInfos({ commit }, token) {
    const option = {
      method: "POST",
      data: token,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    const response = await axios.post(
      "http://localhost:3000/api/users/me",
      option
    );

    commit("saveUser", response.data);
    commit("loginIn", true);
    router.push("Home");
  },
};

const mutations = {
  saveUser: (state, user) => (state.user = user),
  loginIn: (state, current) => (state.isLoged = current),
  userLogout: (state) => ((state.user = {}), (state.isLoged = false)),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
