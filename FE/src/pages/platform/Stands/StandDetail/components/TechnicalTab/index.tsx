import { Box, Typography, Chip, LinearProgress } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Battery, Thermometer, Wrench, Clock, Wifi, Plane, Link as LinkIcon } from 'lucide-react';
import { brandColors } from '@/theme';
import type { StandDetail } from '@/types/stand.types';

type TechnicalTabProps = {
  stand: StandDetail;
};

const TechnicalTab = ({ stand }: TechnicalTabProps) => {
  const { t } = useTranslation('stands');

  const technicalData = stand.technical || {
    trackerId: 'TRK-DOH5Z2K8L',
    trackerStatus: 'active',
    trackerImageUrl: '',
    battery: 94,
    batteryStatus: 'excellent',
    temperature: 22,
    temperatureUnit: 'C',
    temperatureStatus: 'normal',
    shockMountLife: 45,
    shockMountStatus: 'pool_use_only',
    uptime: 45,
    uptimeUnit: 'days',
    signalStrength: 95,
  };

  const standConfig = stand.standConfiguration || {
    standOem: 'Frank Brown',
    engineType: 'GEnx',
    engineOem: 'GE Aviation',
    basePartNumber: 'FB-T1000',
    baseSerialNumber: '889',
    cradlePartNumber: 'FB-T1000',
    cradleSerialNumber: '890',
    compatibleAircrafts: [
      'B777 family – 777-200',
      'B777 family – 200LR',
      'B777 family – -200ER',
      'B777 family – 300',
      'B777 family – 300ER',
      'B777 family – 777F',
    ],
  };

  const physicalSpecs = stand.physicalSpecifications || {
    withEngine: {
      dimensions: { length: 3600, width: 2400, height: 1550, unit: 'mm' },
      weight: 2150,
      weightUnit: 'kg',
    },
    withoutEngine: {
      dimensions: { length: 4600, width: 2600, height: 1700, unit: 'mm' },
      weight: 5500,
      weightUnit: 'kg',
    },
    engineStatus: 'empty',
  };

  const getBatteryColor = (percentage: number) => {
    if (percentage >= 80) return brandColors.success.main;
    if (percentage >= 50) return brandColors.warning.main;
    return brandColors.critical.main;
  };

  const getShockMountColor = (percentage: number) => {
    if (percentage >= 50) return brandColors.warning.main;
    return brandColors.critical.main;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
      {/* Tracker Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {/* Tracker ID */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" sx={{ color: brandColors.neutral[500], fontSize: '14px', lineHeight: '20px' }}>
              {t('detail.technical.tracker_id')}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
              <Wifi size={24} color={brandColors.primary.main} />
              <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', gap: 1.25 }}>
                <Typography variant="body2" sx={{ color: brandColors.neutral[900], fontWeight: 500, fontSize: '14px' }}>
                  {technicalData.trackerId}
                </Typography>
                <Chip
                  label={t(`detail.technical.tracker_status.${technicalData.trackerStatus}`)}
                  size="small"
                  sx={{
                    bgcolor: brandColors.success.light,
                    color: brandColors.success.dark,
                    border: `1.275px solid ${brandColors.success.main}33`,
                    height: 24,
                    px: 1.16,
                    py: 0.41,
                    fontSize: '12px',
                    fontWeight: 400,
                  }}
                />
              </Box>
              <Typography
                component="a"
                href="#"
                sx={{
                  color: brandColors.neutral[500],
                  textDecoration: 'underline',
                  fontSize: '14px',
                  fontWeight: 500,
                  opacity: 0.7,
                  '&:hover': {
                    color: brandColors.primary.main,
                    opacity: 1,
                  },
                }}
              >
                {t('detail.technical.ping_history')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Metric Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2.125, height: 117 }}>
        {/* Battery Card */}
        <Box
          sx={{
            bgcolor: brandColors.white,
            border: `1px solid ${brandColors.neutral[200]}`,
            borderRadius: '14px',
            p: 2.125,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.875 }}>
              <Battery size={16} color={brandColors.neutral[500]} />
              <Typography variant="body2" sx={{ color: brandColors.neutral[500], fontWeight: 500, fontSize: '14px' }}>
                {t('detail.technical.battery')}
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ color: brandColors.neutral[900], fontWeight: 500, fontSize: '18px', mb: 0.875 }}>
              {technicalData.battery}%
            </Typography>
          </Box>
          <Box sx={{ width: '100%', mb: 0.5 }}>
            <LinearProgress
              variant="determinate"
              value={technicalData.battery}
              sx={{
                height: 8,
                borderRadius: '30px',
                bgcolor: brandColors.neutral[50],
                '& .MuiLinearProgress-bar': {
                  bgcolor: getBatteryColor(technicalData.battery),
                  borderRadius: '30px',
                  height: '7.987px',
                },
              }}
            />
          </Box>
          <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
            {t(`detail.technical.battery_status.${technicalData.batteryStatus}`)}
          </Typography>
        </Box>

        {/* Temperature Card */}
        <Box
          sx={{
            bgcolor: brandColors.white,
            border: `1px solid ${brandColors.neutral[200]}`,
            borderRadius: '14px',
            p: 2.125,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.875 }}>
              <Thermometer size={16} color={brandColors.neutral[500]} />
              <Typography variant="body2" sx={{ color: brandColors.neutral[500], fontWeight: 500, fontSize: '14px' }}>
                {t('detail.technical.temperature')}
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ color: brandColors.neutral[900], fontWeight: 500, fontSize: '18px' }}>
              {technicalData.temperature}°{technicalData.temperatureUnit}
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
            {t(`detail.technical.temperature_status.${technicalData.temperatureStatus}`)}
          </Typography>
        </Box>

        {/* Shock Mount Life Card */}
        <Box
          sx={{
            bgcolor: brandColors.white,
            border: `1px solid ${brandColors.neutral[200]}`,
            borderRadius: '14px',
            p: 2.125,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.875 }}>
              <Wrench size={16} color={brandColors.neutral[500]} />
              <Typography variant="body2" sx={{ color: brandColors.neutral[500], fontWeight: 500, fontSize: '14px' }}>
                {t('detail.technical.shock_mount_life')}
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ color: brandColors.neutral[900], fontWeight: 500, fontSize: '18px', mb: 0.875 }}>
              {technicalData.shockMountLife}%
            </Typography>
          </Box>
          <Box sx={{ width: '100%', mb: 0.5 }}>
            <LinearProgress
              variant="determinate"
              value={technicalData.shockMountLife}
              sx={{
                height: 8,
                borderRadius: '30px',
                bgcolor: brandColors.neutral[50],
                '& .MuiLinearProgress-bar': {
                  bgcolor: getShockMountColor(technicalData.shockMountLife),
                  borderRadius: '30px',
                  height: '8px',
                },
              }}
            />
          </Box>
          <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px', fontWeight: 500 }}>
            {t(`detail.technical.shock_mount_status.${technicalData.shockMountStatus}`)}
          </Typography>
        </Box>

        {/* Uptime Card */}
        <Box
          sx={{
            bgcolor: brandColors.white,
            border: `1px solid ${brandColors.neutral[200]}`,
            borderRadius: '14px',
            p: 2.125,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.875 }}>
              <Clock size={16} color={brandColors.neutral[500]} />
              <Typography variant="body2" sx={{ color: brandColors.neutral[500], fontWeight: 500, fontSize: '14px' }}>
                {t('detail.technical.uptime')}
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ color: brandColors.neutral[900], fontWeight: 500, fontSize: '18px' }}>
              {technicalData.uptime} {t(`detail.technical.${technicalData.uptimeUnit}`)}
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
            {technicalData.signalStrength}% {t('detail.technical.signals')}
          </Typography>
        </Box>
      </Box>

      {/* Divider */}
      <Box
        sx={{
          height: '1px',
          width: '100%',
          bgcolor: brandColors.neutral[200],
        }}
      />

      {/* Stand Configuration Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 3.125 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          <Typography variant="body2" sx={{ color: brandColors.neutral[900], fontSize: '14px', lineHeight: '20px' }}>
            {t('detail.technical.stand_configuration.title')}
          </Typography>
          <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px', lineHeight: '16px' }}>
            {t('detail.technical.stand_configuration.subtitle')}
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
          {/* Stand and Engine Details Card */}
          <Box
            sx={{
              bgcolor: brandColors.white,
              border: `1.2px solid ${brandColors.neutral[200]}`,
              borderRadius: '14px',
              p: 3.25,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <Typography variant="body2" sx={{ color: brandColors.neutral[900], fontSize: '14px', lineHeight: '20px' }}>
              {t('detail.technical.stand_engine_details.title')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2.75, alignItems: 'flex-start' }}>
              <Box sx={{ display: 'flex', flex: 1, gap: 1.5, alignItems: 'flex-start', height: '38px' }}>
                <Box
                  sx={{
                    bgcolor: brandColors.neutral[50],
                    borderRadius: '10px',
                    width: 38,
                    height: 38,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <LinkIcon size={20} color={brandColors.neutral[500]} />
                </Box>
                <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                    {t('detail.technical.stand_oem')}
                  </Typography>
                  <Typography variant="body2" sx={{ color: brandColors.neutral[900], fontSize: '14px', lineHeight: '20px' }}>
                    {standConfig.standOem}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flex: 1, gap: 1.5, alignItems: 'flex-start' }}>
                <Box
                  sx={{
                    bgcolor: brandColors.neutral[50],
                    borderRadius: '10px',
                    width: 38,
                    height: 38,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <LinkIcon size={20} color={brandColors.neutral[500]} />
                </Box>
                <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 0.5 }}>
                  <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                    {t('detail.technical.engine_type_oem')}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="body2" sx={{ color: brandColors.neutral[900], fontSize: '14px', lineHeight: '20px' }}>
                      {standConfig.engineType}
                    </Typography>
                    <Typography variant="body2" sx={{ color: brandColors.neutral[500], fontWeight: 500, fontSize: '14px' }}>
                      {standConfig.engineOem}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Structure Card */}
          <Box
            sx={{
              bgcolor: brandColors.white,
              border: `1.2px solid ${brandColors.neutral[200]}`,
              borderRadius: '14px',
              p: 3.25,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <Typography variant="body2" sx={{ color: brandColors.neutral[900], fontSize: '14px', lineHeight: '20px' }}>
              {t('detail.technical.structure.title')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 5, alignItems: 'flex-start' }}>
              {/* Base Unit */}
              <Box sx={{ display: 'flex', flex: 1, gap: 2.5, alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      bgcolor: brandColors.neutral[50],
                      borderRadius: '10px',
                      width: 38,
                      height: 38,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Wrench size={20} color={brandColors.neutral[500]} />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                    <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                      {t('detail.technical.base_unit')}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                      <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                        {t('detail.technical.part_no')}
                      </Typography>
                      <Typography variant="body2" sx={{ color: brandColors.neutral[900], fontSize: '14px', lineHeight: '20px' }}>
                        {standConfig.basePartNumber}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                  <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                    {t('detail.technical.serial_no')}
                  </Typography>
                  <Typography variant="body2" sx={{ color: brandColors.neutral[900], fontSize: '14px', lineHeight: '20px' }}>
                    {standConfig.baseSerialNumber}
                  </Typography>
                </Box>
              </Box>

              {/* Cradle Unit */}
              <Box sx={{ display: 'flex', flex: 1, gap: 1.5, alignItems: 'flex-start' }}>
                <Box
                  sx={{
                    bgcolor: brandColors.neutral[50],
                    borderRadius: '10px',
                    width: 38,
                    height: 38,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Wrench size={20} color={brandColors.neutral[500]} />
                </Box>
                <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 0.75 }}>
                  <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                    {t('detail.technical.cradle_unit')}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                      <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                        {t('detail.technical.part_no')}
                      </Typography>
                      <Typography variant="body2" sx={{ color: brandColors.neutral[900], fontSize: '14px', lineHeight: '20px' }}>
                        {standConfig.cradlePartNumber}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                      <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                        {t('detail.technical.serial_no')}
                      </Typography>
                      <Typography variant="body2" sx={{ color: brandColors.neutral[900], fontSize: '14px', lineHeight: '20px' }}>
                        {standConfig.cradleSerialNumber}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Compatible Aircrafts */}
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
          <Box
            sx={{
              bgcolor: brandColors.neutral[50],
              borderRadius: '10px',
              width: 38,
              height: 38,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Plane size={20} color={brandColors.neutral[500]} />
          </Box>
          <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 0.75 }}>
            <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
              {t('detail.technical.compatible_aircrafts')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
              {standConfig.compatibleAircrafts.map((aircraft, index) => (
                <Chip
                  key={index}
                  label={aircraft}
                  size="small"
                  sx={{
                    bgcolor: brandColors.primary.light,
                    color: brandColors.primary.main,
                    border: `1px solid ${alpha(brandColors.primary.main, 0.2)}`,
                    borderRadius: '8px',
                    height: 24,
                    px: 1.125,
                    py: 0.375,
                    fontSize: '12px',
                    fontWeight: 500,
                    '& .MuiChip-label': {
                      px: 0,
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Physical Specifications Section */}
      <Box
        sx={{
          bgcolor: brandColors.white,
          border: `1px solid ${brandColors.neutral[200]}`,
          borderRadius: '14px',
          pl: 3,
          pr: 0,
          py: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="body2" sx={{ color: brandColors.neutral[900], fontSize: '14px', lineHeight: '20px', mb: 0.5 }}>
              {t('detail.technical.physical_specifications.title')}
            </Typography>
            <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
              {t('detail.technical.physical_specifications.subtitle')}
            </Typography>
          </Box>
          <Chip
            label={t(`detail.technical.engine_status.${physicalSpecs.engineStatus}`)}
            size="small"
            sx={{
              bgcolor: brandColors.neutral[50],
              color: brandColors.neutral[500],
              height: 24,
              px: 1,
              py: 0.25,
              fontSize: '12px',
              fontWeight: 400,
            }}
            icon={
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  bgcolor: brandColors.neutral[500],
                }}
              />
            }
          />
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5 }}>
          {/* With Engine Onboard */}
          <Box
            sx={{
              bgcolor: brandColors.warning.light,
              border: `1.275px solid ${brandColors.warning.main}33`,
              borderRadius: '10px',
              pt: 2.16,
              pb: 0.16,
              px: 2.16,
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              boxShadow: '0px 0px 0px 1px #2b7fff',
            }}
          >
            <Typography variant="body2" sx={{ color: brandColors.neutral[900], fontWeight: 500, fontSize: '14px', lineHeight: '16px' }}>
              {t('detail.technical.with_engine')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                  {t('detail.technical.dimensions')}
                </Typography>
                <Typography variant="caption" sx={{ color: brandColors.neutral[900], fontSize: '12px' }}>
                  {physicalSpecs.withEngine.dimensions.length} × {physicalSpecs.withEngine.dimensions.width} ×{' '}
                  {physicalSpecs.withEngine.dimensions.height} {physicalSpecs.withEngine.dimensions.unit}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                  {t('detail.technical.weight')}
                </Typography>
                <Typography variant="caption" sx={{ color: brandColors.neutral[900], fontSize: '12px' }}>
                  {physicalSpecs.withEngine.weight} {physicalSpecs.withEngine.weightUnit}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Without Engine Onboard */}
          <Box
            sx={{
              bgcolor: brandColors.neutral[50],
              border: `1.275px solid ${brandColors.neutral[200]}`,
              borderRadius: '10px',
              pt: 2.16,
              pb: 0.16,
              px: 2.16,
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
            }}
          >
            <Typography variant="body2" sx={{ color: brandColors.neutral[900], fontWeight: 500, fontSize: '14px', lineHeight: '16px' }}>
              {t('detail.technical.without_engine')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                  {t('detail.technical.dimensions')}
                </Typography>
                <Typography variant="caption" sx={{ color: brandColors.neutral[900], fontSize: '12px' }}>
                  {physicalSpecs.withoutEngine.dimensions.length} × {physicalSpecs.withoutEngine.dimensions.width} ×{' '}
                  {physicalSpecs.withoutEngine.dimensions.height} {physicalSpecs.withoutEngine.dimensions.unit}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                  {t('detail.technical.weight')}
                </Typography>
                <Typography variant="caption" sx={{ color: brandColors.neutral[900], fontSize: '12px' }}>
                  {physicalSpecs.withoutEngine.weight} {physicalSpecs.withoutEngine.weightUnit}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TechnicalTab;

