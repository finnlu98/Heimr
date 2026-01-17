# Heimr Production Deployment

Production deployment configuration for Heimr using Docker Compose, GitHub Container Registry, and Cloudflare Tunnel.

## Prerequisites

- Raspberry Pi (or any Linux host) with Docker and Docker Compose installed
- GitHub account with Container Registry enabled
- Cloudflare account with a domain configured

## Setup Instructions

### 1. Clone Repository on Pi

```bash
cd /home/pi
git clone https://github.com/your-username/Heimr.git heimr
cd heimr/infra/production
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
nano .env
```

Update the following values:

- `GHCR_OWNER`: Your GitHub username
- `GHCR_TOKEN`: GitHub Personal Access Token (with `read:packages` permission)
- `POSTGRES_PASSWORD`: Strong database password
- `SESSION_SECRET`: Random 32+ character string
- `ENCRYPTION_KEY`: 64 character hex string
- `ADMIN_KEY`: Secure admin key
- `BACKEND_ORIGIN`: Your Cloudflare domain (https://yourdomain.com)
- `FRONTEND_ORIGIN`: Your Cloudflare domain (https://yourdomain.com)

### 3. Set Up Cloudflare Tunnel

1. Go to https://one.dash.cloudflare.com/
2. Navigate to Networks > Tunnels
3. Create a new tunnel and note the Tunnel UUID
4. Download the credentials JSON file
5. Save credentials to `infra/cloudflared/credentials.json`
6. Update `infra/cloudflared/config.yml` with your Tunnel UUID and domain
7. In Cloudflare DNS, add a CNAME record:
   - Name: `yourdomain.com` or `@`
   - Target: `<TUNNEL_UUID>.cfargotunnel.com`
   - Proxy status: Proxied

### 4. Configure GitHub Secrets

In your GitHub repository settings, add the following secrets:

- `SSH_HOST`: Your Pi's IP address or hostname
- `SSH_USER`: SSH username (e.g., `pi`)
- `SSH_KEY`: Private SSH key for authentication
- `SSH_PORT`: SSH port (default: 22)

### 5. Set Up SSH Key Authentication

On your Pi:

```bash
# Generate SSH key (if not exists)
ssh-keygen -t ed25519 -C "github-actions"

# Add public key to authorized_keys
cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys

# Display private key (add this to GitHub Secrets)
cat ~/.ssh/id_ed25519
```

### 6. Make Deploy Script Executable

```bash
chmod +x deploy.sh
```

### 7. Initial Deployment

```bash
./deploy.sh
```

## Usage

### Manual Deployment

SSH to your Pi and run:

```bash
cd /home/pi/heimr/infra/production
./deploy.sh
```

### Automatic Deployment

Push to the `main` branch and GitHub Actions will automatically:

1. Build multi-arch Docker images (amd64, arm64)
2. Push images to GHCR
3. SSH to your Pi
4. Run deployment script

### View Logs

```bash
docker-compose logs -f
```

### Check Service Status

```bash
docker-compose ps
```

### Restart Services

```bash
docker-compose restart
```

### Stop Services

```bash
docker-compose down
```

## Troubleshooting

### Migration Errors

If migrations fail, manually run:

```bash
docker exec -it heimr_api npx prisma migrate deploy
```

### Connection Issues

Check nginx logs:

```bash
docker-compose logs nginx
```

Check Cloudflare tunnel status:

```bash
docker-compose logs tunnel
```

### Database Issues

Access PostgreSQL:

```bash
docker exec -it heimr_db psql -U Heimr -d heimr_db
```

## Security Notes

- Never commit `.env` or `credentials.json` files
- Rotate secrets regularly
- Use strong passwords for database
- Keep Docker and system packages updated
- Monitor logs for suspicious activity

## Updating

To update to the latest version:

```bash
cd /home/pi/heimr
git pull origin main
cd infra/production
./deploy.sh
```

Or wait for automatic deployment via GitHub Actions.
