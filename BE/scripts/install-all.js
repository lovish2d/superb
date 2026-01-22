#!/usr/bin/env node

/**
 * Script to install all dependencies for all services and shared packages
 * Usage: node scripts/install-all.js
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');

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

function exec(command, cwd = PROJECT_ROOT) {
  try {
    execSync(command, { 
      cwd, 
      stdio: 'inherit',
      encoding: 'utf-8'
    });
    return true;
  } catch (error) {
    log(`Error executing: ${command}`, 'red');
    process.exit(1);
  }
}

function installDependencies(path, name) {
  if (!existsSync(path)) {
    log(`  ✗ ${name} directory not found`, 'red');
    return false;
  }
  
  log(`  Installing ${name}...`, 'yellow');
  exec('npm install', path);
  log(`  ✓ ${name} installed`, 'green');
  return true;
}

log('========================================', 'blue');
log('Installing Dependencies for All Services', 'blue');
log('========================================', 'blue');
console.log('');

// Step 1: Install root dependencies
log('[1/4] Installing root dependencies...', 'yellow');
exec('npm install');
log('✓ Root dependencies installed', 'green');
console.log('');

// Step 2: Install shared packages dependencies
log('[2/4] Installing shared packages dependencies...', 'yellow');
installDependencies(join(PROJECT_ROOT, 'shared', 'config'), '@superb/shared-config');
installDependencies(join(PROJECT_ROOT, 'shared', 'common'), '@superb/shared-common');
console.log('');

// Step 3: Install service dependencies
log('[3/4] Installing service dependencies...', 'yellow');
const services = [
  'auth-service',
  'platform-service',
  'resource-service',
];

services.forEach(service => {
  installDependencies(join(PROJECT_ROOT, 'services', service), service);
});
console.log('');

// Step 4: Install workspace dependencies (links packages)
log('[4/4] Linking workspace packages...', 'yellow');
exec('npm install --workspaces');
log('✓ Workspace packages linked', 'green');
console.log('');

log('========================================', 'green');
log('All dependencies installed successfully!', 'green');
log('========================================', 'green');

