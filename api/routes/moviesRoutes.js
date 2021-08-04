const { Router } = require('express')
const MovieController = require('../controllers/MovieController')

const router = Router()

router.get('/videos', MovieController.getMovies)
router.get('/videos/:id', MovieController.getOneMovie)

router.post('/videos', MovieController.madeUpMovie)
router.put('/videos/:id', MovieController.updateMovie)

router.delete('/videos/:id', MovieController.deleteMovie)

module.exports = router
