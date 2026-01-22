# Login System Documentation

This document provides a comprehensive guide to the authentication and login system implementation in the Superb Aviation Frontend application.

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [File Structure](#file-structure)
4. [Implementation Steps](#implementation-steps)
5. [API Integration](#api-integration)
6. [Route Protection](#route-protection)
7. [Logout Functionality](#logout-functionality)
8. [User Flow](#user-flow)
9. [Troubleshooting](#troubleshooting)

---

## Overview

The login system implements a secure authentication flow using:
- **React Context API** for state management
- **RTK Query** for API calls
- **React Router** for route protection
- **SessionStorage** for token persistence
- **Role-based routing** after login

### Key Features

- ✅ Secure login with email and password
- ✅ Token-based authentication (accessToken + refreshToken)
- ✅ Role-based redirect after login
- ✅ Protected routes with AuthGuard
- ✅ Guest route protection (redirects authenticated users)
- ✅ Logout functionality from sidebar and header
- ✅ Persistent session across page refreshes

---

## Architecture

### Authentication Flow

```
User enters credentials
    ↓
Login API call (RTK Query)
    ↓
Store tokens in sessionStorage
    ↓
Update AuthContext
    ↓
Role-based redirect
    ↓
Protected routes accessible
```

### Component Hierarchy

```
App.tsx
  └── AuthProvider (Context)
      └── BrowserRouter
          └── Routes
              ├── GuestGuard (Login, ForgotPassword)
              └── AuthGuard (Protected routes)
                  └── PlatformLayout
                      ├── Sidebar (with logout)
                      └── Header (with logout menu)
```

---

## File Structure

```
src/
├── context/
│   └── AuthContext.tsx          # Auth state management (Context API)
├── hooks/
│   └── useAuth.ts               # Hook to access AuthContext
├── types/
│   └── auth.types.ts            # TypeScript types for auth
├── store/
│   └── api/
│       ├── baseApi.ts           # RTK Query base configuration
│       └── authApi.ts           # Login mutation
├── guards/
│   ├── AuthGuard/
│   │   └── index.tsx            # Protects authenticated routes
│   └── GuestGuard/
│       └── index.tsx            # Protects public routes
├── pages/
│   └── public/
│       └── Login/
│           └── index.tsx         # Login page component
└── components/
    ├── layouts/
    │   └── PlatformLayout/
    │       └── index.tsx         # Main layout with logout handlers
    ├── common/
    │   ├── Header/
    │   │   └── index.tsx         # Header with user menu
    │   └── Sidebar/
    │       └── components/
    │           └── SidebarFooter.tsx  # Sidebar with logout button
```

---

## Implementation Steps

### Step 1: Create Auth Types

**File:** `src/types/auth.types.ts`

Defines all TypeScript types for authentication:

```typescript
- BaseUserType: User type enum
- Role: Role structure from API
- User: User object structure
- LoginRequest: Login API request payload
- LoginResponse: Login API response structure
- AuthState: Auth context state
- AuthContextType: Auth context interface
```

**Key Points:**
- Types match the API response structure exactly
- Includes all user properties (firstName, lastName, roles, etc.)
- Supports role-based routing

---

### Step 2: Create Auth Context

**File:** `src/context/AuthContext.tsx`

**Purpose:** Manages authentication state using React Context API

**Key Features:**
- Initializes auth state from sessionStorage on mount
- Provides `user`, `isAuthenticated`, `isLoading` state
- Provides `login`, `logout`, `setUser` methods
- Stores tokens in sessionStorage (not localStorage)

**Storage Keys:**
- `accessToken` - JWT access token
- `refreshToken` - JWT refresh token
- `user` - User object (JSON stringified)

**Implementation Details:**
```typescript
- useEffect hook initializes state from sessionStorage
- logout() clears all sessionStorage items
- setUser() updates user state (called after login)
```

---

### Step 3: Create useAuth Hook

**File:** `src/hooks/useAuth.ts`

**Purpose:** Provides easy access to AuthContext

**Usage:**
```typescript
const { user, isAuthenticated, logout } = useAuth();
```

**Error Handling:**
- Throws error if used outside AuthProvider
- Ensures proper context usage

---

### Step 4: Create Auth API Slice

**File:** `src/store/api/authApi.ts`

**Purpose:** RTK Query mutation for login

**Endpoint:** `POST /api/v1/auth/login`

**Request:**
```typescript
{
  email: string;
  password: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  }
}
```

**Features:**
- Uses `baseApi.injectEndpoints`
- Invalidates 'Auth' tag on success
- Exports `useLoginMutation` hook

---

### Step 5: Update Base API Configuration

**File:** `src/store/api/baseApi.ts`

**Changes:**
- Updated `prepareHeaders` to use `sessionStorage.getItem('accessToken')`
- Changed from `localStorage` to `sessionStorage`
- Token automatically added to all API requests

**Header Format:**
```
Authorization: Bearer <accessToken>
```

---

### Step 6: Create Route Guards

#### AuthGuard
**File:** `src/guards/AuthGuard/index.tsx`

**Purpose:** Protects routes that require authentication

**Behavior:**
- Checks `isAuthenticated` from useAuth hook
- Shows loading state while checking
- Redirects to `/login` if not authenticated
- Preserves attempted location in state

**Usage:**
```typescript
<AuthGuard>
  <ProtectedComponent />
</AuthGuard>
```

#### GuestGuard
**File:** `src/guards/GuestGuard/index.tsx`

**Purpose:** Protects public routes (login, forgot-password)

**Behavior:**
- Shows loading state while checking
- Redirects authenticated users to their dashboard
- Role-based redirect logic:
  - Platform users → `/dashboard`
  - Customer users → `/customer/dashboard`

**Usage:**
```typescript
<GuestGuard>
  <Login />
</GuestGuard>
```

---

### Step 7: Implement Login Page

**File:** `src/pages/public/Login/index.tsx`

**Key Features:**

1. **Form Validation:**
   - Uses React Hook Form + Zod
   - Validates email format
   - Requires password

2. **Login Mutation:**
   - Uses `useLoginMutation` from authApi
   - Handles loading state
   - Displays error messages

3. **Success Handling:**
   ```typescript
   - Store accessToken in sessionStorage
   - Store refreshToken in sessionStorage
   - Store user object in sessionStorage
   - Update AuthContext via setUser()
   - Navigate to role-based dashboard
   ```

4. **Error Handling:**
   - Displays API error messages
   - Handles 401 (unauthorized) errors
   - Shows generic error for other failures

5. **Role-Based Redirect:**
   ```typescript
   Platform users → /dashboard
   Customer users → /customer/dashboard
   ```

---

### Step 8: Update App.tsx

**File:** `src/App.tsx`

**Changes:**

1. **Wrap with AuthProvider:**
   ```typescript
   <Provider store={store}>
     <AuthProvider>
       {/* Routes */}
     </AuthProvider>
   </Provider>
   ```

2. **Protect Routes:**
   - Login/ForgotPassword wrapped with `GuestGuard`
   - All protected routes wrapped with `AuthGuard`

3. **Route Structure:**
   ```typescript
   /login → GuestGuard → Login
   /forgot-password → GuestGuard → ForgotPassword
   /dashboard → AuthGuard → PlatformLayout → Dashboard
   /stands → AuthGuard → PlatformLayout → Stands
   ```

---

### Step 9: Implement Logout Functionality

#### PlatformLayout
**File:** `src/components/layouts/PlatformLayout/index.tsx`

**Changes:**

1. **Import useAuth:**
   ```typescript
   const { user, logout } = useAuth();
   ```

2. **Handle Logout:**
   ```typescript
   const handleLogout = () => {
     logout();  // Clears sessionStorage and updates context
     navigate('/login', { replace: true });
   };
   ```

3. **User Menu Actions:**
   ```typescript
   const handleUserMenuAction = (action: string) => {
     if (action === 'logout') handleLogout();
     else if (action === 'profile') navigate('/profile');
     else if (action === 'settings') navigate('/settings');
   };
   ```

4. **Pass to Components:**
   - Pass `user` info to Header
   - Pass `handleLogout` to Sidebar
   - Pass `handleUserMenuAction` to Header

#### Header Component
**File:** `src/components/common/Header/index.tsx`

**Features:**
- Displays user name and role from auth context
- User menu with Profile, Settings, Logout options
- Logout calls `onUserMenuClick('logout')`

#### Sidebar Component
**File:** `src/components/common/Sidebar/components/SidebarFooter.tsx`

**Features:**
- Logout button in footer
- Calls `onLogout` prop when clicked
- Styled with primary color

---

## API Integration

### Login Endpoint

**URL:** `POST /api/v1/auth/login`

**Request Body:**
```json
{
  "email": "admin@platform.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "695f438ed244080395a96c75",
      "email": "admin@platform.com",
      "firstName": "Platform",
      "lastName": "Admin",
      "userType": "platform_owner",
      "organizationId": null,
      "roles": [
        {
          "_id": "695f438ed244080395a96c6c",
          "name": "super_admin",
          "scope": "platform",
          "permissions": ["*"]
        }
      ],
      "isActive": true,
      "preferences": {
        "language": "en",
        "notifications": {
          "email": true,
          "push": false
        },
        "timezone": "UTC"
      }
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (401):**
```json
{
  "message": "Invalid email or password"
}
```

---

## Route Protection

### How It Works

1. **User navigates to protected route** (e.g., `/dashboard`)
2. **AuthGuard checks authentication:**
   - Reads from AuthContext (which reads from sessionStorage)
   - If not authenticated → redirect to `/login`
   - If authenticated → render route

3. **User navigates to login page:**
   - GuestGuard checks authentication
   - If authenticated → redirect to dashboard
   - If not authenticated → show login page

### Protected Routes

All routes under `PlatformLayout` are protected:
- `/dashboard`
- `/stands`
- `/users`
- `/inspections`
- `/deployment`
- `/logistics`
- `/maintenance`
- `/reference-data`
- `/reports`
- `/audit-log`
- `/settings`

### Public Routes

- `/login` (protected by GuestGuard)
- `/forgot-password` (protected by GuestGuard)

---

## Logout Functionality

### Implementation

**Two logout entry points:**

1. **Sidebar Footer:**
   - Logout button at bottom of sidebar
   - Calls `onLogout` prop
   - Handled by `handleLogout` in PlatformLayout

2. **Header User Menu:**
   - Click user avatar → menu opens
   - Click "Logout" option
   - Calls `onUserMenuClick('logout')`
   - Handled by `handleUserMenuAction` in PlatformLayout

### Logout Process

```typescript
1. User clicks logout
   ↓
2. handleLogout() called
   ↓
3. logout() from AuthContext:
   - sessionStorage.removeItem('accessToken')
   - sessionStorage.removeItem('refreshToken')
   - sessionStorage.removeItem('user')
   - setUser(null) in context
   ↓
4. navigate('/login', { replace: true })
   ↓
5. GuestGuard allows access (user not authenticated)
   ↓
6. Login page displayed
```

---

## User Flow

### Login Flow

```
1. User visits /login
   ↓
2. GuestGuard checks: Not authenticated → Show login form
   ↓
3. User enters email and password
   ↓
4. Click "Sign In" button
   ↓
5. RTK Query mutation calls /api/v1/auth/login
   ↓
6. On success:
   - Store tokens in sessionStorage
   - Store user in sessionStorage
   - Update AuthContext
   ↓
7. Role-based redirect:
   - Platform user → /dashboard
   - Customer user → /customer/dashboard
   ↓
8. AuthGuard checks: Authenticated → Show dashboard
```

### Logout Flow

```
1. User clicks logout (sidebar or header)
   ↓
2. handleLogout() called
   ↓
3. logout() clears sessionStorage
   ↓
4. Navigate to /login
   ↓
5. GuestGuard allows access
   ↓
6. Login page displayed
```

### Protected Route Access

```
1. User tries to access /dashboard (not logged in)
   ↓
2. AuthGuard checks: Not authenticated
   ↓
3. Redirect to /login
   ↓
4. User logs in
   ↓
5. Redirect back to /dashboard
   ↓
6. AuthGuard checks: Authenticated → Show dashboard
```

---

## Troubleshooting

### Issue: User can access protected routes without login

**Solution:**
- Verify AuthGuard wraps protected routes
- Check that AuthContext is properly initialized
- Ensure sessionStorage is being read correctly

### Issue: Login redirects back to login page

**Solution:**
- Check if tokens are being stored in sessionStorage
- Verify setUser() is being called after login
- Check browser console for errors

### Issue: Logout doesn't work

**Solution:**
- Verify logout() function clears sessionStorage
- Check that navigate() is being called
- Ensure GuestGuard allows access after logout

### Issue: User info not displaying in Header

**Solution:**
- Verify user object is stored in sessionStorage
- Check AuthContext initialization
- Ensure PlatformLayout passes user to Header

### Issue: API calls fail with 401

**Solution:**
- Check if accessToken is in sessionStorage
- Verify baseApi prepareHeaders is reading token
- Check token format (should be "Bearer <token>")

---

## Key Implementation Details

### SessionStorage vs LocalStorage

**Why SessionStorage?**
- Tokens cleared when browser tab closes
- More secure for sensitive data
- Matches reference project pattern

### Context API vs Redux

**Why Context API?**
- Simpler for auth state
- No need for Redux slice
- Matches reference project architecture
- RTK Query still used for API calls

### Token Management

**Storage:**
- `accessToken` - Used for API authentication
- `refreshToken` - For token refresh (future implementation)
- `user` - User object (JSON stringified)

**Automatic Token Injection:**
- baseApi prepareHeaders adds token to all requests
- Format: `Authorization: Bearer <accessToken>`

### Role-Based Routing

**User Types:**
- `platform_owner` → `/dashboard`
- `platform_owner_admin` → `/dashboard`
- `platform_user` → `/dashboard`
- `customer_admin` → `/customer/dashboard`
- `customer_user` → `/customer/dashboard`

---

## Testing Checklist

- [ ] Login with valid credentials redirects correctly
- [ ] Login with invalid credentials shows error
- [ ] Protected routes redirect to login when not authenticated
- [ ] Authenticated users cannot access login page
- [ ] Logout from sidebar works
- [ ] Logout from header menu works
- [ ] User info displays in header
- [ ] Session persists on page refresh
- [ ] API calls include authentication token
- [ ] Role-based redirect works correctly

---

## Future Enhancements

1. **Token Refresh:**
   - Implement automatic token refresh
   - Use refreshToken before accessToken expires

2. **Remember Me:**
   - Store tokens in localStorage if "Remember Me" checked
   - Implement session timeout

3. **MFA Support:**
   - Add MFA verification step
   - Store temp_token for MFA flow

4. **Password Reset:**
   - Implement forgot password flow
   - Add password reset page

---

## Related Files

- `src/context/AuthContext.tsx` - Auth state management
- `src/hooks/useAuth.ts` - Auth hook
- `src/store/api/authApi.ts` - Login API mutation
- `src/guards/AuthGuard/index.tsx` - Route protection
- `src/guards/GuestGuard/index.tsx` - Guest route protection
- `src/pages/public/Login/index.tsx` - Login page
- `src/components/layouts/PlatformLayout/index.tsx` - Layout with logout

---

**Last Updated:** January 2025
**Version:** 1.0.0

