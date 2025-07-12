import 'dotenv/config';
import { Sequelize } from 'sequelize-typescript';
import { Machine } from './models/Machine';
import { Alert } from './models/Alert';
import { AlertCommentLog } from './models/AlertCommentLog';
import fs from "fs";

let dialectOptions = {};
if (process.env.NODE_ENV === "production" && process.env.DB_CA_PATH) {
  try {
    const ca = fs.readFileSync(process.env.DB_CA_PATH).toString();
    dialectOptions = {
      ssl: {
        require: true,
        ca,
      },
    };
    console.log("Sequelize DB_CA_PATH:", process.env.DB_CA_PATH);
  } catch (e) {
    console.error("Sequelize failed to read CA file:", e);
  }
}

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  models: [Machine, Alert, AlertCommentLog],
  logging: true,
  ...(Object.keys(dialectOptions).length > 0 ? { dialectOptions } : {}),
});

export default sequelize; 