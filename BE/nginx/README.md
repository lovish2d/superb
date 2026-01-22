# Nginx Configuration for Superb Backend

This directory contains nginx configuration files for routing requests to the Superb Backend microservices.

## Files

1. **`superb-backend.conf`** - Complete standalone configuration (includes upstreams and server block)
2. **`superb-backend-upstreams.conf`** - Upstream definitions only (for reuse across multiple server blocks)
3. **`superb-backend-server.conf`** - Server block only (requires upstreams to be included separately)
4. **`superb-backend-dev.conf`** - Example development environment configuration
5. **`superb-backend-test.conf`** - Example test environment configuration

## Entry Point

**All routes use `/superb` as the entry point prefix:**

- Entry URL: `http://localhost/superb/api/v1/{service}/*`
- The `/superb` prefix is removed before forwarding to backend services
- Backend services receive requests at `/api/v1/{service}/*` (without `/superb`)

## Service Ports and Routes

Based on `ecosystem.config.js`:

| Service | Port | Entry Point (Nginx) | Backend Receives |
|---------|------|---------------------|------------------|
| **Auth Service** | 3001 | `/superb/api/v1/auth/*` | `/api/v1/auth/*` |
| **User Service** | 3002 | `/superb/api/v1/users/*` | `/api/v1/users/*` |
| **Organization Service** | 3003 | `/superb/api/v1/organizations/*` | `/api/v1/organizations/*` |
| **Resource Service** | 3004 | `/superb/api/v1/resources/*` | `/api/v1/resources/*` |
| **Admin Service** | 3005 | `/superb/api/v1/admin/*` | `/api/v1/admin/*` |

### Example URLs

- `http://localhost/superb/api/v1/auth/login`
- `http://localhost/superb/api/v1/users/123`
- `http://localhost/superb/api/v1/organizations`
- `http://localhost/superb/health` (health check)

## Usage Options

### Option 1: Standalone Configuration (Recommended for Single Project)

Use `superb-backend.conf` as a complete standalone server block:

```nginx
# In your main nginx.conf or sites-available/superb-backend
include /path/to/superb-backend.conf;
```

### Option 2: Modular Configuration (Recommended for Multiple Projects)

Separate upstreams and server blocks:

```nginx
# In nginx.conf http block
http {
    # Include upstreams once
    include /path/to/superb-backend-upstreams.conf;
    
    # Include server blocks for different projects
    include /path/to/superb-backend-server.conf;
    # include /path/to/other-project-server.conf;
}
```

### Option 3: Copy into Main Configuration

Copy the contents directly into your main `nginx.conf`:

```nginx
http {
    # ... other configuration ...
    
    # Upstreams
    upstream superb_auth_service {
        server localhost:3001;
    }
    # ... etc ...
    
    # Server block
    server {
        listen 80;
        server_name api.superb.local;
        # ... routes ...
    }
}
```

## Installation

### Ubuntu/Debian

```bash
# Copy configuration to nginx sites-available
sudo cp nginx/superb-backend.conf /etc/nginx/sites-available/superb-backend

# Create symbolic link to sites-enabled
sudo ln -s /etc/nginx/sites-available/superb-backend /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### CentOS/RHEL

```bash
# Copy configuration to nginx conf.d
sudo cp nginx/superb-backend.conf /etc/nginx/conf.d/superb-backend.conf

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### Docker

```bash
# Mount the config file
docker run -d \
  -p 80:80 \
  -v $(pwd)/nginx/superb-backend.conf:/etc/nginx/conf.d/default.conf \
  nginx:alpine
```

## Configuration

### Entry Point

The configuration uses `/superb` as the entry point prefix. All requests must include this prefix:

- ✅ `http://localhost/superb/api/v1/auth/login`
- ❌ `http://localhost/api/v1/auth/login` (will return 404)

The `/superb` prefix is automatically removed before forwarding to backend services using URL rewrite.

### Update Server Name (Domain Configuration)

The configuration supports multiple domains. Edit the `server_name` directive to add your domains:

```nginx
# Single domain
server_name api.superb.local;

# Multiple domains (all handled by same server block)
server_name localhost dev.api.superb test.api.superb api.superb;

# Environment-specific (recommended)
# In superb-backend-dev.conf:
server_name dev.api.superb localhost;

# In superb-backend-test.conf:
server_name test.api.superb;

# In production config:
server_name api.superb;
```

