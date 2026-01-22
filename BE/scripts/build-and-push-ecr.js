#!/usr/bin/env node

/**
 * Script to build and push all Docker images to AWS ECR
 * Usage: node scripts/build-and-push-ecr.js [AWS_ACCOUNT_ID] [AWS_REGION] [IMAGE_TAG]
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Colors for output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function exec(command, options = {}) {
  try {
    execSync(command, { 
      stdio: 'inherit',
      encoding: 'utf-8',
      ...options
    });
    return true;
  } catch (error) {
    log(`Error executing: ${command}`, 'red');
    throw error;
  }
}

function execSilent(command, options = {}) {
  try {
    execSync(command, { 
      stdio: 'pipe',
      encoding: 'utf-8',
      ...options
    });
    return true;
  } catch (error) {
    return false;
  }
}

// Configuration
const args = process.argv.slice(2);
const AWS_ACCOUNT_ID = args[0] || process.env.AWS_ACCOUNT_ID;
const AWS_REGION = args[1] || process.env.AWS_REGION || 'us-east-1';
const IMAGE_TAG = args[2] || process.env.IMAGE_TAG || 'latest';
const ECR_REPOSITORY_PREFIX = process.env.ECR_REPOSITORY_PREFIX || 'superb-backend';

// Services to build
const SERVICES = [
  'auth-service',
  'platform-service',
  'resource-service',
];

// Dockerfiles mapping (relative to project root)
const DOCKERFILES = {
  'auth-service': 'services/auth-service/Dockerfile',
  'platform-service': 'services/platform-service/Dockerfile',
  'resource-service': 'services/resource-service/Dockerfile',
};

// Validate AWS credentials
if (!AWS_ACCOUNT_ID) {
  log('Error: AWS_ACCOUNT_ID is required', 'red');
  console.log('Usage: node scripts/build-and-push-ecr.js [AWS_ACCOUNT_ID] [AWS_REGION] [IMAGE_TAG]');
  console.log('Or set environment variables: AWS_ACCOUNT_ID, AWS_REGION, IMAGE_TAG');
  process.exit(1);
}

// Check if AWS CLI is installed
if (!execSilent('which aws')) {
  log('Error: AWS CLI is not installed', 'red');
  process.exit(1);
}

// Check if Docker is installed
if (!execSilent('which docker')) {
  log('Error: Docker is not installed', 'red');
  process.exit(1);
}

log('========================================', 'blue');
log('Building and Pushing Images to ECR', 'blue');
log('========================================', 'blue');
console.log('');
log(`AWS Account ID: ${AWS_ACCOUNT_ID}`, 'yellow');
log(`AWS Region: ${AWS_REGION}`, 'yellow');
log(`Image Tag: ${IMAGE_TAG}`, 'yellow');
log(`Repository Prefix: ${ECR_REPOSITORY_PREFIX}`, 'yellow');
console.log('');

// Login to ECR
log('[1/3] Logging in to ECR...', 'yellow');
const loginPassword = execSync(
  `aws ecr get-login-password --region ${AWS_REGION}`,
  { encoding: 'utf-8' }
).trim();
exec(`echo "${loginPassword}" | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com`);
log('✓ Logged in to ECR', 'green');
console.log('');

// Build and push each service
log('[2/3] Building and pushing images...', 'yellow');
for (const service of SERVICES) {
  const dockerfile = DOCKERFILES[service];
  const imageName = `${ECR_REPOSITORY_PREFIX}-${service}`;
  const ecrRepo = `${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${imageName}`;
  
  log(`Processing ${service}...`, 'blue');
  
  // Create ECR repository if it doesn't exist
  log('  Creating ECR repository if needed...', 'yellow');
  const repoExists = execSilent(`aws ecr describe-repositories --repository-names ${imageName} --region ${AWS_REGION}`);
  if (!repoExists) {
    exec(`aws ecr create-repository --repository-name ${imageName} --region ${AWS_REGION} --image-scanning-configuration scanOnPush=true`);
  }
  
  // Build image
  log('  Building Docker image...', 'yellow');
  exec(`docker build -f ${dockerfile} -t ${imageName}:${IMAGE_TAG} -t ${imageName}:latest .`);
  
  // Tag for ECR
  log('  Tagging image for ECR...', 'yellow');
  exec(`docker tag ${imageName}:${IMAGE_TAG} ${ecrRepo}:${IMAGE_TAG}`);
  exec(`docker tag ${imageName}:${IMAGE_TAG} ${ecrRepo}:latest`);
  
  // Push to ECR
  log('  Pushing to ECR...', 'yellow');
  exec(`docker push ${ecrRepo}:${IMAGE_TAG}`);
  exec(`docker push ${ecrRepo}:latest`);
  
  log(`  ✓ ${service} pushed successfully`, 'green');
  log(`  Image: ${ecrRepo}:${IMAGE_TAG}`, 'blue');
  console.log('');
}

log('========================================', 'green');
log('All images built and pushed successfully!', 'green');
log('========================================', 'green');
console.log('');
log('ECR Repositories:', 'blue');
for (const service of SERVICES) {
  const imageName = `${ECR_REPOSITORY_PREFIX}-${service}`;
  const ecrRepo = `${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${imageName}`;
  log(`  ${service}: ${ecrRepo}:${IMAGE_TAG}`, 'blue');
}

