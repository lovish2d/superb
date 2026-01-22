# Superb Frontend - Coding Standards

This document outlines the coding standards and best practices for the Superb frontend application. **All developers and AI assistants must follow these guidelines strictly.**

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Component Standards](#component-standards)
3. [Styling & Theme](#styling--theme)
4. [Internationalization (i18n)](#internationalization-i18n)
5. [Form Validation](#form-validation)
6. [State Management](#state-management)
7. [TypeScript Conventions](#typescript-conventions)
8. [React Compiler Compatibility](#react-compiler-compatibility)
9. [Build & Testing](#build--testing)
10. [Import Conventions](#import-conventions)
11. [Role & Permission Patterns](#role--permission-patterns)

---

## 1. Project Structure

### Component Folder Structure

**CRITICAL:** Every component MUST have its own folder with an `index.tsx` file.

#### Basic Component Structure

```
✅ CORRECT:
src/components/common/PageHeader/
  ├── index.tsx
  └── PageHeader.stories.tsx

src/components/common/ServiceCard/
  ├── index.tsx
  └── ServiceCard.stories.tsx

❌ WRONG:
src/components/common/PageHeader.tsx
src/components/common/ServiceCard.tsx
```

#### Complex Component/Page Structure

**CRITICAL:** When a component has sub-components or modals, they MUST be organized in dedicated folders.

```
✅ CORRECT:
src/pages/platform/RoleManagement/
  ├── index.tsx                    # Main component
  ├── components/                  # Sub-components folder
  │   ├── RoleTable/
  │   │   └── index.tsx
  │   ├── PermissionMatrix/
  │   │   └── index.tsx
  │   └── RoleCard/
  │       └── index.tsx
  └── modals/                      # Modals folder
      ├── CreateRoleModal/
      │   └── index.tsx
      └── EditRoleModal/
          └── index.tsx

❌ WRONG:
src/pages/platform/RoleManagement/
  ├── index.tsx
  ├── RoleTable.tsx               # Should be in components/RoleTable/index.tsx
  ├── PermissionMatrix.tsx        # Should be in components/PermissionMatrix/index.tsx
  ├── CreateRoleModal.tsx         # Should be in modals/CreateRoleModal/index.tsx
  └── EditRoleModal.tsx           # Should be in modals/EditRoleModal/index.tsx
```

**Structure Rules:**
1. **Main component**: Always `index.tsx` at the root of the component/page folder
2. **Sub-components**: Place in `components/` folder, each in its own folder with `index.tsx`
3. **Modals**: Place in `modals/` folder, each in its own folder with `index.tsx`
4. **Each folder must have `index.tsx`** (never ComponentName.tsx at root level)

**Example for ServiceManagement:**
```
src/pages/platform/ServiceManagement/
  ├── index.tsx                           # Main component with tabs/layout
  ├── components/                         # Sub-components
  │   ├── ServiceRequestTable/
  │   │   └── index.tsx
  │   ├── ServiceFilters/
  │   │   └── index.tsx
  │   └── ServiceStatusCard/
  │       └── index.tsx
  └── modals/                             # Modals
      ├── AssignTechnicianModal/
      │   └── index.tsx
      └── UpdateStatusModal/
          └── index.tsx
```

### File Naming Conventions

- **Components**: PascalCase folder with `index.tsx` (`PageHeader/index.tsx`)
- **Utilities**: camelCase (`formatDate.ts`, `checkPermission.ts`)
- **Hooks**: Prefix with `use` (`useAuth.ts`, `useHasPermission.ts`)
- **Types**: Suffix with `.types.ts` (`role.types.ts`, `service.types.ts`)
- **Stories**: ComponentName.stories.tsx (`PageHeader.stories.tsx`)

### Folder Organization

```
src/
├── components/
│   ├── common/          # Shared components (PageHeader, ServiceCard, etc.)
│   ├── layouts/         # Layout components
│   └── ui/              # Basic UI components
├── pages/
│   ├── public/          # Public pages
│   ├── customer/        # Customer user pages
│   ├── platform/        # Platform owner pages
│   └── common/          # Shared pages (ProfileSettings)
├── hooks/               # Custom React hooks
├── store/               # Redux store
│   ├── api/             # RTK Query API slices
│   └── slices/          # Redux slices
├── types/               # TypeScript types
├── theme/               # MUI theme configuration
├── locales/             # Translation files
│   └── en/              # English translations
├── guards/              # Route guards (including PermissionGuard)
└── utils/               # Utility functions
```

---

## 2. Component Standards

### Component Size Limits

**CRITICAL:** Components MUST be kept small and focused.

- **Preferred maximum**: 200 lines of code
- **Absolute maximum**: 300 lines of code
- **Exceeding 300 lines is unacceptable** and must be refactored immediately

**When a component exceeds 200 lines:**
1. Split into smaller sub-components
2. Extract reusable logic into custom hooks
3. Move complex sections into separate component files
4. Use composition to break down functionality

**Example refactoring:**
```typescript
❌ WRONG: Single 500-line component
src/pages/platform/ServiceManagement/index.tsx (500 lines)

✅ CORRECT: Split into focused components
src/pages/platform/ServiceManagement/
  ├── index.tsx (100 lines - main component)
  ├── components/
  │   ├── ServiceRequestTable/index.tsx (180 lines)
  │   ├── ServiceFilters/index.tsx (120 lines)
  │   └── ServiceStatusCard/index.tsx (150 lines)
  └── modals/
      └── AssignTechnicianModal/index.tsx (160 lines)
```

### PageHeader Component Usage

All pages MUST use the `PageHeader` component for consistent layout:

```typescript
import PageHeader from '@/components/common/PageHeader';

<PageHeader
  title={t('service.management.title')}
  subtitle={t('service.management.subtitle')}
  backButton={{
    label: t('common.back'),
    onClick: () => navigate('/platform/dashboard'),
  }}
  action={{
    label: t('service.create_request'),
    onClick: handleCreateService,
    icon: Plus,
    variant: 'contained',
  }}
/>
```

### Modal Component Usage

**CRITICAL:** All modals MUST use the `Modal` component from `@/components/common/Modal` for consistent layout and behavior.

**NEVER use Dialog directly.** Always use the Modal component.

```typescript
import Modal from '@/components/common/Modal';

✅ CORRECT:
<Modal
  open={isOpen}
  onClose={handleClose}
  title={t('roles.create_role.title')}
  subtitle={t('roles.create_role.subtitle')}
  maxWidth="md"
  fullWidth
  primaryAction={{
    label: t('common.create'),
    onClick: handleSubmit(onSubmit),
    disabled: isSubmitting,
    loading: isSubmitting,
    variant: 'contained',
  }}
  secondaryAction={{
    label: t('common.cancel'),
    onClick: handleClose,
    disabled: isSubmitting,
  }}
>
  {/* Modal content */}
  <TextField ... />
  <PermissionMatrix ... />
</Modal>

❌ WRONG:
<Dialog open={isOpen} onClose={handleClose}>
  <DialogTitle>{t('roles.create_role.title')}</DialogTitle>
  <DialogContent>
    {/* content */}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button onClick={handleSubmit}>Create</Button>
  </DialogActions>
</Dialog>
```

### Component Patterns

1. **Always use functional components** with hooks
2. **Use Controller from React Hook Form** for all form inputs
3. **TextField with select prop** instead of standalone Select component
4. **Use Modal component** for all modals (NEVER use Dialog directly)
5. **Every component must have a Storybook story**

#### TextField Select Pattern

```typescript
✅ CORRECT:
<TextField
  select
  fullWidth
  label={t('roles.organization_type')}
  value={value}
  onChange={(e) => handleChange(e.target.value)}
>
  <MenuItem value="platform">{t('roles.platform')}</MenuItem>
  <MenuItem value="customer">{t('roles.customer')}</MenuItem>
</TextField>

❌ WRONG:
<FormControl fullWidth>
  <Select
    value={value}
    onChange={(e) => handleChange(e.target.value)}
  >
    <MenuItem value="platform">Platform</MenuItem>
  </Select>
</FormControl>
```

#### Chip Component Usage

Use MUI Chip component with theme color variants for status indicators and labels:

```typescript
import { Chip } from '@mui/material';

✅ CORRECT:
// Default (Purple)
<Chip label={t('service.status.active')} color="default" />

// Secondary (Cyan)
<Chip label={t('service.status.pending')} color="secondary" />

// Outline (Border only)
<Chip label={t('service.status.draft')} variant="outlined" />

// Success (Light green)
<Chip label={t('service.status.completed')} color="success" />

// Warning (Light yellow)
<Chip label={t('service.status.review')} color="warning" />

// Info (Light blue)
<Chip label={t('roles.system_role')} color="info" />

// Error/Destructive (Red)
<Chip label={t('service.status.cancelled')} color="error" />

❌ WRONG:
// Never use custom styling or hardcoded colors
<Chip label="Active" sx={{ bgcolor: '#8b5cf6', color: '#fff' }} />
<Box sx={{ bgcolor: '#dcfce7', color: '#008236', borderRadius: '6.75px', padding: '4.8px 8.8px' }}>
  Completed
</Box>
```

### Icon Usage

**CRITICAL:** NEVER use emojis or text characters for icons. Always use proper icon components or images.

**Icon Preference Order:**

1. **First Preference: Lucide Icons** (lucide-react)
   ```typescript
   ✅ CORRECT:
   import { User, Settings, Plus, Check, Shield, Lock } from 'lucide-react';

   <User size={20} />
   <Shield size={18} color={brandColors.textDisabled} />
   <Plus size={16} />
   ```

2. **Second Preference: SVG Files**
   ```typescript
   ✅ CORRECT:
   import logoIcon from '@/assets/images/logo.svg';

   <Box
     component="img"
     src={logoIcon}
     alt="Superb Logo"
     sx={{ width: 32, height: 32 }}
   />
   ```

3. **Third Preference: PNG Files**
   ```typescript
   ✅ CORRECT:
   import equipmentIcon from '@/assets/images/equipment.png';

   <Box
     component="img"
     src={equipmentIcon}
     alt="Equipment"
     sx={{ width: 24, height: 24 }}
   />
   ```

**What NOT to Use:**

```typescript
❌ WRONG:
// Never use emojis
<span style={{ fontSize: '20px' }}>✓</span>
<Typography>🔒 Locked</Typography>

// Never use text characters
<span>×</span>  // Use <X /> from lucide-react instead
<span>☰</span>  // Use <Menu /> from lucide-react instead
```

---

## 3. Styling & Theme

### Color Usage

**CRITICAL:** NEVER use hardcoded colors. ALWAYS use theme colors from `@/theme`.

```typescript
import { brandColors, statusColors, pastelColors } from '@/theme';

✅ CORRECT:
sx={{ color: brandColors.textPrimary }}
sx={{ bgcolor: brandColors.card }}
sx={{ border: `1px solid ${brandColors.border}` }}
sx={{ color: statusColors.success }}
sx={{ bgcolor: pastelColors.blue }}

❌ WRONG:
sx={{ color: '#1a1a1a' }}
sx={{ bgcolor: '#ffffff' }}
sx={{ border: '1px solid #D1D5DB' }}
sx={{ color: '#10b981' }}
```

### Available Theme Colors

#### Brand Colors (`brandColors`)
- `background`, `secondaryBackground`, `foreground`
- `primary`, `primaryLight`, `primaryForeground`
- `secondary`, `secondaryForeground`
- `accent`, `accentForeground`
- `destructive`
- `muted`, `mutedForeground`
- `card`, `border`, `boxShadow`
- `textPrimary`, `textSecondary`, `textDisabled`

#### Status Colors (`statusColors`)
- `success` - Use for success states, completed services, positive metrics
- `warning` - Use for warning states, pending approvals
- `info` - Use for informational states

**Note:** There is NO `statusColors.error`. Use `brandColors.destructive` for error/red colors.

#### Pastel Colors (`pastelColors`)
- `beige`, `mint`, `blue`, `pink`, `purple`

#### Chip Colors (`chipColors`)
- `default` - Purple background, white text (primary chip)
- `secondary` - Cyan background, white text
- `outline` - Transparent background with border
- `destructive` - Red background, white text
- `success` - Light green background, green text
- `warning` - Light yellow background, orange text
- `info` - Light blue background, blue text

### Responsive Design

Use MUI breakpoints consistently:

```typescript
sx={{
  gridTemplateColumns: {
    xs: '1fr',              // 0px+
    sm: 'repeat(2, 1fr)',   // 600px+
    md: 'repeat(3, 1fr)',   // 900px+
    lg: 'repeat(4, 1fr)',   // 1200px+
  }
}}
```

**Important breakpoints:**
- `md` (900px) - Use for important responsive layouts
- Always use fractional units (`1fr`) instead of fixed pixels for grid columns

---

## 4. Internationalization (i18n)

### Translation Rules

**CRITICAL:** ALL user-facing text MUST be stored in translation files. NEVER hardcode text.

```typescript
import { useTranslation } from 'react-i18next';

const RoleManagement = () => {
  const { t } = useTranslation('roles');

  return (
    <>
      ✅ CORRECT:
      <Typography>{t('page.title')}</Typography>
      <Button>{t('actions.create_role')}</Button>
      <TextField label={t('fields.role_name')} />

      ❌ WRONG:
      <Typography>Role Management</Typography>
      <Button>Create Role</Button>
      <TextField label="Role Name" />
    </>
  );
};
```

### Translation File Structure

```
src/locales/
└── en/
    ├── common.json         # Common UI elements
    ├── auth.json           # Authentication pages
    ├── customer.json       # Customer portal
    ├── platform.json       # Platform portal
    ├── roles.json          # Role management
    ├── permissions.json    # Permission management
    ├── users.json          # User management
    ├── service.json        # Service requests
    └── equipment.json      # Equipment & stands
```

### Translation Key Naming

- Use dot notation: `page.section.key`
- Use snake_case for multi-word keys: `service_request.assign_technician`
- Group related translations under a common prefix

Example:
```json
{
  "roles": {
    "page_title": "Role Management",
    "create_role": "Create Role",
    "edit_role": "Edit Role",
    "delete_role": "Delete Role",
    "system_role": "System Role",
    "custom_role": "Custom Role",
    "permissions": {
      "title": "Permissions",
      "select_all": "Select All",
      "clear_all": "Clear All"
    }
  }
}
```

---

## 5. Form Validation

### Validation Stack

**ALL forms MUST use:**
1. **Zod** for schema validation
2. **React Hook Form** for form state management
3. **Controller** component for MUI integration

### Standard Form Pattern

```typescript
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 1. Define Zod schema
const roleFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Role name is required')
    .min(2, 'Role name must be at least 2 characters'),
  description: z.string().optional(),
  organizationType: z.enum(['platform', 'customer'], {
    errorMap: () => ({ message: 'Please select organization type' }),
  }),
  permissions: z.array(z.string()).min(1, 'At least one permission is required'),
});

// 2. Infer TypeScript type
type RoleFormData = z.infer<typeof roleFormSchema>;

// 3. Initialize React Hook Form
const {
  control,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<RoleFormData>({
  resolver: zodResolver(roleFormSchema),
  defaultValues: {
    name: '',
    description: '',
    organizationType: 'platform',
    permissions: [],
  },
});

// 4. Handle submission
const onSubmit = async (data: RoleFormData) => {
  // data is fully typed and validated
};

// 5. Render with Controller
<Controller
  name="name"
  control={control}
  render={({ field }) => (
    <>
      <TextField
        {...field}
        fullWidth
        label={t('roles.fields.name')}
        error={!!errors.name}
      />
      {errors.name && (
        <Typography
          variant="caption"
          sx={{ color: brandColors.destructive, display: 'block', mt: 0.5 }}
        >
          {errors.name.message}
        </Typography>
      )}
    </>
  )}
/>
```

### Error Display Pattern

**CRITICAL:** All validation errors MUST follow this exact pattern:

```typescript
{errors.fieldName && (
  <Typography
    variant="caption"
    sx={{
      color: brandColors.destructive,
      display: 'block',
      mt: 0.5,
    }}
  >
    {errors.fieldName.message}
  </Typography>
)}
```

### Common Validation Rules

```typescript
// Email
email: z.string().min(1, 'Email is required').email('Please enter a valid email address')

// Password
password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters')

// Required text
name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters')

// Optional field
description: z.string().optional()

// Enum/Select
organizationType: z.enum(['platform', 'customer'], {
  errorMap: () => ({ message: 'Please select organization type' }),
})

// Array
permissions: z.array(z.string()).min(1, 'At least one permission is required')

// Number
quantity: z.number({ invalid_type_error: 'Please enter a valid number' })
  .positive('Must be positive')
  .int('Must be an integer')
```

---

## 6. State Management

### Redux Toolkit & RTK Query

- Use RTK Query for all API calls
- Define API slices in `src/store/api/`
- Use typed hooks from `src/store/hooks.ts`

```typescript
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
} from '@/store/api/roleApi';

const { data: roles, isLoading, error } = useGetRolesQuery({
  organizationType: 'platform',
});
const [createRole, { isLoading: isCreating }] = useCreateRoleMutation();
const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();
```

---

## 7. TypeScript Conventions

### Type vs Interface

**CRITICAL:** Always use `type` instead of `interface` for all type definitions.

```typescript
✅ CORRECT:
export type Role = {
  id: string;
  name: string;
  permissions: Permission[];
};

export type ExtendedRole = Role & {
  isActive: boolean;
};

❌ WRONG:
export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface ExtendedRole extends Role {
  isActive: boolean;
}
```

### Type Naming

- Use PascalCase for type names
- Suffix props types with `Props`: `RoleCardProps`, `PermissionMatrixProps`
- Suffix data types descriptively: `Role`, `Permission`, `ServiceRequest`, `Equipment`

---

## 8. React Compiler Compatibility

### Avoiding Compilation Warnings

**CRITICAL:** Always use React Compiler-compatible patterns.

#### useWatch Instead of watch

```typescript
✅ CORRECT:
import { useForm, Controller, useWatch } from 'react-hook-form';

const { control, handleSubmit } = useForm<RoleFormData>({
  defaultValues: { organizationType: 'platform' }
});

const selectedType = useWatch({
  control,
  name: 'organizationType',
});

❌ WRONG:
const { control, handleSubmit, watch } = useForm<RoleFormData>({
  defaultValues: { organizationType: 'platform' }
});

const selectedType = watch('organizationType'); // ❌ Cannot be memoized safely
```

#### Impure Functions (Date.now, Math.random)

```typescript
✅ CORRECT:
const onSubmit = async (data: RoleFormData) => {
  const getTimestamp = () => Date.now();
  const timestamp = getTimestamp();
};

❌ WRONG:
const onSubmit = async (data: RoleFormData) => {
  const timestamp = Date.now(); // ❌ Impure function call
};
```

#### Timer References

```typescript
✅ CORRECT:
const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

❌ WRONG:
const timerRef = useRef<NodeJS.Timeout | null>(null); // ❌ NodeJS namespace not available
```

---

## 9. Build & Testing

### Pre-Commit Checklist

**CRITICAL:** Before committing ANY changes, ALWAYS:

1. **Run the build** to catch TypeScript errors:
   ```bash
   npm run build
   ```

2. **Verify Storybook** stories exist for all components:
   ```bash
   npm run storybook
   ```

3. **Run linting**:
   ```bash
   npm run lint:fix
   ```

### Storybook Requirements

**Every component MUST have a Storybook story.**

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import RoleCard from './index';

const meta = {
  title: 'Components/Roles/RoleCard',
  component: RoleCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RoleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    role: {
      id: '1',
      name: 'Service Technician',
      description: 'Can manage service requests',
      organizationType: 'platform',
      permissions: [],
      isSystem: false,
    },
  },
};
```

### Build Error Resolution

Common build errors and fixes:

1. **Cannot find module errors**: Use absolute imports with `@/` alias
2. **statusColors.error**: Use `brandColors.destructive` instead
3. **NodeJS.Timeout**: Use `ReturnType<typeof setInterval>` instead
4. **Hardcoded text**: Add translations to locale files

---

## 10. Import Conventions

### Import Order

1. External libraries (React, MUI, etc.)
2. Internal absolute imports (with `@/` alias)
3. Relative imports

```typescript
// 1. External libraries
import { useState } from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Shield, Lock, User } from 'lucide-react';

// 2. Internal absolute imports
import { brandColors, statusColors } from '@/theme';
import { useGetRolesQuery } from '@/store/api/roleApi';
import { useHasPermission } from '@/hooks/useHasPermission';
import PageHeader from '@/components/common/PageHeader';
import type { Role, Permission } from '@/types/role.types';

// 3. Relative imports (avoid when possible)
import { formatPermissions } from './utils';
```

### Absolute Import Aliases

**ALWAYS use `@/` alias for internal imports:**

```typescript
✅ CORRECT:
import { brandColors } from '@/theme';
import PageHeader from '@/components/common/PageHeader';
import { useHasPermission } from '@/hooks/useHasPermission';
import type { Role } from '@/types/role.types';

❌ WRONG:
import { brandColors } from '../../../theme';
import PageHeader from '../../components/common/PageHeader';
import { useHasPermission } from '../hooks/useHasPermission';
```

---

## 11. Role & Permission Patterns

### Permission Checking Hook

**CRITICAL:** Always use the `useHasPermission` hook for permission checks.

```typescript
import { useHasPermission } from '@/hooks/useHasPermission';

✅ CORRECT:
const RoleManagement = () => {
  const canCreateRole = useHasPermission('role', 'create');
  const canDeleteRole = useHasPermission('role', 'delete');

  return (
    <>
      {canCreateRole && (
        <Button onClick={handleCreate}>{t('roles.create')}</Button>
      )}
      {canDeleteRole && (
        <IconButton onClick={handleDelete}>
          <Trash2 size={18} />
        </IconButton>
      )}
    </>
  );
};

❌ WRONG:
// Don't manually check permissions
const RoleManagement = () => {
  const user = useAppSelector((state) => state.auth.user);
  const canCreate = user.role?.permissions.some(
    (p) => p.resource === 'role' && p.action === 'create'
  );

  // This is wrong - use the hook instead
};
```

### Permission Guard Usage

```typescript
import PermissionGuard from '@/guards/PermissionGuard';

✅ CORRECT:
// Single permission
<PermissionGuard resource="service_request" action="create">
  <CreateServiceButton />
</PermissionGuard>

// Multiple permissions (any)
<PermissionGuard
  resource="role"
  action={['create', 'update']}
  requireAll={false}
>
  <RoleForm />
</PermissionGuard>

// Multiple permissions (all required)
<PermissionGuard
  resource="service_request"
  action={['read', 'approve']}
  requireAll={true}
>
  <ApprovalPanel />
</PermissionGuard>

// Admins bypass check
<PermissionGuard resource="user" action="delete">
  {/* Platform/Customer admins can always see this */}
  <DeleteUserButton />
</PermissionGuard>
```

### Admin Check Pattern

```typescript
import { useAppSelector } from '@/store/hooks';

✅ CORRECT:
const MyComponent = () => {
  const user = useAppSelector((state) => state.auth.user);
  const isAdmin =
    user.baseUserType === 'platform_owner_admin' ||
    user.baseUserType === 'customer_admin';

  return (
    <>
      {isAdmin && <AdminPanel />}
    </>
  );
};
```

### Role Management Component Example

```typescript
import { useTranslation } from 'react-i18next';
import { useGetRolesQuery, useDeleteRoleMutation } from '@/store/api/roleApi';
import { useHasPermission } from '@/hooks/useHasPermission';
import PermissionGuard from '@/guards/PermissionGuard';
import { Shield, Trash2, Edit } from 'lucide-react';

const RoleManagement = () => {
  const { t } = useTranslation('roles');
  const { data: roles, isLoading } = useGetRolesQuery({
    organizationType: 'platform',
  });
  const [deleteRole] = useDeleteRoleMutation();
  const canCreateRole = useHasPermission('role', 'create');
  const canDeleteRole = useHasPermission('role', 'delete');

  return (
    <Box>
      <PageHeader
        title={t('page.title')}
        subtitle={t('page.subtitle')}
        action={
          canCreateRole
            ? {
                label: t('actions.create_role'),
                onClick: handleCreate,
                icon: Shield,
                variant: 'contained',
              }
            : undefined
        }
      />

      {/* Role list */}
      {roles?.map((role) => (
        <Card key={role.id}>
          <Typography variant="h6">{role.name}</Typography>
          <Typography variant="body2">{role.description}</Typography>

          {/* System role indicator */}
          {role.isSystem && (
            <Chip label={t('labels.system_role')} color="info" size="small" />
          )}

          {/* Action buttons with permission guards */}
          <PermissionGuard resource="role" action="update">
            <IconButton onClick={() => handleEdit(role)}>
              <Edit size={18} />
            </IconButton>
          </PermissionGuard>

          {/* Can only delete non-system roles */}
          {!role.isSystem && canDeleteRole && (
            <IconButton onClick={() => handleDelete(role.id)}>
              <Trash2 size={18} />
            </IconButton>
          )}
        </Card>
      ))}
    </Box>
  );
};
```

---

## Quick Reference Checklist

Before submitting ANY code change, verify:

- [ ] Component in its own folder with `index.tsx`
- [ ] All text uses translation keys (`t('key')`)
- [ ] All colors from theme (no hardcoded hex values)
- [ ] Forms use Zod + React Hook Form + Controller
- [ ] TextField select pattern (not standalone Select)
- [ ] Modals use Modal component (not Dialog directly)
- [ ] Permission checks use `useHasPermission` hook
- [ ] Permission guards use `<PermissionGuard>` component
- [ ] Storybook story exists for component
- [ ] Types use `type` not `interface`
- [ ] Absolute imports with `@/` alias
- [ ] React Compiler compatible (useWatch, not watch)
- [ ] Build runs successfully (`npm run build`)
- [ ] No TypeScript errors
- [ ] Error display follows standard pattern

---

## Common Mistakes to Avoid

### ❌ NEVER DO THIS:

1. Hardcode colors: `color: '#1a1a1a'`
2. Hardcode text: `<Button>Create Role</Button>`
3. Use `interface` instead of `type`
4. Use relative imports: `import from '../../../'`
5. Use standalone Select component
6. Use Dialog directly for modals
7. Skip form validation
8. Forget Storybook stories
9. Use `watch()` from useForm
10. Use `NodeJS.Timeout` for timers
11. Commit without running build
12. Manually check permissions instead of using hooks
13. Hardcode role names in components

### ✅ ALWAYS DO THIS:

1. Use theme colors: `color: brandColors.textPrimary`
2. Use translations: `<Button>{t('roles.create')}</Button>`
3. Use `type` for all type definitions
4. Use absolute imports: `import from '@/'`
5. Use TextField with select prop
6. Use Modal component from `@/components/common/Modal` for all modals
7. Use Zod + React Hook Form for all forms
8. Create Storybook stories for all components
9. Use `useWatch()` for watching form values
10. Use `ReturnType<typeof setInterval>` for timers
11. Run build before committing
12. Use `useHasPermission` hook for permission checks
13. Use `<PermissionGuard>` for conditional rendering based on permissions

---

## Domain-Specific Naming Conventions

### Service-Related Components
```typescript
✅ CORRECT:
ServiceRequestCard
ServiceRequestTable
CreateServiceModal
AssignTechnicianModal
UpdateServiceStatusModal

❌ WRONG:
RequestCard
ServiceCard (ambiguous)
NewService (unclear)
```

### Role & Permission Components
```typescript
✅ CORRECT:
RoleManagementPage
PermissionMatrix
CreateRoleModal
EditRoleModal
RoleCard
PermissionCheckbox

❌ WRONG:
RoleManager (unclear)
Permissions (too generic)
NewRole (unclear)
```

### Equipment Components
```typescript
✅ CORRECT:
EquipmentCard
StandAllocationModal
EquipmentInventoryTable
EquipmentDetailsPage

❌ WRONG:
ItemCard
EquipmentList (use Table for data tables)
```

---

## Questions or Clarifications?

If you encounter a scenario not covered in this document, follow these principles:

1. **Consistency**: Look at existing components for patterns
2. **Type Safety**: Use TypeScript strictly
3. **Accessibility**: Use semantic HTML and ARIA labels
4. **Performance**: Minimize re-renders, use React.memo when needed
5. **Security**: Always check permissions before showing sensitive UI
6. **Maintainability**: Write clear, documented code

When in doubt, ask for clarification before implementing a new pattern.

---

**Last Updated**: December 2024
**Version**: 1.0.0
