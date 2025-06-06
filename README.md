# AI-Powered Patient Assistant Dashboard

A comprehensive dental clinic management system with AI-powered patient assistance.

## Features

- Patient Management
- AI-Powered Chatbot Assistant
- Secure Authentication
- Real-time Data Updates
- Responsive Dashboard

## Tech Stack

### Backend
- Django
- Django REST Framework
- PostgreSQL
- JWT Authentication
- OpenAI Integration

### Frontend
- React
- Redux Toolkit
- Material-UI
- Axios
- React Router

## Setup Instructions

1. Clone the repository
2. Set up the backend:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py runserver
   ```

3. Set up the frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. Set up environment variables:
   - Create `.env` files in both backend and frontend directories
   - Add necessary environment variables (see .env.example files)

## API Documentation

### Authentication
- POST /api/token/ - Get JWT token
- POST /api/token/refresh/ - Refresh JWT token

### Patients
- GET /api/patients/ - List all patients
- POST /api/patients/ - Create new patient
- GET /api/patients/{id}/ - Get patient details
- PUT /api/patients/{id}/ - Update patient
- DELETE /api/patients/{id}/ - Delete patient

### Chatbot
- POST /api/chatbot/message/ - Send message to AI assistant
- GET /api/chatbot/history/ - Get chat history

## Security Considerations

- JWT Authentication
- CORS Configuration
- Environment Variables
- Input Validation
- Rate Limiting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License 