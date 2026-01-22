import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Chip, Tabs, Tab, Card } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { MapPin, Wrench, Send, Plane } from 'lucide-react';
import { brandColors } from '@/theme';
import Breadcrumb from '@/components/common/Breadcrumb';
import CountryFlag from '@/components/common/CountryFlag';
import StandDetailsCard from './components/StandDetailsCard';
import StandStatusCard from './components/StandStatusCard';
import TechnicalTab from './components/TechnicalTab';
import MaintenanceTab from './components/MaintenanceTab';
import TimelineTab from './components/TimelineTab';
import type { StandDetail } from '@/types/stand.types';

type DetailTab = 'overview' | 'technical' | 'maintenance' | 'timeline';

const StandDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('stands');
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');
  const [stand, setStand] = useState<StandDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchStandDetail = async () => {
      setIsLoading(true);
      try {
        // Mock data - replace with API call
        const mockStand: StandDetail = {
          id: id || '1',
          standId: 'S-010D-A014',
          trackingId: 'TRK-LH-FRA088',
          standType: 'third-party',
          measurement: {
            length: 3600,
            width: 2400,
            height: 1550,
            unit: 'mm',
            weight: 2150,
            weightUnit: 'Kg',
          },
          oem: {
            name: 'Frank Brown',
            engine: 'V2500',
          },
          engineCompatibility: ['Trent 1000', 'GEnx', 'CFM56'],
          engineStatus: 'empty',
          customer: {
            name: 'Unassigned',
            location: 'Frankfurt',
            countryCode: 'DE',
          },
          status: 'available',
          imageUrl: 'https://via.placeholder.com/1104x316',
          assignment: null,
          location: {
            city: 'Frankfurt',
            country: 'Germany',
            countryCode: 'DE',
          },
          details: {
            manufactureDate: '2025-09-10',
            standAge: '5 Years',
            color: 'White',
            stackable: true,
          },
          statusInfo: {
            registrationDate: '2025-09-10',
            shockMountsManufactureDate: '2025-09-10',
            lastMaintenance: '2025-09-10',
            shockMountsExpiryDate: '2025-09-10',
            nextMaintenance: '2025-09-10',
            nextShockMountReplacement: '2025-09-10',
          },
          technical: {
            trackerId: 'TRK-DOH5Z2K8L',
            trackerStatus: 'active',
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
          },
          standConfiguration: {
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
          },
          physicalSpecifications: {
            withEngine: {
              dimensions: {
                length: 3600,
                width: 2400,
                height: 1550,
                unit: 'mm',
              },
              weight: 2150,
              weightUnit: 'kg',
            },
            withoutEngine: {
              dimensions: {
                length: 4600,
                width: 2600,
                height: 1700,
                unit: 'mm',
              },
              weight: 5500,
              weightUnit: 'kg',
            },
            engineStatus: 'empty',
          },
        };
        setStand(mockStand);
      } catch (error) {
        console.error('Error fetching stand detail:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchStandDetail();
    }
  }, [id]);

  const getStatusChipProps = (status: string) => {
    switch (status) {
      case 'available':
        return {
          sx: {
            bgcolor: brandColors.success.light,
            color: brandColors.success.main,
            border: `1px solid ${brandColors.success.main}20`,
          },
        };
      case 'in_use':
        return {
          sx: {
            bgcolor: brandColors.primary.light,
            color: brandColors.primary.main,
            border: `1px solid ${brandColors.primary.main}20`,
          },
        };
      case 'in_transit':
        return {
          sx: {
            bgcolor: brandColors.warning.light,
            color: brandColors.warning.main,
            border: `1px solid ${brandColors.warning.main}20`,
          },
        };
      case 'maintenance':
        return {
          sx: {
            bgcolor: brandColors.critical.light,
            color: brandColors.critical.main,
            border: `1px solid ${brandColors.critical.main}20`,
          },
        };
      case 'new_listed':
        return {
          sx: {
            bgcolor: brandColors.primary.light,
            color: brandColors.primary.main,
            border: `1px solid ${brandColors.primary.main}20`,
          },
        };
      case 'deactivated':
        return {
          sx: {
            bgcolor: brandColors.neutral[100],
            color: brandColors.neutral[500],
            border: `1px solid ${brandColors.neutral[200]}`,
          },
        };
      default:
        return {};
    }
  };

  const getStandTypeLabel = (type: string) => {
    switch (type) {
      case 'homebase':
        return 'Homebase';
      case 'pool':
        return 'Pool';
      case 'third-party':
        return 'Third-Party';
      default:
        return type;
    }
  };

  const breadcrumbItems = [
    {
      label: t('breadcrumb.stands'),
      path: '/stands',
    },
    {
      label: t('breadcrumb.overview'),
      path: '/stands',
    },
    {
      label: stand?.standId || '',
    },
  ];

  if (isLoading) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!stand) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Stand not found</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3.75,
        p: 4,
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Header Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
          {/* Left: Stand Info */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: brandColors.neutral[50],
                  borderRadius: '8px',
                  p: 1,
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    bgcolor: brandColors.neutral[50],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Plane size={24} color={brandColors.neutral[500]} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: brandColors.neutral[900], fontWeight: 500 }}>
                    {stand.assignment?.customerName || t('detail.header.unassigned')}
                  </Typography>
                  <Typography variant="caption" sx={{ color: brandColors.neutral[500] }}>
                    {stand.location.city}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ width: '1px', height: '22px', bgcolor: brandColors.neutral[200] }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CountryFlag countryCode={stand.location.countryCode} />
                <Typography variant="caption" sx={{ color: brandColors.neutral[500] }}>
                  {stand.location.city}, {stand.location.country}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right: Track Stand Button */}
          <Button
            variant="outlined"
            startIcon={<MapPin size={16} />}
            sx={{
              borderColor: brandColors.primary.main,
              color: brandColors.primary.main,
              '&:hover': {
                borderColor: brandColors.primary.main,
                bgcolor: brandColors.primary.light,
              },
            }}
          >
            {t('detail.header.track_stand')}
          </Button>
        </Box>

        {/* Tabs */}
        <Box
          sx={{
            bgcolor: brandColors.neutral[50],
            borderRadius: '10px',
            p: 0.5,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue as DetailTab)}
            sx={{
              minHeight: 'auto',
              '& .MuiTabs-indicator': {
                display: 'none',
              },
            }}
          >
            <Tab
              value="overview"
              label={t('detail.tabs.overview')}
              sx={{
                textTransform: 'none',
                minHeight: 43,
                borderRadius: '8px',
                '&.Mui-selected': {
                  bgcolor: brandColors.white,
                  color: brandColors.neutral[900],
                },
              }}
            />
            <Tab
              value="technical"
              label={t('detail.tabs.technical')}
              sx={{
                textTransform: 'none',
                minHeight: 43,
                borderRadius: '8px',
                '&.Mui-selected': {
                  bgcolor: brandColors.white,
                  color: brandColors.neutral[900],
                },
              }}
            />
            <Tab
              value="maintenance"
              label={t('detail.tabs.maintenance')}
              sx={{
                textTransform: 'none',
                minHeight: 43,
                borderRadius: '8px',
                '&.Mui-selected': {
                  bgcolor: brandColors.white,
                  color: brandColors.neutral[900],
                },
              }}
            />
            <Tab
              value="timeline"
              label={t('detail.tabs.timeline')}
              sx={{
                textTransform: 'none',
                minHeight: 43,
                borderRadius: '8px',
                '&.Mui-selected': {
                  bgcolor: brandColors.white,
                  color: brandColors.neutral[900],
                },
              }}
            />
          </Tabs>
        </Box>
      </Box>

      {/* Main Content Card */}
      <Card
        sx={{
          border: `1.275px solid ${brandColors.neutral[200]}`,
          borderRadius: '14px',
          overflow: 'hidden',
        }}
      >
        {/* Card Header */}
        <Box
          sx={{
            bgcolor: 'rgba(248, 250, 252, 0.3)',
            borderBottom: `1.275px solid ${brandColors.neutral[50]}`,
            p: 3,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75 }}>
              <Typography variant="h2" sx={{ color: brandColors.neutral[900] }}>
                {stand.standId}
              </Typography>
              <Chip
                label={t(`detail.status.${stand.status}`)}
                size="small"
                {...getStatusChipProps(stand.status)}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="caption" sx={{ color: brandColors.neutral[500] }}>
                  •
                </Typography>
                <Typography variant="caption" sx={{ color: brandColors.neutral[500], textTransform: 'uppercase' }}>
                  {getStandTypeLabel(stand.standType)}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1.25 }}>
              <Button
                variant="outlined"
                startIcon={<Wrench size={16} />}
                sx={{
                  borderColor: brandColors.neutral[200],
                  color: brandColors.neutral[900],
                  bgcolor: brandColors.white,
                }}
              >
                {t('detail.header.schedule_maintenance')}
              </Button>
              <Button
                variant="contained"
                startIcon={<Send size={16} />}
                sx={{
                  bgcolor: brandColors.primary.main,
                  color: brandColors.white,
                }}
              >
                {t('detail.header.deploy_to_customer')}
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Card Content */}
        <Box sx={{ p: 3.125 }}>
          {/* Stand Image - Only show in Overview tab */}
          {activeTab === 'overview' && (
            <Box
              sx={{
                width: '100%',
                height: 316,
                borderRadius: '14px',
                overflow: 'hidden',
                mb: 2,
                position: 'relative',
                bgcolor: brandColors.neutral[50],
              }}
            >
              {stand.imageUrl ? (
                <Box
                  component="img"
                  src={stand.imageUrl}
                  alt={stand.standId}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: brandColors.neutral[50],
                  }}
                >
                  <Typography sx={{ color: brandColors.neutral[500] }}>No Image Available</Typography>
                </Box>
              )}
            </Box>
          )}

          {/* Details Cards */}
          {activeTab === 'overview' && (
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <StandDetailsCard stand={stand} />
              <StandStatusCard stand={stand} />
            </Box>
          )}

          {activeTab === 'technical' && <TechnicalTab stand={stand} />}

          {activeTab === 'maintenance' && <MaintenanceTab stand={stand} />}

          {activeTab === 'timeline' && <TimelineTab stand={stand} />}
        </Box>
      </Card>
    </Box>
  );
};

export default StandDetail;

