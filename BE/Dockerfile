FROM node:20-alpine

WORKDIR /app

# Install PM2 globally
RUN npm install -g pm2

# Copy package files
COPY package*.json ./

# Copy all service package.json files for workspace install
COPY services/ ./services/
COPY shared/ ./shared/

# Install root dependencies
RUN npm ci

# Install workspace dependencies (all services)
RUN npm run install:services || npm install --workspaces --if-present

# Copy remaining source code
COPY . .

EXPOSE 2001 2002 2004

# Use pm2-runtime (keeps container alive)
CMD ["pm2-runtime", "ecosystem.config.js"]
