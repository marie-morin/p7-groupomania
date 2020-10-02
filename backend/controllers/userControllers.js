// Import
const models = require("../models");
const jwt = require("../utils/jwtValidator");

// Security imports
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const mailValidator = require("email-validator");

// Constantes
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})/;
const usernameRegex = /^[a-zA-Z ,.'-]+$/;

// Signup
exports.signup = (req, res, next) => {
  if (
    !mailValidator.validate(req.body.email) ||
    !passwordRegex.test(req.body.password) ||
    !usernameRegex.test(req.body.username)
  ) {
    console.log("Les champs contiennent des valeurs interdites !");
  }
  models.User.findOne({
    attributes: ["email"],
    where: { email: req.body.email },
  })
    .then((user) => {
      if (user) {
        res.status(409).json({
          error: "L'email utilisé correspond déjà à un compte existant !",
        });
      }
      bcrypt.hash(req.body.password, 10, function (err, bcryptPassword) {
        const username = req.body.firstname + " " + req.body.lastname;
        const newUser = models.User.create({
          email: req.body.email,
          password: bcryptPassword,
          username: username,
          bio: req.body.bio,
          isAdmin: 0,
        })
          .then(res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((err) => {
            res.status(500).json({ err });
          });
      });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

// Login
exports.login = (req, res, next) => {
  models.User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user) {
        res.status(404).json({
          erreur: "Aucun compte ne correspond à l'adresse email renseignée !",
        });
      }

      bcrypt.compare(
        req.body.password,
        user.password,
        (errComparePassword, resComparePassword) => {
          if (resComparePassword) {
            res.status(200).json({
              userId: user.id,
              token: jwt.generateToken(user),
              isAdmin: user.isAdmin,
            });
          } else {
            res.status(403).json({ error: "Le mot de passe est invalide !" });
          }
        }
      );
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

// Get all users
exports.getAllUsers = (req, res, next) => {};

// Get One user
exports.getOneUser = (req, res) => {};

// Get one user by its username
exports.getUserByUsername = (req, res, next) => {};

// Update user acount
exports.modifyUser = (req, res, next) => {};

// // Delete an acount
exports.deleteUser = (req, res, next) => {};
