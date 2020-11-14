import axios from "axios";
import * as postModule from "./postModule";

const state = {};

const getters = {};

const actions = {
  async fetchComments({ commit }, postId) {
    const response = await axios.get(
      `http://localhost:3000/api/comments/from/${postId}`
    );
    commit("setComments", response.data);
  },

  async addComment({ commit }, comment) {
    const TOKEN = localStorage.getItem("jwt");
    const headers = {
      Authorization: "Bearer " + TOKEN.replace(/['"']+/g, ""),
    };

    const response = await axios.post(
      "http://localhost:3000/api/comments/",
      { comment },
      { headers: headers }
    );
    commit("newComment", response.data);
  },
};

const mutations = {
  setComments: (state, comments) => {
    const posts = postModule.default.state.posts;
    comments.forEach((comment) => {
      posts.forEach((post) => {
        if (post.id === comment.postId) {
          post.comments.push(comment);
        }
      });
    });
  },

  newComment: (state, comment) => {
    const posts = postModule.default.state.posts;
    posts.forEach((post) => {
      if (post.id === comment.postId) {
        post.comments.push(comment);
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
