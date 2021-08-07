const redis = require('redis')
const listHandle = require('./listHandle')
const allowlist = redis.createClient({prefix:'allowlist-refresh-token:'})
module.exports = listHandle(allowlist)