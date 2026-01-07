# SafeSpace - Mental Health Support Platform

## Overview

SafeSpace is a mental health support platform designed for young people. It provides a safe, anonymous environment where users can share personal struggles and survival stories, read and react to others' stories, and access mental health resources.

The application is currently a **frontend-only prototype** using mock data to demonstrate UI and user interactions. The architecture is set up to support a full backend implementation with PostgreSQL when needed.

**Core Principles:**
- Emotional safety and privacy
- Anonymous posting and interaction
- Non-judgmental, calming user experience
- Clean, soothing UI design

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework:** React with TypeScript using Vite as the build tool
- **Routing:** Wouter for client-side routing (lightweight alternative to React Router)
- **State Management:** TanStack React Query for server state and caching
- **Styling:** Tailwind CSS with a custom calming color palette (soft blues, sage greens, warm neutrals)
- **UI Components:** shadcn/ui component library built on Radix UI primitives
- **Animations:** Framer Motion for smooth page transitions and micro-interactions
- **Fonts:** Fredoka (display) and Nunito (body) for friendly, approachable typography

### Backend Architecture
- **Runtime:** Node.js with Express
- **Language:** TypeScript compiled with tsx
- **Mode:** Currently in prototype mode with minimal backend routes
- **API Pattern:** RESTful endpoints under `/api/` prefix
- **Build:** esbuild for server bundling, Vite for client bundling

### Data Layer
- **ORM:** Drizzle ORM configured for PostgreSQL
- **Schema Location:** `shared/schema.ts` for database models
- **Current State:** Mock data in frontend hooks (`use-stories.ts`, `use-auth.ts`) - no active database connection required for prototype

### Authentication
- **Replit Auth Integration:** Pre-configured OAuth/OIDC setup using Replit's authentication service
- **Session Management:** Express sessions with PostgreSQL session store (connect-pg-simple)
- **Current State:** Mock authentication returning null user for prototype demonstration

### Project Structure
```
client/src/          # React frontend application
  pages/             # Route components (Home, Community, Resources)
  components/        # Reusable UI components
  hooks/             # Custom hooks including mock data providers
  lib/               # Utilities and query client configuration
server/              # Express backend
  replit_integrations/auth/  # Replit authentication setup
shared/              # Shared types, schemas, and route definitions
```

## External Dependencies

### Database
- **PostgreSQL:** Configured via Drizzle ORM but not actively used in prototype mode
- **Connection:** Expects `DATABASE_URL` environment variable when database features are enabled

### Authentication Services
- **Replit Auth:** OpenID Connect integration for user authentication
- **Session Storage:** PostgreSQL-backed session store

### UI Libraries
- **Radix UI:** Accessible, unstyled component primitives
- **shadcn/ui:** Pre-styled component library based on Radix
- **Lucide React:** Icon library

### Build & Development
- **Vite:** Frontend development server and bundler
- **esbuild:** Server-side TypeScript compilation
- **Replit Plugins:** Runtime error overlay, cartographer, dev banner for Replit environment