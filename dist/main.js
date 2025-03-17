"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    try {
        logger.log('Initialisation de l\'application NestJS...');
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        const configService = app.get(config_1.ConfigService);
        const port = configService.get('app.port', 3000);
        const env = configService.get('app.environment', 'development');
        const dbUrl = configService.get('app.database.url', 'file:./dev.db');
        logger.log('Configuration des filtres et intercepteurs globaux...');
        app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
        app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor());
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
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Une erreur inconnue est survenue';
        logger.error(`Erreur lors du démarrage de l'application: ${errorMessage}`);
        console.error(error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map