//Import
const models = require("../models");
const jwt = require("../utils/jwtValidator");
const regex = /^[A-Za-z\d\s.,;:!?"()/%]*$/;

// Create a comment
exports.addComment = (req, res) => {
  console.log("--------------- addComment");

  if (
    !req.body.data.content ||
    !req.body.data.postId ||
    !req.headers.authorization ||
    !regex.test(req.body.data.content) ||
    !regex.test(req.body.data.postId)
  ) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
    const data = req.body.data;
    const token = jwt.getUserId(req.headers.authorization);
    const userId = token.userId;

    models.Comment.create({
      content: data.content,
      PostId: data.postId,
      UserId: userId,
    })
      .then((comment) => {
        models.Comment.findOne({
          where: { id: comment.id },
          include: [{ model: models.User, attributes: ["username"] }],
        })
          .then((comment) => res.status(201).json(comment))
          .catch((error) => res.status(404).json(error));
      })
      .catch((error) => res.status(501).json(error));
  }
};

// Get all posts from one post
exports.getCommentsFromPost = (req, res, next) => {
  console.log("----------- getCommentsFromPost");

  if (!req.params.id) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
    models.Comment.findAll({
      where: { postId: req.params.id },
      include: [{ model: models.User, attributes: ["username"] }],
      order: [["createdAt", "ASC"]],
    })
      .then((comments) => {
        if (comments.length > 0) {
          res.status(200).json(comments);
        } else {
          res.status(200).json({ message: "Aucun élément à afficher" });
        }
      })
      .catch((error) => res.status(500).json(error));
  }
};

// Update a post
exports.modifyComment = (req, res) => {
  console.log("---------- modifyComment");

  if (
    !req.body.data ||
    !req.params.id ||
    !req.headers.authorization ||
    !regex.test(req.body.data)
  ) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
    const data = req.body.data;
    const token = jwt.getUserId(req.headers.authorization);
    const userId = token.userId;
    const commentId = req.params.id;

    models.Comment.findOne({ where: { id: commentId } })
      .then((comment) => {
        if (comment.userId == userId) {
          models.Comment.update(
            { content: data, updatedAt: new Date() },
            { where: { id: comment.id } }
          )
            .then(() => {
              models.Comment.findOne({
                where: { id: commentId },
                include: [{ model: models.User, attributes: ["username"] }],
              })
                .then((comment) => res.status(200).json(comment))
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

// Delete a post
exports.deleteComment = (req, res) => {
  console.log("---------- deleteComment");

  if (!req.params.id || !req.headers.authorization) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
    const token = jwt.getUserId(req.headers.authorization);
    const userId = token.userId;
    const isAdmin = token.isAdmin;

    models.Comment.findOne({ where: { id: req.params.id } })
      .then((comment) => {
        if (userId === comment.userId || isAdmin) {
          models.Comment.destroy({ where: { id: comment.id } })
            .then(() => res.status(204).json({ message: "Elément supprimé." }))
            .catch((error) => res.status(501).json(error));
        } else {
          res.status(403).json({ message: "Action non autorisée." });
        }
      })
      .catch((error) => res.status(500).json(error));
  }
};

// Like a comment
exports.like = (req, res, next) => {
  console.log("----------- giveOpinion on comment");

  if (
    !req.body.data ||
    !req.headers.authorization ||
    !regex.test(req.body.data)
  ) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
    const data = req.body.data;
    const token = jwt.getUserId(req.headers.authorization);
    const userId = token.userId;

    models.CommentLikes.findOne({ where: { UserId: userId, CommentId: data } })
      .then((like) => {
        if (like) {
          if (userId === like.userId) {
            models.CommentLikes.destroy({ where: { id: like.id } })
              .then(() =>
                res.status(204).json({ message: "Elément supprimé." })
              )
              .catch((error) => res.status(501).json(error));
          } else {
            res.status(403).json({ message: "Action non autorisée." });
          }
        } else {
          models.CommentLikes.create({ UserId: userId, CommentId: data })
            .then((like) => res.status(201).json(like))
            .catch((error) => res.status(501).json(error));
        }
      })
      .catch((error) => res.status(500).json(error));
  }
};

// Get likes from one post
exports.getLikesFromComment = (req, res, next) => {
  console.log("--------- getLikesFromComment");

  if (!req.params.id) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
    models.CommentLikes.findAll({
      where: { commentId: req.params.id },
      include: [{ model: models.User, attributes: ["username"] }],
      order: [["createdAt", "ASC"]],
    })
      .then((likes) => {
        if (likes.length > 0) {
          res.status(200).json(likes);
        } else {
          res.status(200).json({ message: "Aucun élément à afficher." });
        }
      })
      .catch((error) => res.status(500).json(error));
  }
};
