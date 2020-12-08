//Imports
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userControllers");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
// const bouncer = require("express-bouncer")(30000, 60000, 3); // Limitation du nombre de tentatives de connexion

// Sign up
router.post("/signup", userCtrl.signup);
// router.post("/signup", multer, userCtrl.signup);
// Login
router.post("/login", userCtrl.login);
// Get current user info
router.post("/me", userCtrl.me);
// Get all users
router.get("/", auth, userCtrl.getAllUsers);
// Get One user
router.get("/:id", auth, userCtrl.getOneUser);
// Update user acount
router.put("/:id", auth, userCtrl.updateUser);
// Update user picture
router.put("/:id/picture", auth, userCtrl.updateProfilPicture);
// router.put("/:id/picture", auth, multer, userCtrl.updateProfilPicture);
// Update user password
router.put("/:id/password", auth, userCtrl.updatePassword);
// Delete an acount
router.delete("/:id", auth, userCtrl.deleteUser);

// Requêtes incomplètes
// router.post("/login", bouncer.block, userCtrl.login);
// router.post("/me", bouncer.block, userCtrl.me);

// Exporting Router
module.exports = router;
