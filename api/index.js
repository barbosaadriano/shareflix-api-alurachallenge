const express = require('express')
const routes = require('./routes')
const cors = require('cors')
require('./config/config')
require('./services/authentication-services')
const app = express()
const port = process.env.API_PORT

app.use(cors())
routes(app)

if (require.main === module) {
  app.listen(port, () => console.log(`Server is running at ${port}`))
}

module.exports = app
