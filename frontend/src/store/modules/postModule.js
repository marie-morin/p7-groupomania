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
    console.log(response.data);
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

  async deletePost({ commit }, id) {
    const TOKEN = localStorage.getItem("jwt");
    const headers = {
      Authorization: "Bearer " + TOKEN.replace(/['"']+/g, ""),
    };

    await axios.delete(`http://localhost:3000/api/posts/${id}`, {
      headers: headers,
    });
    commit("removePost", id);
  },
};

const mutations = {
  // setPosts: (state, posts) => (state.posts = posts),

  setPosts: (state, posts) => {
    posts.forEach((post) => {
      state.posts.push({ comments: [], ...post });
    });
  },

  newPost: (state, post) => state.posts.unshift(post),
  removePost: (state, id) =>
    (state.posts = state.posts.filter((todo) => todo.id !== id)),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
