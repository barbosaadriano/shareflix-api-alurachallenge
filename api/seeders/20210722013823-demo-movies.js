'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Movies', [{
      titulo: 'Criando indicadores de desempenho com Google Data Studio',
      descricao: 'Video TOP',
      url: 'https://youtu.be/5uQY7G3eeYs',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Movies', null, {})
  }
}
