//Import
const models = require("../models");
const jwt = require("../utils/jwtValidator");
const fs = require("fs");
const dotenv = require("dotenv").config();
const regex = /^[a-zA-Z0-9 _.,!()&]+$/;

//Création d'un message
exports.addPost = (req, res) => {
  console.log("------------- addPost");

  const data = JSON.parse(req.body.data);
  const token = jwt.getUserId(req.headers.authorization);
  const userId = token.userId;

  // console.log("data : ", data);
  // console.log("data.title : ", data.title);
  // console.log("data.content : ", data.content);
  // console.log("userId : ", userId);

  models.Post.create({
    content: data.content,
    title: data.title,
    UserId: userId,
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
        .catch((err) => res.status(501).json(err));
    })
    .catch((err) => {
      res.status(502).json(err);
    });
};

// Get all posts
exports.getAllPosts = (req, res) => {
  console.log("------------ getAllPosts");

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

// Get all posts from one user
exports.getPostsFrom = (req, res, next) => {
  console.log("--------- getPostsFrom");

  console.log("req.body.data : ", req.body.data);
  const data = JSON.parse(req.body.data);
  console.log("data : ", data);

  console.log("----req.headers.authorization");
  console.log(req.headers.authorization);

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
  console.log("---------- modifyPost");

  const data = req.body.data;
  const token = jwt.getUserId(req.headers.authorization);
  const userId = token.userId;

  // console.log("data : ", data);
  // console.log("----req.headers.authorization");
  // console.log(req.headers.authorization);
  // console.log(userId);

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
        { content: data.content, title: data.title },
        { where: { id: post.id } }
      )
        .then((post) => {
          // console.log(post);
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
              // console.log(post);
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
  console.log("--------- deletePost");

  const token = jwt.getUserId(req.headers.authorization);
  const userId = token.userId;
  const isAdmin = token.isAdmin;

  // console.log("req.params : ", req.params);
  // console.log("----req.headers.authorization");
  // console.log(req.headers.authorization);
  // console.log(userId);

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

// Like a post
exports.like = (req, res, next) => {
  console.log("----------- giveOpinion on post");

  const data = req.body.data;
  const token = jwt.getUserId(req.headers.authorization);
  const userId = token.userId;

  // console.log("data : ", data);
  // console.log("----req.headers.authorization");
  // console.log(req.headers.authorization);

  // console.log("userId : ", userId);

  // // console.log("req.body : ", req.body);
  // console.log("data.postId : ", data);
  // console.log("data.userId : ", userId);

  models.PostLikes.findOne({
    where: {
      UserId: userId,
      PostId: data,
    },
  })
    .then((like) => {
      if (like) {
        models.PostLikes.destroy({ where: { id: like.id } })
          .then(() => res.status(200).json({ message: "Like supprimé !" }))
          .catch((err) => res.status(500).json(err));
      } else {
        models.PostLikes.create({
          UserId: userId,
          PostId: data,
        })
          .then((like) => res.status(200).json({ like }))
          .catch((err) => res.status(500).json(err));
      }
    })
    .catch((err) => res.status(500).json(err));
};

// Get likes from one post
exports.getLikesFromPost = (req, res, next) => {
  console.log("--------- getLikesFromPost");

  // console.log("req.params : ", req.params);
  // console.log("req.params.id : ", req.params.id);

  models.PostLikes.findAll({
    where: { postId: req.params.id },
    include: [
      {
        model: models.User,
        attributes: ["username"],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((likes) => {
      if (likes.length > null) {
        res.status(200).json(likes);
      } else {
        res.status(200).json({ message: "Pas de likes à afficher" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

// Remove like from a post
// exports.deleteLike = (req, res, next) => {
//   console.log("-----------");
//   console.log("deleteLike");
//   console.log("req.params.id : ", req.params.id);
//   console.log("req.body : ", req.body);
//   console.log("req.body.userId : ", req.body.userId);
//   console.log("req.body.postId : ", req.body.postId);

//   models.PostLikes.findOne({
//     where: {
//       UserId: req.body.userId,
//       PostId: req.body.postId,
//     },
//   })
//     .then((like) => {
//       console.log("like : ", like);

//       if (!like) {
//         res.status(404).json({ error: "Aucun like ne correspond !" });
//       } else {
//         if (like.userId === req.body.userId) {
//           models.PostLikes.destroy({ where: { id: like.id } })
//             .then(() => res.status(200).json({ message: "Like supprimé !" }))
//             .catch((err) => res.status(500).json(err));
//         } else {
//           res.status(403).json({ error: "Vous n'avez pas l'autorisation !" });
//         }
//       }
//     })
//     .catch((err) => res.status(500).json(err));
// };

// Get one post
// exports.getOnePost = (req, res, next) => {
//   console.log("---------- getOnePost");
//   console.log("getOnePost");

//   console.log("req.body.data : ", req.body.data);
//   const data = JSON.parse(req.body.data);
//   console.log("data : ", data);

//   console.log("----req.headers.authorization");
//   console.log(req.headers.authorization);

//   models.Post.findOne({
//     where: { id: req.params.id },
//     include: [
//       {
//         model: models.User,
//         attributes: ["username"],
//       },
//     ],
//   })
//     .then((post) => {
//       res.status(200).json(post);
//     })
//     .catch((err) => res.status(500).json(err));
// };
