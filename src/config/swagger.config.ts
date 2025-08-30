import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Configuración de Swagger para la documentación de la API.
 * Permite la autenticación mediante JWT en la interfaz de Swagger.
 * Incluye título, descripción y versión de la API.
 * La documentación se genera automáticamente a partir de los decoradores en los controladores y DTOs.
 *
 * Se monta en la ruta /api/docs.
 * @param app Instancia de la aplicación NestJS.
 * @return void
 */
export const setupSwagger = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('Croper Fullstack - API de Productos')
        .setDescription('API REST para catálogo de productos (NestJS + MongoDB)')
        .setVersion('1.0.0')
        .addBearerAuth(
            { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', name: 'Authorization JWT'},
            'JWT-auth', // Este nombre debe coincidir con el que se usa en @ApiBearerAuth()
        )
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, { swaggerOptions: { persistAuthorization: true} });
}