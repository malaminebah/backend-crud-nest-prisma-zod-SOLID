import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { User } from '../types/user.types';
import { UsersRepository } from '../repositories/users.repository';
import { CreateUserDto, UpdateUserDto } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findById(id: string): Promise<User> {
    const user: User | null = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser: User | null = await this.usersRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException(`User with email "${createUserDto.email}" already exists`);
    }
    
    return this.usersRepository.create(createUserDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser: User | null = await this.usersRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    
    // Vérifier si l'email est unique si fourni
    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      const userWithEmail: User | null = await this.usersRepository.findByEmail(updateUserDto.email);
      if (userWithEmail) {
        throw new ConflictException(`User with email "${updateUserDto.email}" already exists`);
      }
    }
    
    try {
      return await this.usersRepository.update(id, updateUserDto);
    } catch (error) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    
    try {
      await this.usersRepository.delete(id);
    } catch (error) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }
} 