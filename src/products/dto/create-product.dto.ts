import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

/***
 * DTO para crear un nuevo producto.
 * - Define las propiedades necesarias para crear un producto.
 * - Incluye validaciones y documentación Swagger.
 * @see ProductSchema
 */
export class CreateProductDto {
    @ApiProperty({ example: 'Semillas de Maíz' })
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @ApiProperty({ example: 'Bolsa de 10kg', required: false })
    @IsOptional()
    @IsString()
    descripcion?: string;

    @ApiProperty({ example: 15.75 })
    @IsNumber()
    @Min(0.01)
    precio: number;

    @ApiProperty({ example: 'Semillas', required: false })
    @IsOptional()
    @IsString()
    categoria?: string;
}