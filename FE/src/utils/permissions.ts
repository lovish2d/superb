/**
 * Centralized Permission System - Single Source of Truth
 * 
 * This file contains the ONLY permission checking logic in the entire application.
 * All permission checks MUST use the hasPermission function from this file.
 * 
 * Permission Format:
 * - "*" - Full access to everything
 * - "resource.*" - All actions on a specific resource (e.g., "organizations.*")
 * - "resource.action" - Specific action on a resource (e.g., "organizations.create")
 * - "read" - Read-only access to all resources
 * 
 * @module utils/permissions
 */

import type { User, Role } from '@/types/auth.types';

/**
 * NOTE: We intentionally keep ResourceType and ActionType as `string`
 * to align with dynamic permissions coming from the backend.
 * Any new permission strings from BE will continue to work without code changes.
 */
export type ResourceType = string;
export type ActionType = string;
export type PermissionString = string;

/**
 * Checks if a user has a specific permission.
 * 
 * This is the SINGLE SOURCE OF TRUTH for all permission checks.
 * All permission logic MUST be implemented here and nowhere else.
 * 
 * @param user - The user object containing roles with permissions
 * @param resource - The resource to check permission for
 * @param action - The action to check permission for
 * @returns true if the user has the permission, false otherwise
 * 
 * @example
 * ```typescript
 * // Check if user can create organizations
 * hasPermission(user, 'organizations', 'create')
 * 
 * // Check if user can read users
 * hasPermission(user, 'users', 'read')
 * ```
 */
export const hasPermission = (
  user: User | null,
  resource: ResourceType,
  action: ActionType
): boolean => {
  // No user means no permissions
  if (!user) {
    return false;
  }

  // No roles means no permissions
  if (!user.roles || user.roles.length === 0) {
    return false;
  }

  // Collect all permissions from all active roles
  const allPermissions: string[] = [];
  user.roles.forEach((role: Role) => {
    if (role.isActive && role.permissions && Array.isArray(role.permissions)) {
      allPermissions.push(...role.permissions);
    }
  });

  // If no permissions found, deny access
  if (allPermissions.length === 0) {
    return false;
  }

  // Check for wildcard permission - grants everything
  if (allPermissions.includes('*')) {
    return true;
  }

  // Check for read-only permission - grants read access to all resources
  if (action === 'read' && allPermissions.includes('read')) {
    return true;
  }

  // Build the permission string to check (e.g., "organizations.create")
  const permissionToCheck = `${resource}.${action}`;

  // Check for exact permission match
  if (allPermissions.includes(permissionToCheck)) {
    return true;
  }

  // Check for resource wildcard (e.g., "organizations.*" grants all actions on organizations)
  const resourceWildcard = `${resource}.*`;
  if (allPermissions.includes(resourceWildcard)) {
    return true;
  }

  // No matching permission found
  return false;
};

/**
 * Checks a permission expressed as a single string (e.g., "organizations.read", "users.*", "*", "read").
 * This keeps calling code simple when it already has the backend-style permission string.
 */
export const hasPermissionString = (
  user: User | null,
  permission: PermissionString
): boolean => {
  // Wildcard full access requested
  if (permission === '*') {
    return hasPermission(user, '*', '*');
  }

  // Read-only across resources
  if (permission === 'read') {
    return hasPermission(user, 'any', 'read');
  }

  // resource.* pattern
  if (permission.endsWith('.*')) {
    const resource = permission.slice(0, -2);
    return hasPermission(user, resource, '*');
  }

  // resource.action pattern
  const [resource, action] = permission.split('.') as [ResourceType, ActionType];
  if (!resource || !action) {
    return false;
  }
  return hasPermission(user, resource, action);
};

/**
 * Checks if a user has any of the specified permissions.
 * 
 * @param user - The user object containing roles with permissions
 * @param permissions - Array of permission checks, each as [resource, action]
 * @returns true if the user has at least one of the permissions
 * 
 * @example
 * ```typescript
 * // Check if user can create OR update organizations
 * hasAnyPermission(user, [
 *   ['organizations', 'create'],
 *   ['organizations', 'update']
 * ])
 * ```
 */
export const hasAnyPermission = (
  user: User | null,
  permissions: Array<[ResourceType, ActionType]>
): boolean => {
  return permissions.some(([resource, action]) =>
    hasPermission(user, resource, action)
  );
};

/**
 * Checks if a user has all of the specified permissions.
 * 
 * @param user - The user object containing roles with permissions
 * @param permissions - Array of permission checks, each as [resource, action]
 * @returns true if the user has all of the permissions
 * 
 * @example
 * ```typescript
 * // Check if user can read AND approve service requests
 * hasAllPermissions(user, [
 *   ['service_request', 'read'],
 *   ['service_request', 'approve']
 * ])
 * ```
 */
export const hasAllPermissions = (
  user: User | null,
  permissions: Array<[ResourceType, ActionType]>
): boolean => {
  return permissions.every(([resource, action]) =>
    hasPermission(user, resource, action)
  );
};

