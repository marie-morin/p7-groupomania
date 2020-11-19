import axios from "axios";
import * as userModule from "./userModule";

const state = {
  posts: [],
};

const getters = {
  allPosts: (state) => state.posts,
};

const actions = {
  // Concernant les posts
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

  // Concernant les likes des posts
  async fetchPostLikes({ commit }, postId) {
    const response = await axios.get(
      `http://localhost:3000/api/posts/${postId}/like`
    );
    commit("setPostLikes", response.data);
  },

  async ratePost({ commit }, postId) {
    const userId = userModule.default.state.user.id;
    const response = await axios.post(`http://localhost:3000/api/posts/like`, {
      postId,
      userId,
    });
    const rate = {
      response,
      postId,
      userId,
    };
    commit("setPostRate", rate);
  },
};

const mutations = {
  setPosts: (state, posts) => {
    posts.forEach((post) => {
      state.posts.push({ comments: [], likes: [], ...post });
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

  setPostLikes: (state, likes) => {
    if (!likes.message) {
      likes.forEach((like) => {
        state.posts.forEach((post) => {
          if (post.id === like.postId) {
            post.likes.push(like);
          }
        });
      });
    }
  },

  setPostRate: (state, rate) => {
    // console.log("rate : ", rate);
    // console.log("rate.postId : ", rate.postId);
    // console.log("rate.userId : ", rate.userId);

    state.posts.forEach((post) => {
      if (post.id === rate.postId) {
        // console.log("post.id : ", post.id);
        if (rate.response.data.like) {
          post.likes.push(rate);
        } else {
          // console.log("unlike");
          post.likes = post.likes.filter((like) => like.userId !== rate.userId);
        }
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