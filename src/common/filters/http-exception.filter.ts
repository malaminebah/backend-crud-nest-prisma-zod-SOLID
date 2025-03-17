import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';


// Extensions des types pour inclure les propriétés manquantes
interface Request extends ExpressRequest {
  method: string;
  url: string;
}

// Utiliser le type ExpressResponse directement
// Pas besoin de redéfinir Response

interface ExceptionResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
  [key: string]: any;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<ExpressResponse>();
    const request = ctx.getRequest<Request>();
    const status: number = exception.getStatus();
    const errorResponse: string | object = exception.getResponse();

    const responseBody: {
      statusCode: number;
      timestamp: string;
      path: string;
      message?: string | string[];
      errors?: any[];
      [key: string]: any;
    } = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...(typeof errorResponse === 'object' ? errorResponse : { message: errorResponse }),
    };

    this.logger.error(
      `${request.method} ${request.url} ${status} - ${JSON.stringify(responseBody)}`,
    );

    response.status(status).json(responseBody);
  }
} 