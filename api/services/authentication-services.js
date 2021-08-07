const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy
const errors = require('../errors/errors')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../models')

const blocklist = require('../../redis/blocklist-access-token')

function checkUser (user) {
  if (!user) {
    throw new errors.InvalidArgumentError('User not found!')
  }
}

async function  checkTokenBlocklisted(token) {
  const tokenBlocked = await blocklist.hasToken(token)
  if (tokenBlocked) {
    throw new jwt.JsonWebTokenError('Invalid token by logout')
  }
}

function checkPasswd (pass, hash) {
  const passValid = bcrypt.compareSync(pass, hash)
  if (!passValid) {
    throw new errors.InvalidArgumentError('email or password invalid')
  }
}

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'senha',
    session: false
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email: email } })
      checkUser(user)
      checkPasswd(password, user.senha)
      done(null, user)
    } catch (error) {
      done(error)
    }
  })
)

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        await checkTokenBlocklisted(token)
        const payload = jwt.verify(token, process.env.JWT_PASSWD)
        const user = await User.findByPk(payload.id)
        done(null, user, { token: token })
      } catch (error) {
        done(error)
      }
    }
  )
)
