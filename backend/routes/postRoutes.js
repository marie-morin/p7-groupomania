//Imports
const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/postControllers");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Routes

// Create a post
router.post("/", auth, postCtrl.addPost);
// Get all posts
router.get("/", auth, postCtrl.getAllPosts);
// Get all posts from one user
router.get("/from/:id", auth, postCtrl.getPostsFrom);
// Update a post
router.put("/:id", auth, postCtrl.modifyPost);
// Delete a post
router.delete("/:id", auth, postCtrl.deletePost);
// Like a post
router.post("/like", auth, postCtrl.like);
// Get likes from one post
router.get("/:id/like", auth, postCtrl.getLikesFromPost);

// // Requêtes incomplètes
// // Create a post
// router.post("/", auth, multer, postCtrl.addPost);

// //Requêtes nons utilisées
// // Get one post
// router.get("/:id", postCtrl.getOnePost);
// // Update a post
// router.put("/:id", auth, multer, postCtrl.modifyPost);

// Exporting Router
module.exports = router;
