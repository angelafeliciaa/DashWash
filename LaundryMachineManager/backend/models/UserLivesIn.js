const { Model, DataTypes } = require("sequelize");

class UserLivesIn extends Model {}

UserLivesIn.init(
  {
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        isInt: true,
      },
    },
    bid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      validate: {
        isInt: true,
      },
    },
    uname: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  { sequelize, modelName: "UserLivesIn" }
);

module.exports = User;
