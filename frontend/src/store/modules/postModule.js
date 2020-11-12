import axios from "axios";

const state = {
  posts: [],
};

const getters = {
  allPosts: (state) => state.posts,
};

const actions = {
  async fetchPosts({ commit }) {
    const response = await axios.get("http://localhost:3000/api/posts");
    console.log(response);
    commit("setPosts", response.data);
  },

  async addPost({ commit }, post) {
    const TOKEN = localStorage.getItem("jwt");
    const headers = {
      Authorization: "Bearer " + TOKEN.replace(/['"']+/g, ""),
    };

    const response = await axios.post(
      "http://localhost:3000/api/posts/",
      { post },
      { headers: headers }
    );
    console.log(response);
    commit("newPost", response.data);
  },
};

const mutations = {
  setPosts: (state, posts) => (state.posts = posts),
  newPost: (state, post) => state.posts.unshift(post),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
