import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IRepository } from '../../common/interfaces/repository.interface';
import { Prisma } from '@prisma/client';
import { User } from '../types/user.types';
import { CreateUserDto, UpdateUserDto } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

// Définition d'un type pour les données de mise à jour
type UserUpdateInput = {
  name?: string;
  email?: string;
  password?: string;
};

@Injectable()
export class UsersRepository implements IRepository<User> {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword: string = await bcrypt.hash(createUserDto.password, 10);
    
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const data: UserUpdateInput = { ...updateUserDto };
    
    // Si le mot de passe est fourni, le hacher
    if (updateUserDto.password) {
      data.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
} 