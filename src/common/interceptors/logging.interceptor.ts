import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request as ExpressRequest } from 'express';

// Extension du type Request pour inclure les propriétés manquantes
interface Request extends ExpressRequest {
  method: string;
  url: string;
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const method = req.method;
    const url = req.url;

    const now: number = Date.now();
    this.logger.log(`Request ${method} ${url}`);

    return next.handle().pipe(
      tap(() => {
        this.logger.log(`Response ${method} ${url} - ${Date.now() - now}ms`);
      }),
    );
  }
} 