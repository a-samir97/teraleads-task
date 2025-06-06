# Dental Clinic Management System

A modern web application for managing dental clinic operations, including patient management and an AI-powered chatbot assistant.

## Features

- **Patient Management**
  - Create, read, update, and delete patient records
  - Search and filter patients
  - View patient statistics and history

- **AI Chatbot Assistant**
  - Powered by OpenAI's GPT-3.5
  - Context-aware responses for dental-related queries
  - Real-time chat interface

- **Authentication**
  - JWT-based authentication
  - Protected routes
  - Secure API endpoints

## Tech Stack

### Backend
- Django & Django REST Framework
- PostgreSQL
- JWT Authentication
- OpenAI API Integration

### Frontend
- React.js
- Material-UI
- Redux Toolkit
- React Router
- Axios

## Prerequisites

- Python 3.8+
- Node.js 14+
- PostgreSQL
- Docker and Docker Compose
- OpenAI API Key

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd dental-clinic
```

2. Set up environment variables:
```bash
# Backend (.env)
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:password@localhost:5432/dental_clinic
OPENAI_API_KEY=your-openai-api-key

# Frontend (.env)
REACT_APP_API_URL=http://localhost:8000
```

3. Using Docker:
```bash
docker-compose up --build
```

4. Manual Setup:

Backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Frontend:
```bash
cd frontend
npm install
npm start
```

## API Documentation

### Authentication
- `POST /api/token/` - Get JWT tokens
- `POST /api/token/refresh/` - Refresh access token

### Patients
- `GET /api/patients/` - List all patients
- `POST /api/patients/` - Create new patient
- `GET /api/patients/{id}/` - Get patient details
- `PUT /api/patients/{id}/` - Update patient
- `DELETE /api/patients/{id}/` - Delete patient

### Chatbot
- `POST /api/chatbot/chat/` - Send message to chatbot

## Security Considerations

- All API endpoints (except authentication) require JWT token
- Passwords are hashed using Django's built-in password hashers
- CORS is configured to allow only specific origins
- Input validation and sanitization on both frontend and backend

## Performance Considerations

- Database indexes on frequently queried fields
- Pagination for large datasets
- Caching for frequently accessed data
- Optimized database queries

## Limitations

- OpenAI API has rate limits and usage costs
- Chatbot responses are limited to dental-related queries
- No real-time updates (WebSocket not implemented)
- No file upload functionality for patient documents

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 