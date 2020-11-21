//Imports
const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/commentControllers");
const auth = require("../middleware/auth");

// Routes

// Create a post
router.post("/", commentCtrl.addComment);
// Get all posts
// router.get("/", commentCtrl.getAllComments);
// Get one post
// router.get("/:id", commentCtrl.getOneComment);
// Get all posts from one post
router.get("/from/:id", commentCtrl.getCommentsFromPost);
// Get all posts from one user
// router.get("/by/:user", commentCtrl.getCommentsFromUser);
// Update a post
router.put("/:id", commentCtrl.modifyComment);
// Delete a post
router.delete("/:id", commentCtrl.deleteComment);
// Like or dislike a post
router.post("/like", commentCtrl.like);
// Get likes from one comment
router.get("/:id/like", commentCtrl.getLikesFromComment);

// // Create a post
// router.post("/", auth, multer, postCtrl.addPost);
// // Get all posts
// router.get("/", auth, postCtrl.getAllPosts);
// // Get one post
// router.get("/:id", auth, postCtrl.getOnePost);
// // Get all posts from one user
// router.get("/from/:user", auth, postCtrl.getPostsFrom);
// // Update a post
// router.put("/:id", auth, multer, postCtrl.modifyPost);
// // Delete a post
// router.delete("/:id", auth, postCtrl.deletePost);
// // Like or dislike a post
// router.post("/:id/like", auth, multer, postCtrl.giveOpinion);

// Exporting Router
module.exports = router;