### Adding New Domains

To add a new domain (e.g., `staging.api.superb`):

1. **Option 1: Add to existing server_name**
   ```nginx
   server_name localhost dev.api.superb test.api.superb staging.api.superb api.superb;
   ```

2. **Option 2: Create environment-specific config** (Recommended)
   ```bash
   # Copy template
   cp nginx/superb-backend-dev.conf nginx/superb-backend-staging.conf
   
   # Edit server_name
   # Change: server_name dev.api.superb localhost;
   # To: server_name staging.api.superb;
   ```

### Enable HTTPS

Uncomment and configure SSL settings:

```nginx
listen 443 ssl http2;
ssl_certificate /path/to/cert.pem;
ssl_certificate_key /path/to/key.pem;
```

### Update Upstream Servers

For production, update upstream servers:

```nginx
upstream superb_auth_service {
    server 10.0.1.10:3001;  # Production server 1
    server 10.0.1.11:3001;  # Production server 2
    keepalive 32;
}
```

### Load Balancing Methods

The configuration uses `least_conn` (least connections). You can change to:

- `least_conn` - Routes to server with fewest active connections (current)
- `ip_hash` - Routes based on client IP (sticky sessions)
- `round_robin` - Default, round-robin distribution
- `weight=X` - Weighted distribution

Example:
```nginx
upstream superb_auth_service {
    ip_hash;  # Sticky sessions
    server localhost:3001 weight=3;
    server localhost:3002 weight=1;
}
```

## Health Checks

Each service exposes a `/health` endpoint. The nginx config includes a health check route that proxies to the auth service.

To check individual service health:
- `http://your-domain/health` - General health check
- `http://your-domain/api/v1/auth/health` - Auth service health
- `http://your-domain/api/v1/users/health` - User service health
- etc.

## CORS Configuration

CORS headers are configured in each location block. To restrict origins:

```nginx
# Replace $http_origin with specific domain
add_header Access-Control-Allow-Origin https://your-frontend.com always;
```

## Rate Limiting (Optional)

Add rate limiting to protect services:

```nginx
# In http block
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;

# In server block
location /api/v1/auth {
    limit_req zone=api_limit burst=20 nodelay;
    proxy_pass http://superb_auth_service;
    # ... rest of config ...
}
```

## Logging

Logs are written to:
- Access logs: `/var/log/nginx/superb-backend-access.log`
- Error logs: `/var/log/nginx/superb-backend-error.log`

Update paths as needed for your system.

## Testing

After configuration:

```bash
# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx

# Test endpoints (note the /superb prefix)
curl http://localhost/superb/health
curl http://localhost/superb/api/v1/auth/health
curl http://localhost/superb/api/v1/users

# Test with different domains (if configured)
curl http://dev.api.superb/superb/health
curl http://test.api.superb/superb/api/v1/auth/health
```

## Troubleshooting

### 502 Bad Gateway

- Check if services are running: `pm2 status` or `docker ps`
- Verify ports are accessible: `curl http://localhost:3001/health`
- Check nginx error logs: `sudo tail -f /var/log/nginx/superb-backend-error.log`

### 404 Not Found

- Ensure you're using the `/superb` prefix: `http://localhost/superb/api/v1/auth/login`
- Check that the location block matches your URL path
- Verify the `server_name` includes your domain

### URL Rewrite Issues

- The `/superb` prefix is removed before forwarding to backend
- Backend services should receive `/api/v1/{service}/*` (without `/superb`)
- Check nginx error logs if backend receives wrong paths

### Connection Refused

- Verify upstream server addresses and ports
- Check firewall rules
- Ensure services are listening on correct interfaces (0.0.0.0, not 127.0.0.1)

### CORS Issues

- Verify CORS headers in location blocks
- Check if services also set CORS headers (may cause conflicts)
- Use `$http_origin` for dynamic origin handling

## Production Considerations

1. **Use HTTPS** - Always use SSL/TLS in production
2. **Update server_name** - Set proper domain names
3. **Configure upstreams** - Point to production server IPs
4. **Enable rate limiting** - Protect against abuse
5. **Set up monitoring** - Monitor nginx and service health
6. **Configure logging** - Set up log rotation and monitoring
7. **Use keepalive** - Already configured for better performance
8. **Tune timeouts** - Adjust based on your service response times

