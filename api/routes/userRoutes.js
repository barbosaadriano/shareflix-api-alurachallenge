const { Router } = require('express')
const UserController = require('../controllers/UserController')
const middlewaresAuth = require('../services/middlewares-auth')

const router = Router()

router.post('/users/refresh-token', middlewaresAuth.refresh, UserController.login)
router.post('/users', UserController.createUser)
router.post('/users/login', middlewaresAuth.local, UserController.login)
router.post('/users/logout', [middlewaresAuth.refresh, middlewaresAuth.bearer], UserController.logout)
router.get('/users/:id', [middlewaresAuth.bearer, middlewaresAuth.adminCheck], UserController.getOneUser)
router.put('/users/:id', [middlewaresAuth.bearer, middlewaresAuth.adminCheck], UserController.updateUser)
router.delete('/users/:id', [middlewaresAuth.bearer, middlewaresAuth.adminCheck], UserController.deleteUser)
router.get('/users', [middlewaresAuth.bearer, middlewaresAuth.adminCheck], UserController.getAllUser)
router.get('/users/email_verify/:token', UserController.verifyEmail)

module.exports = router
