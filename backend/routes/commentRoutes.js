//Imports
const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/commentControllers");
const auth = require("../middleware/auth");

// Routes

// Create a comment
router.post("/", auth, commentCtrl.addComment);
// Get all comments from one post
router.get("/from/:id", auth, commentCtrl.getCommentsFromPost);
// Update a comment
router.put("/:id", auth, commentCtrl.modifyComment);
// Delete a comment
router.delete("/:id", auth, commentCtrl.deleteComment);
// Like or dislike a comment
router.post("/like", auth, commentCtrl.like);
// Get likes from one comment
router.get("/:id/like", auth, commentCtrl.getLikesFromComment);

// Requête complètes
// // Create a comment
// router.post("/", auth, multer, commentCtrl.addComment);
// // Update a comment
// router.put("/:id", auth, multer, commentCtrl.modifyComment);

// Requête non utilisées
// Get all comments
// router.get("/", auth, commentCtrl.getAllComments);
// Get one comment
// router.get("/:id", auth, commentCtrl.getOneComment);
// Get all comments from one user
// router.get("/by/:user", auth, commentCtrl.getCommentsFromUser);

// Exporting Router
module.exports = router;
