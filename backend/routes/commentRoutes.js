const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/commentControllers");
const auth = require("../middleware/auth");

// Ajout d'un nouveau commentaire
router.post("/", auth, commentCtrl.addComment);

// Récupérer les commentaires d'un post
router.get("/from/:id", auth, commentCtrl.getCommentsFromPost);

// Modifier un commentaire
router.put("/:id", auth, commentCtrl.modifyComment);

// Supprimer un commentaire
router.delete("/:id", auth, commentCtrl.deleteComment);

// Liker ou disliker un commentaire
router.post("/like", auth, commentCtrl.like);

// Récupérer les likes d'un commentaire
router.get("/:id/like", auth, commentCtrl.getLikesFromComment);

module.exports = router;
