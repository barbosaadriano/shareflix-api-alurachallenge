const passport = require('passport')
const { User } = require('../models')
const { InvalidArgumentError } = require('../errors/errors')
const allowListRefreshToken = require('../../redis/allowlist-refresh-token')

async function checkRefreshToken (refereshToken) {
  if (!refereshToken) {
    throw new InvalidArgumentError('Refresh token não enviado!')
  }
  const id = await allowListRefreshToken.getValue(refereshToken)
  if (!id) {
    throw new InvalidArgumentError('Refresh token inválido!')
  }
  return id
}
async function invalidateRefreshToken (refereshToken) {
  await allowListRefreshToken.delete(refereshToken)
}

module.exports = {
  local: (req, res, next) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error) {
        return res.status(500).json({ error: error.message })
      }
      if (!user) {
        return res.status(401).json()
      }
      if (!user.verified) {
        return res.status(400).json({ error: 'User not verified'})
      } 
      req.user = user
      return next()
    })(req, res, next)
  },
  bearer: (req, res, next) => {
    passport.authenticate(
      'bearer',
      { session: false },
      (error, user, info) => {
        if (error && error.name === 'JsonWebTokenError') {
          return res.status(401).json({ error: error.message })
        }
        if (error && error.name === 'TokenExpiredError') {
          return res.status(401).json({ error: error.message, expiredAt: error.expiredAt })
        }
        if (error) {
          return res.status(500).json({ error: error.message })
        }
        if (!user) {
          return res.status(401).json()
        }
        req.token = info.token
        req.user = user
        return next()
      }
    )(req, res, next)
  },
  refresh: async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      const id = await checkRefreshToken(refreshToken)
      await invalidateRefreshToken(refreshToken)
      req.user = await User.findByPk(id)
      return next()
    } catch (error) {
      if (error.name === 'InvalidArgumentError') {
        return res.status(401).json({ error: error.message })
      }
      return res.status(500).json({ error: error.message })
    }
  },
  adminCheck: async (req,res,next) => {
    try {
      const user = req.user
      if (user.role !== 'admin') {
        throw new Error('User is not admin')
      }
      return next()
    } catch (error) {
      if (error.name === 'InvalidArgumentError') {
        return res.status(401).json({ error: error.message })
      }
      return res.status(500).json({ error: error.message })
    }
  }
}
