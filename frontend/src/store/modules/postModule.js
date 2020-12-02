const state = {
  posts: [],
};

const getters = {
  allPosts: (state) => state.posts,
};

const mutations = {
  setPosts: (state, posts) => {
    (state.posts = []),
      posts.forEach((post) => {
        state.posts.push({ comments: [], likes: [], ...post });
      });
  },

  newPost: (state, post) => {
    state.posts.unshift({ comments: [], likes: [], ...post });
  },

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
            post.likes = [];
            post.likes.push(like);
          }
        });
      });
    }
  },

  ratePost: (state, rate) => {
    state.posts.forEach((post) => {
      if (post.id === rate.itemId) {
        if (rate.response.status == 201) {
          post.likes.push(rate);
        } else {
          post.likes = post.likes.filter((like) => like.userId !== rate.userId);
        }
      }
    });
  },

  removePosts: (state) => (state.posts = []),
};

export default {
  state,
  getters,
  mutations,
};
