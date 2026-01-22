import { useState, useEffect, useMemo } from 'react';
import { Box, List } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { brandColors } from '@/theme';
// Add Wifi to imports
import {
  Box as BoxIcon,
  Users,
  ClipboardCheck,
  Building2,
  Truck,
  Wrench,
  Database,
  BarChart3,
  Wifi,
} from 'lucide-react';

import DashboardIcon from './icons/DashboardIcon';

import type { NavItem } from './types';
import { useAuth } from '@/hooks/useAuth';
import { hasPermissionString } from '@/utils/permissions';
import SidebarHeader from './components/SidebarHeader';
import SidebarItem from './components/SidebarItem';
import SidebarFooter from './components/SidebarFooter';

type SidebarProps = {
  activePath?: string;
  onNavigate?: (path: string) => void;
  onLogout?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
};

const allNavItems: NavItem[] = [
  {
    id: 'dashboard',
    labelKey: 'dashboard',
    icon: DashboardIcon,
    path: '/dashboard',
    // Dashboard is always accessible (no permission required)
  },
  {
    id: 'stand_registry',
    labelKey: 'stand_registry',
    icon: BoxIcon,
    // Use a broad read permission; backend wildcards like "*" or "read" will also pass
    permission: 'read',
    children: [
      { id: 'stands_overview', labelKey: 'overview', icon: BoxIcon, path: '/stands', permission: 'read' },
      { id: 'tracking_map', labelKey: 'tracking_map', icon: BoxIcon, path: '/tracking-map', permission: 'read' },
      { id: 'iot_tracking', labelKey: 'iot_tracking', icon: Wifi, path: '/iot-tracking', permission: 'read' },
    ],
  },
  {
    id: 'superb_users',
    labelKey: 'superb_users',
    icon: Users,
    permission: 'users.read',
    horizontalChildren: true,
    children: [
      { id: 'all_users', labelKey: 'all_users', icon: Users, path: '/users', permission: 'users.read', chip: { label: 5 } },
      // { id: 'roles', labelKey: 'roles', icon: Users, path: '/users/roles', permission: 'roles.read' },
      { id: 'operations', labelKey: 'operations', icon: Users, path: '/users/operations', permission: 'users.read', chip: { label: 1 } },
      { id: 'technicians', labelKey: 'technicians', icon: Users, path: '/users/technicians', permission: 'users.read', chip: { label: 1 } },
      { id: 'logistics', labelKey: 'logistics', icon: Truck, path: '/users/logistics', permission: 'users.read', chip: { label: 1 } },
      { id: 'admins', labelKey: 'admins', icon: Users, path: '/users/admins', permission: 'users.read', chip: { label: 1 } },
    ],
  },
  {
    id: 'inspections',
    labelKey: 'inspections',
    icon: ClipboardCheck,
    permission: 'inspection.read',
    horizontalChildren: true,
    children: [
      { id: 'inspection_reports', labelKey: 'inspection_reports', icon: ClipboardCheck, path: '/inspections', permission: 'inspection.read' },
      { id: 'schedules', labelKey: 'schedules', icon: ClipboardCheck, path: '/inspections/schedules', permission: 'inspection.read' },
    ],
  },
  {
    id: 'deployment',
    labelKey: 'deployment',
    icon: Building2,
    permission: 'deployment.read',
    horizontalChildren: true,
    children: [
      { id: 'deployments', labelKey: 'deployments', path: '/deployment', permission: 'deployment.read' },
      { id: 'locations', labelKey: 'locations', path: '/deployment/locations', permission: 'deployment.read' },
    ],
  },
  {
    id: 'logistics',
    labelKey: 'logistics',
    icon: Truck,
    path: '/logistics',
    permission: 'logistics.read',
  },
  {
    id: 'maintenance',
    labelKey: 'maintenance',
    icon: Wrench,
    path: '/maintenance',
    permission: 'maintenance.read',
  },
  {
    id: 'reference_data',
    labelKey: 'reference_data',
    icon: Database,
    path: '/reference-data',
    permission: 'reference_data.read',
  },
  {
    id: 'reports',
    labelKey: 'reports',
    icon: BarChart3,
    path: '/reports',
    permission: 'report.read',
  },
];

const Sidebar = ({ activePath, onNavigate, onLogout, collapsed = false, onToggleCollapse }: SidebarProps) => {
  const { user } = useAuth();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Filter navigation items based on user permissions
  const navItems = useMemo(() => {
    const filterNavItems = (items: NavItem[]): NavItem[] => {
      return items
        .map((item) => {
          // Check if item has permission requirement
          if (item.permission) {
            const hasAccess = hasPermissionString(user, item.permission);
            if (!hasAccess) {
              return null; // Filter out items without permission
            }
          }

          // Filter children if they exist
          if (item.children && item.children.length > 0) {
            const filteredChildren = filterNavItems(item.children);
            // Only include parent if it has at least one visible child
            if (filteredChildren.length === 0) {
              return null;
            }
            return {
              ...item,
              children: filteredChildren,
            };
          }

          return item;
        })
        .filter((item): item is NavItem => item !== null);
    };

    return filterNavItems(allNavItems);
  }, [user]);

  // Auto-expand parent items when a child is active
  useEffect(() => {
    const expanded = new Set<string>();
    navItems.forEach((item) => {
      if (item.children && item.children.length > 0) {
        const hasActiveChild = item.children.some((child) => child.path === activePath);
        if (hasActiveChild) {
          expanded.add(item.id);
        }
      }
    });

    if (expanded.size > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExpandedItems((prev) => {
        // Only update if there are new items to expand
        const hasNewItems = Array.from(expanded).some(id => !prev.has(id));
        if (!hasNewItems) return prev;

        const merged = new Set(prev);
        expanded.forEach((id) => merged.add(id));
        return merged;
      });
    }
  }, [activePath, navItems]);

  const toggleExpand = (itemId: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  return (
    <Box
      sx={{
        width: collapsed ? 80 : 280,
        height: '100vh',
        bgcolor: brandColors.neutral[900],
        borderRight: `1px solid ${alpha(brandColors.neutral[200], 0.2)}`,
        display: 'flex',
        flexDirection: 'column',
        p: collapsed ? 2 : 3,
        transition: 'width 0.3s ease',
        overflow: 'visible', // Allow collapse button to overflow
        position: 'relative',
        flexShrink: 0,
      }}
    >
      <SidebarHeader
        collapsed={collapsed}
        onToggleCollapse={onToggleCollapse || (() => { })}
      />

      {/* Navigation Items - Scrollable */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: brandColors.neutral[700],
            borderRadius: '4px',
            '&:hover': {
              background: brandColors.neutral[500],
            },
          },
        }}
      >
        <List sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {navItems.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              collapsed={collapsed}
              isExpanded={expandedItems.has(item.id)}
              activePath={activePath}
              onToggleExpand={toggleExpand}
              onNavigate={onNavigate}
            />
          ))}
        </List>
      </Box>

      <SidebarFooter
        collapsed={collapsed}
        onLogout={onLogout}
        onNavigate={onNavigate}
      />
    </Box>
  );
};

export default Sidebar;
