const { Router } = require('express')
const MovieController = require('../controllers/MovieController')

const router = Router()

router.get('/videos',MovieController.getAllMovies)

module.exports = router