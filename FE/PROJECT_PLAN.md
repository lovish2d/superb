# Superb Project - Implementation Plan & Structure

This document provides a comprehensive plan for setting up and implementing the Superb frontend application, including architecture decisions, implementation phases, and best practices.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Initial Setup](#initial-setup)
3. [Architecture Highlights](#architecture-highlights)
4. [Implementation Phases](#implementation-phases)
5. [Key Features to Build](#key-features-to-build)
6. [Database Schema Considerations](#database-schema-considerations)
7. [API Endpoints Overview](#api-endpoints-overview)
8. [Testing Strategy](#testing-strategy)

---

## Project Overview

**Superb** is a platform for managing aircraft engine repair and service operations. It serves two main user groups:

1. **Platform Organization (Superb Company)**
   - Owns and operates the platform
   - Manages service operations, technicians, equipment, and stands
   - Serves multiple customer companies

2. **Customer Organizations (Aircraft Companies)**
   - Use the platform to request and track service operations
   - Have their own users and internal role management
   - Access their service history and reports

### Key Differentiator: Dynamic Role Management

Unlike traditional RBAC systems with hardcoded roles, Superb implements a **dynamic role system**:
- Platform admin creates custom roles for Superb employees
- Each customer admin creates custom roles for their company
- Granular permission system with resource-level access control
- Scope-based permissions (own, team, organization, all)

---

## Initial Setup

### 1. Project Initialization

```bash
# Create Vite + React + TypeScript project
npm create vite@latest superb-frontend -- --template react-ts

# Install core dependencies
npm install \
  @mui/material @mui/icons-material @emotion/react @emotion/styled \
  @reduxjs/toolkit react-redux \
  react-router-dom \
  react-hook-form @hookform/resolvers zod \
  react-i18next i18next \
  recharts \
  lucide-react \
  date-fns

# Install dev dependencies
npm install -D \
  @types/react @types/react-dom \
  @typescript-eslint/eslint-plugin @typescript-eslint/parser \
  eslint eslint-config-prettier eslint-plugin-react-hooks \
  prettier \
  @storybook/react-vite @storybook/addon-essentials @storybook/addon-interactions
```

### 2. Environment Configuration

Create two environment files:

**.env.customer** (Customer portal)
```env
VITE_APP_TITLE=Superb - Customer Portal
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_PORTAL=customer
```

**.env.platform** (Platform owner portal)
```env
VITE_APP_TITLE=Superb - Platform Portal
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_PORTAL=platform
```

### 3. Vite Configuration

Update `vite.config.ts` to support multiple builds:

```typescript
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Determine which portal to build
  const portal = process.env.VITE_PORTAL || 'customer';
  const envFile = `.env.${portal}`;

  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    envPrefix: 'VITE_',
    build: {
      outDir: `dist/${portal}`,
    },
    server: {
      port: portal === 'customer' ? 6001 : 6002,
    },
  };
});
```

### 4. Package.json Scripts

```json
{
  "scripts": {
    "dev:customer": "VITE_PORTAL=customer vite --mode development",
    "dev:platform": "VITE_PORTAL=platform vite --mode development",
    "build:customer:dev": "VITE_PORTAL=customer vite build --mode development",
    "build:customer:prod": "VITE_PORTAL=customer vite build --mode production",
    "build:platform:dev": "VITE_PORTAL=platform vite build --mode development",
    "build:platform:prod": "VITE_PORTAL=platform vite build --mode production",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,json,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,json,css,md}\"",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

---

## Architecture Highlights

### 1. Dual Portal Architecture

```
src/
├── pages/
│   ├── public/              # Shared public pages
│   ├── customer/            # Customer-specific pages
│   └── platform/            # Platform-specific pages
├── routes/
│   ├── customer.routes.tsx  # Customer portal routes
│   └── platform.routes.tsx  # Platform portal routes
└── App.tsx                  # Determines which portal to render
```

**App.tsx Logic:**
```typescript
const portal = import.meta.env.VITE_APP_PORTAL;

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {portal === 'customer' ? <CustomerRoutes /> : <PlatformRoutes />}
      </BrowserRouter>
    </Provider>
  );
}
```

### 2. Dynamic Role & Permission System

**Key Entities:**

```typescript
// Base user types (system level)
type BaseUserType =
  | 'platform_owner_admin'
  | 'platform_user'
  | 'customer_admin'
  | 'customer_user';

// Dynamic role (created by admins)
type Role = {
  id: string;
  name: string;
  description: string;
  organizationType: 'platform' | 'customer';
  organizationId: string;
  permissions: Permission[];
  isSystem: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
};

// Granular permission
type Permission = {
  id: string;
  resource: ResourceType;
  action: ActionType;
  conditions?: {
    scope?: 'own' | 'team' | 'organization' | 'all';
    fields?: string[];
  };
};

// User with role
type User = {
  id: string;
  email: string;
  baseUserType: BaseUserType;
  roleId?: string;
  role?: Role;
  organizationId: string;
};
```

### 3. Permission Checking Architecture

**Three layers of permission checking:**

1. **Component Level** - `useHasPermission` hook
   ```typescript
   const canCreate = useHasPermission('service_request', 'create');
   ```

2. **Guard Level** - `<PermissionGuard>` component
   ```typescript
   <PermissionGuard resource="role" action="delete">
     <DeleteButton />
   </PermissionGuard>
   ```

3. **Route Level** - Route guards in route configuration
   ```typescript
   {
     path: '/platform/roles',
     element: (
       <AuthGuard>
         <AdminGuard>
           <RoleManagement />
         </AdminGuard>
       </AuthGuard>
     ),
   }
   ```

---

## Implementation Phases

### Phase 1: Foundation (Weeks 1-2)

**Goals:** Set up project structure, authentication, and basic layouts

#### Tasks:
1. ✅ **Project Setup**
   - Initialize Vite + React + TypeScript
   - Install dependencies
   - Configure dual build system
   - Set up path aliases

2. ✅ **Theme & Styling**
   - Create MUI theme (`src/theme/index.ts`)
   - Define color palette (`src/theme/colors.ts`)
   - Set up responsive breakpoints
   - Configure typography

3. ✅ **Internationalization**
   - Set up react-i18next
   - Create translation files structure
   - Implement language switcher
   - Add RTL support for Arabic

4. ✅ **Authentication System**
   - Login page
   - MFA verification page
   - Password reset flow
   - Auth API slice (RTK Query)
   - Auth slice (Redux)
   - Auth guards (AuthGuard, GuestGuard)

5. ✅ **Layouts**
   - PublicLayout
   - CustomerLayout (with sidebar)
   - PlatformLayout (with sidebar)
   - Responsive sidebar implementation

#### Deliverables:
- Working login/MFA/password reset flow
- Two portals with different layouts
- Language switching (EN/AR)
- Basic routing structure

---

### Phase 2: Role & Permission System (Weeks 3-4)

**Goals:** Implement dynamic role management and permission system

#### Tasks:
1. **Backend API Integration**
   - Role management endpoints
   - Permission management endpoints
   - User management endpoints
   - Organization endpoints

2. **Type Definitions**
   - `src/types/role.types.ts`
   - `src/types/permission.types.ts`
   - `src/types/user.types.ts`
   - `src/types/auth.types.ts`

3. **RTK Query API Slices**
   - `src/store/api/roleApi.ts`
   - `src/store/api/permissionApi.ts`
   - `src/store/api/userApi.ts`

4. **Custom Hooks**
   - `useHasPermission` - Check if user has permission
   - `useUserRole` - Get current user's role
   - `useCanAccess` - Check resource access
   - `useIsAdmin` - Check if user is admin

5. **Permission Guards**
   - `PermissionGuard` component
   - `AdminGuard` component
   - `BaseUserTypeGuard` component

6. **Role Management Pages**
   - Platform: `/platform/settings/roles`
     - Role list with create/edit/delete
     - Permission matrix component
     - Role assignment to users
   - Customer: `/customer/settings/roles`
     - Same as platform but scoped to customer org

7. **User Management Pages**
   - Platform: `/platform/users`
   - Customer: `/customer/settings/users`
   - Invite users
   - Assign roles
   - Manage user status

#### Deliverables:
- Complete role management system
- Permission checking throughout app
- User can create custom roles
- Admins can assign roles to users

---

### Phase 3: Core Features - Service Management (Weeks 5-7)

**Goals:** Build service request workflow

#### Tasks:
1. **Service Request Types**
   - `src/types/service.types.ts`
   - Request status workflow
   - Service categories
   - Priority levels

2. **Service API**
   - `src/store/api/serviceApi.ts`
   - CRUD operations
   - Status updates
   - Assignment operations

3. **Customer Portal - Service Pages**
   - Dashboard with metrics
   - Service request list
   - Create service request modal
   - Service request details page
   - Service history

4. **Platform Portal - Service Pages**
   - Dashboard with all services
   - Service management table
   - Assign technician modal
   - Update status workflow
   - Service details page

5. **Service Components**
   - ServiceRequestCard
   - ServiceRequestTable
   - ServiceStatusChip
   - ServiceTimeline
   - ServiceMetrics

#### Deliverables:
- Customers can create service requests
- Platform can view and manage all requests
- Technician assignment workflow
- Status tracking and updates

---

### Phase 4: Equipment & Stand Management (Weeks 8-9)

**Goals:** Manage equipment, tools, and stands inventory

#### Tasks:
1. **Equipment Types**
   - `src/types/equipment.types.ts`
   - `src/types/stand.types.ts`
   - Equipment categories
   - Stand types
   - Availability tracking

2. **Equipment API**
   - `src/store/api/equipmentApi.ts`
   - `src/store/api/standApi.ts`

3. **Platform Portal - Equipment Pages**
   - Equipment inventory table
   - Add/edit equipment
   - Equipment allocation
   - Stand management
   - Maintenance tracking

4. **Customer Portal - Equipment Pages**
   - View assigned equipment
   - Equipment usage history

5. **Equipment Components**
   - EquipmentCard
   - EquipmentTable
   - StandAllocationModal
   - EquipmentDetailsPage

#### Deliverables:
- Equipment inventory management
- Stand allocation system
- Equipment assignment to services
- Availability tracking

---

### Phase 5: Analytics & Reporting (Weeks 10-11)

**Goals:** Add analytics dashboards and export capabilities

#### Tasks:
1. **Analytics Pages**
   - Platform: Service metrics, utilization rates
   - Customer: Service history, costs

2. **Report Generation**
   - Service completion reports
   - Equipment utilization reports
   - Cost reports
   - Export to PDF/CSV

3. **Charts & Visualizations**
   - Recharts integration
   - Service trend charts
   - Equipment usage charts
   - Cost analysis charts

#### Deliverables:
- Analytics dashboards
- Report generation
- Data export functionality

---

### Phase 6: Polish & Optimization (Week 12)

**Goals:** Final touches, performance, and deployment prep

#### Tasks:
1. **Performance Optimization**
   - Code splitting
   - Lazy loading routes
   - Image optimization
   - Bundle size optimization

2. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support

3. **Testing**
   - Unit tests for utilities
   - Integration tests for key flows
   - E2E tests for critical paths

4. **Documentation**
   - Component documentation in Storybook
   - API documentation
   - Deployment guide

5. **Deployment Setup**
   - Configure CI/CD
   - Set up staging environment
   - Production build optimization

#### Deliverables:
- Production-ready application
- Comprehensive documentation
- Automated deployment pipeline

---

## Key Features to Build

### 1. Role Management Page

**Location:** `/platform/settings/roles` and `/customer/settings/roles`

**Features:**
- List all roles for organization
- Create new role with name and description
- Permission matrix:
  - Rows: Resources (service_request, equipment, stand, user, role, etc.)
  - Columns: Actions (create, read, update, delete, approve, assign, export)
  - Checkboxes for each permission
  - Scope selector (own, team, organization, all)
- Edit existing roles
- Delete custom roles (cannot delete system roles)
- View users assigned to each role

**Components:**
```
RoleManagement/
  ├── index.tsx
  ├── components/
  │   ├── RoleTable/
  │   ├── RoleCard/
  │   └── PermissionMatrix/
  └── modals/
      ├── CreateRoleModal/
      └── EditRoleModal/
```

### 2. User Management Page

**Location:** `/platform/users` and `/customer/settings/users`

**Features:**
- List all users in organization
- Invite new users
- Assign role to user
- Update user status (active/inactive)
- Delete users
- Filter by role
- Search users

### 3. Service Request Workflow

**Customer Side:**
1. Create service request
2. Track status
3. View assigned technician
4. View service history
5. Download reports

**Platform Side:**
1. View all service requests
2. Assign technician
3. Update status
4. Allocate equipment/stands
5. Track progress
6. Generate completion reports

### 4. Permission-Based UI

**Example: Service Request Actions**

```typescript
const ServiceRequestCard = ({ request }: Props) => {
  const canUpdate = useHasPermission('service_request', 'update');
  const canAssign = useHasPermission('service_request', 'assign');
  const canApprove = useHasPermission('service_request', 'approve');

  return (
    <Card>
      <Typography>{request.title}</Typography>

      {canUpdate && <Button onClick={handleEdit}>Edit</Button>}

      <PermissionGuard resource="service_request" action="assign">
        <Button onClick={handleAssign}>Assign Technician</Button>
      </PermissionGuard>

      {canApprove && request.status === 'pending' && (
        <Button onClick={handleApprove}>Approve</Button>
      )}
    </Card>
  );
};
```

---

## Database Schema Considerations

### Core Tables

**organizations**
- id (PK)
- name
- type (platform | customer)
- status (active | inactive)
- created_at
- updated_at

**users**
- id (PK)
- email
- password_hash
- base_user_type (platform_owner_admin | platform_user | customer_admin | customer_user)
- role_id (FK to roles) - nullable
- organization_id (FK to organizations)
- status (active | inactive | pending)
- mfa_enabled
- created_at
- updated_at

**roles**
- id (PK)
- name
- description
- organization_type (platform | customer)
- organization_id (FK to organizations)
- is_system (boolean)
- created_by (FK to users)
- created_at
- updated_at

**permissions**
- id (PK)
- role_id (FK to roles)
- resource (service_request | equipment | stand | user | role | report | analytics | billing | notification)
- action (create | read | update | delete | approve | assign | export)
- scope (own | team | organization | all) - nullable
- field_restrictions (JSON) - nullable
- created_at

**service_requests**
- id (PK)
- customer_organization_id (FK to organizations)
- title
- description
- priority (low | medium | high | urgent)
- status (draft | pending | approved | in_progress | completed | cancelled)
- assigned_technician_id (FK to users) - nullable
- created_by (FK to users)
- created_at
- updated_at
- completed_at

**equipment**
- id (PK)
- name
- type
- serial_number
- status (available | in_use | maintenance | retired)
- organization_id (FK to organizations)
- created_at
- updated_at

**stands**
- id (PK)
- name
- type
- capacity
- status (available | in_use | maintenance)
- organization_id (FK to organizations)
- created_at
- updated_at

---

## API Endpoints Overview

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/mfa/verify` - MFA verification
- `POST /api/auth/logout` - Logout
- `POST /api/auth/reset-password` - Request password reset
- `POST /api/auth/reset-password/confirm` - Confirm password reset

### Roles
- `GET /api/roles` - List roles (filtered by organization)
- `POST /api/roles` - Create role
- `GET /api/roles/:id` - Get role details
- `PUT /api/roles/:id` - Update role
- `DELETE /api/roles/:id` - Delete role (if not system role)

### Permissions
- `GET /api/permissions/resources` - List available resources
- `GET /api/permissions/actions` - List available actions
- `POST /api/roles/:id/permissions` - Update role permissions

### Users
- `GET /api/users` - List users (filtered by organization)
- `POST /api/users/invite` - Invite new user
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user
- `PUT /api/users/:id/role` - Assign role to user
- `DELETE /api/users/:id` - Delete user

### Service Requests
- `GET /api/service-requests` - List service requests
- `POST /api/service-requests` - Create service request
- `GET /api/service-requests/:id` - Get service request details
- `PUT /api/service-requests/:id` - Update service request
- `PUT /api/service-requests/:id/assign` - Assign technician
- `PUT /api/service-requests/:id/status` - Update status
- `DELETE /api/service-requests/:id` - Delete service request

### Equipment
- `GET /api/equipment` - List equipment
- `POST /api/equipment` - Add equipment
- `GET /api/equipment/:id` - Get equipment details
- `PUT /api/equipment/:id` - Update equipment
- `DELETE /api/equipment/:id` - Delete equipment

### Stands
- `GET /api/stands` - List stands
- `POST /api/stands` - Add stand
- `GET /api/stands/:id` - Get stand details
- `PUT /api/stands/:id` - Update stand
- `DELETE /api/stands/:id` - Delete stand

---

## Testing Strategy

### Unit Tests
- Utility functions (`checkPermission`, `formatDate`, etc.)
- Custom hooks (`useHasPermission`, `useUserRole`)
- Redux slices

### Component Tests
- Common components (PageHeader, Modal, etc.)
- Permission guards
- Role management components

### Integration Tests
- Authentication flow
- Role creation and assignment
- Service request workflow
- Permission checking

### E2E Tests
- Complete user journeys:
  - Admin creates role and assigns to user
  - User logs in and sees permitted features only
  - Customer creates service request
  - Platform assigns technician
  - Service completion workflow

---

## Next Steps

1. **Review this plan** with your team and adjust timelines
2. **Set up the project** following the Initial Setup section
3. **Start with Phase 1** - Foundation
4. **Build incrementally** - Don't skip phases
5. **Test continuously** - Write tests as you build features
6. **Document as you go** - Keep Storybook updated

---

**Questions or Need Clarification?**

Refer to:
- `SUPERB_CLAUDE.md` - Project context and overview
- `SUPERB_CODING_STANDARDS.md` - Coding guidelines and patterns

Good luck building Superb! 🚀
