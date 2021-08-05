'use strict'
const {
  Model
} = require('sequelize')
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      // define association here
    }

    static generateHashPassword (password) {
      const hashCost = Number(process.env.HASH_COST)
      return bcrypt.hashSync(password, hashCost)
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    hashPwd: {
      type: DataTypes.STRING
    },
    senha: {
      type: DataTypes.VIRTUAL,
      get () {
        return this.hashPwd
      },
      async set (value) {
        this.setDataValue('hashPwd', User.generateHashPassword(value))
      }
    }
  }, {
    sequelize,
    modelName: 'User'
  })
  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.senha
    delete values.hashPwd
    return values
  }
  return User
}