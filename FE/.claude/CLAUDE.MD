# Claude Context - Superb Frontend Project

> **For coding standards and best practices, see [CODING_STANDARDS.md](../SUPERB_CODING_STANDARDS.md)**

## Project Overview

**Superb** is a React + TypeScript + Vite application for aircraft engine repair and service management. The platform facilitates the management of stands, equipment, and service operations with three distinct authentication levels:

1. **Public Users** - No authentication required (landing pages, info)
2. **Customer Users** - Authenticated customer companies and their users
3. **Platform Owner** - Superb company administrators with full system access

---

## Tech Stack

- **React 19** + TypeScript + Vite
- **Material-UI (MUI)** for UI components
- **Redux Toolkit** + **RTK Query** for state management and API calls
- **React Router DOM** for routing
- **react-i18next** for internationalization (English only)
- **Zod** + **React Hook Form** for form validation
- **Lucide React** for icons
- **Recharts** for data visualization
- **Storybook 10** for component development
- **ESLint + Prettier** for code quality

---

## Deployment Architecture

The application is a **single-page application (SPA)** with route-based portal separation:

- **Single Domain**: `app.superb.ai` (dev: `localhost:6001`)
- **Customer Portal Routes**: `/customer/*` (protected by CustomerGuard)
- **Platform Owner Portal Routes**: `/platform/*` (protected by PlatformGuard)

### Routing Strategy

- **Public Routes**: `/`, `/login`, `/mfa`, `/reset-password`
- **Auto-Redirect After Login**: Users are automatically redirected based on their `baseUserType`:
  - `platform_owner_admin` or `platform_user` → `/platform/dashboard`
  - `customer_admin` or `customer_user` → `/customer/dashboard`
- **Customer Routes**: `/customer/*` (dashboard, service-requests, equipment, reports, settings)
- **Platform Routes**: `/platform/*` (dashboard, customers, service-management, equipment-inventory, analytics, settings)
- **Shared Routes**: `/profile`, `/notifications` (accessible by all authenticated users)

### Environment & Build

**Environment Files:**
- `.env.develop` - Development environment (tracked in git)
- `.env.testing` - Testing environment (tracked in git)
- `.env.staging` - Staging environment (tracked in git)
- `.env.preprod` - Pre-production environment (tracked in git)
- `.env.production` - Production environment (tracked in git)
- `.env.local` - Local overrides (gitignored, not tracked)
- `.env.example` - Template file for reference

**Build Configuration:**
- Build output: `dist/`
- Dev server: `npm run dev` (port 6001, uses `.env.develop`)
- Build commands:
  - `npm run build` - Development build (default)
  - `npm run build:develop` - Development build (explicit)
  - `npm run build:testing` - Testing build
  - `npm run build:staging` - Staging build
  - `npm run build:preprod` - Pre-production build
  - `npm run build:prod` - Production build

---

## Authentication & User Types

### Base User Types (System Level)

```typescript
type BaseUserType =
  | "platform_owner_admin" // Superb super admin (can create platform roles)
  | "platform_user" // Superb employee with assigned role
  | "customer_admin" // Customer company admin (can create customer roles)
  | "customer_user"; // Customer company user with assigned role
```

### Dynamic Role System

**CRITICAL**: The system uses dynamic role-based access control (RBAC):

- **Platform Owner Admin**: Can create and manage custom roles for Superb employees
- **Customer Admin**: Can create and manage custom roles for their company users
- Roles are NOT hardcoded - they are configurable entities with permissions

```typescript
type Role = {
  id: string;
  name: string; // e.g., "Technician", "Supervisor", "Manager"
  description: string;
  organizationType: "platform" | "customer";
  organizationId: string; // Platform ID or Customer Company ID
  permissions: Permission[];
  isSystem: boolean; // System roles cannot be deleted
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
};

type User = {
  id: string;
  email: string;
  baseUserType: BaseUserType;
  roleId?: string; // Assigned role (if not admin)
  role?: Role; // Populated role object
  organizationId: string;
  // ... other user fields
};
```

### User Hierarchy

```
Platform Organization (Superb)
  ├── Platform Owner Admin (can create roles)
  └── Platform Users (assigned to custom roles)
      └── Example roles: Technician, Supervisor, Inventory Manager, etc.

Customer Organization
  ├── Customer Admin (can create roles)
  └── Customer Users (assigned to custom roles)
      └── Example roles: Viewer, Manager, Coordinator, etc.
```

### Authentication Flow

```
Login → MFA Verification → Password Reset (if required) → Dashboard
```

### Route Guards

