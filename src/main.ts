import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';

/**
 * Punto de entrada de la aplicación NestJS.
 * Configura el prefijo global de las rutas('api'), la validación global y Swagger.
 * Escucha en el puerto definido en las variables de entorno o 3000 por defecto.
 * @returns void
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Habilitar CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5173',
      'http://127.0.0.1:3001',
      'http://0.0.0.0:3001',
    ],
    credentials: true,
  });
  
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  setupSwagger(app);

  await app.listen(process.env.PORT || 3000);
  console.log(`Servidor ejecutándose en: http://localhost:${process.env.PORT || 3000}`);
  console.log(`Documentación Swagger ejecutándose en: http://localhost:${process.env.PORT || 3000}/api/docs`);
}
bootstrap();
