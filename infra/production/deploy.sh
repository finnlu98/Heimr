#!/usr/bin/env bash
set -euo pipefail

# Prevent overlapping runs (cron-safe)
exec 9>/tmp/heimr-deploy.lock
flock -n 9 || exit 0

cd /opt/heimr

echo "==> $(date) Deploying Heimr (public images)..."

# Pull new images (does nothing if unchanged)
docker compose pull

# Start/update stack
docker compose up -d

echo "✓ Done"