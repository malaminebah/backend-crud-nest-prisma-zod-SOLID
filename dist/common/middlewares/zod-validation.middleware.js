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
exports.ZodValidationMiddleware = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
let ZodValidationMiddleware = class ZodValidationMiddleware {
    constructor(schema) {
        this.schema = schema;
    }
    use(req, res, next) {
        try {
            const result = this.schema.parse(req.body);
            req.body = result;
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const formattedErrors = error.errors.map((err) => ({
                    path: err.path.join('.'),
                    message: err.message
                }));
                throw new common_1.BadRequestException({
                    message: 'Validation failed',
                    errors: formattedErrors
                });
            }
            throw error;
        }
    }
};
exports.ZodValidationMiddleware = ZodValidationMiddleware;
exports.ZodValidationMiddleware = ZodValidationMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [zod_1.ZodSchema])
], ZodValidationMiddleware);
//# sourceMappingURL=zod-validation.middleware.js.map