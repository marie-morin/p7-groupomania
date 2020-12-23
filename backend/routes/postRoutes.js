//Imports
const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/postControllers");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Ajouter un nouveau post
router.post("/", auth, multer, postCtrl.addPost);

// Récupérer tous les posts
router.get("/", auth, postCtrl.getAllPosts);

// Modifier un post
router.put("/:id", auth, multer, postCtrl.modifyPost);

// Supprimer un post
router.delete("/:id", auth, postCtrl.deletePost);

// Liker ou disliker un post
router.post("/like", auth, postCtrl.like);

// Récupérer les likes d'un post
router.get("/:id/like", auth, postCtrl.getLikesFromPost);

module.exports = router;
