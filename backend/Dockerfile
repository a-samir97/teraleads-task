FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc postgresql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Create wait-for-it script
RUN echo '#!/bin/bash\n\
until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "\q"; do\n\
  >&2 echo "Postgres is unavailable - sleeping"\n\
  sleep 1\n\
done\n\
\n\
>&2 echo "Postgres is up - executing command"\n\
exec "$@"' > /app/wait-for-it.sh \
    && chmod +x /app/wait-for-it.sh

# Run migrations and collect static files
RUN python manage.py collectstatic --noinput

# Run gunicorn with wait-for-it
CMD ["/app/wait-for-it.sh", "gunicorn", "--bind", "0.0.0.0:8000", "dental_clinic.wsgi:application"]
