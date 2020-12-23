//Imports
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userControllers");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
// const bouncer = require("express-bouncer")(30000, 60000, 3); // Limitation du nombre de tentatives de connexion

// S'inscrire
router.post("/signup", userCtrl.signup);

// Se connecter
router.post("/login", userCtrl.login);

// Route d'authentification
router.post("/me", userCtrl.me);

// Récupérer tous les utilisateurs
router.get("/", auth, userCtrl.getAllUsers);

// Récupérer un utilisateur
router.get("/:id", auth, userCtrl.getOneUser);

// Modifier un utilisateur
router.put("/:id", auth, userCtrl.updateUser);

// Modifier une photo de profil
router.put("/:id/updatePicture", auth, multer, userCtrl.updateProfilPicture);

// Supprimer un photo de profil
router.put("/:id/deletePicture", auth, userCtrl.deleteProfilPicture);

// Modifier un mot de passe
router.put("/:id/password", auth, userCtrl.updatePassword);

// Supprimer un utilisateur
router.delete("/:id", auth, userCtrl.deleteUser);

module.exports = router;
