import { registerAs } from '@nestjs/config';

interface DatabaseConfig {
  url: string;
}

interface AppConfig {
  port: number;
  environment: string;
  database: DatabaseConfig;
}

export default registerAs<AppConfig>('app', () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  environment: process.env.NODE_ENV || 'development',
  database: {
    url: process.env.DATABASE_URL || 'file:./dev.db',
  },
})); 