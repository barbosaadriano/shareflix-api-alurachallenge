'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'verified', {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: 0
    })
    await queryInterface.addColumn('Users', 'role', {
      allowNull: false,
      type: Sequelize.ENUM('admin', 'user'),
      defaultValue: 'user'
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'verified')
    await queryInterface.removeColumn('Users', 'role')
  }
}
