import { PrismaService } from '../../prisma/prisma.service';
import { IRepository } from '../../common/interfaces/repository.interface';
import { User } from '../types/user.types';
import { CreateUserDto, UpdateUserDto } from '../schemas/user.schema';
export declare class UsersRepository implements IRepository<User> {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    delete(id: string): Promise<void>;
}
