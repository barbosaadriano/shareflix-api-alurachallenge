const database = require('../models')

class CategoryController {
  static async getAllCategories (req, res) {
    const { _embed } = req.query
    const include = _embed ? { include: _embed } : {}
    try {
      const allCategories = await database.Categories.findAll(include)
      return res.status(200).json(allCategories)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async getOneCategory (req, res) {
    const { id } = req.params
    try {
      const category = await database.Categories.findOne({ where: { id: Number(id) } })
      if (category === null) { return res.status(404).json({ message: `Não foi encontrado categoria com o id ${id}` }) }
      return res.status(200).json(category)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async madeUpCategory (req, res) {
    const newCategory = req.body
    try {
      const createdCategory = await database.Categories.create(newCategory)
      return res.status(201).json(createdCategory)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async updateCategory (req, res) {
    const newData = req.body
    const { id } = req.params
    try {
      await database.Categories.update(newData, { where: { id: Number(id) } })
      const categoryUpdated = await database.Categories.findOne({ where: { id: Number(id) } })
      return res.status(200).json(categoryUpdated)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async deleteCategory (req, res) {
    const { id } = req.params
    try {
      await database.Categories.destroy({ where: { id: Number(id) } })
      return res.status(200).json({ message: `a categoria de id ${id} foi deletada` })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async getMoviesFromCategory (req, res) {
    const { id } = req.params
    try {
      const category = await database.Categories.findOne({ where: { id: Number(id) } })
      const movies = await category.getMovies()
      return res.status(200).json(movies)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

module.exports = CategoryController
