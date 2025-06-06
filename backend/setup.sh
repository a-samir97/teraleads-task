#!/bin/bash

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip3 install -r requirements.txt

# Create Django project
django-admin startproject dental_clinic .

# Create apps
python3 manage.py startapp patients
python3 manage.py startapp chatbot
python3 manage.py startapp users

# Create necessary directories
mkdir -p static media templates 