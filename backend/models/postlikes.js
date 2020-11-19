"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostLikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.PostLikes.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
      });
      models.PostLikes.belongsTo(models.Post, {
        foreignKey: {
          allowNull: false,
        },
      });
    }
  }
  PostLikes.init(
    {
      postId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PostLikes",
    }
  );
  return PostLikes;
};
