'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class passbook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.passbook.belongsTo(models.account)
    }
  }
  passbook.init({
    accountId:DataTypes.INTEGER,
    date: DataTypes.DATE,
    status: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    balance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'passbook',
    underscored: true,
    paranoid:true
  });
  return passbook;
};