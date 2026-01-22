import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { brandColors } from '@/theme';
import { useLoginMutation } from '@/store/api/authApi';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/slices/authSlice';
import type { BaseUserType, ApiError } from '@/types/auth.types';

import ContainerBg from '@/assets/images/Container.png';
import LogoIcon from '@/assets/images/Icon.svg';

const inputBackgroundColor = alpha(brandColors.white, 0.1);
const inputBorderColor = alpha(brandColors.white, 0.2);
const inputHoverBorderColor = alpha(brandColors.white, 0.3);
const inputPlaceholderColor = alpha(brandColors.neutral[200], 0.5);
const inputTextColor = brandColors.neutral[200];
const inputIconColor = alpha(brandColors.neutral[200], 0.6);

const commonInputStyles = {
  '& .MuiOutlinedInput-root': {
    height: '48px',
    backgroundColor: inputBackgroundColor,
    borderRadius: '14px',
    border: '1.275px solid',
    borderColor: inputBorderColor,
    '& fieldset': {
      border: 'none',
    },
    '&:hover': {
      borderColor: inputHoverBorderColor,
      backgroundColor: inputBackgroundColor,
    },
    '&.Mui-focused': {
      borderColor: brandColors.primary.main,
      backgroundColor: inputBackgroundColor,
      boxShadow: `0 0 0 2px ${alpha(brandColors.primary.main, 0.2)}`,
    },
    '&.Mui-error': {
      backgroundColor: inputBackgroundColor,
    },
    '& input': {
      color: inputTextColor,
      paddingLeft: '48px',
      '&::placeholder': {
        color: inputPlaceholderColor,
        opacity: 1,
      },
      '&:-webkit-autofill': {
        backgroundColor: inputBackgroundColor,
        WebkitTextFillColor: inputTextColor,
        transition: 'background-color 5000s ease-in-out 0s',
        caretColor: inputTextColor,
      },
      '&:-webkit-autofill:hover': {
        backgroundColor: inputBackgroundColor,
        WebkitTextFillColor: inputTextColor,
      },
      '&:-webkit-autofill:focus': {
        backgroundColor: inputBackgroundColor,
        WebkitTextFillColor: inputTextColor,
      },
      '&:-webkit-autofill:active': {
        backgroundColor: inputBackgroundColor,
        WebkitTextFillColor: inputTextColor,
      },
    },
  },
};

