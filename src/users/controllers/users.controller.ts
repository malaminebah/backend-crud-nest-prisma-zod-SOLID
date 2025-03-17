import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { User } from '../types/user.types';
import { UsersService } from '../services/users.service';
import { ZodValidate } from '../../common/decorators/zod-validation.decorator';
import { createUserSchema, updateUserSchema, idSchema, CreateUserDto, UpdateUserDto, IdParams } from '../schemas/user.schema';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ZodValidate(idSchema)
  async findById(@Param() params: IdParams): Promise<User> {
    return this.usersService.findById(params.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ZodValidate(createUserSchema)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  async update(
    @Param(new ZodValidationPipe(idSchema)) params: IdParams,
    @Body(new ZodValidationPipe(updateUserSchema)) updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(params.id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ZodValidate(idSchema)
  async delete(@Param() params: IdParams): Promise<void> {
    await this.usersService.delete(params.id);
  }
} 