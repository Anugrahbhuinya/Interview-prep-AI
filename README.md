# Interview-prep-AI
# Full Stack Application

A modern full-stack application built with React, Node.js, and MongoDB. This project provides a robust platform with user authentication, session management, and AI-powered interactions.

## Project Overview

This is a full-stack application consisting of two main parts:
- Frontend: React application with Vite and TailwindCSS
- Backend: Node.js/Express.js API server with MongoDB

## Project Structure

```
project/
├── frontend/        # React frontend application
│   ├── src/        # Source code
│   ├── public/     # Static assets
│   └── ...         # Frontend configuration files
│
└── backend/        # Node.js backend application
    ├── config/     # Configuration files
    ├── controllers/# Route controllers
    ├── models/     # Database models
    ├── routes/     # API routes
    └── ...         # Backend configuration files
```

## Technology Stack

### Frontend
- React 19
- Vite
- TailwindCSS
- React Router DOM
- Axios
- Framer Motion
- React Hot Toast
- React Markdown
- TypeScript

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Google AI Integration
- Multer for file uploads

## Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn
- Google AI API credentials
- Modern web browser

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```
VITE_API_URL=http://localhost:5000
```

## Running the Application

### Development Mode

1. Start the Backend Server:
```bash
cd backend
npm start
```

2. Start the Frontend Development Server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### Production Build

1. Build the Frontend:
```bash
cd frontend
npm run build
```

2. Start the Production Server:
```bash
cd backend
npm start
```

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Password hashing

### User Management
- User profiles
- Session management
- Role-based access control

### AI Integration
- Google AI-powered interactions
- Natural language processing
- Intelligent responses

### File Management
- File uploads
- Secure file storage
- File type validation

### Frontend Features
- Responsive design
- Modern UI/UX
- Client-side routing
- Toast notifications
- Markdown support
- Code syntax highlighting
- Smooth animations

## API Documentation

### Authentication Endpoints
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login
- GET `/api/auth/profile` - Get user profile

### Question Endpoints
- POST `/api/questions` - Create question
- GET `/api/questions` - Get all questions
- GET `/api/questions/:id` - Get specific question

### Session Endpoints
- POST `/api/sessions` - Create session
- GET `/api/sessions` - Get all sessions
- GET `/api/sessions/:id` - Get specific session

## Development Guidelines

### Code Style
- Follow ESLint configuration
- Use TypeScript for type safety
- Implement proper error handling
- Write clean, maintainable code

### Git Workflow
1. Create feature branch
2. Make changes
3. Test thoroughly
4. Create pull request
5. Code review
6. Merge to main

### Testing
- Write unit tests
- Test API endpoints
- Test frontend components
- Ensure cross-browser compatibility

## Security Measures

### Backend Security
- JWT authentication
- Password hashing
- CORS configuration
- Input validation
- Rate limiting
- Secure file uploads

### Frontend Security
- Secure API calls
- XSS prevention
- CSRF protection
- Environment variables
- Secure storage

## Performance Optimization

### Backend
- Database indexing
- Query optimization
- Caching strategies
- Error handling
- Logging

### Frontend
- Code splitting
- Lazy loading
- Image optimization
- Bundle size optimization
- Caching strategies

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the repository or contact the development team.