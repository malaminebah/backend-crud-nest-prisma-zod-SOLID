"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string()
        .min(1, "Le nom est obligatoire")
        .max(100, "Le nom ne peut pas dépasser 100 caractères"),
    email: zod_1.z.string()
        .email("Format d'email invalide")
        .min(1, "L'email est obligatoire"),
    password: zod_1.z.string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
        .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
});
exports.updateUserSchema = exports.createUserSchema.partial();
exports.idSchema = zod_1.z.object({
    id: zod_1.z.string().uuid("L'ID doit être un UUID valide")
});
//# sourceMappingURL=user.schema.js.map