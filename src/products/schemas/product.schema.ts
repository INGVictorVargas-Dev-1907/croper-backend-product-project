import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

/**
 * Esquema de producto para MongoDB usando Mongoose.
 * - Define las propiedades del producto: nombre, descripción, precio y categoría.
 * - Incluye timestamps automáticos para createdAt y updatedAt.
 * - Se utiliza en el módulo de productos para gestionar el inventario.
 * @see ProductsModule
 */
export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
    @Prop({ required: true, trim: true })
    nombre: string;

    @Prop({ default: '', trim: true })
    descripcion?: string;

    @Prop({ required: true, min: 0.01 })
    precio: number;

    @Prop({ default: '', trim: true })
    categoria?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);