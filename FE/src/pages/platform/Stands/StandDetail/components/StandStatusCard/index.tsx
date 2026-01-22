import { Box, Typography, Card } from '@mui/material';
import { Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { brandColors } from '@/theme';
import type { StandDetail } from '@/types/stand.types';

type StandStatusCardProps = {
  stand: StandDetail;
};

const StandStatusCard = ({ stand }: StandStatusCardProps) => {
  const { t } = useTranslation('stands');

  const DetailItem = ({ label, value }: { label: string; value: string }) => (
    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
      <Box
        sx={{
          width: 20,
          height: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Calendar size={20} color={brandColors.neutral[500]} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="caption" sx={{ color: brandColors.neutral[500], display: 'block', mb: 0.25 }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ color: brandColors.neutral[900] }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Card
      sx={{
        border: `1.2px solid ${brandColors.neutral[200]}`,
        borderRadius: '14px',
        p: 2.5,
        bgcolor: brandColors.white,
      }}
    >
      <Typography variant="subsectionHeading" sx={{ mb: 2.75, color: brandColors.neutral[900] }}>
        {t('detail.stand_status.title')}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.75 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.75 }}>
          <DetailItem
            label={t('detail.stand_status.registration_date')}
            value={stand.statusInfo.registrationDate}
          />
          <DetailItem
            label={t('detail.stand_status.shock_mounts_manufacture_date')}
            value={stand.statusInfo.shockMountsManufactureDate}
          />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.75 }}>
          <DetailItem
            label={t('detail.stand_status.last_maintenance')}
            value={stand.statusInfo.lastMaintenance}
          />
          <DetailItem
            label={t('detail.stand_status.shock_mounts_expiry_date')}
            value={stand.statusInfo.shockMountsExpiryDate}
          />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.75 }}>
          <DetailItem
            label={t('detail.stand_status.next_maintenance')}
            value={stand.statusInfo.nextMaintenance}
          />
          <DetailItem
            label={t('detail.stand_status.next_shock_mount_replacement')}
            value={stand.statusInfo.nextShockMountReplacement}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default StandStatusCard;

