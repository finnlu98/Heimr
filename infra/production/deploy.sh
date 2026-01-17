#!/bin/bash
set -e

echo "==> Starting Heimr deployment..."

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
    echo "✓ Environment variables loaded"
else
    echo "✗ .env file not found!"
    exit 1
fi

# Login to GitHub Container Registry
echo "==> Logging in to GHCR..."
echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_OWNER" --password-stdin

# Pull latest images
echo "==> Pulling latest images..."
docker-compose pull

# Run database migrations
echo "==> Running database migrations..."
docker-compose up -d db
sleep 5
docker-compose up -d api
sleep 10
docker exec heimr_api npx prisma migrate deploy || echo "Warning: Migration failed or no migrations to apply"

# Restart all services
echo "==> Restarting all services..."
docker-compose up -d --remove-orphans

# Clean up old images
echo "==> Cleaning up old images..."
docker image prune -f

# Show status
echo "==> Deployment complete!"
docker-compose ps

echo ""
echo "Logs can be viewed with: docker-compose logs -f"
