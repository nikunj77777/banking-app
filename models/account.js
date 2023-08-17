'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.account.belongsTo(models.user)
      models.account.belongsTo(models.bank)
    }
  }
  account.init({
    bankId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'bank',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    balance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'account',
    underscored: true,
    paranoid: true
  });
  return account;
};