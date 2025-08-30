import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @ApiProperty({ example: 'user@email.com', description: 'Email del usuario', uniqueItems: true })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'strongPassword123', description: 'Contraseña del usuario' })
    @IsNotEmpty()
    password: string;
}