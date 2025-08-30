import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "./schemas/product.schema";
import { Model, FilterQuery } from "mongoose";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

/**
 * Servicio de productos.
 * - Gestiona la creación, lectura, actualización y eliminación de productos.
 * - Soporta paginación y búsqueda por nombre o categoría.
 * - Interactúa con el esquema de producto en MongoDB a través de Mongoose.
 * @see ProductsModule
 * @see ProductSchema
 */
@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private model: Model<ProductDocument>) {}

    /**
     * Crea un nuevo producto.
     * - Valida y guarda el producto en la base de datos.
     * - Devuelve el producto creado junto con un mensaje de éxito.
     * @param dto Datos del producto a crear (nombre, descripción, precio, categoría).
     * @returns Objeto con el producto creado y un mensaje de éxito.
     * @throws Error si ocurre un error al crear el producto.
     * @see ProductSchema
     */
    async create(dto: CreateProductDto) {
        const product = await this.model.create(dto);
        return {
            product,
            message: 'Producto creado exitosamente'
        };
    }

    /**
     * Obtiene una lista paginada de productos.
     * - Soporta búsqueda por nombre o categoría.
     * - Devuelve los productos encontrados junto con información de paginación.
     * @param page Número de página (por defecto 1).
     * @param limit Número de productos por página (por defecto 10).
     * @returns Objeto con los productos encontrados, total, página actual, límite y número de páginas.
     * @see ProductSchema
     */
    async findAll(page = 1, limit = 10, search?: string, categoria?: string) {
        const filter: FilterQuery<ProductDocument> = {};
        if (search) {
            filter.$or = [
                { nombre: { $regex: search, $options: 'i' } },
                { categoria: { $regex: search, $options: 'i' } },
            ];
        }

        if (categoria) {
            filter.categoria = { $regex: categoria, $options: 'i' };
        }

        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            this.model.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }).lean(),
            this.model.countDocuments(filter),
        ]);

        return {
            items,
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
            message: total > 0 ? 'Productos encontrados' : 'No se encontraron productos'
        };
    }

    /**
     * Obtiene un producto por su ID.
     * - Busca el producto en la base de datos.
     * - Devuelve el producto encontrado o lanza una excepción si no existe.
     * @param id ID del producto a buscar.
     * @returns Objeto con el producto encontrado y un mensaje de éxito.
     * @throws NotFoundException si el producto no existe.
     * @see ProductSchema
     */
    async findOne(id: string) {
        const product = await this.model.findById(id);
        if (!product) throw new NotFoundException('Producto no encontrado');
        return {
            product,
            message: 'Producto encontrado exitosamente'
        };
    }

    /**
     * Actualiza un producto por su ID.
     * - Busca y actualiza el producto en la base de datos.
     * - Devuelve el producto actualizado o lanza una excepción si no existe.
     * @param id ID del producto a actualizar.
     * @param dto Datos del producto a actualizar (nombre, descripción, precio, categoría).
     * @returns Objeto con el producto actualizado y un mensaje de éxito.
     * @throws NotFoundException si el producto no existe.
     * @see UpdateProductDto
     * @see ProductSchema
     */
    async update(id: string, dto: UpdateProductDto) {
        const product = await this.model.findByIdAndUpdate(id, dto, { new: true });
        if (!product) throw new NotFoundException('Producto no encontrado');
        return {
            product,
            message: 'Producto actualizado correctamente'
        };
    }

    /**
     * Elimina un producto por su ID.
     * - Busca y elimina el producto en la base de datos.
     * - Devuelve un mensaje de éxito o lanza una excepción si no existe.
     * @param id ID del producto a eliminar.
     * @returns Objeto con un mensaje de éxito.
     * @throws NotFoundException si el producto no existe.
     * @see ProductSchema
     */
    async remove(id: string) {
        const product = await this.model.findByIdAndDelete(id);
        if (!product) throw new NotFoundException('Producto no encontrado');
        return {
            deleted: true,
            message: 'Producto eliminado correctamente'
        };
    }
}