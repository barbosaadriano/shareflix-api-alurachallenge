const express = require('express')
const movies = require('./moviesRoutes')
const categories = require('./categoriesRoutes')
const users = require('./userRoutes')
const swaggerUi = require('swagger-ui-express')
const openApiDocumentation = require('../../docs/openapi.json')

module.exports = app => {
  app.use(express.urlencoded({
    extended: true
  }))
  app.use(express.json())
  app.use(movies)
  app.use(categories)
  app.use(users)
  app.get('/', (req, res) => res.status(200).json({ message: 'It works!' }))
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation))
}
