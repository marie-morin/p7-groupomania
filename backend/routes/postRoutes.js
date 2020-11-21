//Imports
const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/postControllers");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Routes

// Create a post
router.post("/", postCtrl.addPost);
// Get all posts
router.get("/", postCtrl.getAllPosts);
// Get one post
// router.get("/:id", postCtrl.getOnePost);
// Get all posts from one user
router.get("/from/:user", postCtrl.getPostsFrom);
// Update a post
router.put("/:id", postCtrl.modifyPost);
// Delete a post
router.delete("/:id", postCtrl.deletePost);
// Like a post
router.post("/like", postCtrl.like);
// Get likes from one post
router.get("/:id/like", postCtrl.getLikesFromPost);
// Remove like from a post
// router.delete("/unlike", postCtrl.deleteLike);

// // Create a post
// router.post("/", auth, postCtrl.addPost);
// // Get all posts
// router.get("/", auth, postCtrl.getAllPosts);
// // Get one post
// router.get("/:id", auth, postCtrl.getOnePost);
// // Get all posts from one user
// router.get("/from/:user", auth, postCtrl.getPostsFrom);
// // Update a post
// router.put("/:id", auth, postCtrl.modifyPost);
// // Delete a post
// router.delete("/:id", auth, postCtrl.deletePost);
// // Like or dislike a post
// router.post("/:id/like", auth, postCtrl.giveOpinion);

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
