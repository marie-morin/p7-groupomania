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
  registerUser({ dispatch, commit }, { url, user }) {
    axios
      .post(url, {
        method: "POST",
        data: JSON.stringify(user),
      })
      .then((response) => {
        localStorage.setItem("jwt", response.data.token);
        localStorage.setItem("jwtCreation", Date.now());
        dispatch("getUserInfos", response.data.token);
      })
      .catch((error) => {
        if (error.response) {
          const contexte = {
            intention: "alert",
            message: "",
          };
          if (error.response.status === 400) {
            contexte.message =
              "Vos informations sont manquantes ou érronnées !";
          } else if (error.response.status === 403) {
            contexte.message = "Le mot de passe est invalide !";
          } else if (error.response.status === 409) {
            contexte.message =
              "Cette adresse mail est déjà attribuée à un compte !";
          }
          commit("displayPopup", contexte);
        }
      });
  },

  async getUserInfos({ commit, state }, token) {
    const response = await axios.post(
      process.env.VUE_APP_LOCALHOST_URL + "users/me",
      {
        method: "POST",
        data: JSON.stringify(token),
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("jwt").replace(/['"']+/g, ""),
        },
      }
    );

    commit("setUser", response.data);
    router.push("Home");
    const contexte = {
      intention: "success",
      message: `Bienvenue ${state.user.username} !`,
    };
    commit("displayPopup", contexte);
    // setTimeout(() => commit("hidePopup"), 5000);
  },
};

const mutations = {
  setUser: (state, user) => (state.user = user),
  setGuest: (state, user) => (state.guest = user),
  setUsers: (state, users) => {
    (state.users = []), users.forEach((user) => state.users.push(user));
  },

  removeUser: (state) => (state.user = {}),
  removeUsers: (state) => (state.users = []),
  removeGuest: (state) => (state.guest = {}),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
