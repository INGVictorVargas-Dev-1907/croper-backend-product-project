import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * Estrategia JWT para autenticación con Passport.
 * - Extrae el token JWT del encabezado Authorization como Bearer token.
 * - Verifica el token usando la clave secreta definida en las variables de entorno.
 * - El payload del token se adjunta a la solicitud como req.user.
 * - Utilizada en el módulo de autenticación para proteger rutas.
 * @see AuthModule
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            secretOrKey: configService.get<string>('JWT_SECRET', 'default_secret'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
    }

    async validate(payload: { sub: string; email: string; role: string }) {
        return payload; // El payload se adjunta a la solicitud como req.user
    }
}