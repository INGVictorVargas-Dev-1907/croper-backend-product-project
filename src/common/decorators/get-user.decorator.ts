import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * Decorador personalizado para obtener el usuario autenticado.
 * - Extrae el usuario del objeto de solicitud (req.user).
 * - Permite acceder a propiedades específicas del usuario (ej: email, id) si se pasa un argumento.
 * - Usado en controladores para obtener información del usuario autenticado.
 * @example
 * ```typescript
 * @Get('profile')
 * getProfile(@GetUser() user: User) { ... }
 *
 * @Get('email')
 * getEmail(@GetUser('email') email: string) { ... }
 * ```
 * @see JwtAuthGuard
 */
export const GetUser = createParamDecorator(
    (data: keyof any, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        // Si se pasa un campo específico (ej: @GetUser('email')), devuelve solo ese campo
        return data ? user?.[data] : user;
    }
)