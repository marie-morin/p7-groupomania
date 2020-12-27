"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "mariemarie@gmail.com",
          password: "mariemarie2",
          firstname: "Marie",
          lastname: "Dupont",
          username: "Marie Dupont",
          bio: null,
          imageUrl: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "michel@gmail.com",
          password: "michelmichel1",
          firstname: "Michel",
          lastname: "Menier",
          username: "Michel Menier",
          bio: null,
          imageUrl: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "titouan@gmail.com",
          password: "titouantitouan1",
          firstname: "Titouan",
          lastname: "Clerville",
          username: "Titouan Clerville",
          bio: null,
          imageUrl: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "beatriz@gmail.com",
          password: "beabeatriz1",
          firstname: "Beatriz",
          lastname: "Perrot",
          username: "Beatriz Perrot",
          bio: null,
          imageUrl: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "karim@gmail.com",
          password: "karimkarim1",
          firstname: "Karim",
          lastname: "Helion",
          username: "Karim Helion",
          bio: null,
          imageUrl: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
