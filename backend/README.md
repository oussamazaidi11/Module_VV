# Backend Architecture Guide

## Project Structure Overview

```
backend/
├── src/                      # Source code
│   ├── app.module.ts        # Main application module
│   ├── main.ts             # Application entry point
│   ├── config/             # Configuration files
│   ├── core/              # Core functionality
│   │   ├── core.module.ts
│   │   ├── interceptors/   # Global interceptors
│   │   ├── logger/        # Logging service
│   │   └── middleware/    # Global middleware
│   ├── database/          # Database configuration
│   │   ├── schema.prisma  # Prisma schema
│   │   └── database.module.ts
│   └── modules/           # Feature modules
├── test/                  # Test files
└── docker-compose.yml     # Docker configuration
```

## Key Components Explained

### 1. Entry Points

- `main.ts`: Application bootstrap file where the NestJS application is created and configured
- `app.module.ts`: Root module that imports all other modules

### 2. Core Module (`/src/core`)

The core module contains application-wide features:

- **Interceptors**: Transform responses before they're sent to the client
  - `transform-response.interceptor.ts`: Standardizes API responses
- **Logger**: Custom logging service
  - `logger.service.ts`: Winston-based logging
- **Middleware**: Global middleware
  - `logger.middleware.ts`: HTTP request logging

### 3. Database (`/src/database`)

Database configuration and models:

- `schema.prisma`: Defines database models and relationships
- `database.module.ts`: Provides database connection
- `database.service.ts`: Database service with Prisma client

### 4. Configuration (`/src/config`)

Environment and application configuration:

- `index.ts`: Exports configuration values from environment variables

### 5. Feature Modules (`/src/modules`)

Place new features here following this structure:

```
modules/
└── feature/
    ├── dto/           # Data Transfer Objects
    ├── pipes/
    ├── feature.controller.ts
    ├── feature.service.ts
    ├── feature.module.ts
    └── feature.spec.ts
```

## Getting Started

1. **Environment Setup**

   ```bash
   # Install dependencies
   npm install

   # Set up environment variables
   cp .env.example .env
   ```

2. **Database Setup**

   ```bash
   # Start PostgreSQL database
   npm run docker:start

   # Run migrations
   npm run db:migrate:dev
   ```

3. **Running the Application**

   ```bash
   # Development mode
   npm run start:dev

   # Production mode
   npm run start:prod
   ```

4. **Testing**

   ```bash
   # Unit tests
   npm run test

   # E2E tests
   npm run test:e2e
   ```

## Best Practices

1. **Module Organization**

   - Keep modules focused and single-responsibility
   - Use feature modules for distinct functionality
   - Import shared functionality through the CoreModule

2. **Database**

   - Use Prisma migrations for database changes
   - Keep the schema.prisma file up to date
   - Use database transactions for related operations

3. **Error Handling**

   - Use NestJS built-in exception filters
   - Create custom exceptions when needed
   - Always validate input using DTOs

4. **Configuration**

   - Use environment variables for configuration
   - Validate configuration using ConfigService
   - Keep sensitive data in .env files (never commit these)

5. **Testing**
   - Write unit tests for services and controllers
   - Use e2e tests for critical paths
   - Keep test databases separate from development

## Common Tasks

### Creating a New Feature

1. Generate the module:

   ```bash
   nest g module modules/your-feature
   ```

2. Generate components:

   ```bash
   nest g controller modules/your-feature
   nest g service modules/your-feature
   ```

3. Add DTOs and entities in their respective folders

### Database Operations

1. Create a new model:

   - Add model to `schema.prisma`
   - Run `npm run db:migrate:dev` to create migration

2. Update existing model:
   - Modify model in `schema.prisma`
   - Run `npm run db:migrate:dev` to create migration

### Adding Middleware

1. Create middleware in `core/middleware`
2. Register in `core.module.ts` for global scope

## Documentation

- API documentation is available at `/docs` when running the application
- Use Swagger decorators to document APIs
- Keep README files up to date in each module

## Troubleshooting

Common issues and solutions:

1. **Database Connection Issues**

   - Check if Docker containers are running
   - Verify .env configuration
   - Run `npm run docker:down` and `npm run docker:start`

2. **Prisma Issues**

   - Run `npx prisma generate` after schema changes
   - Check DATABASE_URL in .env
   - Run `npm run db:migrate:reset` to reset database

3. **Test Failures**
   - Ensure test database is running
   - Check .env.test configuration
   - Run `npm run test:e2e` with clean database
