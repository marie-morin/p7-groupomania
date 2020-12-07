//Import
const models = require("../models");
const jwt = require("../utils/jwtValidator");
const fs = require("fs");
const regex = /^[A-Za-z\d\s.,;:!?"()/%-_']*$/;

//Création d'un message
exports.addPost = (req, res) => {
  console.log("------------- addPost");

  console.log("req.body.data : ", req.body.data);

  const data = JSON.parse(req.body.data);
  if (
    !data ||
    !data.title ||
    !data.content ||
    !data.imageUrl ||
    !req.headers.authorization ||
    !regex.test(data.title) ||
    !regex.test(data.content)
  ) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
    const token = jwt.getUserId(req.headers.authorization);
    const userId = token.userId;

    models.Post.create({
      content: data.content,
      title: data.title,
      imageUrl: data.imageUrl,
      UserId: userId,
    })
      .then((post) => {
        models.Post.findOne({
          where: { id: post.id },
          include: [{ model: models.User, attributes: ["username"] }],
        })
          .then((post) => res.status(200).json(post))
          .catch((error) => res.status(404).json(error));
      })
      .catch((error) => res.status(500).json(error));
  }
};

// Get all posts
exports.getAllPosts = (req, res) => {
  console.log("------------ getAllPosts");

  models.Post.findAll({
    include: [{ model: models.User, attributes: ["username"] }],
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => {
      if (posts.length > 0) {
        res.status(200).json(posts);
      } else {
        res.status(200).json({ message: "Pas de post à afficher" });
      }
    })
    .catch((error) => res.status(500).json(error));
};

// Update a post
exports.modifyPost = (req, res) => {
  console.log("---------- modifyPost");

  const data = JSON.parse(req.body.data);

  if (
    !data ||
    !data.title ||
    !data.content ||
    !req.params.id ||
    !req.headers.authorization ||
    !regex.test(data.title) ||
    !regex.test(data.content)
  ) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
    const token = jwt.getUserId(req.headers.authorization);
    const userId = token.userId;
    const postId = req.params.id;

    models.Post.findOne({ where: { id: postId } })
      .then((post) => {
        if (post.userId == userId) {
          models.Post.update(
            { content: data.content, title: data.title, updatedAt: new Date() },
            { where: { id: post.id } }
          )
            .then(() => {
              models.Post.findOne({
                where: { id: postId },
                include: [{ model: models.User, attributes: ["username"] }],
              })
                .then((post) => res.status(200).json(post))
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
exports.deletePost = (req, res) => {
  console.log("--------- deletePost");

  if (!req.params.id || !req.headers.authorization) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
    const token = jwt.getUserId(req.headers.authorization);
    const userId = token.userId;
    const isAdmin = token.isAdmin;

    models.Post.findOne({ where: { id: req.params.id } })
      .then((post) => {
        if (post.userId == userId || isAdmin) {
          models.Post.destroy({ where: { id: post.id } })
            .then(() => res.status(204).json({ message: "Elément supprimé." }))
            .catch((error) => res.status(501).json(error));
        } else {
          res.status(403).json({ message: "Action non autorisée." });
        }
      })
      .catch((error) => res.status(500).json(error));
  }
};
// exports.deletePost = (req, res) => {
//   console.log("--------- deletePost");

//   if (!req.params.id || !req.headers.authorization) {
//     res.status(400).json({ message: "Requête incomplète." });
//   } else {
//     const token = jwt.getUserId(req.headers.authorization);
//     const userId = token.userId;
//     const isAdmin = token.isAdmin;

//     models.Post.findOne({ where: { id: req.params.id } })
//       .then((post) => {
//         if (post.userId == userId || isAdmin) {
//           // if (post.imageUrl) {
//           //   const filename = post.imageUrl.split("/images/")[1];
//           //   console.log(filename);
//           //   fs.unlink(`images/${filename}`, () => {
//           //     models.Post.destroy({
//           //       where: { id: req.params.id },
//           //     })
//           //       .then(() =>
//           //         res.status(200).json({ message: "Le post a été supprimé !" })
//           //       )
//           //       .catch((err) => res.status(500).json(err));
//           //   });
//           // } else {
//           models.Post.destroy({ where: { id: req.params.id } })
//             .then(() => res.status(200).json({ message: "Elément supprimé." }))
//             .catch((err) => res.status(500).json(err));
//           // }
//         } else {
//           res.status(403).json({ message: "Action non autorisée." });
//         }
//       })
//       .catch((err) => res.status(500).json(err));
//   }
// };

// Like a post

exports.like = (req, res, next) => {
  console.log("----------- giveOpinion on post");

  const data = JSON.parse(req.body.data);

  if (!data || !req.headers.authorization || !regex.test(data)) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
    const token = jwt.getUserId(req.headers.authorization);
    const userId = token.userId;

    models.PostLikes.findOne({ where: { UserId: userId, PostId: data } })
      .then((like) => {
        if (like) {
          if (userId === like.userId) {
            models.PostLikes.destroy({ where: { id: like.id } })
              .then(() => {
                console.log("pass");

                res.status(204).json({ message: "Elément supprimé." });
              })
              .catch((error) => res.status(501).json(error));
          } else {
            res.status(403).json({ message: "Action non autorisée." });
          }
        } else {
          models.PostLikes.create({ UserId: userId, PostId: data })
            .then((like) => res.status(201).json(like))
            .catch((error) => res.status(501).json(error));
        }
      })
      .catch((error) => res.status(500).json(error));
  }
};

// Get likes from one post
exports.getLikesFromPost = (req, res, next) => {
  console.log("--------- getLikesFromPost");

  if (!req.params.id) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
    models.PostLikes.findAll({
      where: { postId: req.params.id },
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
