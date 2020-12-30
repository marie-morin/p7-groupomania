"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date();

    await queryInterface.bulkInsert(
      "Posts",
      [
        {
          id: 1,
          userId: 4,
          imageUrl: "http://localhost:3000/images/test_usa.jpg",
          title:
            "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 2,
          userId: 3,
          imageUrl: "http://localhost:3000/images/test_dog.jpg",
          title: "Vestibulum porttitor hendrerit mauris sed sodales !",
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 3,
          userId: 2,
          imageUrl: "http://localhost:3000/images/test_beach.jpg",
          title:
            "Vestibulum scelerisque quam ac dolor egestas vehicula. Cras placerat neque sollicitudin accumsan laoreet. Ut eu.",
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 4,
          userId: 1,
          imageUrl: "http://localhost:3000/images/test_friends.gif",
          title:
            "Nulla eu consequat mauris, ac mattis arcu. Nulla at velit et justo pharetra elementum eu a lectus. Vivamus lacus dui, finibus interdum vestibulum vitae, tempus sed leo. Pellentesque molestie purus.",
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 5,
          userId: 4,
          imageUrl: "http://localhost:3000/images/test_happ_new_year.gif",
          title: "Fusce at interdum !",
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 6,
          userId: 3,
          imageUrl: "http://localhost:3000/images/test_snow.gif",
          title:
            "Aenean felis arcu, egestas sed auctor sed, condimentum quis quam. Vivamus vel dui commodo quam tincidunt malesuada a nec nisl. Maecenas eget !",
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 7,
          userId: 5,
          imageUrl: "http://localhost:3000/images/test_the_office.gif",
          title:
            "Sed sed erat diam. Donec eget neque diam. Nam sed volutpat nulla. Curabitur turpis neque, volutpat nec placerat.",
          createdAt: date,
          updatedAt: date,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Posts", null, {});
  },
};
