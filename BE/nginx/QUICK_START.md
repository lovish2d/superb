# Quick Start Guide - Nginx Configuration

## Entry Point

**All API requests must use `/superb` as the prefix:**

```
http://localhost/superb/api/v1/{service}/*
```

## Quick Setup

### 1. Local Development (Single Domain)

```bash
# Copy the standalone config
sudo cp nginx/superb-backend.conf /etc/nginx/sites-available/superb-backend

# Enable it
sudo ln -s /etc/nginx/sites-available/superb-backend /etc/nginx/sites-enabled/

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

**Access URLs:**
- `http://localhost/superb/api/v1/auth/login`
- `http://localhost/superb/api/v1/users`
- `http://localhost/superb/health`

### 2. Multiple Environments (Dev, Test, Production)

#### Step 1: Include Upstreams Once

Edit `/etc/nginx/nginx.conf`:

```nginx
http {
    # ... other config ...
    
    # Include upstreams (shared across all environments)
    include /path/to/nginx/superb-backend-upstreams.conf;
    
    # Include environment-specific server blocks
    include /path/to/nginx/superb-backend-dev.conf;
    include /path/to/nginx/superb-backend-test.conf;
    # include /path/to/nginx/superb-backend-prod.conf;
}
```

#### Step 2: Configure Domains

**For Development (`superb-backend-dev.conf`):**
```nginx
server_name dev.api.superb localhost;
```

**For Test (`superb-backend-test.conf`):**
```nginx
server_name test.api.superb;
```

**For Production (create `superb-backend-prod.conf`):**
```nginx
server_name api.superb;
```

#### Step 3: Update DNS / Hosts File

**Local Development:**
```bash
# /etc/hosts
127.0.0.1 dev.api.superb
127.0.0.1 test.api.superb
127.0.0.1 api.superb
```

**Production:**
- Point DNS records to your server IP
- `dev.api.superb` → Dev server IP
- `test.api.superb` → Test server IP
- `api.superb` → Production server IP

## URL Structure

### Request Flow

```
Client Request:
  http://localhost/superb/api/v1/auth/login
         ↓
Nginx receives:
  /superb/api/v1/auth/login
         ↓
URL Rewrite removes /superb:
  /api/v1/auth/login
         ↓
Forwards to backend:
  http://localhost:3001/api/v1/auth/login
```

### Example API Calls

```bash
# Health Check
curl http://localhost/superb/health

# Auth Service
curl -X POST http://localhost/superb/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# User Service
curl http://localhost/superb/api/v1/users \
  -H "Authorization: Bearer YOUR_TOKEN"

# Organization Service
curl http://localhost/superb/api/v1/organizations \
  -H "Authorization: Bearer YOUR_TOKEN"

# Resource Service
curl http://localhost/superb/api/v1/resources \
  -H "Authorization: Bearer YOUR_TOKEN"

# Admin Service
curl http://localhost/superb/api/v1/admin/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Domain Configuration Examples

### Example 1: Single Server, Multiple Domains

```nginx
server {
    listen 80;
    server_name dev.api.superb test.api.superb api.superb;
    
    # All domains use same routes
    location /superb/api/v1/auth {
        # ...
    }
}
```

**Access:**
- `http://dev.api.superb/superb/api/v1/auth/login`
- `http://test.api.superb/superb/api/v1/auth/login`
- `http://api.superb/superb/api/v1/auth/login`

### Example 2: Separate Server Blocks (Recommended)

```nginx
# Dev Environment
server {
    listen 80;
    server_name dev.api.superb;
    # ... dev-specific config ...
}

# Test Environment
server {
    listen 80;
    server_name test.api.superb;
    # ... test-specific config ...
}

# Production Environment
server {
    listen 80;
    server_name api.superb;
    # ... production-specific config ...
}
```

## Adding a New Domain

### Quick Method

1. Edit `superb-backend.conf` or `superb-backend-server.conf`
2. Add domain to `server_name`:
   ```nginx
   server_name localhost dev.api.superb test.api.superb staging.api.superb api.superb;
   ```
3. Reload nginx: `sudo systemctl reload nginx`

### Environment-Specific Method (Recommended)

1. Copy environment template:
   ```bash
   cp nginx/superb-backend-dev.conf nginx/superb-backend-staging.conf
   ```

2. Edit `superb-backend-staging.conf`:
   ```nginx
   server_name staging.api.superb;
   ```

3. Include in `nginx.conf`:
   ```nginx
   include /path/to/nginx/superb-backend-staging.conf;
   ```

4. Reload nginx: `sudo systemctl reload nginx`

## Troubleshooting

### Check if nginx is routing correctly:

```bash
# Test configuration
sudo nginx -t

# Check which server block matches
curl -H "Host: dev.api.superb" http://localhost/superb/health

# View access logs
sudo tail -f /var/log/nginx/superb-backend-access.log

# View error logs
sudo tail -f /var/log/nginx/superb-backend-error.log
```

### Verify URL Rewrite:

```bash
# Check backend logs to see what path it receives
# Should see: /api/v1/auth/login (without /superb)
# Not: /superb/api/v1/auth/login
```

## Important Notes

1. **Always use `/superb` prefix** in client requests
2. **Backend services receive paths without `/superb`** (handled by rewrite)
3. **Multiple domains can share same server block** or use separate blocks
4. **Environment-specific configs** allow different settings per environment
5. **Upstreams are shared** across all server blocks (include once in http block)



