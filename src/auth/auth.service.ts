import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User, UserDocument } from './schemas/user.schema';

/**
 * Servicio de autenticación.
 * - Gestiona el registro y login de usuarios.
 * - Utiliza bcrypt para hashear y verificar contraseñas.
 * - Genera tokens JWT para sesiones autenticadas.
 * - Interactúa con el esquema de usuario en MongoDB a través de Mongoose.
 * @see AuthModule
 * @see UserSchema
 */
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) {}

    /**
     * Registra un nuevo usuario.
     * - Verifica que el email no esté ya registrado.
     * - Hashea la contraseña antes de guardarla.
     * - Crea el usuario en la base de datos.
     * - Devuelve un token JWT para el nuevo usuario.
     * @param dto Datos de registro (nombre completo, email, contraseña).
     * @returns Objeto con el token JWT.
     * @throws ConflictException si el email ya está registrado.
     * @throws Error si ocurre un error al crear el usuario.
     * @see sign
     * @see UserSchema
     */
    async register(dto: RegisterDto) {
        const existingEmail = await this.userModel.findOne({ email: dto.email });
        if (existingEmail) throw new ConflictException(' El email ya está registrado');

        const hashed = await bcrypt.hash(dto.password, 10);
        const user = await this.userModel.create({ fullname: dto.fullname, email: dto.email, password: hashed });

        return this.sign(user);
    }

    /**
     * Inicia sesión con email y contraseña.
     * - Verifica que el usuario exista y que la contraseña sea correcta.
     * - Devuelve un token JWT para el usuario autenticado.
     * @param dto Datos de login (email, contraseña).
     * @returns Objeto con el token JWT.
     * @throws UnauthorizedException si las credenciales son inválidas.
     * @throws Error si ocurre un error al buscar el usuario.
     * @see sign
     * @see UserSchema
     */
    async login(dto: LoginDto) {
        const user = await this.userModel.findOne({ email: dto.email });
        if (!user) throw new UnauthorizedException('Credenciales inválidas');

        const userPassword = await bcrypt.compare(dto.password, user.password);
        if (!userPassword) throw new UnauthorizedException('Credenciales inválidas');
    
        return this.sign(user);
    }

    /**
     * Genera un token JWT para un usuario.
     * - Incluye el ID, email y rol del usuario en el payload.
     * - Configura el token con una expiración y secreto definidos en variables de entorno.
     * - Devuelve el token junto con algunos datos del usuario.
     * @param user Usuario para el cual generar el token.
     * @returns Objeto con el token JWT y datos del usuario.
     * @see JwtService
     * @see UserSchema
     */
    private sign(user: UserDocument) {
        const payload = { sub: user._id.toString(), email: user.email, role: user.role };
        const access_token = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRES_IN || '1d',
        });
        // Retornamos el token junto con algunos datos del usuario
        return {
            access_token,
            user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            },
        };
    }
}