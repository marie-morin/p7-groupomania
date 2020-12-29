"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date();

    await queryInterface.bulkInsert(
      "PostLikes",
      [
        {
          id: 1,
          postId: 1,
          userId: 2,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 2,
          postId: 4,
          userId: 3,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 3,
          postId: 7,
          userId: 4,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 4,
          postId: 5,
          userId: 1,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 5,
          postId: 2,
          userId: 2,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 6,
          postId: 5,
          userId: 3,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 7,
          postId: 7,
          userId: 1,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 8,
          postId: 2,
          userId: 1,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 9,
          postId: 5,
          userId: 5,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 10,
          postId: 7,
          userId: 2,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 11,
          postId: 2,
          userId: 4,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 12,
          postId: 5,
          userId: 2,
          createdAt: date,
          updatedAt: date,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("PostLikes", null, {});
  },
};
