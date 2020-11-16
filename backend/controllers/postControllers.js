//Import
const models = require("../models");
const jwt = require("../utils/jwtValidator");
const fs = require("fs");
const dotenv = require("dotenv").config();
const regex = /^[a-zA-Z0-9 _.,!()&]+$/;

//Création d'un message
exports.addPost = (req, res) => {
  console.log("-------------");
  console.log("addPost");

  // console.log("----req.headers.authoriztion");
  // console.log(req.headers.authorization);

  // console.log("----id");
  const id = jwt.getUserId(req.headers.authorization);
  // console.log(id);

  // console.log("-----req.body");
  // console.log(req.body);

  // console.log("---- req.body parsed");
  // console.log(JSON.parse(req.body.post));

  const newPost = JSON.parse(req.body.post);

  models.Post.create({
    content: newPost.content,
    title: newPost.title,
    UserId: id,
  })
    .then((post) => {
      models.Post.findOne({
        where: { id: post.id },
        include: [
          {
            model: models.User,
            attributes: ["username"],
          },
        ],
      })
        .then((post) => {
          res.status(200).json(post);
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

// Get all posts
exports.getAllPosts = (req, res) => {
  console.log("------------");
  console.log("getAllPosts");

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
  console.log("----------");
  console.log("getOnePost");

  models.Post.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: models.User,
        attributes: ["username"],
      },
    ],
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => res.status(500).json(err));
};

// Get all posts from one user
exports.getPostsFrom = (req, res, next) => {
  console.log("---------");
  console.log("getPostsFrom");

  // console.log(req.params.user);
  models.Post.findAll({
    where: { userId: req.params.user },
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
exports.modifyPost = (req, res) => {
  console.log("----------");
  console.log("modifyPost");

  console.log("req.body", req.body);

  const userId = jwt.getUserId(req.headers.authorization);

  models.Post.findOne({
    where: { id: req.params.id },
  })
    .then((post) => {
      if (post.userId !== userId) {
        res
          .status(403)
          .json("Vous n'êtes pas autorisé effectuer cette action !");
      }

      models.Post.update(
        { content: req.body.content, title: req.body.title },
        { where: { id: req.params.id } }
      )
        .then((post) => {
          console.log(post);
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
            .then((post) => {
              console.log(post);
              res.status(200).json(post);
            })
            .catch((err) => res.status(501).json(err));
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
};

// Delete a post
exports.deletePost = (req, res) => {
  console.log("---------");
  console.log("deletePost");

  // console.log("req.params");
  // console.log(req.params);

  // console.log("req.headers.authorization");
  // console.log(req.headers.authorization);

  const userId = jwt.getUserId(req.headers.authorization);

  models.Post.findOne({
    where: { id: req.params.id },
  })
    .then((post) => {
      if (post.userId !== userId) {
        res
          .status(403)
          .json("Vous n'êtes pas autorisé effectuer cette action !");
      } else {
        if (post.imageUrl) {
          const filename = post.imageUrl.split("/images/")[1];
          console.log(filename);
          fs.unlink(`images/${filename}`, () => {
            models.Post.destroy({
              where: { id: req.params.id },
            })
              .then(() =>
                res.status(200).json({ message: "Le post a été supprimé !" })
              )
              .catch((err) => res.status(500).json(err));
          });
        } else {
          models.Post.destroy({
            where: { id: req.params.id },
          })
            .then(() =>
              res.status(200).json({ message: "Le post a été supprimé !" })
            )
            .catch((err) => res.status(500).json(err));
        }
      }
    })
    .catch((err) => res.status(500).json(err));
};

// Like or dislike a post
exports.giveOpinion = (req, res, next) => {
  console.log("-----------");
  console.log("giveOpinion");
};
