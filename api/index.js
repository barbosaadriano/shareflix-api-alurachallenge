const express = require('express')
const routes = require('./routes')
const cors = require('cors')

const app = express()
const port = 8080

app.use(cors())
routes(app)

if (require.main === module) {
  app.listen(port, () => console.log(`Server is running at ${port}`))
}

module.exports = app
