import { NestMiddleware } from '@nestjs/common';
import { Request as ExpressRequest, Response } from 'express';
import { ZodSchema } from 'zod';
interface RequestWithBody extends ExpressRequest {
    body: any;
}
interface NextFunction {
    (err?: any): void;
}
export declare class ZodValidationMiddleware<T> implements NestMiddleware {
    private schema;
    constructor(schema: ZodSchema<T>);
    use(req: RequestWithBody, res: Response, next: NextFunction): void;
}
export {};
