# API NestJS avec Prisma et Zod

Une API RESTful construite avec NestJS, Prisma ORM et Zod pour la validation des données.

## Fonctionnalités

- Architecture en couches (Controller, Service, Repository)
- Validation des données avec Zod
- ORM avec Prisma
- Base de données SQLite (facile à utiliser sans Docker)
- Typage strict avec TypeScript
- Gestion des erreurs centralisée
- Logging des requêtes et réponses
- Configuration typée

## Prérequis

- Node.js (v16+)
- npm ou yarn

## Installation

```bash
# Installer les dépendances
npm install

# Générer le client Prisma
npm run prisma:generate

# Créer les migrations de base de données
npm run prisma:migrate
```

## Configuration

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```
PORT=3000
NODE_ENV=development
DATABASE_URL="file:./dev.db"
```

## Démarrage

```bash
# Mode développement
npm run start:dev

# Mode production
npm run build
npm run start:prod
```

## Structure du projet

```
src/
├── common/              # Composants partagés
│   ├── decorators/      # Décorateurs personnalisés
│   ├── filters/         # Filtres d'exception
│   ├── interceptors/    # Intercepteurs
│   ├── interfaces/      # Interfaces partagées
│   ├── middlewares/     # Middlewares
│   └── pipes/           # Pipes de validation
├── config/              # Configuration de l'application
├── prisma/              # Service Prisma et module
├── users/               # Module utilisateurs
│   ├── controllers/     # Contrôleurs
│   ├── repositories/    # Repositories
│   ├── schemas/         # Schémas Zod
│   └── services/        # Services
├── app.module.ts        # Module principal
└── main.ts              # Point d'entrée
```

## API Endpoints

### Utilisateurs

- `GET /api/v1/users` - Récupérer tous les utilisateurs
- `GET /api/v1/users/:id` - Récupérer un utilisateur par ID
- `POST /api/v1/users` - Créer un nouvel utilisateur
- `PUT /api/v1/users/:id` - Mettre à jour un utilisateur
- `DELETE /api/v1/users/:id` - Supprimer un utilisateur 