import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { ZodSchema } from 'zod';
export declare class ZodValidationPipe<T> implements PipeTransform<unknown, T> {
    private schema;
    constructor(schema: ZodSchema<T>);
    transform(value: unknown, metadata: ArgumentMetadata): T;
}
