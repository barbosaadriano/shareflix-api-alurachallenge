'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
    static associate(models) {
      // define association here
    }
  };
  Movies.init({
    titulo: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movies',
  });
  return Movies;
};