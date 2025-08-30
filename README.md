# Sistema de Gestión de Productos - Proyecto FullStack Croper

Sistema completo desarrollado con NestJS + MongoDB (backend) y React + Redux (frontend) para gestionar un catálogo de productos.

## Backend - NestJS API

### Estructura del proyecto
```bash
src/
├── auth/                    # Módulo de autenticación
│   ├── dto/                # Data Transfer Objects
│   ├── schemas/            # Esquemas de MongoDB
│   ├── strategies/         # Estrategias de autenticación JWT
│   ├── auth.controller.ts  # Controlador de autenticación
│   ├── auth.module.ts      # Módulo de autenticación
│   └── auth.service.ts     # Servicio de autenticación
├── products/               # Módulo de productos
│   ├── dto/                # DTOs de productos
│   ├── schemas/            # Esquemas de productos
│   ├── products.controller.ts
│   ├── products.module.ts
│   └── products.service.ts
├── common/                 # Utilidades comunes
│   ├── decorators/         # Decoradores personalizados
│   ├── guards/             # Guardias de autenticación
│   └── interceptors/       # Interceptores de respuesta
├── config/                 # Configuraciones
│   └── swagger.config.ts   # Configuración de Swagger
├── app.module.ts           # Módulo principal
└── main.ts                 # Punto de entrada
```

### Tecnologías Utilizadas
- **NestJS** - Framework backend
- **MongoDB** - Base de datos
- **Mongoose** - ODM para MongoDB
- **JWT** - JSON Web Tokens para autenticación
- **Passport** - Middleware de autenticación
- **Swagger** - Documentación de API
- **class-validator** - Validación de datos
- **bcrypt** - Encriptación de contraseñas

### Instalación
```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd croper-fullstack-backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
```

### Variables de Entorno
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/croper-db
JWT_SECRET=tu-clave-secreta-jwt
JWT_EXPIRES_IN=1d
```

### Ejecución
```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start
```

## 📋 Características Implementadas

✅ API REST completa con operaciones CRUD
✅ Validaciones de entrada robustas
✅ Autenticación JWT con protección de endpoints
✅ Documentación Swagger/OpenAPI automática
✅ Paginación de resultados
✅ Búsqueda por nombre y filtro por categoría
✅ Manejo de errores estructurado

### API Endpoints
#### Autenticación
- POST /api/auth/register - Registrar usuario
- POST /api/auth/login - Iniciar sesión

#### Productos (Requieren autenticación)
- GET /api/products - Listar productos (con paginación y filtros)
- POST /api/products - Crear producto
- GET /api/products/:id - Obtener producto por ID
- PATCH /api/products/:id - Actualizar producto
- DELETE /api/products/:id - Eliminar producto

### Autenticación
La API utiliza JWT (JSON Web Tokens). Incluye el token en las requests:
```http
Authorization: Bearer <token>
```

### Documentación API
La documentación Swagger está disponible en:
http://localhost:3000/api/docs

### Soporte
contactar al equipo de desarrollo atravez del perfil en el repositorio.

### Licencia
Este proyecto está bajo la Licencia MIT.

### Autor
Victor Alfonso Vargas Diaz

¡Desarrollo exitoso con gran satisfacción!
