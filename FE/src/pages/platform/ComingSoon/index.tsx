import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { brandColors } from '@/theme';
import PageContainer from '@/components/common/PageContainer';
import LogoIcon from '@/assets/images/SidebarLogo.svg';

const ComingSoon = () => {
  const { t } = useTranslation('common');

  return (
    <PageContainer title={t('coming_soon.title')} subtitle={t('coming_soon.subtitle')}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          minHeight: '400px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component="img"
            src={LogoIcon}
            alt="Superb Logo"
            sx={{
              width: '120px',
              height: 'auto',
              flexShrink: 0,
            }}
          />
        </Box>
        <Typography variant="h2" sx={{ color: brandColors.neutral[900], textAlign: 'center' }}>
          {t('coming_soon.message')}
        </Typography>
        <Typography variant="body1" sx={{ color: brandColors.neutral[500], textAlign: 'center', maxWidth: 600 }}>
          {t('coming_soon.description')}
        </Typography>
      </Box>
    </PageContainer>
  );
};

export default ComingSoon;

