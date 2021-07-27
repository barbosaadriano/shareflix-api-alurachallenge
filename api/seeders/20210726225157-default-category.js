'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('Categories', [{
        titulo: 'LIVRE',
        cor: '#00FF00',
        createdAt: new Date(),
        updatedAt: new Date(),
     }], {});

  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('Categories', null, {});
     
  }
};
