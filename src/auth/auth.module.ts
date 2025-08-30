import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { User, UserSchema } from "./schemas/user.schema";
import { JwtStrategy } from "./strategies/jwt.strategy";

/**
 * Módulo de autenticación.
 * - Configura el esquema de usuario en Mongoose.
 * - Registra el servicio y controlador de autenticación.
 * - Configura JWT para la generación y validación de tokens.
 * @see AuthService
 * @see AuthController
 * @see UserSchema
 */
@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({}),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [JwtModule],
})
export class AuthModule {}