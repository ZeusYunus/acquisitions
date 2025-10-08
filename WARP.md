# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Running the Application

```bash
# Start development server with hot reloading
npm run dev

# The server runs on http://localhost:3000 by default
```

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code with Prettier
npm run format

# Check code formatting
npm run format:check
```

### Database Operations

```bash
# Generate new migration files from schema changes
npm run db:generate

# Apply migrations to Neon database
npm run db:migrate

# Open Drizzle Studio for database management
npm run db:studio
```

## Architecture Overview

### Application Structure

This is a Node.js Express API with a clean MVC-style architecture:

- **Entry Point**: `src/index.js` loads environment and starts server
- **Application Setup**: `src/app.js` configures Express middleware and routes
- **Server**: `src/server.js` starts the HTTP server

### Key Architectural Patterns

1. **Path Aliases**: The project uses Node.js import maps for clean imports:
   - `#config/*` → `./src/config/*`
   - `#controllers/*` → `./src/controllers/*`
   - `#models/*` → `./src/models/*`
   - `#routes/*` → `./src/routes/*`
   - `#services/*` → `./src/services/*`
   - `#utils/*` → `./src/utils/*`
   - `#validations/*` → `./src/validations/*`

2. **Database Layer**: Uses Drizzle ORM with Neon PostgreSQL
   - Schema defined in `src/models/`
   - Database connection in `src/config/database.js`
   - Migrations stored in `drizzle/` directory

3. **Authentication Flow**:
   - JWT-based authentication with HTTP-only cookies
   - Password hashing with bcrypt (10 rounds)
   - Zod schema validation for request data
   - Role-based access (user/admin roles)

### Directory Structure

```
src/
├── config/          # Database and logger configuration
├── controllers/     # Request handlers (thin layer)
├── models/          # Drizzle schema definitions
├── routes/          # Express route definitions
├── services/        # Business logic (fat layer)
├── utils/           # JWT, cookies, formatting utilities
└── validations/     # Zod schema validations
```

### Current API Endpoints

- `GET /` - Basic hello endpoint
- `GET /health` - Health check with uptime
- `GET /api` - API status check
- `POST /api/auth/sign-up` - User registration (functional)
- `POST /api/auth/sign-in` - User login (placeholder)
- `POST /api/auth/sign-out` - User logout (placeholder)

## Technology Stack

### Core Dependencies

- **Express 5.1.0** - Web framework
- **Drizzle ORM 0.44.6** - Database ORM
- **@neondatabase/serverless** - Neon PostgreSQL driver
- **Winston** - Structured logging
- **Zod** - Runtime type validation
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT tokens
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

### Development Stack

- **ESLint** - Code linting with custom rules
- **Prettier** - Code formatting
- **Drizzle Kit** - Database migrations and studio

## Environment Configuration

Required environment variables (see `.env.example`):

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `LOG_LEVEL` - Logging level (default: info)
- `DATABASE_URL` - Neon PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret (change in production)

## Development Notes

### Code Style

- ES modules (type: "module" in package.json)
- 2-space indentation
- Single quotes for strings
- Unix line endings (LF)
- Semicolons required

### Database Schema

Current schema includes a `users` table with:

- Serial ID primary key
- Name, email (unique), password (hashed)
- Role field (user/admin)
- Created/updated timestamps

### Logging

- Winston logger with file and console transports
- Structured JSON logging for production
- Colored console output in development
- HTTP request logging via Morgan

### Security Features

- Helmet for security headers
- HTTP-only cookies for JWT tokens
- CORS protection
- Input validation with Zod
- Password hashing with bcrypt

### Known Incomplete Features

- Sign-in and sign-out endpoints are placeholders
- No middleware for JWT verification
- No role-based authorization middleware
- No error handling middleware
