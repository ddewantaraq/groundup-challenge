require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
import fs from "fs";

if (process.env.NODE_ENV === 'production') {
  console.log('DB_CA_PATH:', process.env.DB_CA_PATH);
}

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || 5432,
    dialect: 'postgres',
  },
  test: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || 5432,
    dialect: 'postgres',
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: process.env.DB_CA_PATH ? {
      ssl: {
        require: true,
        ca: fs.readFileSync(process.env.DB_CA_PATH).toString(),
      }
    } : {},
  },
}; 