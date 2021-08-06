const { Sequelize } = require('../models')
const database = require('../models')
const Op = Sequelize.Op

class MovieController {
  static async getFreeMovies (req, res) {
    try {
      const movies = await database.Movies.scope('limited').findAll()
      return res.status(200).json(movies)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async getMovies (req, res) {
    const { search, rows } = req.query
    const where = search
      ? {
          where: {
            [Op.or]: [
              {
                titulo: {
                  [Op.like]: `%${search}%`
                }
              },
              {
                descricao: {
                  [Op.like]: `%${search}%`
                }
              }
            ]
          }
        }
      : {}
    let limit = 5
    let offset = 0
    let { page } = req.query
    try {
      if (rows && Number(rows) > 0) {
        limit = Number(rows)
      }
      const count = await database.Movies.count(where)
      const pages = Math.ceil(count / limit)
      page = page && Number(page) > 0 && Number(page) <= pages ? Number(page) : 1
      offset = limit * (page - 1)
      where.limit = limit
      where.offset = offset
      const movies = await database.Movies.findAll(where)
      const retorno = {
        page: page,
        records: count,
        rows: movies.lenght,
        pages: pages,
        movies: movies
      }
      return res.status(200).json(retorno)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async getOneMovie (req, res) {
    const { id } = req.params
    try {
      const movie = await database.Movies.findOne({ where: { id: Number(id) } })
      if (movie === null) { return res.status(404).json({ message: `Não foi encontrado video com o id ${id}` }) }
      return res.status(200).json(movie)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async madeUpMovie (req, res) {
    const newMovie = req.body
    try {
      const createdMovie = await database.Movies.create(newMovie)
      return res.status(201).json(createdMovie)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async updateMovie (req, res) {
    const newData = req.body
    const { id } = req.params
    try {
      await database.Movies.update(newData, { where: { id: Number(id) } })
      const movieUpdated = await database.Movies.findOne({ where: { id: Number(id) } })
      return res.status(200).json(movieUpdated)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async deleteMovie (req, res) {
    const { id } = req.params
    try {
      await database.Movies.destroy({ where: { id: Number(id) } })
      return res.status(200).json({ message: `O filme de id ${id} foi deletado` })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

module.exports = MovieController