- **AuthGuard**: Requires authentication
- **PlatformGuard**: Requires platform_owner_admin or platform_user base type
- **CustomerGuard**: Requires customer_admin or customer_user base type
- **GuestGuard**: Redirects authenticated users
- **AdminGuard**: Requires platform_owner_admin or customer_admin base type
- **PermissionGuard**: Dynamic guard based on user's role permissions
  - Example: `<PermissionGuard resource="service" action="create">`
- **BaseUserTypeGuard**: Restricts by base user type (platform/customer)

---

## Key Architectural Decisions

### 1. Component Organization

- Main component: `index.tsx` at folder root
- Sub-components: `components/` folder with nested folders
- Modals: `modals/` folder with nested folders
- Max 300 lines per component (preferably 200)

### 2. State Management

- **RTK Query** for all API calls and server state
- **Redux slices** only for complex local state (avoid when possible)
- API endpoints in `src/store/api/`

### 3. Internationalization

- All user-facing text in translation files
- English (en) language support
- Translation files: `src/locales/en/{namespace}.json`
- Namespaces: `common`, `auth`, `customer`, `platform`, `sidebar`, `dashboard`, `service`, `equipment`, `roles`, `permissions`, `users`

### 4. Form Handling

- **Zod** for validation schemas
- **React Hook Form** with Controller for all forms
- TextField with `select` prop (never standalone Select)

### 5. Styling

- All colors from `src/theme/colors.ts`
- **Lucide icons** preferred over MUI icons
- Responsive breakpoints: `xs`, `sm`, `md`, `lg`

---

## Project Structure

```
src/
├── pages/                  # Pages organized by user type
│   ├── public/             # Login, MFA, Password Reset, Landing
│   ├── customer/           # Customer portal pages
│   │   ├── Dashboard/
│   │   ├── ServiceRequests/
│   │   ├── Equipment/
│   │   ├── Reports/
│   │   └── Settings/
│   │       ├── RoleManagement/      # Create/manage customer roles
│   │       ├── UserManagement/      # Manage customer users
│   │       └── CompanySettings/
│   ├── platform/           # Platform owner portal pages
│   │   ├── Dashboard/
│   │   ├── Customers/
│   │   ├── ServiceManagement/
│   │   ├── EquipmentInventory/
│   │   ├── StandsManagement/
│   │   ├── Users/                   # Platform user management
│   │   ├── Analytics/
│   │   └── Settings/
│   │       ├── RoleManagement/      # Create/manage platform roles
│   │       └── PlatformSettings/
│   └── common/             # Shared pages (ProfileSettings, Notifications)
├── components/
│   ├── common/             # Shared components (PageHeader, NoData, etc.)
│   └── layouts/            # Layout components
├── layouts/                # Main layout wrappers
│   ├── PublicLayout.tsx
│   ├── CustomerLayout.tsx
│   ├── PlatformLayout.tsx
│   └── TechnicianLayout.tsx
├── routes/                 # Route configuration
│   ├── customer.routes.tsx
│   ├── platform.routes.tsx
│   └── public.routes.tsx
├── store/                  # Redux + RTK Query
│   ├── api/                # API slices
│   │   ├── authApi.ts
│   │   ├── serviceApi.ts
│   │   ├── equipmentApi.ts
│   │   ├── customerApi.ts
│   │   ├── userApi.ts
│   │   ├── roleApi.ts              # Role management API
│   │   ├── permissionApi.ts        # Permission management API
│   │   └── standApi.ts
│   └── slices/             # Redux slices (minimal use)
│       └── authSlice.ts            # User session & permissions
├── hooks/                  # Custom hooks
│   ├── useAuth.ts
│   ├── useHasPermission.ts         # Permission checking hook
│   ├── useUserRole.ts              # Get current user role
│   └── useCanAccess.ts             # Resource access checking
├── guards/                 # Route guards
│   ├── AuthGuard.tsx
│   ├── PlatformGuard.tsx
│   ├── CustomerGuard.tsx
│   ├── AdminGuard.tsx
│   ├── PermissionGuard.tsx         # Dynamic permission guard
│   └── BaseUserTypeGuard.tsx
├── types/                  # TypeScript types
│   ├── auth.types.ts               # BaseUserType
│   ├── role.types.ts               # Role, Permission types
│   ├── user.types.ts
│   ├── service.types.ts
│   ├── equipment.types.ts
│   ├── customer.types.ts
│   └── stand.types.ts
├── theme/                  # MUI theme + colors
├── locales/                # Translation files
│   └── en/
│       ├── common.json
│       ├── auth.json
│       ├── customer.json
│       ├── platform.json
│       ├── service.json
│       ├── equipment.json
│       ├── roles.json           # Role management translations
│       ├── permissions.json     # Permission translations
│       └── users.json           # User management translations
└── utils/                  # Utility functions
```

