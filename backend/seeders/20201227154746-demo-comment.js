"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date();

    await queryInterface.bulkInsert(
      "Comments",
      [
        {
          id: 1,
          postId: 1,
          userId: 3,
          content:
            "Aenean fringilla ligula ipsum, vulputate auctor lectus scelerisque a. Phasellus eros enim, lobortis nec sagittis eu, scelerisque vel mauris. Aenean eu posuere risus, in mollis augue. Proin id turpis purus. Fusce scelerisque sodales lobortis. Sed.",
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 2,
          postId: 1,
          userId: 2,
          content:
            "Fusce neque lacus, vehicula ut finibus in, tristique et leo. Phasellus vel mattis purus, sed dapibus risus.",
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 3,
          postId: 2,
          userId: 2,
          content:
            "Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus ac nibh felis. Sed vestibulum dolor eu fringilla pulvinar. Quisque.",
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 4,
          postId: 2,
          userId: 1,
          content:
            "Quisque pulvinar felis ut odio luctus lobortis. Praesent iaculis pharetra lorem ac efficitur. Phasellus.",
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 5,
          postId: 2,
          userId: 3,
          content:
            "Quisque cursus varius justo ut iaculis. Fusce lacinia aliquam fermentum. Nunc vulputate rhoncus libero et efficitur. Duis.",
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 6,
          postId: 5,
          userId: 1,
          content: "Suspendisse libero nulla, egestas id tellus et, sodales.",
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 7,
          postId: 5,
          userId: 2,
          content:
            "Sed faucibus id dolor sed euismod. Aenean id commodo neque, vitae blandit justo. Nunc in nibh vitae massa faucibus faucibus eget non urna. Praesent.",
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 8,
          postId: 4,
          userId: 4,
          content:
            "Vivamus non arcu lobortis urna pulvinar dictum eget eget ante. Donec eget est ut lectus gravida commodo quis eget eros. In faucibus, justo quis congue porttitor, neque augue lacinia erat.",
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 9,
          postId: 4,
          userId: 2,
          content: "Nullam non efficitur nisl. Sed euismod.",
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 10,
          postId: 5,
          userId: 3,
          content: "Cras vel est diam. Integer tincidunt.",
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 11,
          postId: 6,
          userId: 1,
          content:
            "Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus ac nibh felis. Sed vestibulum dolor eu fringilla pulvinar. Quisque.",
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 12,
          postId: 6,
          userId: 3,
          content:
            "Nulla vestibulum iaculis lorem eget scelerisque. Nam porta tristique blandit. Pellentesque habitant morbi tristique.",
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 13,
          postId: 6,
          userId: 1,
          content:
            "Cras at blandit dolor, vitae tristique metus. Vivamus sollicitudin suscipit aliquet. Class aptent taciti.",
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 14,
          postId: 7,
          userId: 2,
          content:
            "Maecenas scelerisque ligula odio, a ullamcorper elit fringilla id. Duis pulvinar ultricies gravida. Fusce aliquet semper molestie. Vestibulum pellentesque semper velit, vitae bibendum libero vulputate vel. Quisque sit amet nibh.",
          createdAt: date,
          updatedAt: date,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Comments", null, {});
  },
};
