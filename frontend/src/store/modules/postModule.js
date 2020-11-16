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

  async updatePost({ commit }, { title, content, id }) {
    const TOKEN = localStorage.getItem("jwt");
    const headers = {
      Authorization: "Bearer " + TOKEN.replace(/['"']+/g, ""),
    };

    const response = await axios.put(
      `http://localhost:3000/api/posts/${id}`,
      { content, title },
      { headers: headers }
    );
    commit("updatePost", response.data);
  },
};

const mutations = {
  setPosts: (state, posts) => {
    posts.forEach((post) => {
      state.posts.push({ comments: [], ...post });
    });
  },

  newPost: (state, post) => state.posts.unshift(post),

  removePost: (state, id) =>
    (state.posts = state.posts.filter((post) => post.id !== id)),

  updatePost: (state, post) => {
    state.posts.forEach((item) => {
      if (item.id === post.id) {
        item.title = post.title;
        item.content = post.content;
      }
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
