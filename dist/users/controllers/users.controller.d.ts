import { User } from '../types/user.types';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto, IdParams } from '../schemas/user.schema';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    findById(params: IdParams): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(params: IdParams, updateUserDto: UpdateUserDto): Promise<User>;
    delete(params: IdParams): Promise<void>;
}
