import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterDto {
    @ApiProperty({ example: 'User Name', description: 'Nombre completo del usuario' })
    @IsNotEmpty()
    fullname: string;

    @ApiProperty({ example: 'user@email.com', description: 'Email del usuario', uniqueItems: true })
    @IsEmail()
    email: string;

    @ApiProperty({ minLength: 6, example: 'strongPassword123', description: 'Contraseña del usuario (mínimo 6 caracteres)' })
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}