---

## Domain-Specific Features

### Customer Portal Features

- **Service Request Management**: Create, track, and manage service requests
- **Equipment Tracking**: View assigned equipment and stands
- **Service History**: Historical data and reports
- **Billing & Invoicing**: View invoices and payment status
- **Team Management**: Manage customer company users

### Platform Owner Portal Features

- **Customer Management**: Manage all customer companies
- **Service Operations**: Oversee all service requests and operations
- **Equipment & Stands Inventory**: Manage all equipment, tools, and stands
- **Technician Management**: Assign and manage technicians
- **Analytics & Reporting**: System-wide analytics and insights
- **Scheduling**: Manage service schedules and resource allocation
- **Quality Control**: Track service quality and compliance

### Key Entities

1. **Service Request**: Aircraft engine service/repair request
2. **Stand**: Physical stands used in service operations
3. **Equipment**: Tools and equipment used for repairs
4. **Customer**: Aircraft companies using the service
5. **Technician**: Service personnel
6. **Work Order**: Detailed service task breakdown

---

## Important Files

- **SUPERB_CODING_STANDARDS.md**: Complete coding guidelines (MUST READ)
- **DEPLOYMENT.md**: Deployment instructions
- **package.json**: Available scripts and dependencies
- **Environment Files**: `.env.develop`, `.env.testing`, `.env.staging`, `.env.preprod`, `.env.production`
- **.env.local**: Local development overrides (gitignored)

---

## Available Commands

### Development

```bash
npm run dev                # Start dev server on port 6001 (uses .env.develop)
```

### Build (Environment-Specific)

```bash
npm run build              # Build for development (default)
npm run build:develop      # Build for development environment (explicit)
npm run build:testing      # Build for testing environment
npm run build:staging      # Build for staging environment
npm run build:preprod      # Build for pre-production environment
npm run build:prod         # Build for production environment
```

### Code Quality

```bash
npm run lint               # Check for linting errors
npm run lint:fix           # Auto-fix linting errors
npm run format             # Format code with Prettier
npm run format:check       # Check formatting
```

### Storybook

```bash
npm run storybook          # Start Storybook on port 6006
npm run build-storybook    # Build static Storybook
```

---

## Current Implementation Status

### ✅ To Be Implemented

- Authentication system (Login, MFA, Password Reset)
- Route guards and user type restrictions
- Customer and Platform layouts with responsive sidebars
- Profile settings with tabs and document management
- Internationalization (English only)
- Form validation with Zod + React Hook Form
- Redux Toolkit + RTK Query setup
- Storybook configuration

### 🎯 Key Features to Build

- Service request workflow
- Equipment and stands management
- Customer management system
- Technician assignment and tracking
- Analytics and reporting dashboards
- Scheduling and calendar integration
- Real-time notifications
- Document management (service reports, certifications)

---

## Role & Permission Architecture

### Dynamic Permission System

**CRITICAL**: The system uses a flexible, dynamic permission structure where admins can create roles with granular permissions.

### Permission Structure

```typescript
type ResourceType =
  | "service_request"
  | "equipment"
  | "stand"
  | "customer" // Only for platform
  | "user"
  | "role" // Role management
  | "report"
  | "analytics"
  | "billing"
  | "notification";

type ActionType =
  | "create"
  | "read"
  | "update"
  | "delete"
  | "approve"
  | "assign"
  | "export";

type Permission = {
  id: string;
  resource: ResourceType;
  action: ActionType;
  conditions?: {
    scope?: "own" | "team" | "organization" | "all"; // Data access scope
    fields?: string[]; // Specific field access
  };
};

type Role = {
  id: string;
  name: string;
  description: string;
  organizationType: "platform" | "customer";
  organizationId: string;
  permissions: Permission[];
  isSystem: boolean; // System roles (like Admin) cannot be deleted
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
};
```

### Admin Capabilities

#### Platform Owner Admin Can:

- Create, update, delete custom roles for Superb employees
- Assign granular permissions to each role
- Manage all platform users and their role assignments
- View and manage all customer organizations
- Cannot modify customer company roles (only customer admin can)

#### Customer Admin Can:

- Create, update, delete custom roles for their company users
- Assign granular permissions to each role
- Manage their company users and role assignments
- Cannot access platform roles or other customer company roles

