import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import sequelize from './sequelize';
import machineRoutes from './routes/machineRoutes';
import alertRoutes from './routes/alertRoutes';

const app = express();
app.use(express.json());

app.use('/machines', machineRoutes);
app.use('/alerts', alertRoutes);

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

start(); 