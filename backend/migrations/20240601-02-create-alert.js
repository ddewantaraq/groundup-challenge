"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("alerts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      timestamp: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      machine_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "machines",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      alert_type: {
        type: Sequelize.ENUM("Mild", "Moderate", "Severe"),
        allowNull: false,
      },
      sensor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sound_clip: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      suspected_reason: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      action: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("alerts");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_alerts_alert_type";');
  },
}; 