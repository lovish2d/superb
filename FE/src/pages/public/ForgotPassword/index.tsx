import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Button, Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ArrowLeft } from 'lucide-react';
import { brandColors } from '@/theme';

import ContainerBg from '@/assets/images/Container.png';
import LogoIcon from '@/assets/images/Icon.svg';

const ForgotPassword = () => {
  const { t } = useTranslation('auth');

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
      {/* Glassmorphic Card */}
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
              {t('forgot_password.title')}
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="body2"
              sx={{
                color: brandColors.neutral[200],
              }}
            >
              {t('forgot_password.subtitle')}
            </Typography>
          </Box>

          {/* Coming Soon Message */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              py: 4,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: brandColors.white,
                textAlign: 'center',
              }}
            >
              {t('forgot_password.coming_soon_title')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: brandColors.neutral[200],
                textAlign: 'center',
                maxWidth: 400,
              }}
            >
              {t('forgot_password.coming_soon_description')}
            </Typography>
          </Box>

          {/* Back to Login Button */}
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            fullWidth
            startIcon={<ArrowLeft size={20} />}
            sx={{
              height: '48px',
              borderRadius: '14px',
              borderColor: alpha(brandColors.white, 0.3),
              color: brandColors.white,
              textTransform: 'none',
              '&:hover': {
                borderColor: alpha(brandColors.white, 0.5),
                backgroundColor: alpha(brandColors.white, 0.1),
              },
            }}
          >
            {t('forgot_password.back_to_login')}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ForgotPassword;