// Zod schema for login form validation
const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('auth');
  const { t: tCommon } = useTranslation('common');
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [login, { isLoading }] = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const getRedirectPath = (userType: BaseUserType): string => {
    // Platform users
    if (
      userType === 'platform_owner' ||
      userType === 'platform_owner_admin' ||
      userType === 'platform_user'
    ) {
      return '/dashboard';
    }
    // Customer users
    if (userType === 'customer_admin' || userType === 'customer_user') {
      return '/customer/dashboard';
    }
    // Fallback to default dashboard
    return '/dashboard';
  };

  const onFormSubmit = async (data: LoginFormData) => {
    setError(null);

    try {
      const response = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (response.success && response.data) {
        // Store only tokens in sessionStorage
        sessionStorage.setItem('accessToken', response.data.accessToken);
        sessionStorage.setItem('refreshToken', response.data.refreshToken);

        // Do NOT store user data in sessionStorage
        // sessionStorage.setItem('user', JSON.stringify(response.data.user));

        // Update auth state in Redux
        dispatch(setCredentials({ user: response.data.user }));

        // Redirect to appropriate dashboard
        const redirectPath =
          (location.state as { from?: { pathname?: string } })?.from?.pathname ||
          getRedirectPath(response.data.user.userType);
        navigate(redirectPath, { replace: true });
      }
    } catch (err) {
      const apiError = err as { data?: ApiError; status?: number };
      if (apiError.data?.message) {
        setError(apiError.data.message);
      } else if (apiError.data?.detail) {
        setError(apiError.data.detail);
      } else if (apiError.status === 401) {
        setError(t('login.invalid_credentials'));
      } else {
        setError(t('login.error.generic'));
      }
      console.error('Login error:', err);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${ContainerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        bgcolor: brandColors.primary.main,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'linear-gradient(144.6deg, rgba(126, 42, 12, 0.3) 0%, rgba(15, 23, 43, 0.5) 50%, rgba(28, 57, 142, 0.3) 100%)',
          zIndex: 0,
        },
        p: { xs: 3, md: 4 },
      }}
    >
      {/* Glassmorphic Login Card */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: { xs: '100%', sm: 500 },
          backgroundColor: alpha(brandColors.neutral[900], 0.4),
          backdropFilter: 'blur(9px)',
          WebkitBackdropFilter: 'blur(9px)',
          border: '1.275px solid',
          borderColor: alpha(brandColors.white, 0.2),
          borderRadius: '32px',
          p: { xs: 4, sm: 6.25 },
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Stack spacing={4}>
          {/* Logo and Header Section */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2.19,
            }}
          >
            {/* Logo */}
            <Box
              sx={{
                height: 64.98,
                width: 206.34,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                component="img"
                src={LogoIcon}
                alt="Superb Logo"
                sx={{
                  height: 64.98,
                  width: 'auto',
                  maxWidth: '100%',
                }}
              />
            </Box>

            {/* Title */}
            <Typography
              variant="h1"
              sx={{
                lineHeight: 1,
                color: brandColors.white,
              }}
            >
              {t('login.title')}
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="body2"
              sx={{
                color: brandColors.neutral[200],
              }}
            >
              {t('login.subtitle')}
            </Typography>
          </Box>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit(onFormSubmit)}>
            <Stack spacing={3}>
              {/* Email Field */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: brandColors.neutral[200],
                    mb: 0.5,
                  }}
                >
                  {t('login.email_label')}
                </Typography>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <>
                      <TextField
                        {...field}
                        fullWidth
                        type="email"
                        placeholder="admin@superb.com"
                        error={!!errors.email}
                        sx={commonInputStyles}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              sx={{
                                position: 'absolute',
                                left: '16px',
                                color: inputIconColor,
                              }}
                            >
                              <Mail size={20} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errors.email && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: brandColors.critical.main,
                            display: 'block',
                            mt: 0.5,
                          }}
                        >
                          {errors.email.message}
                        </Typography>
                      )}
                    </>
                  )}
                />
              </Box>

              {/* Password Field */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: brandColors.neutral[200],
                    mb: 0.5,
                  }}
                >
                  {t('login.password_label')}
                </Typography>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <>
                      <TextField
                        {...field}
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        error={!!errors.password}
                        sx={{
                          ...commonInputStyles,
                          '& .MuiOutlinedInput-root': {
                            ...commonInputStyles['& .MuiOutlinedInput-root'],
                            '& input': {
                              ...commonInputStyles['& .MuiOutlinedInput-root']['& input'],
                              paddingRight: '48px',
                            },
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              sx={{
                                position: 'absolute',
                                left: '16px',
                                color: inputIconColor,
                              }}
                            >
                              <Lock size={20} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{
                                position: 'absolute',
                                right: '16px',
                              }}
                            >
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                size="small"
                                sx={{
                                  color: inputIconColor,
                                  '&:hover': {
                                    color: inputTextColor,
                                    backgroundColor: 'transparent',
                                  },
                                }}
                              >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errors.password && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: brandColors.critical.main,
                            display: 'block',
                            mt: 0.5,
                          }}
                        >
                          {errors.password.message}
                        </Typography>
                      )}
                    </>
                  )}
                />
              </Box>

              {/* Remember Me & Forgot Password */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value || false}
                          size="small"
                          sx={{
                            color: brandColors.neutral[500],
                            '&.Mui-checked': {
                              color: brandColors.primary.main,
                            },
                          }}
                        />
                      }
                      label={
                        <Typography
                          variant="body2"
                          sx={{
                            color: brandColors.neutral[200],
                            ml: 1,
                          }}
                        >
                          {t('login.remember_me')}
                        </Typography>
                      }
                    />
                  )}
                />
                <Link
                  href="/forgot-password"
                  variant="body2"
                  sx={{
                    color: brandColors.neutral[200],
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {t('login.forgot_password')}
                </Link>
              </Box>

              {/* Error Alert */}
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{
                  height: '48px',
                  borderRadius: '14px',
                  backgroundColor: brandColors.primary.main,
                  color: brandColors.white,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: brandColors.primary.hover,
                  },
                  '&:disabled': {
                    backgroundColor: alpha(brandColors.primary.main, 0.5),
                    color: alpha(brandColors.white, 0.5),
                  },
                }}
              >
                {isLoading ? tCommon('loading') : t('login.sign_in_button')}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
