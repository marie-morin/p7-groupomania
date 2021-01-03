const models = require("../models");
const jwt = require("../utils/jwtValidator");
const fs = require("fs");

const bcrypt = require("bcrypt");

// Format adresse email classique
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"']+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Format mot de passe :
// * Au moins 6 caractères
// * Au moins 1 lettre majuscule
// * Au moins 1 lettre minuscule
// * Au moins 1 chiffre
// * Seuls les caractères suivants sont autorisés : @ $ ! % ?
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%?]{6,}$/;

// Seuls les caractères spéciaux présents dans la régex suivante sont autorisés :
const regex = /^[A-Za-z\d\s.,;:!?"()/%-_'éèêëà#@ô^öù*ç€$£≠÷°]*$/;

exports.signup = (req, res, next) => {
  const data = JSON.parse(req.body.data);

  if (
    !data ||
    !data.email ||
    !data.password ||
    !data.firstname ||
    !data.lastname ||
    !emailRegex.test(data.email) ||
    !passwordRegex.test(data.password) ||
    !regex.test(data.firstname) ||
    !regex.test(data.lastname)
  ) {
    res.status(400).json({ message: "Requête erronée." });
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
          res.status(200).json({ token: jwt.generateToken(user.dataValues) });
        })
        .catch((error) => res.status(404).json(error));
    });
  }
};

exports.login = (req, res, next) => {
  const data = JSON.parse(req.body.data);

  if (
    !data ||
    !data.email ||
    !data.password ||
    !emailRegex.test(data.email) ||
    !passwordRegex.test(data.password)
  ) {
    res.status(400).json({ message: "Requête erronée." });
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

exports.me = (req, res, next) => {
  const data = JSON.parse(req.body.data);

  if (!data || !regex.test(data)) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
    const token = jwt.getUserId(data);

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

exports.getAllUsers = (req, res, next) => {
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

exports.getOneUser = (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
    models.User.findOne({ where: { id: req.params.id } })
      .then((user) => res.status(200).json(user))
      .catch(() =>
        res.status(404).json({ message: "Aucun élément à afficher." })
      );
  }
};

exports.updateUser = (req, res, next) => {
  const data = req.body;

  if (
    !data ||
    !data.email ||
    !data.firstname ||
    !data.lastname ||
    !req.headers.authorization ||
    !emailRegex.test(data.email) ||
    !regex.test(data.firstname) ||
    !regex.test(data.lastname)
  ) {
    res.status(400).json({ message: "Requête erronée." });
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

exports.updateProfilPicture = (req, res, next) => {
  const image = req.file;

  if (!image || !req.headers.authorization) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
    const token = jwt.getUserId(req.headers.authorization);
    const userId = token.userId;

    models.User.findOne({ where: { id: userId } })
      .then((user) => {
        if (user.id === userId) {
          if (user.imageUrl) {
            // Supprimer l'ancienne image du server
            const filename = user.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, (err) => {
              if (err) throw err;
            });
          }

          models.User.update(
            {
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
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

exports.deleteProfilPicture = (req, res, next) => {
  if (!req.params.id || !req.headers.authorization) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
    const token = jwt.getUserId(req.headers.authorization);
    const userId = token.userId;

    models.User.findOne({ where: { id: userId } })
      .then((user) => {
        if (user.id === userId) {
          const filename = user.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, (err) => {
            if (err) throw err;
          });
          models.User.update(
            {
              imageUrl: null,
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

exports.updatePassword = (req, res, next) => {
  const data = req.body;

  if (
    !data ||
    !data.initialMdp ||
    !data.newMdp ||
    !data.newMdpConf ||
    !req.headers.authorization ||
    !passwordRegex.test(data.initialMdp) ||
    !passwordRegex.test(data.newMdp) ||
    !passwordRegex.test(data.newMdpConf) ||
    data.newMdp !== data.newMdpConf
  ) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
    const token = jwt.getUserId(req.headers.authorization);
    const userId = token.userId;

    models.User.findOne({ where: { id: userId } })
      .then((user) => {
        if (user.id === userId) {
          bcrypt.compare(
            data.initialMdp,
            user.password,
            (errComparePassword, resComparePassword) => {
              if (resComparePassword) {
                bcrypt.hash(data.newMdp, 10, function (err, bcryptPassword) {
                  models.User.update(
                    {
                      ...user,
                      password: bcryptPassword,
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
                });
              } else {
                res
                  .status(403)
                  .json({ message: "Le mot de passe est invalide." });
              }
            }
          );
        } else {
          res.status(403).json({ message: "Action non autorisée." });
        }
      })
      .catch((error) => res.status(404).json(error));
  }
};

exports.deleteUser = (req, res, next) => {
  if (!req.params.id || !req.headers.authorization) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
    const token = jwt.getUserId(req.headers.authorization);
    const userId = token.userId;
    const isAdmin = token.isAdmin;

    models.User.findOne({ where: { id: req.params.id } })
      .then((user) => {
        if (user.id == userId || isAdmin) {
          if (user.imageUrl) {
            // Supprimer la photo de profil du server
            const filename = user.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
              models.User.destroy({ where: { id: user.id } })
                .then(() =>
                  res.status(204).json({ message: "Elément supprimé." })
                )
                .catch((error) => res.status(501).json(error));
            });
          } else {
            models.User.destroy({ where: { id: user.id } })
              .then(() =>
                res.status(204).json({ message: "Elément supprimé." })
              )
              .catch((error) => res.status(501).json(error));
          }
        } else {
          res.status(403).json({ message: "Action non autorisée." });
        }
      })
      .catch((error) => res.status(500).json(error));
  }
};
