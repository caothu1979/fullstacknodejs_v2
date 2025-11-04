'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class markdown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  markdown.init({
    docterId: DataTypes.INTEGER,
    clinicId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    contentHTML: DataTypes.STRING,
    contentMarkdown: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'markdown',
  });
  return markdown;
};