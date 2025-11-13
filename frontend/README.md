# VisonVFX Frontend

Modern React frontend built with Vite and TypeScript for the VisonVFX application.

## Project Structure

```
frontend/
├── src/
│   ├── App.tsx          # Root component
│   ├── main.tsx        # Entry point
│   ├── components/     # Reusable components
│   ├── assets/        # Static assets
│   └── pages/         # Page components
├── public/            # Static files
└── vite.config.ts     # Vite configuration
```

## Tech Stack

- **Framework**: React 18+
- **Build Tool**: Vite
- **Language**: TypeScript
- **Routing**: React Router
- **State Management**: [State management solution]
- **Styling**: Tailwind / shadcn
- **Testing**: [Testing framework]
- **Code Quality**: ESLint + Prettier

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Backend server running (see backend README)

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code
- `npm run test` - Run tests (when configured)

## Development Guidelines

### Component Structure

```typescript
// Component Example
import React from 'react';

interface Props {
  // Props definition
}

export const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
  return (
    // JSX
  );
};
```

### Best Practices

1. **Component Organization**

   - One component per file
   - Use TypeScript interfaces for props
   - Keep components small and focused
   - Use composition over inheritance

2. **State Management**

   - Use hooks for local state
   - Follow state management patterns
   - Keep state as close to components as possible

3. **Styling**

   - Follow consistent naming conventions
   - Use CSS modules or styled-components
   - Maintain responsive design principles

4. **Performance**

   - Implement lazy loading
   - Use React.memo when needed
   - Optimize images and assets

5. **Testing**
   - Write unit tests for components
   - Test business logic
   - Use meaningful test descriptions

### File Naming Conventions

- Components: PascalCase (e.g., `Button.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Styles: same as component (e.g., `Button.module.css`)
- Tests: ComponentName.test.tsx

### Directory Structure Details

```
src/
├── components/          # Reusable components
├── pages/              # Page components
├── hooks/              # Custom hooks
├── utils/              # Utility functions
├── types/              # TypeScript types
├── assets/             # Static assets
└── App.tsx             # Root component
```

## Troubleshooting

1. **Build Issues**

   - Clear `node_modules` and reinstall
   - Verify TypeScript configuration
   - Check for environment variables

2. **Development Server**

   - Verify correct port usage
   - Check for conflicting processes
   - Review Vite configuration

3. **Type Errors**
   - Update TypeScript definitions
   - Check import paths
   - Verify prop types

## Contributing

1. Create feature branch
2. Make changes
3. Run tests and linting
4. Submit pull request
5. Wait for review

## Dependencies

Core dependencies and their purposes:

- `react`: UI library
- `react-dom`: DOM rendering
- `react-router-dom`: Routing
- `typescript`: Type support
- `vite`: Build tool
- `eslint`: Code linting
- `prettier`: Code formatting

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
