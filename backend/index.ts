import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import sequelize from './sequelize';
import machineRoutes from './routes/machineRoutes';
import alertRoutes from './routes/alertRoutes';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting: 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the RateLimit-* headers
  legacyHeaders: false, // Disable the X-RateLimit-* headers
});
app.use(limiter);

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