# Frontend Application

This is the frontend application built with React, Vite, and TailwindCSS. The application provides a modern, responsive user interface for interacting with the backend API.

## Project Structure

```
frontend/
├── public/          # Static assets
├── src/             # Source code
│   ├── assets/      # Images, fonts, and other static files
│   ├── components/  # Reusable React components
│   ├── context/     # React context providers
│   ├── layouts/     # Layout components
│   ├── pages/       # Page components
│   ├── utils/       # Utility functions
│   ├── App.jsx      # Main application component
│   ├── App.css      # Main application styles
│   ├── index.css    # Global styles
│   └── main.jsx     # Application entry point
├── index.html       # HTML template
├── vite.config.js   # Vite configuration
├── eslint.config.js # ESLint configuration
└── package.json     # Project dependencies
```

## Detailed Component Documentation

### Source Code (`/src`)

#### Components (`/src/components`)
Reusable UI components used throughout the application.

#### Context (`/src/context`)
React context providers for state management.

#### Layouts (`/src/layouts`)
Layout components that define the structure of different pages.

#### Pages (`/src/pages`)
Main page components for different routes.

#### Utils (`/src/utils`)
Utility functions and helpers.

#### Assets (`/src/assets`)
Static assets like images, icons, and fonts.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Modern web browser

## Dependencies

### Core Dependencies
- React - UI library
- React DOM - React rendering
- React Router DOM - Routing
- Axios - HTTP client
- Framer Motion - Animation library
- React Hot Toast - Toast notifications
- React Icons - Icon library
- React Markdown - Markdown rendering
- React Syntax Highlighter - Code syntax highlighting
- TailwindCSS - Utility-first CSS framework

### Development Dependencies
- Vite - Build tool and development server
- ESLint - Code linting
- TypeScript - Type checking
- React Refresh - Fast refresh for development

## Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your environment variables:
   ```
   VITE_API_URL=http://localhost:5000
   ```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

## Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Code Quality

### Linting
Run the linter:

```bash
npm run lint
```

### Code Style
The project uses ESLint for code quality and style enforcement. The configuration is in `eslint.config.js`.

## Features

- Modern React with hooks
- Responsive design with TailwindCSS
- Client-side routing
- Markdown support
- Code syntax highlighting
- Toast notifications
- Smooth animations
- Type safety with TypeScript

## Project Structure Details

### Components
- Reusable UI components
- Form components
- Navigation components
- Layout components

### Pages
- Home page
- Authentication pages
- Dashboard
- Profile pages
- Error pages

### Context
- Authentication context
- Theme context
- User context

### Utils
- API utilities
- Form validation
- Date formatting
- Error handling

## Development Guidelines

1. Follow the existing code structure and patterns
2. Use functional components with hooks
3. Implement proper error handling
4. Write clean, maintainable code
5. Add appropriate comments and documentation
6. Test components thoroughly
7. Follow the established naming conventions

## Best Practices

1. **Component Structure**
   - Use functional components
   - Implement proper prop types
   - Keep components small and focused
   - Use custom hooks for shared logic

2. **State Management**
   - Use React Context for global state
   - Implement proper error boundaries
   - Handle loading states
   - Manage side effects properly

3. **Styling**
   - Use TailwindCSS utility classes
   - Follow the established design system
   - Maintain consistent spacing and typography
   - Ensure responsive design

4. **Performance**
   - Implement code splitting
   - Optimize images and assets
   - Use proper caching strategies
   - Minimize bundle size

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
