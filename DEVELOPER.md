# Developer Guide 🛠️

This guide provides detailed information for developers working on the SafeSpace project.

## Table of Contents
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Backend Development](#backend-development)
- [Frontend Development](#frontend-development)
- [Database Management](#database-management)
- [API Design Principles](#api-design-principles)
- [Code Style & Standards](#code-style--standards)
- [Deployment](#deployment)

## Architecture Overview

SafeSpace follows a three-tier architecture with network isolation:

```
┌─────────────────────────────────────────────────┐
│              Frontend Network                    │
│                                                  │
│  ┌──────────────┐          ┌──────────────┐    │
│  │   Frontend   │◄────────►│   Backend    │    │
│  │  React + TS  │          │  Express+TS  │    │
│  └──────────────┘          └──────┬───────┘    │
│                                    │             │
└────────────────────────────────────┼────────────┘
                                     │
┌────────────────────────────────────┼────────────┐
│              Backend Network       │             │
│                                    │             │
│                            ┌───────▼────────┐   │
│                            │   PostgreSQL   │   │
│                            │    Database    │   │
│                            └────────────────┘   │
└─────────────────────────────────────────────────┘
```

### Design Principles

1. **Anonymity-First**: All features prioritize user anonymity
2. **Security by Design**: Network isolation, input validation, content filtering
3. **Clean Architecture**: Separation of concerns (routes → controllers → services → database)
4. **Type Safety**: TypeScript across the stack
5. **API-First**: RESTful API with OpenAPI documentation

## Project Structure

```
SafeSpace/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── services/         # Business logic
│   │   ├── routes/           # API route definitions
│   │   ├── utils/            # Helper functions
│   │   ├── schema.ts         # Drizzle ORM schema
│   │   ├── db.ts             # Database connection
│   │   ├── swagger.ts        # API documentation config
│   │   └── index.ts          # Application entry point
│   ├── drizzle/              # Generated migrations
│   ├── scripts/              # Utility scripts
│   ├── drizzle.config.ts     # Drizzle configuration
│   ├── tsconfig.json
│   └── package.json
│
├── frontend/
│   └── client/
│       └── src/
│           ├── components/   # React components
│           ├── pages/        # Page components
│           ├── hooks/        # Custom React hooks
│           ├── lib/          # Utilities (API client, etc.)
│           ├── App.tsx
│           └── main.tsx
│
├── docs/                     # Additional documentation
├── docker-compose.yml        # Container orchestration
└── README.md
```

## Development Setup

### Initial Setup

1. **Install dependencies**
   ```bash
   # Backend
   cd backend && npm install
   
   # Frontend
   cd frontend && npm install
   ```

2. **Start PostgreSQL**
   ```bash
   docker compose up -d db
   ```

3. **Run migrations**
   ```bash
   cd backend && npm run migrate
   ```

4. **Seed database (optional)**
   ```bash
   # Create a seed script in backend/scripts/seed.ts
   npm run seed
   ```

### Development Workflow

1. **Start backend**
   ```bash
   cd backend
   npm run dev
   ```
   - Runs on http://localhost:3000
   - Auto-reloads on file changes (via tsx)

2. **Start frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   - Runs on http://localhost:5173
   - Hot module replacement enabled

## Backend Development

### Technology Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL
- **Validation**: Zod
- **Documentation**: Swagger/OpenAPI

### Creating a New API Endpoint

1. **Define Schema** (`src/schema.ts`)
   ```typescript
   export const myTable = pgTable('my_table', {
     id: uuid('id').defaultRandom().primaryKey(),
     name: text('name').notNull(),
     createdAt: timestamp('created_at').defaultNow().notNull(),
   });
   ```

2. **Generate Migration**
   ```bash
   npx drizzle-kit generate
   npm run migrate
   ```

3. **Create Service** (`src/services/my-service.ts`)
   ```typescript
   import { db } from '../db';
   import { myTable } from '../schema';
   
   export const getItems = async () => {
     return await db.select().from(myTable);
   };
   ```

4. **Create Controller** (`src/controllers/my-controller.ts`)
   ```typescript
   import { Request, Response } from 'express';
   import * as myService from '../services/my-service';
   
   export const getItemsHandler = async (req: Request, res: Response) => {
     try {
       const items = await myService.getItems();
       res.json(items);
     } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Internal Server Error' });
     }
   };
   ```

5. **Create Routes** (`src/routes/my-routes.ts`)
   ```typescript
   import { Router } from 'express';
   import { getItemsHandler } from '../controllers/my-controller';
   
   const router = Router();
   
   /**
    * @swagger
    * /api/v1/items:
    *   get:
    *     summary: Get all items
    *     tags: [Items]
    *     responses:
    *       200:
    *         description: List of items
    */
   router.get('/', getItemsHandler);
   
   export default router;
   ```

6. **Register Routes** (`src/index.ts`)
   ```typescript
   import myRoutes from './routes/my-routes';
   
   app.use('/api/v1/items', myRoutes);
   ```

### Database Migrations

```bash
# Generate migration from schema changes
npx drizzle-kit generate

# Apply migrations
npm run migrate

# View current schema
npx drizzle-kit introspect
```

## Frontend Development

### Technology Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS + Shadcn/UI
- **Data Fetching**: React Query (TanStack Query)
- **Routing**: Wouter
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion

### Creating a New Page

1. **Create Page Component** (`src/pages/MyPage.tsx`)
   ```typescript
   export default function MyPage() {
     return (
       <div className="min-h-screen">
         <h1>My Page</h1>
       </div>
     );
   }
   ```

2. **Add Route** (`src/App.tsx`)
   ```typescript
   import { Route } from 'wouter';
   import MyPage from './pages/MyPage';
   
   <Route path="/my-page" component={MyPage} />
   ```

### Creating a Custom Hook

Example: Data fetching hook (`src/hooks/use-my-data.ts`)

```typescript
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export function useMyData() {
  return useQuery({
    queryKey: ['my-data'],
    queryFn: async () => {
      const { data } = await api.get('/my-endpoint');
      return data;
    },
  });
}
```

### Adding UI Components

SafeSpace uses Shadcn/UI components. To add a new component:

```bash
npx shadcn-ui@latest add button
```

## Database Management

### Schema Design Guidelines

1. **Use UUIDs for primary keys** (anonymity-first)
   ```typescript
   id: uuid('id').defaultRandom().primaryKey()
   ```

2. **Add timestamps** for audit trails
   ```typescript
   createdAt: timestamp('created_at').defaultNow().notNull()
   ```

3. **Use foreign keys** for referential integrity
   ```typescript
   userId: uuid('user_id').references(() => users.id)
   ```

4. **Nullable by default** for optional fields

### Connecting to Database

```bash
# Using Docker
docker exec -it safespace-db-1 psql -U postgres -d postgres

# Locally
psql -h localhost -p 5433 -U postgres -d postgres
```

## API Design Principles

### RESTful Conventions

- **GET** `/api/v1/resource` - List resources
- **GET** `/api/v1/resource/:id` - Get single resource
- **POST** `/api/v1/resource` - Create resource
- **PUT/PATCH** `/api/v1/resource/:id` - Update resource
- **DELETE** `/api/v1/resource/:id` - Delete resource

### Response Formats

**Success Response:**
```json
{
  "id": "uuid",
  "field": "value",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

**Error Response:**
```json
{
  "error": "Error message",
  "details": ["Validation error 1", "Validation error 2"]
}
```

### Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## Code Style & Standards

### TypeScript

- **Strict mode enabled**
- Use explicit types (avoid `any`)
- Prefer interfaces for objects
- Use enums for fixed sets of values

### Linting & Formatting

```bash
# Backend
cd backend
npm run check

# Frontend
cd frontend
npm run check
```

### Naming Conventions

- **Files**: kebab-case (`my-component.tsx`, `user-service.ts`)
- **Components**: PascalCase (`MyComponent`)
- **Functions**: camelCase (`getUserById`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRIES`)
- **Interfaces**: PascalCase with `I` prefix optional (`User` or `IUser`)

## Deployment

### Production Build

```bash
# Build all services
docker compose build

# Start in production mode
docker compose up -d
```

### Environment Variables

**Backend (.env):**
```env
DATABASE_URL=postgresql://user:pass@host:port/db
PORT=3000
NODE_ENV=production
```

**Frontend (.env):**
```env
VITE_API_URL=https://api.safespace.com/api/v1
```

### Docker Compose Production

```yaml
services:
  backend:
    build:
      context: backend
      dockerfile: Dockerfile
    environment:
      NODE_ENV: production
      DATABASE_URL: ${DATABASE_URL}
    restart: unless-stopped
```

## Testing Guidelines

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

### API Testing

Use the provided test script:
```bash
cd backend
./scripts/test-api.sh
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: Kill processes using `lsof -ti:PORT | xargs kill -9`
2. **Database connection**: Ensure PostgreSQL is running and credentials are correct
3. **Migration errors**: Drop database and re-run migrations in development
4. **CORS errors**: Check backend CORS configuration in `src/index.ts`

### Debug Mode

Enable verbose logging:
```bash
DEBUG=* npm run dev
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Pull Request Guidelines

- Write meaningful commit messages
- Include tests for new features
- Update documentation as needed
- Ensure all tests pass
- Follow the code style guide

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

For questions or support, please open an issue on GitHub.
