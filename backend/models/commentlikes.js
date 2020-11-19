"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CommentLikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.CommentLikes.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
      });
      models.CommentLikes.belongsTo(models.Comment, {
        foreignKey: {
          allowNull: false,
        },
      });
    }
  }
  CommentLikes.init(
    {
      userId: DataTypes.INTEGER,
      commentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CommentLikes",
    }
  );
  return CommentLikes;
};
