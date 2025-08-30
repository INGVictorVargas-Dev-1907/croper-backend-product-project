import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * Guardia de autenticación JWT.
 * - Protege rutas asegurando que la solicitud incluya un token JWT válido.
 * - Utiliza la estrategia 'jwt' definida en JwtStrategy.
 * - Si el token es válido, el payload se adjunta a la solicitud como req.user.
 * - Usado en controladores para proteger endpoints que requieren autenticación.
 * @see JwtStrategy
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}