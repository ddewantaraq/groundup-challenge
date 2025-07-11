import 'reflect-metadata';
import sequelize from './sequelize';

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    // Optionally, sync models:
    // await sequelize.sync({ alter: true });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

start(); 