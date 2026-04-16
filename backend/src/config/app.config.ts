import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  // App
  port: parseInt(process.env.PORT as string, 10) || 8081,
  nodeEnv: process.env.NODE_ENV || 'development',
  apiPrefix: process.env.API_PREFIX || 'api',
  appName: process.env.APP_NAME || 'Nectar API',

  // Database
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT as string, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    logging: process.env.DB_LOGGING === 'true',
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || 604800, // 7 days in seconds
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'default-refresh-secret',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || 2592000, // 30 days in seconds
  },

  // CORS
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: process.env.CORS_METHODS || 'GET,POST,PUT,PATCH,DELETE',
  },
}));
