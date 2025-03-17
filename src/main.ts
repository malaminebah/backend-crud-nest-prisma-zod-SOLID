import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  
  try {
    logger.log('Initialisation de l\'application NestJS...');
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port: number = configService.get<number>('app.port', 3000);
    const env: string = configService.get<string>('app.environment', 'development');
    const dbUrl: string = configService.get<string>('app.database.url', 'file:./dev.db');
    
    logger.log('Configuration des filtres et intercepteurs globaux...');
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new LoggingInterceptor());
    
    logger.log('Configuration du préfixe global de l\'API...');
    app.setGlobalPrefix('api/v1');
    
    await app.listen(port);
    
    console.log('\n----------------------------------------');
    console.log('🚀 API NestJS démarrée avec succès !');
    console.log('----------------------------------------');
    console.log(`📡 Environnement: ${env}`);
    console.log(`🔌 Port: ${port}`);
    console.log(`🗄️  Base de données: SQLite (${dbUrl})`);
    console.log(`🌐 URL de l'API: http://localhost:${port}/api/v1`);
    console.log('----------------------------------------');
    console.log('Endpoints disponibles:');
    console.log('GET    /api/v1/users');
    console.log('GET    /api/v1/users/:id');
    console.log('POST   /api/v1/users');
    console.log('PUT    /api/v1/users/:id');
    console.log('DELETE /api/v1/users/:id');
    console.log('----------------------------------------\n');
    
    logger.log(`Application démarrée sur le port ${port}`);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Une erreur inconnue est survenue';
    logger.error(`Erreur lors du démarrage de l'application: ${errorMessage}`);
    console.error(error);
    process.exit(1);
  }
}

bootstrap(); 