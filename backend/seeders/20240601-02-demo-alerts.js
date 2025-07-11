"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get machine IDs
    const machines = await queryInterface.sequelize.query(
      'SELECT id, name FROM machines;'
    );
    const machineMap = {};
    machines[0].forEach(m => { machineMap[m.name] = m.id; });

    await queryInterface.bulkInsert("alerts", [
      {
        timestamp: 1628676001,
        machine_id: machineMap["CNC Machine"],
        alert_type: "Mild",
        sensor: "1234567890",
        sound_clip: "1.wav",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timestamp: 1629102961,
        machine_id: machineMap["CNC Machine"],
        alert_type: "Moderate",
        sensor: "0123456789",
        sound_clip: "2.wav",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timestamp: 1629058322,
        machine_id: machineMap["CNC Machine"],
        alert_type: "Severe",
        sensor: "1234567890",
        sound_clip: "3.wav",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timestamp: 1629057722,
        machine_id: machineMap["Milling Machine"],
        alert_type: "Mild",
        sensor: "1122334455",
        sound_clip: "4.wav",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timestamp: 1629025202,
        machine_id: machineMap["Milling Machine"],
        alert_type: "Moderate",
        sensor: "2345678900",
        sound_clip: "5.wav",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timestamp: 1629057361,
        machine_id: machineMap["Milling Machine"],
        alert_type: "Severe",
        sensor: "2345678900",
        sound_clip: "6.wav",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("alerts", null, {});
  },
}; 