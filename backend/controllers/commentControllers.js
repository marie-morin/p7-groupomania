//Import
const models = require("../models");
const jwt = require("../utils/jwtValidator");
const fs = require("fs");
const dotenv = require("dotenv").config();
const regex = /^[a-zA-Z0-9 _.,!()&]+$/;

// Create a comment
exports.addComment = (req, res) => {
  console.log("---------------");

  // console.log("----req.headers.authorization");
  // console.log(req.headers.authorization);

  // console.log("----req.body");
  // console.log(req.body);

  // console.log("----req.body.comment.content");
  // console.log(req.body.comment.content);

  // console.log("----req.body.comment.PostId");
  // console.log(req.body.comment.PostId);

  // console.log("----id");
  const id = jwt.getUserId(req.headers.authorization);
  // console.log(id);

  models.Comment.create({
    content: req.body.comment.content,
    PostId: req.body.comment.PostId,
    UserId: id,
  })
    .then((comment) => {
      models.Comment.findOne({
        where: { id: comment.id },
        include: [
          {
            model: models.User,
            attributes: ["username"],
          },
        ],
      })
        .then((comment) => {
          res.status(200).json(comment);
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => {
      res.status(501).json(err);
    });
};

// Get all comments
exports.getAllComments = (req, res) => {
  models.Comment.findAll({
    include: [
      {
        model: models.User,
        attributes: ["username"],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((comments) => {
      if (comments.length > null) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ error: "Pas de commentaire à afficher" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

// Get one comment
exports.getOneComment = (req, res, next) => {
  console.log(req.params.id);
  models.Comment.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: models.User,
        attributes: ["username"],
      },
    ],
  })
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((err) => res.status(500).json(err));
};

// Get all posts from one post
exports.getCommentsFromPost = (req, res, next) => {
  console.log("-----------");
  console.log("test");

  console.log("req.params");
  console.log(req.params);

  console.log("req.params.post");
  console.log(req.params.post);

  models.Comment.findAll({
    where: { postId: req.params.post },
    include: [
      {
        model: models.User,
        attributes: ["username"],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((comments) => {
      console.log(comments);
      if (comments.length > null) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ error: "Pas de commentaire à afficher" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

// Get all posts from one user
exports.getCommentsFromUser = (req, res, next) => {
  models.Comment.findAll({
    where: { userId: req.params.user },
    include: [
      {
        model: models.User,
        attributes: ["username"],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((comments) => {
      console.log(comments);
      if (comments.length > null) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ error: "Pas de commentaire à afficher" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

// Update a post
exports.modifyComment = (req, res) => {
  const userId = jwt.getUserId(req.headers.authorization);

  models.Comment.findOne({
    where: { id: req.params.id },
  })
    .then((comment) => {
      if (comment.userId !== userId) {
        res
          .status(403)
          .json("Vous n'êtes pas autorisé effectuer cette action !");
      }

      models.Comment.update(
        { content: req.body.content },
        { where: { id: req.params.id } }
      )
        .then(() =>
          res.status(200).json({ message: "Le commentaire a été modifié !" })
        )
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
};

// Delete a post
exports.deleteComment = (req, res) => {
  const userId = jwt.getUserId(req.headers.authorization);

  models.Comment.findOne({
    where: { id: req.params.id },
  })
    .then((comment) => {
      if (comment.userId !== userId) {
        res
          .status(403)
          .json("Vous n'êtes pas autorisé effectuer cette action !");
      }
      models.Comment.destroy({
        where: { id: req.params.id },
      })
        .then(() =>
          res.status(200).json({ message: "Le commentaire a été supprimé !" })
        )
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
};

// Like or dislike a post
exports.giveOpinion = (req, res, next) => {};
