import { User } from '../types/user.types';
import { UsersRepository } from '../repositories/users.repository';
import { CreateUserDto, UpdateUserDto } from '../schemas/user.schema';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    delete(id: string): Promise<void>;
}
