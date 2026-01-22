import { useTranslation } from 'react-i18next';
import { Box, Typography, Grid } from '@mui/material';
import { brandColors } from '@/theme';
import boxIcon from '@/assets/images/dashboard/box-icon.svg';
import fileIcon from '@/assets/images/dashboard/file-icon.svg';
import wrenchIcon from '@/assets/images/dashboard/wrench-icon.svg';
import alertIcon from '@/assets/images/dashboard/alert-icon.svg';
import trendingUpIcon from '@/assets/images/dashboard/trending-up.svg';
import trendingDownIcon from '@/assets/images/dashboard/trending-down.svg';

type StatCardProps = {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  iconSrc: string;
  iconBg: string;
};

const StatCard = ({ title, value, trend, trendUp, iconSrc, iconBg }: StatCardProps) => {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: brandColors.neutral[200],
        borderRadius: '10px',
        padding: 3, // 24px
        height: 135,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2, // 16px
        backgroundColor: brandColors.white,
        boxSizing: 'border-box',
      }}
    >
      {/* Header: Title and Icon */}
      < Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          height: 32,
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: brandColors.neutral[700],
            height: 16,
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '10px',
            backgroundColor: iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component="img"
            src={iconSrc}
            alt=""
            sx={{
              width: 16,
              height: 16,
            }}
          />
        </Box>
      </Box >

      {/* Footer: Value and Trend */}
      < Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          height: 36,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: brandColors.neutral[900],
            height: 36,
            position: 'relative',
            top: '-1px', // adjusted
          }}
        >
          {value}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5, // ~4px
            height: 16,
          }}
        >
          <Box
            component="img"
            src={trendUp ? trendingUpIcon : trendingDownIcon}
            alt=""
            sx={{
              width: 12,
              height: 12,
              transform: trendUp ? 'none' : 'scaleY(-1)',
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: trendUp ? brandColors.success.main : brandColors.critical.main,
            }}
          >
            {trend}
          </Typography>
        </Box>
      </Box >
    </Box >
  );
};

const StatsSection = () => {
  const { t } = useTranslation('dashboard');

  const stats = [
    {
      title: t('stats.total_active_stands'),
      value: '156',
      trend: '+12%',
      trendUp: true,
      iconSrc: boxIcon,
      iconBg: brandColors.primary.light,
    },
    {
      title: t('stats.active_leases'),
      value: '3',
      trend: '+8%',
      trendUp: true,
      iconSrc: fileIcon,
      iconBg: brandColors.success.light,
    },
    {
      title: t('stats.maintenance_due'),
      value: '5',
      trend: '-8%',
      trendUp: false,
      iconSrc: wrenchIcon,
      iconBg: brandColors.warning.light,
    },
    {
      title: t('stats.alerts'),
      value: '1',
      trend: '-8%',
      trendUp: false,
      iconSrc: alertIcon,
      iconBg: brandColors.critical.light,
    },
  ];

  return (
    <Grid container spacing={{ xs: 1.5, sm: 2, md: 2 }} sx={{ width: '100%', margin: 0 }}>
      {stats.map((stat, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }} sx={{ width: '100%', boxSizing: 'border-box' }}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsSection;
