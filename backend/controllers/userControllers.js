// Import
const models = require("../models");
const jwt = require("../utils/jwtValidator");

// Security imports
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const mailValidator = require("email-validator");

// Constantes
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})/;
const nameRegex = /^[a-zA-Z ,.'-]+$/;

// Signup
exports.signup = (req, res, next) => {
  const registeringUser = JSON.parse(req.body.body);
  // if (
  //   !mailValidator.validate(req.body.email) ||
  //   !passwordRegex.test(req.body.password) ||
  //   !nameRegex.test(req.body.firstname) ||
  //   !nameRegex.test(req.body.lastname)
  // ) {
  //   console.log("Les champs contiennent des valeurs interdites !");
  // }
  models.User.findOne({
    attributes: ["email"],
    where: { email: registeringUser.email },
  })
    .then((user) => {
      if (user) {
        res.status(409).json({
          error: "L'email utilisé correspond déjà à un compte existant !",
        });
      }

      // bcrypt.hash(registeringUser.password, 10, function (err, bcryptPassword) {
      //   const username =
      //     registeringUser.firstname + " " + registeringUser.lastname;
      //   const newUser = models.User.create({
      //     email: registeringUser.email,
      //     password: bcryptPassword,
      //     username: username,
      //     bio: registeringUser.bio,
      //     isAdmin: 0,
      //   })
      //     .then(res.status(201).json({ message: "Utilisateur enregistré !" }))
      //     .catch((err) => {
      //       res.status(501).json({ err });
      //     });
      // });
      bcrypt.hash(registeringUser.password, 10, function (err, bcryptPassword) {
        const username =
          registeringUser.firstname + " " + registeringUser.lastname;
        const newUser = models.User.create({
          email: registeringUser.email,
          password: bcryptPassword,
          username: username,
          bio: registeringUser.bio,
          isAdmin: 0,
        })
          .then((user) => {
            res.status(200).json({
              userId: user.dataValues.id,
              token: jwt.generateToken(user.dataValues),
              isAdmin: user.dataValues.isAdmin,
            });
          })
          .catch((err) => {
            res.status(501).json({ err });
          });
      });
    })
    .catch((err) => {
      res.status(503).json({ err });
    });
};

// Login
exports.login = (req, res, next) => {
  console.log("------------------");
  console.log(req.body);
  const loginUser = JSON.parse(req.body.body);

  models.User.findOne({
    where: { email: loginUser.email },
  })
    .then((user) => {
      if (!user) {
        res.status(404).json({
          erreur: "Aucun compte ne correspond à l'adresse email renseignée !",
        });
      }

      bcrypt.compare(
        loginUser.password,
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
exports.getAllUsers = (req, res, next) => {
  models.User.findAll({ attributes: ["email", "username", "isAdmin", "bio"] })
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

// Get one user
exports.getOneUser = (req, res) => {
  models.User.findOne({
    attributes: ["email", "username", "isAdmin", "bio", "id"],
    where: { id: req.params.id },
  })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json(error));
};

// A voir plus tard mais normalement pas besoin de cette méthode puisque peut importe si je regarde
// mon compte ou celui de quelqu'un d'autre, je vois la même chose :
// Nom d'utilisateur, email, bio
// // Get One user
// exports.getMyProfil = (req, res, next) => {
//   const userId = jwt.getUserId(req.headers.authorization);
//   console.log("----------------------");
//   console.log(id);
//   models.User.findOne({
//     attributes: ["email", "username", "isAdmin", "bio"],
//     where: { id: id },
//   })
//     .then((user) => res.status(200).json(user))
//     .catch((error) => res.status(500).json(error));
// };

// Get one user by its username
exports.getUserByUsername = (req, res, next) => {};

// Update user acount
exports.modifyUser = (req, res, next) => {
  const registeringUser = JSON.parse(req.body.body);
  const userId = jwt.getUserId(req.headers.authorization);
  let newPassword;
  if (registeringUser.password) {
    newPassword = registeringUser.password;
  }

  // if (req.body.newPassword && !passwordRegex.test(newPassword)) {
  //   res
  //     .status(406)
  //     .json({ error: "Le mot de passe contient des caractères interdits !" });
  // }

  if (userId != req.params.id) {
    res.status(401).json({ err: "Vous d'avez pas d'authorisation !" });
  }

  models.User.findOne({
    where: { id: userId },
  })
    .then((user) => {
      const newUsername =
        registeringUser.firstname + " " + registeringUser.lastname;
      if (newPassword) {
        bcrypt.compare(
          newPassword,
          user.password,
          (errComparePassword, resComparePassword) => {
            if (resComparePassword) {
              res.status(406).json({
                error:
                  "L'ancien et le nouveau mot de passe doivent être différents !",
              });
            } else {
              bcrypt.hash(newPassword, 10, function (err, bcryptNewPassword) {
                models.User.update(
                  {
                    password: bcryptNewPassword,
                    email: registeringUser.email,
                    bio: registeringUser.bio,
                    username: newUsername,
                  },
                  { where: { id: user.id } }
                )
                  .then(() =>
                    res.status(201).json({
                      confirmation: "Les modifications ont été enregistrées !",
                    })
                  )
                  .catch((err) => res.status(501).json(err));
              });
            }
          }
        );
      } else {
        models.User.update(
          {
            email: registeringUser.email,
            bio: registeringUser.bio,
            username: newUsername,
          },
          { where: { id: user.id } }
        )
          .then(
            res
              .status(201)
              .json({ message: "Les modifications ont été enregistrées !" })
          )
          .catch((err) => res.status(502).json(err));
      }
    })
    .catch((err) => res.status(503).json(err));
};

// // Delete an acount
exports.deleteUser = (req, res, next) => {
  const userId = jwt.getUserId(req.headers.authorization);

  models.User.findOne({
    where: { id: userId },
  })
    .then((user) => {
      if (!user) {
        res.status(401).json({ error: "Veuillez vous connecter !" });
      }

      models.User.destroy({
        where: { id: user.id },
      })
        .then(() => res.end())
        .catch((err) => console.log(err));
    })
    .catch((err) => res.status(500).json(err));
};
