const database = require('../models')

class MovieController {

    static async getAllMovies(req,res) {
        try {
            const allMovies = await database.Movies.findAll()
            return res.status(200).json(allMovies)
        } catch (error) {
            return res.status(500).json({"message":error.message})
        }
    }

}

module.exports = MovieController