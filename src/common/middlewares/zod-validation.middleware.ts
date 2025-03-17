import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request as ExpressRequest, Response } from 'express';
import { ZodSchema, ZodError } from 'zod';

// Extension du type Request pour inclure body
interface RequestWithBody extends ExpressRequest {
  body: any;
}

// Définition correcte de NextFunction
interface NextFunction {
  (err?: any): void;
}

@Injectable()
export class ZodValidationMiddleware<T> implements NestMiddleware {
  constructor(private schema: ZodSchema<T>) {}

  use(req: RequestWithBody, res: Response, next: NextFunction): void {
    try {
      // Valide le corps de la requête contre le schéma Zod
      const result: T = this.schema.parse(req.body);
      
      // Remplace le corps de la requête par le résultat validé et transformé par Zod
      req.body = result;
      
      // Appel de la fonction next pour passer au middleware suivant
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message
        }));
        
        throw new BadRequestException({
          message: 'Validation failed',
          errors: formattedErrors
        });
      }
      throw error;
    }
  }
} 