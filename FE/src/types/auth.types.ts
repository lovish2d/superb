export type BaseUserType =
  | 'platform_owner'
  | 'platform_owner_admin'
  | 'platform_user'
  | 'customer_admin'
  | 'customer_user';

export type Role = {
  _id: string;
  name: string;
  scope: 'platform' | 'customer';
  organizationId: string | null;
  description: string;
  permissions: string[];
  isActive: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type UserPreferences = {
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
  };
  timezone: string;
};

export type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: BaseUserType;
  organizationId: string | null;
  roles: Role[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  metadata: Record<string, unknown>;
  preferences: UserPreferences;
  lastLogin: string | null;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export type AuthContextType = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
};

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  division: string;
  department: string;
  country: string;
  poolingCenter: string;
};

export type RegisterResponse = {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
};

export type ApiError = {
  message?: string;
  detail?: string;
};

