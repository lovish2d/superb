/**
 * Permission Guard Component
 * 
 * Conditionally renders children based on user permissions.
 * Uses the centralized permission checking system.
 * 
 * @module guards/PermissionGuard
 */

import { type ReactNode } from 'react';
import { useHasPermission, useHasAnyPermission, useHasAllPermissions } from '@/hooks/useHasPermission';
import type { ResourceType, ActionType } from '@/utils/permissions';

type PermissionGuardProps = {
  resource: ResourceType;
  action: ActionType | ActionType[];
  requireAll?: boolean;
  children: ReactNode;
};

/**
 * Permission Guard Component
 * 
 * Conditionally renders children only if the user has the required permission(s).
 * 
 * @param resource - The resource to check permission for
 * @param action - Single action or array of actions to check
 * @param requireAll - If true and action is an array, requires ALL permissions. If false, requires ANY permission. Default: false
 * @param children - React nodes to render if permission check passes
 * 
 * @example
 * ```typescript
 * // Single permission
 * <PermissionGuard resource="organizations" action="create">
 *   <CreateButton />
 * </PermissionGuard>
 * 
 * // Multiple permissions (any)
 * <PermissionGuard
 *   resource="organizations"
 *   action={['create', 'update']}
 *   requireAll={false}
 * >
 *   <EditButton />
 * </PermissionGuard>
 * 
 * // Multiple permissions (all required)
 * <PermissionGuard
 *   resource="service_request"
 *   action={['read', 'approve']}
 *   requireAll={true}
 * >
 *   <ApprovalPanel />
 * </PermissionGuard>
 * ```
 */
const PermissionGuard = ({
  resource,
  action,
  requireAll = false,
  children,
}: PermissionGuardProps) => {
  // Handle single action
  if (typeof action === 'string') {
    const hasAccess = useHasPermission(resource, action);
    return hasAccess ? <>{children}</> : null;
  }

  // Handle multiple actions
  const permissions: Array<[ResourceType, ActionType]> = action.map((act) => [
    resource,
    act,
  ]);

  const hasAccess = requireAll
    ? useHasAllPermissions(permissions)
    : useHasAnyPermission(permissions);

  return hasAccess ? <>{children}</> : null;
};

export default PermissionGuard;

