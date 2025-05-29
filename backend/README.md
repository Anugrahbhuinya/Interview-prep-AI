# Backend API Server

This is the backend server for the application, built with Node.js and Express.js. The server provides a robust API for user authentication, session management, question handling, and AI-powered interactions.

## Project Structure

```
backend/
├── config/         # Configuration files
│   └── db.js       # Database connection configuration
├── controllers/    # Route controllers
│   ├── aiController.js      # AI interaction logic
│   ├── authController.js    # Authentication logic
│   ├── questionController.js # Question handling logic
│   └── sessionController.js  # Session management logic
├── middlewares/    # Custom middleware functions
│   ├── authMiddleware.js    # Authentication middleware
│   └── uploadMiddleware.js  # File upload handling
├── models/         # Database models
│   ├── questionModel.js     # Question schema
│   ├── sessionModel.js      # Session schema
│   └── userModel.js         # User schema
├── routes/         # API routes
│   ├── authRoutes.js        # Authentication routes
│   ├── questionRoutes.js    # Question-related routes
│   └── sessionRoutes.js     # Session management routes
├── utils/          # Utility functions
│   └── prompts.js          # AI prompt templates
├── uploads/        # File upload directory
├── server.js       # Main application file
└── package.json    # Project dependencies
```

## Detailed Component Documentation

### Configuration (`/config`)
- `db.js`: MongoDB connection configuration and setup

### Controllers (`/controllers`)
- `aiController.js`: Handles AI-related operations and interactions
- `authController.js`: Manages user authentication, registration, and login
- `questionController.js`: Processes question-related operations
- `sessionController.js`: Manages user sessions and interactions

### Middlewares (`/middlewares`)
- `authMiddleware.js`: JWT authentication and authorization
- `uploadMiddleware.js`: Handles file uploads using multer

### Models (`/models`)
- `questionModel.js`: Schema for storing questions and related data
- `sessionModel.js`: Schema for managing user sessions
- `userModel.js`: User schema with authentication fields

### Routes (`/routes`)
- `authRoutes.js`: Authentication endpoints (login, register, etc.)
- `questionRoutes.js`: Question-related API endpoints
- `sessionRoutes.js`: Session management endpoints

### Utils (`/utils`)
- `prompts.js`: Contains AI prompt templates and configurations

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- Google AI API credentials (for AI features)

## Dependencies

- Express.js - Web framework
- Mongoose - MongoDB object modeling
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- cors - Cross-origin resource sharing
- dotenv - Environment variables
- multer - File upload handling
- @google/genai - Google AI integration

## Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your environment variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   ```

## Running the Server

To start the development server:

```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 5000).

## API Endpoints

### Authentication Routes
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - User login
- GET `/api/auth/profile` - Get user profile (protected)

### Question Routes
- POST `/api/questions` - Create a new question
- GET `/api/questions` - Get all questions
- GET `/api/questions/:id` - Get a specific question

### Session Routes
- POST `/api/sessions` - Create a new session
- GET `/api/sessions` - Get all sessions
- GET `/api/sessions/:id` - Get a specific session

## File Structure Details

### Configuration
- `config/db.js`: Handles MongoDB connection setup and error handling

### Controllers
- `controllers/aiController.js`: Manages AI interactions and responses
- `controllers/authController.js`: Handles user authentication and authorization
- `controllers/questionController.js`: Manages question creation and retrieval
- `controllers/sessionController.js`: Handles session management and tracking

### Middlewares
- `middlewares/authMiddleware.js`: Verifies JWT tokens and user authentication
- `middlewares/uploadMiddleware.js`: Configures and handles file uploads

### Models
- `models/questionModel.js`: Defines question schema and validation
- `models/sessionModel.js`: Defines session schema and relationships
- `models/userModel.js`: Defines user schema with authentication fields

### Routes
- `routes/authRoutes.js`: Defines authentication endpoints
- `routes/questionRoutes.js`: Defines question-related endpoints
- `routes/sessionRoutes.js`: Defines session management endpoints

### Utils
- `utils/prompts.js`: Contains AI prompt templates and configurations

## Security Features

- JWT authentication for protected routes
- Password hashing using bcryptjs
- CORS configuration for secure cross-origin requests
- Environment variables for sensitive data
- File upload security measures
- Input validation and sanitization

## Error Handling

The application implements comprehensive error handling:
- Global error handling middleware
- Custom error classes
- Validation error handling
- Database error handling
- Authentication error handling

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Development Guidelines

1. Follow the existing code structure and patterns
2. Write clear and descriptive commit messages
3. Include appropriate error handling
4. Add necessary documentation
5. Test your changes thoroughly

## License

This project is licensed under the ISC License. 