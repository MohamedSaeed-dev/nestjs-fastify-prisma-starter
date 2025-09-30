# 🚀 NestJS Fastify Prisma Starter

A **high-performance**, **production-ready** backend starter template built with
**NestJS**, **Fastify**, and **Prisma**. This project provides a robust
foundation for building scalable web applications with modern TypeScript
architecture and enhanced developer experience.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue.svg)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11.1+-red.svg)](https://nestjs.com/)
[![Fastify](https://img.shields.io/badge/Fastify-4.x-black.svg)](https://www.fastify.io/)
[![Prisma](https://img.shields.io/badge/Prisma-6.15+-green.svg)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)

> ⭐ **Enhanced Version** - This starter template has been significantly
> improved with advanced TypeScript configurations, comprehensive ESLint rules,
> automated code formatting, Docker support, and professional VS Code settings.

## 🆕 Latest Updates (September 2025) ⭐

### 🔧 Configuration Enhancements

- **Zod Schema Validation**: Robust environment variable validation with
  detailed error reporting
- **Smart Configuration System**: Type-safe configuration with comprehensive
  validation rules
- **Enhanced JWT Security**: Minimum 32-character secret key requirement with
  regex validation

### 🚀 Performance & Monitoring

- **Optimized Fastify Adapter**: Advanced configurations for production-grade
  performance
- **Real-time Monitoring**: Boot time tracking and memory usage monitoring
- **Smart Compression**: Environment-aware compression with adaptive
  optimization levels
- **Graceful Shutdown**: Proper application lifecycle management with signal
  handling

### 🛡️ Security Improvements

- **Advanced Helmet Configuration**: Enhanced CSP policies and security headers
- **Environment-aware CORS**: Smart origin validation with
  development/production modes
- **Client Error Handling**: Robust error handling for malformed requests
- **Enhanced Input Validation**: Comprehensive validation with detailed error
  formatting

### 🐳 Docker & Infrastructure

- **Enhanced PostgreSQL**: PostgreSQL 15-Alpine with health checks and
  optimizations
- **Service Orchestration**: Smart dependency management and network isolation
- **Development Profiles**: Separate configurations for development and
  production environments

## 🚀 Features

### Core Technologies

- **[NestJS](https://nestjs.com/)** - Progressive Node.js framework with
  TypeScript support
- **[Fastify](https://www.fastify.io/)** - Fast and low overhead web framework
  (alternative to Express)
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM with type safety
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database

### Architecture & Performance

- ⚡ **High Performance**: Optimized Fastify adapter with advanced
  configurations ⭐
- 🔒 **Security First**: Enhanced Helmet, CORS, CSP, and security best practices
- 📦 **Smart Compression**: Adaptive gzip/brotli compression with
  environment-based optimization ⭐
- 🎯 **Type Safety**: Full TypeScript support with Prisma generated types
- 🔄 **Hot Reload**: Development mode with automatic restart
- 📊 **Advanced Logging**: Winston logger with structured logging and
  performance metrics ⭐
- ⏱️ **Request Optimization**: Configurable timeouts, connection pooling, and
  graceful shutdown ⭐
- 💾 **Memory Management**: Real-time memory usage monitoring and optimization
  ⭐

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

### Enhanced Development Experience ⭐

- 🧪 **Advanced Testing**: Jest with comprehensive configuration and coverage
  reporting
- 📏 **Strict Code Quality**: Enhanced ESLint rules with TypeScript safety
- 🎨 **Auto Formatting**: Prettier with VS Code integration and save-on-format
- 🔧 **Smart Environment Config**: Centralized configuration with **Zod
  validation** ⭐
- 📚 **API Versioning**: Built-in API versioning support
- 🏗️ **Professional Architecture**: Clean, maintainable, and scalable code
  structure
- 🐳 **Docker Ready**: Multi-stage builds for development and production with
  **Redis integration** ⭐
- ⚡ **VS Code Integration**: Professional workspace settings and debugging
- 🔍 **Import Management**: Automatic import sorting and unused import removal
- 📝 **Path Aliases**: Clean imports with `@/` path mapping
- 🚀 **Performance Monitoring**: Real-time boot time and memory usage tracking
  ⭐
- 🛡️ **Enhanced Security**: Advanced Helmet configuration with CSP policies ⭐

## 📁 Project Structure

```
📁 Project Root
├── 📁 .vscode/                    # VS Code workspace settings ⭐
│   ├── settings.json             # Auto-format, import management
│   ├── launch.json               # Debug configurations
│   ├── tasks.json                # Build and dev tasks
│   └── extensions.json           # Recommended extensions
├── 📁 src/
│   ├── 📁 common/                # Shared utilities and configurations
│   │   ├── 📁 base/              # Base classes (pagination, etc.)
│   │   ├── 📁 config/            # Environment and app configuration
│   │   ├── 📁 decorators/        # Custom decorators (roles, permissions, etc.)
│   │   ├── 📁 exceptions/        # Custom exception classes
│   │   ├── 📁 filters/           # Exception filters with Prisma error handling
│   │   ├── 📁 guards/            # Custom guards (fixed typo) ⭐
│   │   ├── 📁 interceptors/      # Custom interceptors
│   │   ├── 📁 logger/            # Winston logger configuration
│   │   ├── 📁 pipes/             # Custom validation pipes
│   │   └── 📁 utils/             # Utility functions (hashing, etc.)
│   ├── 📁 core/                  # Core application modules
│   │   ├── 📁 auth/              # Authentication module
│   │   │   ├── 📁 dto/           # Login/Signup DTOs
│   │   │   ├── 📁 permissions/   # Permission system
│   │   │   ├── 📁 roles/         # Role-based access control
│   │   │   └── 📁 sessions/      # Session management
│   │   └── 📁 database/          # Database configuration
│   ├── 📁 modules/               # Feature modules
│   │   └── 📁 users/             # User management module
│   ├── 📁 generated/             # Prisma generated client
│   └── main.ts                   # Application entry point
├── 📁 prisma/
│   ├── 📁 migrations/            # Database migrations
│   ├── 📁 schemas/              # Prisma schema files
│   │   ├── schema.prisma         # Main schema configuration
│   │   └── user.prisma           # User model definition
│   ├── 📁 seeders/              # Database seeders
│   │   ├── 📁 data/             # Seed data files
│   │   └── *.seeder.ts           # Seeder implementations
│   └── 📁 sql/                  # Custom SQL files
├── 📁 test/                      # Test files and configurations
├── 📄 .editorconfig             # Editor configuration ⭐
├── 📄 .gitignore                # Enhanced git ignore rules ⭐
├── 📄 .prettierrc               # Prettier formatting rules ⭐
├── 📄 .prettierignore           # Prettier ignore patterns ⭐
├── 📄 eslint.config.mjs         # Enhanced ESLint configuration ⭐
├── 📄 tsconfig.json             # Strict TypeScript configuration ⭐
├── 📄 jest.config.js            # Comprehensive Jest configuration ⭐
├── 📄 Dockerfile                # Production Docker image ⭐
├── 📄 Dockerfile.dev            # Development Docker image ⭐
├── 📄 docker-compose.yml        # Production Docker setup ⭐
├── 📄 docker-compose.dev.yml    # Development Docker setup ⭐
├── 📄 env.example               # Environment variables template ⭐
└── 📄 SETUP.md                  # Setup guide for enhancements ⭐
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

# Install additional development dependencies for enhanced features ⭐
npm install -D tsconfig-paths eslint-plugin-import jest-watch-typeahead
```

### 3. Environment Configuration

Copy the example environment file and customize it:

```bash
# Copy the example environment file ⭐
cp env.example .env
```

Edit the `.env` file with your configuration:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Application Configuration
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# JWT Configuration (Enhanced Security) ⭐
# Note: JWT_SECRET_KEY must be at least 32 characters long
JWT_SECRET_KEY=your-super-secret-jwt-key-that-is-at-least-32-characters-long-change-this-in-production
JWT_EXPIRES_IN=7d

# Optional: Prisma Optimize
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

## ⚡ Quick Start Guide

For experienced developers, here's the fastest way to get started:

```bash
# Clone and setup
git clone <repository-url>
cd nestjs-fastify-prisma-starter

# Install dependencies (including enhanced dev tools)
npm install
npm install -D tsconfig-paths eslint-plugin-import jest-watch-typeahead

# Setup environment with enhanced configuration ⭐
cp env.example .env
# Edit .env with your database URL, JWT secret (min 32 chars)

# Database setup
npx prisma generate
npx prisma migrate dev
npm run seed

# Start development server with monitoring ⭐
npm run start:dev

# Or use Docker for full environment ⭐
docker-compose -f docker-compose.dev.yml up
```

**VS Code Users**: Install recommended extensions when prompted for the best
experience!

## 🔐 Default Users

The seeder creates three default users for testing:

| Role   | Email            | Username | Password |
| ------ | ---------------- | -------- | -------- |
| ADMIN  | admin@gmail.com  | admin    | Bc123456 |
| SELLER | amazon@gmail.com | amazon   | Bc123456 |
| BUYER  | it@gmail.com     | it       | Bc123456 |

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

All endpoints are versioned with `/api/v1/` prefix. You can create new versions
by updating the version in your controllers.

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

## 🔧 Enhanced Development Commands ⭐

### Code Quality & Formatting

```bash
# Auto-format code with Prettier
npm run format

# Lint and fix code issues
npm run lint

# Build for production
npm run build

# Type checking
npx tsc --noEmit
```

### Database Operations

```bash
# Open Prisma Studio (Database GUI)
npx prisma studio

# Reset database with fresh migrations
npx prisma migrate reset

# Push schema changes without migrations
npx prisma db push

# Generate Prisma client after schema changes
npx prisma generate

# Run database seeders
npm run seed
```

### Docker Development ⭐

```bash
# Start development environment with Docker
docker-compose -f docker-compose.dev.yml up

# Build and start production environment
docker-compose up --build

# Stop Docker services
docker-compose down

# View logs
docker-compose logs -f
```

### VS Code Integration ⭐

- **Auto-format on save** - Code is automatically formatted when you save
- **Auto-import organization** - Imports are sorted and unused ones removed
- **Debug support** - Press `F5` to start debugging
- **Task runner** - Use `Ctrl+Shift+P` → "Tasks: Run Task"

## ⭐ What's New in This Enhanced Version

This starter template has been significantly improved with professional
development tools and configurations:

### 🛠️ Enhanced Development Tools

- **Strict TypeScript Configuration**: Enhanced type safety with strict mode
  enabled
- **Professional ESLint Rules**: Comprehensive linting with NestJS-specific
  rules
- **Advanced Prettier Setup**: Multi-format support with overrides for different
  file types
- **Import Management**: Automatic import sorting and unused import removal
- **Path Aliases**: Clean imports using `@/` prefix for better code organization

### 🐳 Docker Integration ⭐

- **Multi-stage Production Builds**: Optimized Docker images for production
- **Development Environment**: Hot-reload Docker setup with debugging support
- **Enhanced Database Services**: PostgreSQL 15-Alpine with health checks and
  data persistence ⭐
- **Redis Integration**: Redis 7-Alpine with data persistence and optimized
  configuration ⭐
- **Management Tools**: Adminer for database management with development
  profiles ⭐
- **Network Isolation**: Secure app-network with bridge driver for service
  communication ⭐
- **Volume Management**: Persistent data storage for PostgreSQL, Redis, logs,
  and uploads ⭐
- **Service Dependencies**: Smart dependency management with health checks ⭐

### ⚡ VS Code Professional Setup

- **Workspace Configuration**: Auto-format, import management, and debugging
- **Task Integration**: Build, test, and Docker tasks accessible via Command
  Palette
- **Extension Recommendations**: Curated list of essential VS Code extensions
- **Debug Configurations**: Ready-to-use debug setups for app and tests

### 🔧 Configuration Improvements

- **Environment Template**: Comprehensive `.env.example` with all configuration
  options
- **Git Integration**: Enhanced `.gitignore` with comprehensive exclusions
- **Editor Config**: Consistent coding standards across different editors
- **Jest Configuration**: Advanced testing setup with coverage and path mapping

### 🚀 Developer Experience

- **Auto-format on Save**: Code is automatically formatted when you save files
- **Import Organization**: Unused imports are removed and remaining ones are
  sorted
- **Type Safety**: Strict TypeScript configuration catches more errors at
  compile time
- **Error Handling**: Comprehensive Prisma error handling with user-friendly
  messages

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

### Security Features ⭐

- **Advanced Helmet Configuration**: Enhanced security headers with CSP policies
  ⭐
- **Smart CORS**: Environment-aware cross-origin configuration with whitelist
  support ⭐
- **Rate Limiting**: Built-in request throttling with configurable limits
- **Input Validation**: Comprehensive request validation with Zod schema
  validation ⭐
- **JWT Security**: Enhanced JWT tokens with configurable expiration and strong
  secret validation ⭐
- **Client Error Handling**: Robust error handling for malformed requests ⭐
- **Environment-Based Security**: Different security levels for development and
  production ⭐
- **XSS Protection**: Built-in XSS filtering and frame protection ⭐

## 🚀 Production Deployment

### Environment Variables

Ensure all required environment variables are set:

- `DATABASE_URL`
- `JWT_SECRET_KEY`
- `NODE_ENV=PROD`
- `PORT`

### Performance Optimizations ⭐

- **Smart Compression**: Environment-aware gzip/brotli compression with adaptive
  levels ⭐
- **Connection Pooling**: Optimized database connection management
- **Graceful Shutdown**: Enhanced shutdown handling with proper signal
  management ⭐
- **Real-time Monitoring**: Boot time tracking and memory usage monitoring ⭐
- **Request Optimization**: Configurable timeouts, keep-alive, and body limits
  ⭐
- **Client Error Handling**: Robust error handling for malformed requests ⭐
- **Performance Metrics**: Detailed logging of application performance
  statistics ⭐

### Recommended Deployment Platforms

- **Railway**
- **Heroku**
- **DigitalOcean App Platform**
- **AWS ECS/Lambda**
- **Google Cloud Run**

## 📚 Additional Resources

### Official Documentation

- [NestJS Documentation](https://docs.nestjs.com) - Framework documentation
- [Fastify Documentation](https://www.fastify.io/docs/) - High-performance web
  framework
- [Prisma Documentation](https://www.prisma.io/docs) - Database toolkit and ORM
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) - Database
  documentation

### Development Tools

- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript
  language reference
- [ESLint Rules](https://eslint.org/docs/rules/) - Code linting rules
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html) -
  Code formatting
- [Jest Documentation](https://jestjs.io/docs/getting-started) - Testing
  framework

### Deployment & DevOps

- [Docker Documentation](https://docs.docker.com/) - Containerization
- [Docker Compose](https://docs.docker.com/compose/) - Multi-container
  applications
- [VS Code Extensions](https://marketplace.visualstudio.com/vscode) - Editor
  extensions

### Enhanced Features Guide

- [SETUP.md](./SETUP.md) - Detailed setup guide for all enhancements
- [Path Mapping Guide](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping) -
  TypeScript path aliases
- [ESLint TypeScript Rules](https://typescript-eslint.io/rules/) -
  TypeScript-specific linting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the UNLICENSED License - see the package.json
file for details.

## 👨‍💻 Author

[**MohamedSaeed-dev**](https://github.com/MohamedSaeed-dev)

---

**Last Updated: September 2025** ⭐ **Happy coding! 🎉**
