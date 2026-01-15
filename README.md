# SafeSpace 🌿

A mental health support platform designed to provide a safe, anonymous space for individuals to share their stories, connect with others, and access mental health resources.

## 🎯 Overview

SafeSpace is a full-stack web application that prioritizes user anonymity and emotional support. Users can:
- **Share stories anonymously** about their mental health journey
- **Connect with others** through supportive reactions
- **Access resources** for professional mental health support
- **Report inappropriate content** to maintain a safe community

## 🏗️ Architecture

```
SafeSpace/
├── frontend/          # React + TypeScript + Vite
├── backend/           # Node.js + Express + Drizzle ORM
├── docker-compose.yml # Multi-container orchestration
└── docs/              # Additional documentation
```

### Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- React Query for data fetching
- Wouter for routing
- Framer Motion for animations

**Backend:**
- Node.js with Express
- TypeScript
- Drizzle ORM
- PostgreSQL database
- Swagger/OpenAPI documentation
- Zod for validation

**Infrastructure:**
- Docker & Docker Compose
- Separate networks for security isolation
- PostgreSQL (Bitnami image)

## 🚀 Quick Start

### Prerequisites

- [Docker](https://www.docker.com/get-started) and Docker Compose
- [Node.js](https://nodejs.org/) 18+ (for local development)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Running with Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SafeSpace
   ```

2. **Start all services**
   ```bash
   docker compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:3000
   - API Documentation: http://localhost:3000/api-docs

### Running Locally (Development)

#### 1. Start the Database
```bash
docker compose up -d db
```

#### 2. Setup and Run Backend
```bash
cd backend
npm install
npm run migrate    # Apply database migrations
npm run dev        # Start development server
```

#### 3. Setup and Run Frontend
```bash
cd frontend
npm install
npm run dev        # Start development server
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 📚 API Documentation

The API is fully documented using Swagger/OpenAPI:
- **Swagger UI**: http://localhost:3000/api-docs

### Main Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/stories` | Retrieve all stories |
| POST | `/api/v1/stories` | Create a new story |
| POST | `/api/v1/stories/:id/reactions` | Add reaction to a story |
| POST | `/api/v1/stories/:id/report` | Report inappropriate content |
| GET | `/api/v1/resources` | Get mental health resources |

## 🗄️ Database Schema

The application uses PostgreSQL with the following main tables:

- **users** - User accounts (optional, anonymity-first)
- **stories** - User-shared mental health stories
- **reactions** - Anonymous reactions to stories
- **reports** - Content moderation reports
- **resources** - Mental health support resources

Migrations are managed using Drizzle Kit.

## 🔒 Security Features

1. **Network Isolation**: Docker networks prevent frontend from accessing database directly
2. **Content Filtering**: Basic offensive word filtering on story submission
3. **Input Validation**: Zod schemas validate all API inputs
4. **Anonymous-First**: Stories are posted anonymously by default

## 🧪 Testing

### Backend API Testing
```bash
cd backend
chmod +x scripts/test-api.sh
./scripts/test-api.sh
```

## 🤝 Contributing

See [DEVELOPER.md](./DEVELOPER.md) for detailed development guidelines.

### Development Workflow
1. Create a feature branch
2. Make your changes
3. Test locally
4. Submit a pull request

## 📝 Environment Variables

### Backend
Create a `.env` file in the `backend` directory:
```env
DATABASE_URL=postgres://postgres:mysecretpassword@localhost:5433/postgres
PORT=3000
NODE_ENV=development
```

### Frontend
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:3000/api/v1
```

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Restart database
docker compose restart db

# Check database logs
docker compose logs db
```

### Port Already in Use
```bash
# Kill process on port 3000 (backend)
lsof -ti:3000 | xargs kill -9

# Kill process on port 8080 (frontend)
lsof -ti:8080 | xargs kill -9
```

### Migration Issues
```bash
cd backend
npm run migrate
```

## 📄 License

[Add your license here]

## 🆘 Support Resources

If you or someone you know is in crisis, please reach out:
- **National Suicide Prevention Lifeline**: 988
- **Crisis Text Line**: Text HOME to 741741
- **The Trevor Project**: 1-866-488-7386

## 👥 Authors

[Add author information]

---

**Note**: This is a mental health support platform. If you're experiencing a mental health emergency, please contact professional services immediately.