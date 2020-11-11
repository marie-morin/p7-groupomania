import axios from "axios";

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
    console.log(response.data);
    localStorage.setItem("jwt", response.data.token);
    dispatch("getUserInfos", response.data.token);
  },

  async getUserInfos({ commit }, token) {
    const response = await axios.post("http://localhost:3000/api/users/me", {
      method: "POST",
      token: token,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    console.log(response.data);
    commit("saveUser", response.data.user);
    commit("loginIn", true);
  },
};

const mutations = {
  saveUser: (state, user) => (state.user = user),
  loginIn: (state, current) => (state.isLoged = current),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
