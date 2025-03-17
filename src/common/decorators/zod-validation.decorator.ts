import { UsePipes } from '@nestjs/common';
import { ZodSchema } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';

export function ZodValidate<T>(schema: ZodSchema<T>) {
  return UsePipes(new ZodValidationPipe<T>(schema));
} 