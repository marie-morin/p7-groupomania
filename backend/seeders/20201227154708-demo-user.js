"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date();
    const hash = bcrypt.hashSync(process.env.USER_PASSWORD, 10);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: 1,
          email: "marie@gmail.com",
          isAdmin: 0,
          password: hash,
          firstname: "Marie",
          lastname: "Dupont",
          username: "Marie Dupont",
          bio: "Nam cursus commodo augue, et.",
          imageUrl: "http://localhost:3000/images-test/threes.jpg",
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 2,
          email: "michel@gmail.com",
          isAdmin: 0,
          password: hash,
          firstname: "Michel",
          lastname: "Lenier",
          username: "Michel Lenier",
          bio: null,
          imageUrl: null,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 3,
          email: "titouan@gmail.com",
          isAdmin: 0,
          password: hash,
          firstname: "Titouan",
          lastname: "Clerville",
          username: "Titouan Clerville",
          bio: "Nunc sem tortor, efficitur a tortor...",
          imageUrl: "http://localhost:3000/images-test/voiture.jpg",
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 4,
          email: "beatriz@gmail.com",
          isAdmin: 0,
          password: hash,
          firstname: "Beatriz",
          lastname: "Perrot",
          username: "Beatriz Perrot",
          bio:
            "Mauris in est eu ante convallis lobortis. Mauris dignissim magna non magna.",
          imageUrl: "http://localhost:3000/images-test/cat.jpg",
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 5,
          email: "admin@gmail.com",
          isAdmin: 1,
          password: hash,
          firstname: "Admin",
          lastname: "Groupamania",
          username: "Admin Groupamania",
          bio: null,
          imageUrl: "http://localhost:3000/images-test/admin.png",
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
