const { Router } = require('express')
const MovieController = require('../controllers/MovieController')

const router = Router()

router.get('/videos',MovieController.getAllMovies)
router.get('/videos/:id',MovieController.getOneMovie)

module.exports = router