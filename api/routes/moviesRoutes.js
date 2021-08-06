const { Router } = require('express')
const MovieController = require('../controllers/MovieController')
const middlewaresAuth = require('../services/middlewares-auth')

const router = Router()

router.get('/videos/free', MovieController.getFreeMovies)
router.get('/videos', middlewaresAuth.bearer, MovieController.getMovies)
router.get('/videos/:id', middlewaresAuth.bearer, MovieController.getOneMovie)

router.post('/videos', middlewaresAuth.bearer, MovieController.madeUpMovie)
router.put('/videos/:id', middlewaresAuth.bearer, MovieController.updateMovie)

router.delete('/videos/:id', middlewaresAuth.bearer, MovieController.deleteMovie)

module.exports = router
