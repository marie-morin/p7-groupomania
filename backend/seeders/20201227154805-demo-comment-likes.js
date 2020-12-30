"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date();

    await queryInterface.bulkInsert(
      "CommentLikes",
      [
        {
          id: 1,
          commentId: 8,
          userId: 3,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 2,
          commentId: 9,
          userId: 3,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 3,
          commentId: 9,
          userId: 1,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 4,
          commentId: 3,
          userId: 3,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 5,
          commentId: 11,
          userId: 3,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 6,
          commentId: 11,
          userId: 1,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 7,
          commentId: 12,
          userId: 3,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 8,
          commentId: 12,
          userId: 2,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 9,
          commentId: 12,
          userId: 5,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 10,
          commentId: 13,
          userId: 3,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 11,
          commentId: 2,
          userId: 4,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 12,
          commentId: 2,
          userId: 3,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 13,
          commentId: 6,
          userId: 4,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 14,
          commentId: 7,
          userId: 4,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 15,
          commentId: 7,
          userId: 3,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 16,
          commentId: 7,
          userId: 5,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 17,
          commentId: 2,
          userId: 2,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 18,
          commentId: 7,
          userId: 2,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 19,
          commentId: 14,
          userId: 5,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 20,
          commentId: 14,
          userId: 4,
          createdAt: date,
          updatedAt: date,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("CommentLikes", null, {});
  },
};
