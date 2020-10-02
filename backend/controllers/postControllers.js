//Import
const models = require("../models");
const jwt = require("../utils/jwtValidator");
const fs = require("fs");
const dotenv = require("dotenv").config();
const regex = /^[a-zA-Z0-9 _.,!()&]+$/;

//Création d'un message
exports.addPost = (req, res) => {
  const newPost = req.file
    ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { title: req.body.title, content: req.body.content };
  console.log(newPost);

  if (!regex.test(newPost.title) || !regex.test(newPost.contenu)) {
    return res
      .status(500)
      .json({ error: "Des champs contiennent des caractères invalides" });
  }
  console.log(req.headers.authorization);
  let id = jwt.getUserId(req.headers.authorization);

  console.log(id);
  models.User.findOne({
    attributes: ["id", "email", "username"],
    where: { id: id },
  })
    .then((user) => {
      if (!user) {
        res.status(400).json(error);
      }

      models.Post.create({
        title: title,
        content: newPost,
        imageUrl: imageUrl,
        userId: user.id,
      })
        .then(() => {
          res.status(201).json({ message: "Post publié !" });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })
    .catch((error) => res.status(500).json(error));
};

// Create a post
// exports.addPost = (req, res, next) => {
//   const newPost = JSON.parse(req.body);
//   if (!regex.test(newPost.title) || !regex.test(newPost.content)) {
//     return res
//       .status(500)
//       .json({ error: "Des champs contiennent des caractères invalides" }); // Checking from form input values format before dealing with them
//   }
//   const newUser = models.User.create({
//     ...newPost,
//     likes: 0,
//     dislikes: 0,
//     usersLiked: [],
//     usersDisliked: [],
//   })
//     .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
//     .catch((error) => res.status(400).json({ error }));
// };

// Get all posts

exports.getAllPosts = (req, res) => {
  models.Post.findAll({
    include: [
      {
        model: models.User,
        attributes: ["username"],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => {
      if (posts.length > null) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ error: "Pas de post à afficher" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

// Get one post
exports.getOnePost = (req, res, next) => {
  models.Post.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: models.User,
        attributes: ["username"],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => {
      if (posts.length > null) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ error: "Pas de post à afficher" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

// Get all posts from one user
exports.getPostsFrom = (req, res, next) => {
  models.Post.findAll({
    where: { userId: req.params.id },
    include: [
      {
        model: models.User,
        attributes: ["username"],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => {
      if (posts.length > null) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ error: "Pas de post à afficher" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

// Update a post
exports.modifyPost = (req, res, next) => {};

// Delete a post
exports.deletePost = (req, res, next) => {};

// Like or dislike a post
exports.giveOpinion = (req, res, next) => {};
