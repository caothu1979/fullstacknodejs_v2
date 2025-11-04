'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class doctor_infor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  doctor_infor.init({
    doctorId: DataTypes.INTEGER,
    priceId: DataTypes.INTEGER,
    provinceId: DataTypes.INTEGER,
    paymentId: DataTypes.INTEGER,
    nameClinic: DataTypes.STRING,
    addressClinic: DataTypes.STRING,
    note: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'doctor_infor',
  });
  return doctor_infor;
};