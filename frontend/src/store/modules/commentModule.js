import * as postModule from "./postModule";

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
  mutations,
};
