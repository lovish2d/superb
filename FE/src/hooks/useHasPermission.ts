/**
 * React Hook for Permission Checking
 * 
 * This hook provides a convenient way to check permissions in React components.
 * It uses the centralized hasPermission utility function.
 * 
 * @module hooks/useHasPermission
 */

import { useMemo } from 'react';
import { useAuth } from './useAuth';
import { hasPermission, hasAnyPermission, hasAllPermissions } from '@/utils/permissions';
import type { ResourceType, ActionType } from '@/utils/permissions';

/**
 * Hook to check if the current user has a specific permission.
 * 
 * @param resource - The resource to check permission for
 * @param action - The action to check permission for
 * @returns true if the user has the permission, false otherwise
 * 
 * @example
 * ```typescript
 * const MyComponent = () => {
 *   const canCreate = useHasPermission('organizations', 'create');
 *   const canDelete = useHasPermission('users', 'delete');
 * 
 *   return (
 *     <>
 *       {canCreate && <Button>Create</Button>}
 *       {canDelete && <Button>Delete</Button>}
 *     </>
 *   );
 * };
 * ```
 */
export const useHasPermission = (
  resource: ResourceType,
  action: ActionType
): boolean => {
  const { user } = useAuth();

  return useMemo(
    () => hasPermission(user, resource, action),
    [user, resource, action]
  );
};

/**
 * Hook to check if the current user has any of the specified permissions.
 * 
 * @param permissions - Array of permission checks, each as [resource, action]
 * @returns true if the user has at least one of the permissions
 * 
 * @example
 * ```typescript
 * const canModify = useHasAnyPermission([
 *   ['organizations', 'create'],
 *   ['organizations', 'update']
 * ]);
 * ```
 */
export const useHasAnyPermission = (
  permissions: Array<[ResourceType, ActionType]>
): boolean => {
  const { user } = useAuth();

  return useMemo(
    () => hasAnyPermission(user, permissions),
    [user, permissions]
  );
};

/**
 * Hook to check if the current user has all of the specified permissions.
 * 
 * @param permissions - Array of permission checks, each as [resource, action]
 * @returns true if the user has all of the permissions
 * 
 * @example
 * ```typescript
 * const canApprove = useHasAllPermissions([
 *   ['service_request', 'read'],
 *   ['service_request', 'approve']
 * ]);
 * ```
 */
export const useHasAllPermissions = (
  permissions: Array<[ResourceType, ActionType]>
): boolean => {
  const { user } = useAuth();

  return useMemo(
    () => hasAllPermissions(user, permissions),
    [user, permissions]
  );
};

