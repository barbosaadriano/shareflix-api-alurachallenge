const { Router } = require('express')
const UserController = require('../controllers/UserController')
const middlewaresAuth = require('../services/middlewares-auth')

const router = Router()

router.post('/users', UserController.createUser)
router.post('/users/login', middlewaresAuth.local, UserController.login)

module.exports = router
