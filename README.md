# VisonVFX - Full Stack Application

A modern full-stack application built with NestJS (Backend) and React + Vite (Frontend).

## Project Structure

```
├── backend/               # NestJS Backend
│   ├── src/
│   │   ├── modules/      # Feature modules
│   │   ├── core/        # Core functionality
│   │   ├── config/      # Configuration
│   │   └── database/    # Database & Prisma
│   └── test/            # E2E tests
│
└── frontend/             # React + Vite Frontend
    ├── src/
    │   ├── components/   # React components
    │   ├── assets/      # Static assets
    │   └── App.tsx      # Root component
    └── public/          # Public assets
```

## Technology Stack

### Backend

- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL with Prisma ORM
- **Testing**: Jest
- **Docker**: Containerized development environment
- **Documentation**: Swagger/OpenAPI

### Frontend

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Shadcn UI
- **State Management**: Zustand/redux

## Getting Started

### Prerequisites

- Node.js (v18+)
- Docker & Docker Compose
- npm or yarn
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/BHWalid/VV.git
   cd VV
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install

   # Copy environment file
   cp .env.example .env

   # Start database
   docker-compose up -d

   # Run migrations
   npm run db:migrate:dev

   # Start development server
   npm run start:dev
   ```

3. **Frontend Setup**

   ```bash
   cd frontend
   npm install

   # Start development server
   npm run dev
   ```

### Development URLs

- Backend API: http://localhost:3000
- Frontend App: http://localhost:5173
- API Documentation: http://localhost:3000/docs
- Database Studio: http://localhost:5555

## Development Workflow

### Backend Development

1. Create new features in `backend/src/modules/`
2. Update database schema in `backend/src/database/schema.prisma`
3. Run migrations when schema changes
4. Write tests in `backend/test/`

### Frontend Development

1. Add new components in `frontend/src/components/`
2. Update routing in `frontend/src/App.tsx`
3. Add new pages in `frontend/src/pages/`
4. Handle state management as needed

## Testing

### Backend Tests

```bash
cd backend

# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

### Frontend Tests

```bash
cd frontend

# Run tests
npm run test
```

## Docker Support

### Start all services

```bash
docker-compose up -d
```

## Project Scripts

### Backend

- `npm run start:dev` - Start development server
- `npm run build` - Build for production
- `npm run start:prod` - Start production server
- `npm run lint` - Lint code
- `npm run test` - Run tests

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code

## Project Structure Details

### Backend Structure

```
backend/
├── src/
│   ├── app.module.ts        # Main application module
│   ├── main.ts             # Application entry point
│   ├── config/             # Configuration files
│   ├── core/               # Core functionality
│   │   ├── interceptors/   # Global interceptors
│   │   ├── logger/         # Logging service
│   │   └── middleware/     # Global middleware
│   ├── database/           # Database configuration
│   └── modules/            # Feature modules
└── test/                   # Test files
```

### Frontend Structure

```
frontend/
├── src/
│   ├── App.tsx            # Root component
│   ├── main.tsx          # Entry point
│   ├── components/       # Reusable components
│   ├── pages/           # Page components
│   ├── assets/          # Static assets
│   └── styles/          # Global styles
└── public/              # Public assets
```

## Contributing

1. Create a new branch for your feature
2. Make changes and test thoroughly
3. Submit a pull request with a clear description
4. Ensure all tests pass
5. Wait for review and approval

## Best Practices

### Backend

- Follow NestJS module structure
- Use DTOs for data validation
- Implement proper error handling
- Write comprehensive tests
- Use TypeScript decorators appropriately

### Frontend

- Follow React best practices
- Use TypeScript for type safety
- Implement proper error boundaries
- Keep components small and focused
- Use proper state management

## Troubleshooting

### Backend Issues

1. **Database Connection**

   - Check Docker containers
   - Verify .env configuration
   - Check Prisma schema

2. **Build Errors**
   - Clear dist folder
   - Check TypeScript errors
   - Verify dependencies

### Frontend Issues

1. **Build Problems**

   - Clear node_modules and reinstall
   - Check TypeScript errors
   - Verify Vite config

2. **Runtime Errors**
   - Check browser console
   - Verify API endpoints
   - Check state management
