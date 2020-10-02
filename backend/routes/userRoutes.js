//Imports
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userControllers");
// const auth = require("../middleware/auth");
const bouncer = require("express-bouncer")(30000, 60000, 3); // Limitation du nombre de tentatives de connexion
// const bruteforce = require("../middleware/bruteforce");

// Sign up
router.post("/signup", userCtrl.signup);

// Login
router.post("/login", bouncer.block, userCtrl.login);
// router.post("/login", bruteforce, bouncer.block, userCtrl.login);

// Get all users
router.get("/", bouncer.block, userCtrl.getAllUsers);

// Get One user
router.get("/:id", bouncer.block, userCtrl.getOneUser);

// Get me own profil
router.get("/myself", bouncer.block, userCtrl.getMyProfil);

// Get one user by its username
router.get("/username/:username", bouncer.block, userCtrl.getUserByUsername);

// Update user acount
router.put("/:id", bouncer.block, userCtrl.modifyUser);

// Delete an acount
router.delete("/:id", bouncer.block, userCtrl.deleteUser);

// router.get('/me', auth, userCtrl.userProfil);
// router.put('/update',auth, userCtrl.changePwd);

// Exporting Router
module.exports = router;
