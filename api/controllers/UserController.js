// const { Sequelize } = require('../models')
// const Op = Sequelize.Op
const database = require('../models')
const jwt = require('jsonwebtoken')

function createTokenJWT (user) {
  const payload = {
    id: user.id
  }
  const token = jwt.sign(payload, process.env.JWT_PASSWD, { expiresIn: '15m' })
  return token
}

class UserController {
  static async createUser (req, res) {
    const newUser = req.body
    try {
      const createdUser = await database.User.create(newUser)
      return res.status(201).json(createdUser)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static login (req, res) {
    const token = createTokenJWT(req.user)
    res.set('Authorization', token)
    res.status(204).send()
  }
}

module.exports = UserController
