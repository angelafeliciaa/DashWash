const { Model, DataTypes } = require("sequelize");
class CampusResidence extends Model {}

CampusResidence.init(
  {
    bid: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      validate: {
        isInt: true,
      },
    },
    bname: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { sequelize, modelName: "CampusResidence" }
);

module.exports = CampusResidence;
