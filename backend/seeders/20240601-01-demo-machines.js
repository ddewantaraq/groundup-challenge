"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("machines", [
      { name: "CNC Machine", created_at: new Date(), updated_at: new Date() },
      { name: "Milling Machine", created_at: new Date(), updated_at: new Date() },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("machines", null, {});
  },
}; 