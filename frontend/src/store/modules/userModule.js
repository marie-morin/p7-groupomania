import axios from "axios";
import router from "../../router";

const state = {
  user: {},
  users: [],
  guest: {},
};

const getters = {
  currentUser: (state) => state.user,
  allUsers: (state) => state.users,
  guest: (state) => state.guest,
};

const actions = {
  async registerUser({ dispatch }, { url, user }) {
    const response = await axios.post(url, {
      method: "POST",
      data: user,
    });
    localStorage.setItem("jwt", response.data.token);
    localStorage.setItem("jwtCreation", Date.now());
    dispatch("getUserInfos", response.data.token);
  },

  async getUserInfos({ commit }, token) {
    const response = await axios.post("http://localhost:3000/api/users/me", {
      method: "POST",
      data: token,
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem("jwt").replace(/['"']+/g, ""),
      },
    });

    commit("setUser", response.data);
    router.push("Home");
  },
};

const mutations = {
  setUser: (state, user) => (state.user = user),

  userLogout: (state) => ((state.user = {}), (state.isLoged = false)),

  setUsers: (state, users) => {
    users.forEach((user) => state.users.push(user));
  },

  removeUser: (state) => (state.user = {}),

  setGuest: (state, user) => (state.guest = user),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
