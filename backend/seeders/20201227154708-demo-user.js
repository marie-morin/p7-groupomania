"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log("pass");
    const date = new Date();

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: 1,
          email: "mariemarie@gmail.com",
          password: "mariemarie1",
          firstname: "Marie",
          lastname: "Dupont",
          username: "Marie Dupont",
          bio: "Nam cursus commodo augue, et.",
          imageUrl: null,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 2,
          email: "michel@gmail.com",
          password: "michelmichel1",
          firstname: "Michel",
          lastname: "Menier",
          username: "Michel Menier",
          bio: null,
          imageUrl: null,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 3,
          email: "titouan@gmail.com",
          password: "titouantitouan1",
          firstname: "Titouan",
          lastname: "Clerville",
          username: "Titouan Clerville",
          bio: "Nunc sem tortor, efficitur a tortor...",
          imageUrl: null,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 4,
          email: "beatriz@gmail.com",
          password: "beabeatriz1",
          firstname: "Beatriz",
          lastname: "Perrot",
          username: "Beatriz Perrot",
          bio:
            "Mauris in est eu ante convallis lobortis. Mauris dignissim magna non magna.",
          imageUrl: null,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 5,
          email: "admin@gmail.com",
          password: "adminadmin1",
          firstname: "Admin",
          lastname: "Groupamania",
          username: "Admin Groupamania",
          bio: null,
          imageUrl: null,
          createdAt: date,
          updatedAt: date,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
