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
  console.log("----------- signup");

  console.log("req.body.data : ", req.body.data);
  const data = JSON.parse(req.body.data);
  console.log("data : ", data);
  console.log("data.email : ", data.email);

  // const registeringUser = JSON.parse(req.body.data);
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
    where: { email: data.email },
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
            res.status(200).json({
              // userId: user.dataValues.id,
              token: jwt.generateToken(user.dataValues),
              // isAdmin: user.dataValues.isAdmin,
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
  console.log("------------------ login");

  const data = JSON.parse(req.body.data);
  // console.log("data : ", data);

  models.User.findOne({
    where: { email: data.email },
  })
    .then((user) => {
      if (!user) {
        res.status(404).json({
          erreur: "Aucun compte ne correspond à l'adresse email renseignée !",
        });
      }

      bcrypt.compare(
        data.password,
        user.password,
        (errComparePassword, resComparePassword) => {
          if (resComparePassword) {
            res.status(200).json({
              // userId: user.id,
              token: jwt.generateToken(user),
              // isAdmin: user.isAdmin,
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

// Me
exports.me = (req, res, next) => {
  console.log("------------------ me");
  const data = req.body.data;
  const token = jwt.getUserId(req.body.data);
  const userId = token.userId;

  // console.log("data : ", data);
  // console.log("token : ", token);
  // console.log(userId);

  if (userId === "invalid signature") {
    res.status(401).json({ error: "Vous n'êtes pas connecté " });
  }

  models.User.findOne({
    where: { id: userId },
  })
    .then((user) => {
      // console.log(user);
      if (!user) {
        res.status(404).json({
          erreur: "Aucun compte ne correspond à l'adresse email renseignée !",
        });
      }
      res.status(200).json({ user });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

// Get all users
exports.getAllUsers = (req, res, next) => {
  console.log("---------- getAllUsers");
  console.log("getAllUsers");

  models.User.findAll({
    attributes: [
      "email",
      "firstname",
      "lastname",
      "username",
      "isAdmin",
      "bio",
      "id",
    ],
  })
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

// Get one user
exports.getOneUser = (req, res) => {
  console.log("----------- getOneUser");

  models.User.findOne({
    attributes: [
      "email",
      "firstname",
      "lastname",
      "username",
      "isAdmin",
      "bio",
      "id",
    ],
    where: { id: req.params.id },
  })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json(error));
};

// Update user acount
exports.modifyUser = (req, res, next) => {
  console.log("------------ modifyUser");

  const data = JSON.parse(req.body.data);
  console.log("data : ", data);

  console.log("----req.headers.authorization");
  console.log(req.headers.authorization);

  const token = jwt.getUserId(req.headers.authorization);
  const userId = token.userId;

  let newPassword;
  if (data.password) {
    newPassword = data.password;
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
      const newUsername = data.firstname + " " + data.lastname;
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
                    email: data.email,
                    bio: data.bio,
                    firstname: data.firstname,
                    lastname: data.lastname,
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
            email: data.email,
            bio: data.bio,
            firstname: data.firstname,
            lastname: data.lastname,
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
  console.log("---------- deleteUser");

  const token = jwt.getUserId(req.headers.authorization);
  const userId = token.userId;

  console.log(req.params.id);

  models.User.findOne({
    where: { id: req.params.id },
  })
    .then((user) => {
      if (!user) {
        res.status(401).json({ error: "Veuillez vous connecter !" });
      }
      // console.log("Utilisateur trouvé dans la base");
      // console.log(user);

      if (req.params.id !== userId || userId.isAdmin !== 1) {
        res.status(401).json({
          error: "Vous n'êtes pas autoriser à effectuer cette action !",
        });
      }

      // models.User.destroy({
      //   where: { id: req.params.id },
      // })
      //   .then(() => res.end())
      //   .catch((err) => console.log(err));
    })
    .catch((err) => res.status(500).json(err));
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
// exports.getUserByUsername = (req, res, next) => {};
