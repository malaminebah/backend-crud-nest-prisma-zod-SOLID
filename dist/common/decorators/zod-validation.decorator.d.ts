import { ZodSchema } from 'zod';
export declare function ZodValidate<T>(schema: ZodSchema<T>): ClassDecorator & MethodDecorator;
