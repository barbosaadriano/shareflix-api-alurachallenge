'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate (models) {
      Categories.hasMany(models.Movies, {
        foreignKey: 'categoria_id',
        include: models.Movies,
        as: 'videos'
      })
    }
  };
  Categories.init({
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Por favor informar o título da categoria' },
        len: [5, 30]
      }
    },
    cor: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Por favor informar a cor em hexadecimal' },
        len: 7
      }
    }
  }, {
    sequelize,
    modelName: 'Categories'
  })
  return Categories
}
