const { Router } = require('express')
const CategoryController = require('../controllers/CategoryController')

const router = Router()

router.get('/categorias', CategoryController.getAllCategories)
router.get('/categorias/:id', CategoryController.getOneCategory)
router.get('/categorias/:id/videos', CategoryController.getMoviesFromCategory)

router.post('/categorias', CategoryController.madeUpCategory)
router.put('/categorias/:id', CategoryController.updateCategory)

router.delete('/categorias/:id', CategoryController.deleteCategory)

module.exports = router
