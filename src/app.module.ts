import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

/**
 * Módulo raíz de la aplicación NestJS.
 * - Configura la conexión a MongoDB usando Mongoose y carga los módulos de autenticación y productos.
 * - Utiliza variables de entorno para la configuración, gestionadas por ConfigModule.
 */
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    AuthModule,
    ProductsModule,
  ],
})
export class AppModule {}
