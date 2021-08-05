// const { Sequelize } = require('../models')
// const Op = Sequelize.Op
const database = require('../models')

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
}

module.exports = UserController
