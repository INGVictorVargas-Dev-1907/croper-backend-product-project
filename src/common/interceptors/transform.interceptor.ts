import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

/**
 * Interceptor para transformar las respuestas.
 * - Envuelve la respuesta en un objeto con la propiedad `data`.
 * - Facilita un formato de respuesta consistente en toda la API.
 * - Usado globalmente o en controladores específicos.
 * @see AppModule
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, { data: T }> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<{ data: T }> {
        return next.handle().pipe(map((data) => ({ data })));
    }
}