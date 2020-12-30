//Import
const models = require("../models");
const jwt = require("../utils/jwtValidator");
const regex = /^[A-Za-z\d\s.,;:!?"()/%-_'éèêëà#@ô^öù*ç€$£≠÷°]*$/;

exports.addComment = (req, res) => {
  const data = req.body;

  if (
    !data ||
    !data.content ||
    !data.postId ||
    !req.headers.authorization ||
    !regex.test(data.content) ||
    !regex.test(data.postId)
  ) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
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
          include: [
            {
              model: models.User,
              attributes: ["imageUrl", "username", "lastname", "firstname"],
            },
          ],
        })
          .then((comment) => res.status(201).json(comment))
          .catch((error) => res.status(404).json(error));
      })
      .catch((error) => res.status(501).json(error));
  }
};

exports.getCommentsFromPost = (req, res, next) => {
  if (!req.params.id) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
    models.Comment.findAll({
      where: { postId: req.params.id },
      include: [
        {
          model: models.User,
          attributes: ["imageUrl", "username", "lastname", "firstname"],
        },
      ],
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

exports.modifyComment = (req, res) => {
  const data = req.body;
  if (
    !data ||
    !req.params.id ||
    !req.headers.authorization ||
    !regex.test(data.content)
  ) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
    const token = jwt.getUserId(req.headers.authorization);
    const userId = token.userId;
    const commentId = req.params.id;

    models.Comment.findOne({ where: { id: commentId } })
      .then((comment) => {
        if (comment.userId == userId) {
          models.Comment.update(
            { content: data.content, updatedAt: new Date() },
            { where: { id: comment.id } }
          )
            .then(() => {
              models.Comment.findOne({
                where: { id: commentId },
                include: [
                  {
                    model: models.User,
                    attributes: [
                      "imageUrl",
                      "username",
                      "lastname",
                      "firstname",
                    ],
                  },
                ],
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

exports.deleteComment = (req, res) => {
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

exports.like = (req, res, next) => {
  const data = JSON.parse(req.body.data);

  if (!data || !req.headers.authorization || !regex.test(data)) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
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
            .then(() => {
              models.CommentLikes.findOne({
                where: { UserId: userId, CommentId: data },
                include: [
                  {
                    model: models.User,
                    attributes: [
                      "imageUrl",
                      "username",
                      "lastname",
                      "firstname",
                    ],
                  },
                ],
              })
                .then((like) => res.status(200).json(like))
                .catch((error) => res.status(404).json(error));
            })
            .catch((error) => res.status(501).json(error));
        }
      })
      .catch((error) => res.status(500).json(error));
  }
};

exports.getLikesFromComment = (req, res, next) => {
  if (!req.params.id) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
    models.CommentLikes.findAll({
      where: { commentId: req.params.id },
      include: [
        {
          model: models.User,
          attributes: ["imageUrl", "username", "lastname", "firstname"],
        },
      ],
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
