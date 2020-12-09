//Imports
const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/postControllers");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Routes

// Create a post
router.post("/", auth, multer, postCtrl.addPost);
// Get all posts
router.get("/", auth, postCtrl.getAllPosts);
// Update a post
router.put("/:id", auth, multer, postCtrl.modifyPost);
// Delete a post
router.delete("/:id", auth, postCtrl.deletePost);
// Like a post
router.post("/like", auth, postCtrl.like);
// Get likes from one post
router.get("/:id/like", auth, postCtrl.getLikesFromPost);

// Exporting Router
module.exports = router;
