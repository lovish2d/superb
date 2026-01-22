import { Box, Typography, Card } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { brandColors } from '@/theme';
import type { ReactElement } from 'react';

type UserStatCardProps = {
  labelKey: string;
  value: number;
  icon: ReactElement;
  iconBgColor: string;
};

const UserStatCard = ({ labelKey, value, icon, iconBgColor }: UserStatCardProps) => {
  const { t } = useTranslation('users');

  return (
    <Card
      sx={{
        border: `1.275px solid ${brandColors.neutral[200]}`,
        borderRadius: '10px',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: 135,
        width: '100%',
        bgcolor: brandColors.white,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Typography
          variant="caption"
          sx={{
            color: brandColors.neutral[500],
            fontSize: '12px',
            textTransform: 'uppercase',
            fontWeight: 400,
          }}
        >
          {t(`stats.${labelKey}`)}
        </Typography>
        <Box
          sx={{
            bgcolor: iconBgColor,
            borderRadius: '10px',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
      </Box>
      <Typography
        variant="h2"
        sx={{
          color: brandColors.neutral[900],
          fontSize: '30px',
          fontWeight: 600,
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>
    </Card>
  );
};

export default UserStatCard;

