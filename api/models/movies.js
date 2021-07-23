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
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Por favor informar um título válido'},
        len: [5,50]
      }
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {msg: 'Por favor informar uma descrição válida'}        
      }
    } ,
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Por favor informar uma URL válida'}
      }
    } 
  }, {
    sequelize,
    modelName: 'Movies',
  });
  return Movies;
};