import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

/**
 * Controlador de autenticación.
 * - Define los endpoints para registro y login de usuarios.
 * - Utiliza AuthService para la lógica de negocio.
 * @see AuthService
 */
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * Registra un nuevo usuario.
     * - Endpoint: POST /auth/register
     * - Recibe un RegisterDto con nombre completo, email y contraseña.
     * - Devuelve un token JWT para el nuevo usuario.
     * @param dto Datos de registro.
     * @returns Objeto con el token JWT.
     * @see AuthService.register
     * @see RegisterDto
     */
    @ApiCreatedResponse({ description: 'Usuario registrado correctamente y token JWT generado.' })
    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    /**
     * Inicia sesión con email y contraseña.
     * - Endpoint: POST /auth/login
     * - Recibe un LoginDto con email y contraseña.
     * - Devuelve un token JWT para el usuario autenticado.
     * @param dto Datos de login.
     * @returns Objeto con el token JWT.
     * @see AuthService.login
     * @see LoginDto
     */
    @ApiOkResponse({ description: 'Login exitoso. Usuario autenticado correctamente' })
    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
}