const { Router } = require('express')
const CategoryController = require('../controllers/CategoryController')
const middlewaresAuth = require('../services/middlewares-auth')

const router = Router()

router.get('/categorias', middlewaresAuth.bearer, CategoryController.getCategories)
router.get('/categorias/:id', middlewaresAuth.bearer, CategoryController.getOneCategory)
router.get('/categorias/:id/videos', middlewaresAuth.bearer, CategoryController.getMoviesFromCategory)

router.post('/categorias', [middlewaresAuth.bearer, middlewaresAuth.adminCheck], CategoryController.madeUpCategory)
router.put('/categorias/:id', [middlewaresAuth.bearer, middlewaresAuth.adminCheck], CategoryController.updateCategory)

router.delete('/categorias/:id', [middlewaresAuth.bearer, middlewaresAuth.adminCheck], CategoryController.deleteCategory)

module.exports = router
