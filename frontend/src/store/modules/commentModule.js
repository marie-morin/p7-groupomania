import axios from "axios";
import * as postModule from "./postModule";
// import * as userModule from "./userModule";

const state = {};

const getters = {};

const actions = {
  // Concernant les commentaires
  async fetchComments({ commit }, postId) {
    const response = await axios.get(
      `http://localhost:3000/api/comments/from/${postId}`
    );
    console.log("reponse.data : ", response.data);
    commit("setComments", response.data);
  },

  async addComment({ commit }, comment) {
    const TOKEN = localStorage.getItem("jwt");
    const headers = {
      Authorization: "Bearer " + TOKEN.replace(/['"']+/g, ""),
    };

    const response = await axios.post(
      "http://localhost:3000/api/comments/",
      { data: comment },
      { headers: headers }
    );
    console.log("response.data : ", response.data);
    commit("newComment", response.data);
  },

  async updateComment({ commit }, { content, id }) {
    const TOKEN = localStorage.getItem("jwt");
    const headers = {
      Authorization: "Bearer " + TOKEN.replace(/['"']+/g, ""),
    };

    const response = await axios.put(
      `http://localhost:3000/api/comments/${id}`,
      { data: content },
      { headers: headers }
    );
    commit("updateComment", response.data);
  },

  async deleteComment({ commit }, id) {
    const TOKEN = localStorage.getItem("jwt");
    const headers = {
      Authorization: "Bearer " + TOKEN.replace(/['"']+/g, ""),
    };

    await axios.delete(`http://localhost:3000/api/comments/${id}`, {
      headers: headers,
    });
    commit("removeComment", id);
  },

  // Concernant les likes des posts
  async fetchCommentLikes({ commit }, commentId) {
    const response = await axios.get(
      `http://localhost:3000/api/comments/${commentId}/like`
    );
    commit("setCommentLikes", response.data);
  },

  async rateComment({ commit }, commentId) {
    const TOKEN = localStorage.getItem("jwt");
    const headers = {
      Authorization: "Bearer " + TOKEN.replace(/['"']+/g, ""),
    };
    // const data = {
    //   commentId,
    //   userId,
    // };
    const response = await axios.post(
      `http://localhost:3000/api/comments/like`,
      { data: commentId },
      { headers: headers }
    );

    // const rate = {
    //   response,
    //   commentId,
    //   userId,
    // };
    console.log("response.data : ", response.data);
    commit("setCommentRate", response.data);
  },
};

const mutations = {
  setComments: (state, comments) => {
    const posts = postModule.default.state.posts;

    if (!comments.message) {
      comments.forEach((comment) => {
        posts.forEach((post) => {
          if (post.id === comment.postId) {
            post.comments.push({ likes: [], ...comment });
          }
        });
      });
    }
  },

  newComment: (state, comment) => {
    const posts = postModule.default.state.posts;
    posts.forEach((post) => {
      if (post.id === comment.postId) {
        post.comments.push(comment);
      }
    });
  },

  removeComment: (state, id) => {
    const posts = postModule.default.state.posts;
    posts.forEach((post) => {
      post.comments = post.comments.filter((comment) => comment.id !== id);
    });
  },

  updateComment: (state, comment) => {
    const posts = postModule.default.state.posts;

    posts.forEach((post) => {
      if (post.id === comment.postId) {
        post.comments.forEach((com) => {
          if (com.id === comment.id) {
            com.content = comment.content;
          }
        });
      }
    });
  },

  setCommentLikes: (state, likes) => {
    const posts = postModule.default.state.posts;
    if (!likes.message) {
      likes.forEach((like) => {
        posts.forEach((post) => {
          post.comments.forEach((comment) => {
            if (comment.id === like.commentId) {
              comment.likes.push(like);
            }
          });
        });
      });
    }
  },

  setCommentRate: (state, rate) => {
    const posts = postModule.default.state.posts;
    // console.log("rate : ", rate);
    // console.log("rate.postId : ", rate.postId);
    // console.log("rate.userId : ", rate.userId);

    posts.forEach((post) => {
      post.comments.forEach((comment) => {
        if (comment.id === rate.commentId) {
          // console.log("post.id : ", post.id);
          if (rate.response.data.like) {
            comment.likes.push(rate);
          } else {
            // console.log("unlike");
            comment.likes = comment.likes.filter(
              (like) => like.userId !== rate.userId
            );
          }
        }
      });
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
