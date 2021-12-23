// vendors
import dotenv from 'dotenv';

dotenv.config();

const config = {
  DB_URL: process.env.DB_URL,
  SERVER_PORT: process.env.SERVER_PORT,
  MOCKED_JWT_TOKEN: process.env.MOCKED_JWT_TOKEN,
};

export default config;
