const env = process.env.NODE_ENV || 'development'

require('dotenv').config({
  path: env === 'test' ? '.env.testing' : '.env'
})

const config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
}

module.exports = config
