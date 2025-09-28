import 'dotenv/config';
import { NodeEnv } from './node.env';


const settings = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV || NodeEnv.DEV,
  OPTIMIZE_API_KEY: process.env.OPTIMIZE_API_KEY,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
};

export default settings;
