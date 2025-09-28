# NestJS Fastify Prisma Starter

A high-performance, production-ready backend starter template built with **NestJS**, **Fastify**, and **Prisma**. This project provides a robust foundation for building scalable web applications with modern TypeScript architecture.

## 🚀 Features

### Core Technologies

- **[NestJS](https://nestjs.com/)** - Progressive Node.js framework with TypeScript support
- **[Fastify](https://www.fastify.io/)** - Fast and low overhead web framework (alternative to Express)
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM with type safety
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database

### Architecture & Performance

- ⚡ **High Performance**: Fastify adapter for superior performance over Express
- 🔒 **Security First**: Helmet, CORS, CSP, and security best practices
- 📦 **Compression**: Built-in gzip/brotli compression
- 🎯 **Type Safety**: Full TypeScript support with Prisma generated types
- 🔄 **Hot Reload**: Development mode with automatic restart
- 📊 **Logging**: Winston logger integration with structured logging

### Authentication & Authorization

- 🔐 **JWT Authentication**: Secure token-based authentication
- 👥 **Role-Based Access Control (RBAC)**: Admin, Seller, Buyer roles
- 🛡️ **Guards & Decorators**: Custom guards for route protection
- 📝 **Validation**: Class-validator with comprehensive DTOs

### Database & ORM

- 🗃️ **Prisma ORM**: Type-safe database access
- 🔄 **Migrations**: Database schema versioning
- 🌱 **Seeders**: Pre-populated test data
- 📈 **Optimizations**: Prisma extensions for performance

### Development Experience

- 🧪 **Testing**: Jest setup for unit and e2e tests
- 📏 **Code Quality**: ESLint + Prettier configuration
- 🔧 **Environment Config**: Centralized configuration management
- 📚 **API Versioning**: Built-in API versioning support
- 🎨 **Modular Architecture**: Clean, maintainable code structure

## 📁 Project Structure

```
src/
├── common/                 # Shared utilities and configurations
│   ├── base/              # Base classes (pagination, etc.)
│   ├── config/            # Environment and app configuration
│   ├── decorators/        # Custom decorators (roles, permissions, etc.)
│   ├── exceptions/        # Custom exception classes
│   ├── filters/           # Exception filters
│   ├── guards/            # Custom guards
│   ├── interceptors/      # Custom interceptors
│   ├── logger/            # Winston logger configuration
│   ├── pipes/             # Custom validation pipes
│   └── utils/             # Utility functions (hashing, etc.)
├── core/                  # Core application modules
│   ├── auth/              # Authentication module
│   │   ├── dto/           # Login/Signup DTOs
│   │   ├── permissions/   # Permission system
│   │   ├── roles/         # Role-based access control
│   │   └── sessions/      # Session management
│   └── database/          # Database configuration
├── modules/               # Feature modules
│   └── users/             # User management module
├── generated/             # Prisma generated client
└── main.ts               # Application entry point

prisma/
├── migrations/            # Database migrations
├── schemas/              # Prisma schema files
│   ├── schema.prisma     # Main schema configuration
│   └── user.prisma       # User model definition
├── seeders/              # Database seeders
│   ├── data/             # Seed data files
│   └── *.seeder.ts       # Seeder implementations
└── sql/                  # Custom SQL files
```

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** database

### 1. Clone the Repository

```bash
git clone <repository-url>
cd nestjs-fastify-prisma-starter
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Application
PORT=3000
NODE_ENV=DEV
FRONTEND_URL=http://localhost:3000

# Authentication
JWT_SECRET_KEY=your-super-secret-jwt-key

# Prisma (Optional)
OPTIMIZE_API_KEY=your-prisma-optimize-key
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database with initial data
npm run seed
```

### 5. Start the Application

```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

The application will start on `http://localhost:3000` (or your configured PORT).

## 🔐 Default Users

The seeder creates three default users for testing:

| Role   | Email            | Username | Password   |
| ------ | ---------------- | -------- | ---------- |
| ADMIN  | admin@gmail.com  | admin    | Aa475869\* |
| SELLER | amazon@gmail.com | amazon   | Aa475869\* |
| BUYER  | it@gmail.com     | it       | Aa475869\* |

## 📡 API Endpoints

### Authentication

```
POST /api/v1/auth/login     # User login
POST /api/v1/auth/signup    # User registration
```

### Users

```
GET    /api/v1/users           # Get all users (Admin only)
POST   /api/v1/users           # Create user (Admin only)
GET    /api/v1/users/:id       # Get user by ID
GET    /api/v1/users/profile   # Get current user profile
PATCH  /api/v1/users/profile   # Update current user profile
PATCH  /api/v1/users/:id       # Update user (Admin only)
DELETE /api/v1/users/:id       # Delete user (Admin only)
```

### API Versioning

All endpoints are versioned with `/api/v1/` prefix. You can create new versions by updating the version in your controllers.

## 🧪 Testing

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Debug tests
npm run test:debug
```

## 🔧 Development Commands

```bash
# Code formatting
npm run format

# Linting
npm run lint

# Build for production
npm run build

# Database operations
npx prisma studio          # Open Prisma Studio
npx prisma migrate reset    # Reset database
npx prisma db push         # Push schema changes
```

## 🏗️ Architecture Decisions

### Why Fastify over Express?

- **Performance**: Up to 2x faster than Express
- **Schema-based validation**: Built-in JSON schema validation
- **Plugin architecture**: Modular and extensible
- **TypeScript support**: First-class TypeScript support

### Why Prisma?

- **Type Safety**: Generated TypeScript types
- **Developer Experience**: Intuitive API and great tooling
- **Database Agnostic**: Easy to switch between databases
- **Migration System**: Robust schema management

### Security Features

- **Helmet**: Security headers
- **CORS**: Configurable cross-origin requests
- **Rate Limiting**: Built-in request throttling
- **Input Validation**: Comprehensive request validation
- **JWT**: Secure authentication tokens

## 🚀 Production Deployment

### Environment Variables

Ensure all required environment variables are set:

- `DATABASE_URL`
- `JWT_SECRET_KEY`
- `NODE_ENV=PROD`
- `PORT`

### Performance Optimizations

- Compression enabled (gzip/brotli)
- Connection pooling configured
- Graceful shutdown handling
- Memory usage monitoring
- Request timeout configuration

### Recommended Deployment Platforms

- **Railway**
- **Heroku**
- **DigitalOcean App Platform**
- **AWS ECS/Lambda**
- **Google Cloud Run**

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Fastify Documentation](https://www.fastify.io/docs/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the UNLICENSED License - see the package.json file for details.

## 👨‍💻 Author

**MohamedSaeed-dev**

---

**Happy coding! 🎉**
