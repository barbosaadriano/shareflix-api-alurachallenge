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

    static async getOneMovie(req,res) {
        const { id } = req.params
        try {
            const movie = await database.Movies.findOne({ where: {id : Number(id)}})
            if (movie===null) 
                return res.status(404).json({"message":`Não foi encontrado video com o id ${id}`})
            return res.status(200).json(movie)
        } catch (error) {
            return res.status(500).json({"message":error.message})
        }
    }

    static async madeUpMovie(req,res) {
        const newMovie = req.body
        try {
            const createdMovie = await database.Movies.create(newMovie)
            return res.status(201).json(createdMovie)
        } catch (error) {
            return res.status(500).json({"message":error.message})
        }
    }

    static async updateMovie(req,res)
    {
        const newData = req.body
        const { id } = req.params
        try {
            await database.Movies.update(newData,{where: {id:Number(id)}})
            const movieUpdated = await database.Movies.findOne({ where: {id: Number(id)}})
            return res.status(200).json(movieUpdated)
        } catch (error) {
            return res.status(500).json({"message": error.message})
        }
    }

}

module.exports = MovieController