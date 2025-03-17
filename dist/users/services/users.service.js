"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("../repositories/users.repository");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async findAll() {
        return this.usersRepository.findAll();
    }
    async findById(id) {
        const user = await this.usersRepository.findById(id);
        if (!user) {
            throw new common_1.NotFoundException(`User with ID "${id}" not found`);
        }
        return user;
    }
    async create(createUserDto) {
        const existingUser = await this.usersRepository.findByEmail(createUserDto.email);
        if (existingUser) {
            throw new common_1.ConflictException(`User with email "${createUserDto.email}" already exists`);
        }
        return this.usersRepository.create(createUserDto);
    }
    async update(id, updateUserDto) {
        const existingUser = await this.usersRepository.findById(id);
        if (!existingUser) {
            throw new common_1.NotFoundException(`User with ID "${id}" not found`);
        }
        if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
            const userWithEmail = await this.usersRepository.findByEmail(updateUserDto.email);
            if (userWithEmail) {
                throw new common_1.ConflictException(`User with email "${updateUserDto.email}" already exists`);
            }
        }
        try {
            return await this.usersRepository.update(id, updateUserDto);
        }
        catch (error) {
            throw new common_1.NotFoundException(`User with ID "${id}" not found`);
        }
    }
    async delete(id) {
        await this.findById(id);
        try {
            await this.usersRepository.delete(id);
        }
        catch (error) {
            throw new common_1.NotFoundException(`User with ID "${id}" not found`);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map