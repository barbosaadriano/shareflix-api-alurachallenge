'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Movies',  'categoria_id',{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model:'Categories', key: 'id'},
        defaultValue: 1
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Movies','categoria_id');
  }
};
