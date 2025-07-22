# Modulo Login

Backend authentication module with JWT token management, credential validation, and secure login functionality.

## Features

- User registration with validation
- User authentication with JWT tokens
- Password hashing with bcrypt
- Protected routes with middleware
- Input validation and error handling
- Rate limiting and security headers
- CORS support

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Copy environment configuration:
```bash
cp .env.example .env
```

4. Start the server:
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication

#### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "username": "testuser",
  "email": "test@example.com", 
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "jwt-token-here",
    "user": {
      "id": "user-id",
      "username": "testuser",
      "email": "test@example.com"
    }
  }
}
```

#### POST /api/auth/login
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "username": "testuser",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt-token-here",
    "user": {
      "id": "user-id",
      "username": "testuser",
      "email": "test@example.com"
    }
  }
}
```

#### GET /api/auth/me
Get current user information (protected route).

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-id",
      "username": "testuser",
      "email": "test@example.com"
    }
  }
}
```

#### POST /api/auth/validate-token
Validate JWT token (protected route).

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Token is valid",
  "data": {
    "userId": "user-id",
    "username": "testuser"
  }
}
```

#### POST /api/auth/logout
Logout user (protected route).

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Health Check

#### GET /api/health
Check if the API is running.

**Response:**
```json
{
  "status": "OK",
  "message": "Modulo Login API is running"
}
```

## Security Features

- **Password Hashing**: Uses bcrypt with salt rounds for secure password storage
- **JWT Authentication**: Stateless authentication with configurable expiration
- **Input Validation**: Server-side validation for all user inputs
- **Rate Limiting**: Prevents brute force attacks
- **CORS Protection**: Configurable cross-origin request handling
- **Security Headers**: Helmet.js for additional security headers

## Validation Rules

### Registration
- Username: minimum 3 characters
- Email: valid email format
- Password: minimum 6 characters

### Login
- Username: required
- Password: required

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Optional validation errors
}
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)
- `JWT_SECRET`: Secret key for JWT token signing
- `CORS_ORIGIN`: Allowed CORS origin

## Usage Examples

### Register a new user
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### Access protected route
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer <your-jwt-token>"
```

## Technology Stack

- **Node.js**: Runtime environment
- **Express**: Web framework
- **JWT**: Token-based authentication
- **bcrypt**: Password hashing
- **express-validator**: Input validation
- **helmet**: Security headers
- **cors**: Cross-origin resource sharing
- **express-rate-limit**: Rate limiting

## Development

The project includes development tools:
- **nodemon**: Auto-restart on file changes
- **ESLint**: Code linting (can be added)
- **Prettier**: Code formatting (can be added)

## Data Storage

Currently uses JSON file storage for simplicity. Can be easily replaced with:
- MongoDB
- PostgreSQL
- MySQL
- Any other database system

## Future Enhancements

- Password reset functionality
- Email verification
- Role-based access control
- Token refresh mechanism
- Account lockout after failed attempts
- Audit logging
