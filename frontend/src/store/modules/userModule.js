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
  async fetchUsers({ commit }) {
    const TOKEN = localStorage.getItem("jwt");
    const headers = {
      Authorization: "Bearer " + TOKEN.replace(/['"']+/g, ""),
    };
    const response = await axios.get("http://localhost:3000/api/users/", {
      headers: headers,
    });
    commit("setUsers", response.data);
  },

  async fetchOneUser({ commit }, userId) {
    const TOKEN = localStorage.getItem("jwt");
    const headers = {
      Authorization: "Bearer " + TOKEN.replace(/['"']+/g, ""),
    };
    const response = await axios.get(
      `http://localhost:3000/api/users/${userId}`,
      {
        headers: headers,
      }
    );
    commit("setGuest", response.data);
  },

  async registerUser({ dispatch }, { url, user }) {
    const response = await axios.post(url, {
      method: "POST",
      data: user,
    });
    localStorage.setItem("jwt", response.data.token);
    dispatch("getUserInfos", response.data.token);
  },

  async getUserInfos({ commit }, token) {
    const TOKEN = localStorage.getItem("jwt");
    const headers = {
      Authorization: "Bearer " + TOKEN.replace(/['"']+/g, ""),
    };
    const response = await axios.post("http://localhost:3000/api/users/me", {
      method: "POST",
      data: token,
      headers: headers,
    });

    commit("setUser", response.data);
    router.push("Home");
  },

  async deleteUser({ commit }, id) {
    const TOKEN = localStorage.getItem("jwt");
    const headers = {
      Authorization: "Bearer " + TOKEN.replace(/['"']+/g, ""),
    };

    await axios.delete(`http://localhost:3000/api/users/${id}`, {
      headers: headers,
    });
    commit("removeUser");
  },

  async updateUser({ commit }, user) {
    const TOKEN = localStorage.getItem("jwt");
    const headers = {
      Authorization: "Bearer " + TOKEN.replace(/['"']+/g, ""),
    };

    const response = await axios.put(
      `http://localhost:3000/api/users/${user.id}`,
      { data: user },
      { headers: headers }
    );
    commit("setUser", response.data);
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
