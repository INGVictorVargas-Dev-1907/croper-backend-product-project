import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductsService } from "./products.service";

/**
 * Controlador de productos.
 * - Define los endpoints para la gestión de productos (CRUD).
 * - Utiliza ProductsService para la lógica de negocio.
 * - Protegido por autenticación JWT.
 * @see ProductsService
 * @see JwtAuthGuard
 */
@ApiTags('products')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
    constructor(private readonly service: ProductsService) {}

    /**
     * Crea un nuevo producto.
     * - Endpoint: POST /products
     * - Recibe un CreateProductDto con los datos del producto.
     * - Devuelve el producto creado junto con un mensaje de éxito.
     * @param dto Datos del producto a crear.
     * @returns Objeto con el producto creado y un mensaje de éxito.
     * @see ProductsService.create
     * @see CreateProductDto
     */
    @Post()
    create(@Body() dto: CreateProductDto) {
        return this.service.create(dto);
    }

    /**
     * Obtiene una lista paginada de productos.
     * - Endpoint: GET /products
     * - Soporta parámetros de consulta para paginación y búsqueda.
     * - Devuelve los productos encontrados junto con información de paginación.
     * @param page Número de página (por defecto 1).
     * @param limit Número de productos por página (por defecto 10).
     * @param search Término de búsqueda para filtrar por nombre o categoría.
     * @returns Objeto con los productos encontrados, total, página actual, límite y número de páginas.
     * @see ProductsService.findAll
     * @see ProductSchema
     * @example /products?page=2&limit=5&search=maíz
     */
    @ApiQuery({ name: 'page', required: false, example: 1 })
    @ApiQuery({ name: 'limit', required: false, example: 10 })
    @ApiQuery({ name: 'search', required: false, example: 'maíz' })
    @ApiQuery({ name: 'categoria', required: false, example: 'granos' })
    @Get()
    findAll(
        @Query('page') page = 1,
        @Query('limit') limit = 10,
        @Query('search') search?: string,
        @Query('categoria') categoria?: string,
    ) {
        return this.service.findAll(Number(page), Number(limit), search, categoria);
    }

    /**
     * Obtiene un producto por su ID.
     * - Endpoint: GET /products/:id
     * - Devuelve el producto encontrado o lanza una excepción si no existe.
     * @param id ID del producto a buscar.
     * @returns Objeto con el producto encontrado y un mensaje de éxito.
     * @throws NotFoundException si el producto no existe.
     * @see ProductsService.findOne
     * @see ProductSchema
     * @example /products/64a7f0c2e4b0f5d6c8e4b123
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    /**
     * Actualiza un producto por su ID.
     * - Endpoint: PATCH /products/:id
     * - Recibe un UpdateProductDto con los datos a actualizar.
     * - Devuelve el producto actualizado junto con un mensaje de éxito.
     * @param id ID del producto a actualizar.
     * @param dto Datos del producto a actualizar.
     * @returns Objeto con el producto actualizado y un mensaje de éxito.
     * @throws NotFoundException si el producto no existe.
     * @see ProductsService.update
     * @see UpdateProductDto
     * @example /products/64a7f0c2e4b0f5d6c8e4b123
     */
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
        return this.service.update(id, dto);
    }

    /**
     * Elimina un producto por su ID.
     * - Endpoint: DELETE /products/:id
     * - Devuelve un mensaje de éxito o lanza una excepción si no existe.
     * @param id ID del producto a eliminar.
     * @returns Objeto con un mensaje de éxito.
     * @throws NotFoundException si el producto no existe.
     * @see ProductsService.remove
     * @see ProductSchema
     * @example /products/64a7f0c2e4b0f5d6c8e4b123
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}