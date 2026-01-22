#!/bin/bash

# Script to install all dependencies for all services and shared packages
# Usage: ./scripts/install-all.sh

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Installing Dependencies for All Services${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"

cd "$PROJECT_ROOT"

# Step 1: Install root dependencies
echo -e "${YELLOW}[1/4] Installing root dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Root dependencies installed${NC}"
echo ""

# Step 2: Install shared packages dependencies
echo -e "${YELLOW}[2/4] Installing shared packages dependencies...${NC}"
if [ -d "shared/config" ]; then
    echo -e "  Installing @superb/shared-config..."
    cd shared/config && npm install && cd "$PROJECT_ROOT"
    echo -e "${GREEN}  ✓ @superb/shared-config installed${NC}"
fi

if [ -d "shared/common" ]; then
    echo -e "  Installing @superb/shared-common..."
    cd shared/common && npm install && cd "$PROJECT_ROOT"
    echo -e "${GREEN}  ✓ @superb/shared-common installed${NC}"
fi
echo ""

# Step 3: Install service dependencies
echo -e "${YELLOW}[3/4] Installing service dependencies...${NC}"
SERVICES=(
    "auth-service"
    "platform-service"
    "resource-service"
)

for service in "${SERVICES[@]}"; do
    if [ -d "services/$service" ]; then
        echo -e "  Installing $service..."
        cd "services/$service" && npm install && cd "$PROJECT_ROOT"
        echo -e "${GREEN}  ✓ $service installed${NC}"
    else
        echo -e "${RED}  ✗ $service directory not found${NC}"
    fi
done
echo ""

# Step 4: Install workspace dependencies (links packages)
echo -e "${YELLOW}[4/4] Linking workspace packages...${NC}"
npm install --workspaces
echo -e "${GREEN}✓ Workspace packages linked${NC}"
echo ""

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}All dependencies installed successfully!${NC}"
echo -e "${GREEN}========================================${NC}"

