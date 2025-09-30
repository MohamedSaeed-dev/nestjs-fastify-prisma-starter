import 'dotenv/config';

export const environmentVariables = {
  PORT: process.env.PORT,

  NODE_ENV: process.env.NODE_ENV,

  DATABASE_URL: process.env.DATABASE_URL,

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,

  OPTIMIZE_API_KEY: process.env.OPTIMIZE_API_KEY,

  FRONTEND_URL: process.env.FRONTEND_URL,
};
