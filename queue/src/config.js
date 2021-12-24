// vendors
import dotenv from 'dotenv';

dotenv.config();

const config = {
  AWS_ENDPOINT: process.env.AWS_ENDPOINT,
  ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
  SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
  REGION: process.env.REGION,
};

export default config;
