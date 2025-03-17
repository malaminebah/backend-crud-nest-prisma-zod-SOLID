import { Prisma } from '@prisma/client';

// Définition du type User basé sur le modèle Prisma
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}; 