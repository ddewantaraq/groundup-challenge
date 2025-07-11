"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("machines", [
      { name: "CNC Machine", createdAt: new Date(), updatedAt: new Date() },
      { name: "Milling Machine", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("machines", null, {});
  },
}; 