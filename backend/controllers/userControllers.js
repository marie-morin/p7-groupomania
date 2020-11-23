// Import
const models = require("../models");
const jwt = require("../utils/jwtValidator");

// Security imports
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const mailValidator = require("email-validator");

// Constantes
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%?]{6,}$/;

const regex = /^[a-zA-Z0-9-.,!?()"]+$/;

// Signup
exports.signup = (req, res, next) => {
  console.log("----------- signup");
  console.log("req.body.data : ", req.body.data);

  const data = JSON.parse(req.body.data);
  console.log("data : ", data);

  if (!data.email || !data.password || !data.firstname || !data.lastname) {
    res.status(400).json({ message: "Requête incomplète." });
  } else {
    bcrypt.hash(data.password, 10, function (err, bcryptPassword) {
      const username = data.firstname + " " + data.lastname;
      models.User.create({
        email: data.email,
        password: bcryptPassword,
        firstname: data.firstname,
        lastname: data.lastname,
        username: username,
        bio: data.bio,
        isAdmin: 0,
      })
        .then((user) => {
          console.log("user : ", user);
          res.status(200).json({ token: jwt.generateToken(user.dataValues) });
        })
        .catch((error) => res.status(409).json(error));
    });
  }
};

// Login
exports.login = (req, res, next) => {
  console.log("------------------ login");

  const data = JSON.parse(req.body.data);

  console.log("req.body.data : ", req.body.data);
  console.log("req.body.data.email : ", data.email);
  console.log("req.body.data.password : ", data.password);

  if (!data.email || !data.password) {
    res.status(400).json({ message: "Requête incomplète." });
  } else {
    models.User.findOne({ where: { email: data.email } })
      .then((user) => {
        bcrypt.compare(
          data.password,
          user.password,
          (errComparePassword, resComparePassword) => {
            if (resComparePassword) {
              res.status(200).json({ token: jwt.generateToken(user) });
            } else {
              res
                .status(403)
                .json({ message: "Le mot de passe est invalide." });
            }
          }
        );
      })
      .catch((error) => res.status(404).json(error));
  }
};

// Me
exports.me = (req, res, next) => {
  console.log("------------------ me");

  if (!req.body.data) {
    res.status(400).json({ message: "Requête incomplète." });
  } else {
    const token = jwt.getUserId(req.body.data);

    if (token === "invalid signature") {
      res.status(401).json({ error: "Vous n'êtes pas connecté " });
    } else {
      const userId = token.userId;
      models.User.findOne({ where: { id: userId } })
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(404).json(error));
    }
  }
};

// Get all users
exports.getAllUsers = (req, res, next) => {
  console.log("---------- getAllUsers");

  models.User.findAll({ order: [["username", "ASC"]] })
    .then((users) => {
      if (users.length > 0) {
        res.status(200).json(users);
      } else {
        res.status(200).json({ message: "Pas de post à afficher" });
      }
    })
    .catch((error) => res.status(500).json(error));
};

// Get one user
exports.getOneUser = (req, res) => {
  console.log("----------- getOneUser");

  if (!req.params.id) {
    res.status(400).json({ message: "Requête incomplète." });
  } else {
    models.User.findOne({ where: { id: req.params.id } })
      .then((user) => res.status(200).json(user))
      .catch(() =>
        res.status(404).json({ message: "Aucun élément à afficher." })
      );
  }
};

// Update user acount
exports.modifyUser = (req, res, next) => {
  console.log("------------ modifyUser");
  console.log("req.body.data : ", req.body.data);
  const data = JSON.parse(req.body.data);

  if (
    !data.email ||
    !data.firstname ||
    !data.lastname ||
    !req.headers.authorization
  ) {
    res.status(400).json({ message: "Requête incomplète." });
  } else {
    const token = jwt.getUserId(req.headers.authorization);
    const userId = token.userId;

    models.User.findOne({ where: { id: userId } })
      .then((user) => {
        if (user.id === userId) {
          const newUsername = data.firstname + " " + data.lastname;
          models.User.update(
            {
              email: data.email,
              bio: data.bio,
              firstname: data.firstname,
              lastname: data.lastname,
              username: newUsername,
              updatedAt: new Date(),
            },
            { where: { id: user.id } }
          )
            .then(() => {
              models.User.findOne({ where: { id: userId } })
                .then((user) => res.status(200).json(user))
                .catch((error) => res.status(404).json(error));
            })
            .catch((error) => res.status(501).json(error));
        } else {
          res.status(403).json({ message: "Action non autorisée." });
        }
      })
      .catch((error) => res.status(500).json(error));
  }
};

// // Delete an acount
exports.deleteUser = (req, res, next) => {
  console.log("---------- deleteUser");

  if (!req.params.id || !req.headers.authorization) {
    res.status(400).json({ message: "Requête incomplète." });
  } else {
    const token = jwt.getUserId(req.headers.authorization);
    const userId = token.userId;
    const isAdmin = token.isAdmin;

    models.User.findOne({ where: { id: req.params.id } })
      .then((user) => {
        if (user.id == userId || isAdmin) {
          models.User.destroy({ where: { id: user.id } })
            .then(() => res.status(204).json({ message: "Elément supprimé." }))
            .catch((error) => res.status(501).json(error));
        } else {
          res.status(403).json({ message: "Action non autorisée." });
        }
      })
      .catch((error) => res.status(500).json(error));
  }
};
