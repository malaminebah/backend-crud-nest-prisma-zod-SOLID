import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string()
    .min(1, "Le nom est obligatoire")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
  
  email: z.string()
    .email("Format d'email invalide")
    .min(1, "L'email est obligatoire"),
  
  password: z.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
});

export const updateUserSchema = createUserSchema.partial();

export const idSchema = z.object({
  id: z.string().uuid("L'ID doit être un UUID valide")
});

// Types inférés des schémas Zod (mon abstraction)
export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type IdParams = z.infer<typeof idSchema>; 