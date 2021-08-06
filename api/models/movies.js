'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
    static associate (models) {
      Movies.belongsTo(models.Categories, {
        foreignKey: 'categoria_id'
      })
    }
  };
  Movies.init({
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Por favor informar um título válido' },
        len: [5, 50]
      }
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Por favor informar uma descrição válida' }
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Por favor informar uma URL válida' }
      }
    }
  }, {
    sequelize,
    modelName: 'Movies',
    scopes: {
      limited: {
        limit: 3
      }
    }
  })
  return Movies
}
