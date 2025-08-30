import { PartialType } from "@nestjs/swagger";
import { CreateProductDto } from "./create-product.dto";

/**
 * DTO para actualizar un producto.
 * - Hereda todas las propiedades de CreateProductDto como opcionales.
 * - Permite actualizar uno o más campos de un producto existente.
 * @see CreateProductDto
 */
export class UpdateProductDto extends PartialType(CreateProductDto) {}