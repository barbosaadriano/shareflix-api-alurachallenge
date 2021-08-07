const { Router } = require('express')
const UserController = require('../controllers/UserController')
const middlewaresAuth = require('../services/middlewares-auth')

const router = Router()

router.post('/users/refresh-token',middlewaresAuth.refresh, UserController.login)
router.post('/users', UserController.createUser)
router.post('/users/login', middlewaresAuth.local, UserController.login)
router.post('/users/logout',[middlewaresAuth.refresh, middlewaresAuth.bearer],UserController.logout)
router.get('/users/:id',middlewaresAuth.bearer,UserController.getOneUser)
router.put('/users/:id',middlewaresAuth.bearer,UserController.updateUser)
router.delete('/users/:id',middlewaresAuth.bearer,UserController.deleteUser)
router.get('/users',middlewaresAuth.bearer, UserController.getAllUser)

module.exports = router
