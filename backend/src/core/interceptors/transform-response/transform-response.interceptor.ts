import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((response: unknown) => {
        if (!response) {
          return {
            data: null,
          };
        }
        if (
          typeof response === 'object' &&
          response !== null &&
          'data' in response &&
          'meta' in response
        ) {
          return {
            data: response.data,
            meta: response.meta,
          };
        }
        return { data: response };
      }),
    );
  }
}
