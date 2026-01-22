#!/bin/bash

# Script to build and push all Docker images to AWS ECR
# Usage: ./scripts/build-and-push-ecr.sh [AWS_ACCOUNT_ID] [AWS_REGION] [IMAGE_TAG]

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
AWS_ACCOUNT_ID=${1:-${AWS_ACCOUNT_ID}}
AWS_REGION=${2:-${AWS_REGION:-us-east-1}}
IMAGE_TAG=${3:-${IMAGE_TAG:-latest}}
ECR_REPOSITORY_PREFIX=${ECR_REPOSITORY_PREFIX:-superb-backend}

# Services to build
SERVICES=(
    "auth-service"
    "platform-service"
    "resource-service"
)

# Dockerfiles mapping (relative to project root)
declare -A DOCKERFILES=(
    ["auth-service"]="services/auth-service/Dockerfile"
    ["platform-service"]="services/platform-service/Dockerfile"
    ["resource-service"]="services/resource-service/Dockerfile"
)

# Validate AWS credentials
if [ -z "$AWS_ACCOUNT_ID" ]; then
    echo -e "${RED}Error: AWS_ACCOUNT_ID is required${NC}"
    echo "Usage: $0 [AWS_ACCOUNT_ID] [AWS_REGION] [IMAGE_TAG]"
    echo "Or set environment variables: AWS_ACCOUNT_ID, AWS_REGION, IMAGE_TAG"
    exit 1
fi

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"

cd "$PROJECT_ROOT"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Building and Pushing Images to ECR${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "AWS Account ID: ${YELLOW}$AWS_ACCOUNT_ID${NC}"
echo -e "AWS Region: ${YELLOW}$AWS_REGION${NC}"
echo -e "Image Tag: ${YELLOW}$IMAGE_TAG${NC}"
echo -e "Repository Prefix: ${YELLOW}$ECR_REPOSITORY_PREFIX${NC}"
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}Error: AWS CLI is not installed${NC}"
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: Docker is not installed${NC}"
    exit 1
fi

# Login to ECR
echo -e "${YELLOW}[1/3] Logging in to ECR...${NC}"
aws ecr get-login-password --region "$AWS_REGION" | docker login --username AWS --password-stdin "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"
echo -e "${GREEN}✓ Logged in to ECR${NC}"
echo ""

# Build and push each service
echo -e "${YELLOW}[2/3] Building and pushing images...${NC}"
for service in "${SERVICES[@]}"; do
    dockerfile="${DOCKERFILES[$service]}"
    image_name="$ECR_REPOSITORY_PREFIX-$service"
    ecr_repo="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$image_name"
    
    echo -e "${BLUE}Processing $service...${NC}"
    
    # Create ECR repository if it doesn't exist
    echo -e "  Creating ECR repository if needed..."
    aws ecr describe-repositories --repository-names "$image_name" --region "$AWS_REGION" 2>/dev/null || \
    aws ecr create-repository --repository-name "$image_name" --region "$AWS_REGION" --image-scanning-configuration scanOnPush=true
    
    # Build image
    echo -e "  Building Docker image..."
    docker build -f "$dockerfile" -t "$image_name:$IMAGE_TAG" -t "$image_name:latest" .
    
    # Tag for ECR
    echo -e "  Tagging image for ECR..."
    docker tag "$image_name:$IMAGE_TAG" "$ecr_repo:$IMAGE_TAG"
    docker tag "$image_name:$IMAGE_TAG" "$ecr_repo:latest"
    
    # Push to ECR
    echo -e "  Pushing to ECR..."
    docker push "$ecr_repo:$IMAGE_TAG"
    docker push "$ecr_repo:latest"
    
    echo -e "${GREEN}  ✓ $service pushed successfully${NC}"
    echo -e "  Image: $ecr_repo:$IMAGE_TAG"
    echo ""
done

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}All images built and pushed successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "ECR Repositories:"
for service in "${SERVICES[@]}"; do
    image_name="$ECR_REPOSITORY_PREFIX-$service"
    ecr_repo="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$image_name"
    echo -e "  ${BLUE}$service${NC}: $ecr_repo:$IMAGE_TAG"
done

