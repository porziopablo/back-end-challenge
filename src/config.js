// vendors
import dotenv from 'dotenv';

dotenv.config();

const config = {
  DB_URL: process.env.DB_URL,
  SERVER_PORT: process.env.SERVER_PORT,
  MOCKED_JWT_TOKEN: process.env.MOCKED_JWT_TOKEN,
  AWS_ENDPOINT: process.env.AWS_ENDPOINT,
  ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
  SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
  REGION: process.env.REGION,
  QUEUE_URL: process.env.QUEUE_URL,
};

export default config;
