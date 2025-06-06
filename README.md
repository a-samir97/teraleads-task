# AI-Powered Dental Clinic Patient Assistant

A modern web application for dental clinics that combines patient management with an AI-powered assistant.

## Features

- Patient record management (CRUD operations)
- AI-powered chatbot for patient queries
- Modern, responsive UI
- Secure authentication using JWT
- Dockerized deployment

## Tech Stack

### Backend
- Django
- Django REST Framework
- PostgreSQL
- JWT Authentication

### Frontend
- React.js
- Material-UI
- Axios for API calls

## Project Structure

```
.
├── backend/           # Django backend
├── frontend/         # React frontend
├── docker-compose.yml
└── README.md
```

## Setup Instructions

### Prerequisites
- Docker and Docker Compose
- Python 3.8+
- Node.js 14+

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Docker Setup
To run the entire application using Docker:

```bash
docker-compose up --build
```

## API Documentation

### Authentication Endpoints
- POST /api/auth/login/ - Login
- POST /api/auth/register/ - Register
- POST /api/auth/refresh/ - Refresh token

### Patient Endpoints
- GET /api/patients/ - List all patients
- POST /api/patients/ - Create new patient
- GET /api/patients/{id}/ - Get patient details
- PUT /api/patients/{id}/ - Update patient
- DELETE /api/patients/{id}/ - Delete patient

### Chatbot Endpoint
- POST /api/chatbot/ - Send message to AI assistant

## Security Considerations
- JWT authentication for API endpoints
- Password hashing
- CORS configuration
- Input validation
- Rate limiting

## Limitations
- The AI chatbot currently uses a mock response system
- Basic error handling
- Limited patient data fields

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request 