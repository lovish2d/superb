import { Box, Typography, Card } from '@mui/material';
import { Hash, Calendar, Wifi, Clock, Palette, Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { brandColors } from '@/theme';
import type { StandDetail } from '@/types/stand.types';

type StandDetailsCardProps = {
  stand: StandDetail;
};

const StandDetailsCard = ({ stand }: StandDetailsCardProps) => {
  const { t } = useTranslation('stands');

  const DetailItem = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: React.ElementType;
    label: string;
    value: string;
  }) => (
    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: '10px',
          bgcolor: brandColors.neutral[50],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={20} color={brandColors.neutral[500]} />
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
        {t('detail.stand_details.title')}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.75 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.75 }}>
          <DetailItem
            icon={Hash}
            label={t('detail.stand_details.superb_stand_id')}
            value={stand.standId}
          />
          <DetailItem
            icon={Calendar}
            label={t('detail.stand_details.manufacture_date')}
            value={stand.details.manufactureDate}
          />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.75 }}>
          <DetailItem
            icon={Wifi}
            label={t('detail.stand_details.tracking_equipment_id')}
            value={stand.trackingId}
          />
          <DetailItem
            icon={Clock}
            label={t('detail.stand_details.stand_age')}
            value={stand.details.standAge}
          />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.75 }}>
          <DetailItem
            icon={Palette}
            label={t('detail.stand_details.color')}
            value={stand.details.color}
          />
          <DetailItem
            icon={Layers}
            label={t('detail.stand_details.stackable_for_storage')}
            value={stand.details.stackable ? t('detail.stand_details.yes') : t('detail.stand_details.no')}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default StandDetailsCard;

