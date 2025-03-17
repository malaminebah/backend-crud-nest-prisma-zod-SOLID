"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidate = ZodValidate;
const common_1 = require("@nestjs/common");
const zod_validation_pipe_1 = require("../pipes/zod-validation.pipe");
function ZodValidate(schema) {
    return (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(schema));
}
//# sourceMappingURL=zod-validation.decorator.js.map