const { Sequelize } = require('../models')
const Op = Sequelize.Op
const database = require('../models')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const moment = require('moment')
const blocklist = require('../../redis/blocklist-access-token')
const allowlistRefreshToken = require('../../redis/allowlist-refresh-token')
const { EmailVerify } = require('../services/emails')

function createTokenJWT (user) {
  const payload = {
    id: user.id
  }
  const token = jwt.sign(payload, process.env.JWT_PASSWD, { expiresIn: '15m' })
  return token
}

function checkTokenVerify (token) {
  const payload = jwt.verify(token, process.env.JWT_PASSWD)
  return payload.id
}

async function createOpaqueToken (user) {
  const opaqueToken = crypto.randomBytes(25).toString('hex')
  const expireDate = moment().add(24, 'h').unix()
  await allowlistRefreshToken.add(opaqueToken, user.id, expireDate)
  return opaqueToken
}
function generateTarget (route, id) {
  const baseUrl = process.env.BASE_URL
  return `${baseUrl}${route}${id}`
}
class UserController {
  static async createUser (req, res) {
    const newUser = req.body
    try {
      const user = await database.User.findOne({ where: { email: newUser.email } })
      if (user) {
        throw new Error('Email já cadastrado!')
      }
      const createdUser = await database.User.create(newUser)
      const verifyToken = createTokenJWT(createdUser)
      const target = generateTarget('users/email_verify/', verifyToken)
      const emailVerify = new EmailVerify(createdUser, target)
      emailVerify.sendEmail().catch(console.log)
      return res.status(201).json(createdUser)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async getOneUser (req, res) {
    const { id } = req.params
    try {
      const user = await database.User.findByPk(Number(id))
      if (user === null) {
        return res.status(404).json({ message: `Não foi encontrado usuário com o id ${id}` })
      }
      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async updateUser (req, res) {
    const newData = req.body
    const { id } = req.params
    try {
      await database.User.update(newData, { where: { id: Number(id) } })
      const userUpdated = await database.User.findOne({ where: { id: Number(id) } })
      return res.status(200).json(userUpdated)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async deleteUser (req, res) {
    const { id } = req.params
    try {
      await database.User.destroy({ where: { id: Number(id) } })
      return res.status(200).json({ message: `O usuário de id ${id} foi deletado` })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async getAllUser (req, res) {
    const { search, rows } = req.query
    const where = search
      ? {
          where: {
            [Op.or]: [
              {
                name: {
                  [Op.like]: `%${search}%`
                }
              },
              {
                email: {
                  [Op.like]: `%${search}%`
                }
              }
            ]
          }
        }
      : {}
    let limit = 5
    let offset = 0
    let { page } = req.query
    try {
      if (rows && Number(rows) > 0) {
        limit = Number(rows)
      }
      const count = await database.User.count(where)
      const pages = Math.ceil(count / limit)
      page = page && Number(page) > 0 && Number(page) <= pages ? Number(page) : 1
      offset = limit * (page - 1)
      where.limit = limit
      where.offset = offset
      const users = await database.User.findAll(where)
      const retorno = {
        page: page,
        records: count,
        rows: users.lenght,
        pages: pages,
        users: users
      }
      return res.status(200).json(retorno)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async login (req, res) {
    const accessToken = createTokenJWT(req.user)
    const refreshToken = await createOpaqueToken(req.user)

    res.set('Authorization', accessToken)
    res.status(200).json({ refreshToken })
  }

  static async logout (req, res) {
    try {
      const token = req.token
      await blocklist.addToken(token)
      res.status(204).send()
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  static async verifyEmail (req, res) {
    try {
      const { token } = req.params
      const id = checkTokenVerify(token)
      const user = await database.User.findByPk(Number(id))
      await user.verifyEmail()
      res.status(201).send()
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}

module.exports = UserController
