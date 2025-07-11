import 'dotenv/config';
import { Sequelize } from 'sequelize-typescript';
import { Machine } from './models/Machine';
import { Alert } from './models/Alert';
import { AlertCommentLog } from './models/AlertCommentLog';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  models: [Machine, Alert, AlertCommentLog],
  logging: false,
});

export default sequelize; 