### Example Permission Patterns

```typescript
// Example 1: Technician Role (Created by Platform Admin)
const technicianRole: Role = {
  id: "role_123",
  name: "Service Technician",
  description: "Can view and update assigned service requests",
  organizationType: "platform",
  organizationId: "platform_001",
  permissions: [
    {
      id: "perm_1",
      resource: "service_request",
      action: "read",
      conditions: { scope: "own" }, // Only assigned requests
    },
    {
      id: "perm_2",
      resource: "service_request",
      action: "update",
      conditions: { scope: "own", fields: ["status", "notes", "progress"] },
    },
    {
      id: "perm_3",
      resource: "equipment",
      action: "read",
    },
  ],
  isSystem: false,
  createdBy: "admin_user_id",
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Example 2: Customer Manager Role (Created by Customer Admin)
const customerManagerRole: Role = {
  id: "role_456",
  name: "Service Manager",
  description: "Can manage all service requests for the company",
  organizationType: "customer",
  organizationId: "customer_company_001",
  permissions: [
    {
      id: "perm_4",
      resource: "service_request",
      action: "create",
    },
    {
      id: "perm_5",
      resource: "service_request",
      action: "read",
      conditions: { scope: "organization" },
    },
    {
      id: "perm_6",
      resource: "service_request",
      action: "update",
      conditions: { scope: "organization" },
    },
    {
      id: "perm_7",
      resource: "report",
      action: "export",
    },
  ],
  isSystem: false,
  createdBy: "customer_admin_id",
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

### Permission Checks in Code

```typescript
// Custom hook for permission checking
const useHasPermission = (resource: ResourceType, action: ActionType) => {
  const user = useAppSelector((state) => state.auth.user);

  // Admins have all permissions
  if (user.baseUserType === 'platform_owner_admin' ||
      user.baseUserType === 'customer_admin') {
    return true;
  }

  // Check role permissions
  return user.role?.permissions.some(
    (p) => p.resource === resource && p.action === action
  ) ?? false;
};

// Usage in components
const MyComponent = () => {
  const canCreateService = useHasPermission('service_request', 'create');
  const canApprove = useHasPermission('service_request', 'approve');

  return (
    <>
      {canCreateService && <Button>Create Service Request</Button>}
      {canApprove && <Button>Approve</Button>}
    </>
  );
};

// Permission Guard component
<PermissionGuard resource="service_request" action="create">
  <CreateServiceButton />
</PermissionGuard>

// Multiple permissions (any)
<PermissionGuard
  resource="service_request"
  action={['create', 'update']}
  requireAll={false}  // User needs ANY of the permissions
>
  <ServiceForm />
</PermissionGuard>

// Multiple permissions (all)
<PermissionGuard
  resource="service_request"
  action={['read', 'approve']}
  requireAll={true}   // User needs ALL permissions
>
  <ApprovalPanel />
</PermissionGuard>
```

### Role Management Pages

#### Platform Portal Includes:

- **Role Management**: `/platform/settings/roles`
  - Create/Edit/Delete platform roles
  - Assign permissions per role
  - View users assigned to each role

#### Customer Portal Includes:

- **Role Management**: `/customer/settings/roles`
  - Create/Edit/Delete customer company roles
  - Assign permissions per role
  - View team members assigned to each role

### Default System Roles

While roles are dynamic, the system comes with default templates:

**Platform Default Roles** (can be customized):

- Platform Owner Admin (system role, cannot be deleted)
- Service Technician (template)
- Supervisor (template)
- Inventory Manager (template)

**Customer Default Roles** (can be customized):

- Customer Admin (system role, cannot be deleted)
- Viewer (template)
- Manager (template)

---

## Quick Reference

### When Writing Code

1. **Always check SUPERB_CODING_STANDARDS.md first**
2. Use absolute imports with `@/` alias
3. All text must use translation keys
4. All colors from theme
5. Components max 300 lines (preferably 200)
6. Run builds before committing

### Before Committing

```bash
npm run lint:fix
npm run build
```

### Domain-Specific Naming Conventions

- Service requests: `ServiceRequest`, `ServiceRequestCard`, `CreateServiceModal`
- Equipment: `Equipment`, `EquipmentTable`, `StandAllocationModal`
- Customers: `Customer`, `CustomerCard`, `CustomerDetailsPage`
- Technicians: `Technician`, `TechnicianAssignment`, `TechnicianSchedule`

---

**For detailed coding standards, patterns, and examples, refer to [SUPERB_CODING_STANDARDS.md](../SUPERB_CODING_STANDARDS.md)**
