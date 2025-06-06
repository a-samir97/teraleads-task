#!/bin/bash

# Start the backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver &

# Start the frontend
cd ../frontend
npm install
npm start 