const redis = require('redis')
const blocklist = redis.createClient({
  prefix: 'blocklist-access-token:'
})
const listHandle = require('./listHandle')
const blocklistHandle = listHandle(blocklist)

const jwt = require('jsonwebtoken')
const { createHash } = require('crypto')

function generateTokenHash (token) {
  return createHash('sha256').update(token).digest('hex')
}

module.exports = {
  addToken: async token => {
    const expireDate = jwt.decode(token).exp
    const tokenHash = generateTokenHash(token)
    await blocklistHandle.add(tokenHash, '', expireDate)
  },
  hasToken: async token => {
    const tokenHash = generateTokenHash(token)
    return blocklistHandle.hasKey(tokenHash)
  }

}
