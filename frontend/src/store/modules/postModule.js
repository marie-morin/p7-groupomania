const state = {
  posts: [],
  // userPosts: [],
};

const getters = {
  allPosts: (state) => state.posts,
};

const mutations = {
  setPosts: (state, posts) => {
    posts.forEach((post) => {
      state.posts.push({ comments: [], likes: [], ...post });
    });
  },

  setUserPosts: (state, userPosts) => {
    userPosts.forEach((post) => {
      state.userPosts.push({ comments: [], likes: [], ...post });
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
  mutations,
};
