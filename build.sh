#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --no-input

# Run migrations
python manage.py migrate

# Load fixture data (only if tables are empty)
python manage.py loaddata gallery/fixtures/artists.json --ignorenonexistent || true
python manage.py loaddata gallery/fixtures/artworks.json --ignorenonexistent || true
python manage.py loaddata shop/fixtures/categories.json --ignorenonexistent || true
python manage.py loaddata shop/fixtures/products.json --ignorenonexistent || true
python manage.py loaddata pages/fixtures/exhibitions.json --ignorenonexistent || true
