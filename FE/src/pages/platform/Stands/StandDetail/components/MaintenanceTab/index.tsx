import { useState } from 'react';
import { Box, Typography, Chip, Avatar, Button } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, ChevronRight, FileText, ChevronDown } from 'lucide-react';
import { brandColors } from '@/theme';
import type { StandDetail } from '@/types/stand.types';

type MaintenanceTabProps = {
  stand: StandDetail;
};

type MaintenanceRecord = {
  id: string;
  title: string;
  date: string;
  duration: string;
  status: 'completed' | 'pending' | 'in_progress';
  description: string;
  additionalDescription?: string;
  requestedBy: {
    name: string;
    role: string;
    avatar?: string;
    isSystem?: boolean;
  };
  performedBy: {
    name: string;
    role: string;
    avatar?: string;
  };
  attachments?: {
    images?: string[];
    pdfs?: Array<{ name: string; url: string }>;
  };
};

const MaintenanceTab = ({ stand: _stand }: MaintenanceTabProps) => {
  const { t } = useTranslation('stands');
  const [activeFilter, setActiveFilter] = useState<'history' | 'upcoming'>('history');

  // Mock maintenance data - will be replaced with API data
  const maintenanceRecords: MaintenanceRecord[] = [
    {
      id: '1',
      title: 'Level 1 Inspection',
      date: '2024-10-15',
      duration: '2 hours',
      status: 'completed',
      description: 'All systems operational. Minor wear observed, no corrective action required.',
      requestedBy: {
        name: 'System',
        role: 'Routine Checkup',
        isSystem: true,
      },
      performedBy: {
        name: 'James Chen',
        role: 'Superb Technician',
        avatar: '',
      },
      attachments: {
        images: ['', '', '', ''],
        pdfs: [{ name: 'MRF Report.pdf', url: '' }],
      },
    },
    {
      id: '2',
      title: 'Shock Mount Replacement',
      date: '2024-10-15',
      duration: '2 hours',
      status: 'completed',
      description: 'Replaced all 4 shockmounts. Tested successfully.',
      requestedBy: {
        name: 'System',
        role: 'Routine Checkup',
        isSystem: true,
      },
      performedBy: {
        name: 'James Chen',
        role: 'Superb Technician',
        avatar: '',
      },
      attachments: {
        images: ['', ''],
        pdfs: [{ name: 'MRF Report.pdf', url: '' }],
      },
    },
    {
      id: '3',
      title: 'Medium Damage',
      date: '2024-10-15',
      duration: '2 hours',
      status: 'completed',
      description: 'Replaced all 4 shockmounts. Tested successfully.',
      additionalDescription: 'Abnormal vibration observed during stand operation. Suspected degradation of shock mounts based on visual inspection and vibration feedback.',
      requestedBy: {
        name: 'Gary Owens',
        role: 'Customer MRO',
        avatar: '',
      },
      performedBy: {
        name: 'James Chen',
        role: 'Superb Technician',
        avatar: '',
      },
      attachments: {
        images: ['', ''],
        pdfs: [{ name: 'DMMPN Report.pdf', url: '' }],
      },
    },
  ];

  const getStatusChipProps = (status: MaintenanceRecord['status']) => {
    switch (status) {
      case 'completed':
        return {
          bgcolor: brandColors.success.light,
          color: brandColors.success.dark,
          border: `1.275px solid ${brandColors.success.main}`,
        };
      case 'pending':
        return {
          bgcolor: brandColors.warning.light,
          color: brandColors.warning.dark,
          border: `1.275px solid ${brandColors.warning.main}`,
        };
      case 'in_progress':
        return {
          bgcolor: brandColors.primary.light,
          color: brandColors.primary.main,
          border: `1.275px solid ${brandColors.primary.main}`,
        };
      default:
        return {};
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
      {/* Section Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', px: 3.125, pt: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          <Typography variant="body1" sx={{ color: brandColors.neutral[900], fontSize: '14px', fontWeight: 500 }}>
            {t('detail.maintenance.title')}
          </Typography>
          <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
            {t('detail.maintenance.subtitle')}
          </Typography>
        </Box>

        {/* Filter Controls */}
        <Box sx={{ display: 'flex', gap: 1.75, alignItems: 'center' }}>
          {/* Date Period Dropdown */}
          <Button
            variant="outlined"
            sx={{
              bgcolor: brandColors.neutral[50],
              border: `1.275px solid ${alpha(brandColors.neutral[900], 0)}`,
              borderRadius: '8px',
              height: 35,
              px: 1.66,
              py: 0.16,
              color: brandColors.neutral[900],
              fontSize: '14px',
              fontWeight: 400,
              textTransform: 'none',
              '&:hover': {
                bgcolor: brandColors.neutral[50],
                border: `1.275px solid ${alpha(brandColors.neutral[900], 0)}`,
              },
            }}
            startIcon={<Calendar size={16} color={brandColors.neutral[500]} />}
            endIcon={<ChevronDown size={16} color={brandColors.neutral[500]} />}
          >
            {t('detail.maintenance.this_month')}
          </Button>

          {/* History/Upcoming Tabs */}
          <Box
            sx={{
              bgcolor: brandColors.neutral[50],
              borderRadius: '8px',
              p: 0.5,
              display: 'flex',
              gap: 1.25,
            }}
          >
            <Button
              onClick={() => setActiveFilter('history')}
              sx={{
                bgcolor: activeFilter === 'history' ? brandColors.white : 'transparent',
                borderRadius: '6px',
                px: 1.25,
                py: 0.625,
                color: activeFilter === 'history' ? brandColors.neutral[900] : brandColors.neutral[500],
                fontSize: '14px',
                fontWeight: activeFilter === 'history' ? 500 : 400,
                textTransform: 'none',
                minWidth: 'auto',
                '&:hover': {
                  bgcolor: activeFilter === 'history' ? brandColors.white : 'transparent',
                },
              }}
            >
              {t('detail.maintenance.history')}
            </Button>
            <Button
              onClick={() => setActiveFilter('upcoming')}
              sx={{
                bgcolor: activeFilter === 'upcoming' ? brandColors.white : 'transparent',
                borderRadius: '6px',
                px: 1.25,
                py: 0.625,
                color: activeFilter === 'upcoming' ? brandColors.neutral[900] : brandColors.neutral[500],
                fontSize: '14px',
                fontWeight: activeFilter === 'upcoming' ? 500 : 400,
                textTransform: 'none',
                minWidth: 'auto',
                '&:hover': {
                  bgcolor: activeFilter === 'upcoming' ? brandColors.white : 'transparent',
                },
              }}
            >
              {t('detail.maintenance.upcoming')}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Maintenance Records Timeline */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 3.125, pb: 3.125 }}>
        {maintenanceRecords.map((record, index) => (
          <Box
            key={record.id}
            sx={{
              position: 'relative',
              borderLeft: `1.275px solid ${brandColors.neutral[200]}`,
              pl: 3.06,
              pb: index === maintenanceRecords.length - 1 ? 0 : 1,
            }}
          >
            {/* Timeline Dot */}
            <Box
              sx={{
                position: 'absolute',
                left: '-8.98px',
                top: 0,
                width: 16,
                height: 16,
                borderRadius: '50%',
                bgcolor: brandColors.primary.main,
                border: `3.824px solid ${brandColors.white}`,
                zIndex: 1,
              }}
            />

            {/* Record Card */}
            <Box
              sx={{
                bgcolor: alpha(brandColors.primary.light, 0.4),
                border: `1.275px solid ${brandColors.neutral[200]}`,
                borderRadius: '10px',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}
            >
              {/* Header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography variant="body2" sx={{ color: brandColors.neutral[900], fontSize: '14px', fontWeight: 500 }}>
                    {record.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                      <Calendar size={16} color={brandColors.neutral[500]} />
                      <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                        {record.date}
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                      •
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                      <Clock size={12} color={brandColors.neutral[500]} />
                      <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                        {record.duration}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Chip
                  label={t(`detail.maintenance.status.${record.status}`)}
                  size="small"
                  sx={{
                    ...getStatusChipProps(record.status),
                    height: 24,
                    px: 1.16,
                    py: 0.41,
                    fontSize: '12px',
                    fontWeight: 400,
                  }}
                />
              </Box>

              {/* Description */}
              <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                {record.description}
              </Typography>
              {record.additionalDescription && (
                <Box
                  sx={{
                    bgcolor: brandColors.white,
                    borderRadius: '4px',
                    p: 1.125,
                  }}
                >
                  <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                    {record.additionalDescription}
                  </Typography>
                </Box>
              )}

              {/* Requested By / Performed By */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                  <Typography variant="caption" sx={{ color: brandColors.neutral[900], fontSize: '12px', width: 93 }}>
                    {t('detail.maintenance.requested_by')}
                  </Typography>
                  <Typography variant="caption" sx={{ color: brandColors.neutral[900], fontSize: '12px', width: 108 }}>
                    {t('detail.maintenance.performed_by')}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  {/* Requested By */}
                  <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'flex-start' }}>
                    {record.requestedBy.isSystem ? (
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          bgcolor: brandColors.neutral[900],
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                        }}
                      >
                        <Typography
                          sx={{
                            color: '#E1AA33', // Gold color for S logo
                            fontSize: '10px',
                            fontWeight: 700,
                            lineHeight: 1,
                          }}
                        >
                          S
                        </Typography>
                      </Box>
                    ) : (
                      <Avatar
                        src={record.requestedBy.avatar}
                        sx={{ width: 32, height: 32 }}
                      >
                        {record.requestedBy.name.charAt(0)}
                      </Avatar>
                    )}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                      <Typography variant="body2" sx={{ color: brandColors.neutral[900], fontSize: '14px', lineHeight: '20px' }}>
                        {record.requestedBy.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                        {record.requestedBy.role}
                      </Typography>
                      {record.attachments?.pdfs && record.attachments.pdfs.length > 0 && index === 0 && (
                        <Box
                          sx={{
                            bgcolor: brandColors.white,
                            borderRadius: '8px',
                            p: 1,
                            display: 'flex',
                            gap: 0.5,
                            alignItems: 'center',
                            boxShadow: '0px 1px 4px rgba(12, 12, 13, 0.1), 0px 1px 4px rgba(12, 12, 13, 0.05)',
                          }}
                        >
                          <FileText size={20} color={brandColors.critical.main} />
                          <Typography variant="caption" sx={{ color: brandColors.neutral[900], fontSize: '12px' }}>
                            {record.attachments.pdfs[0].name}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>

                  {/* Performed By */}
                  <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'flex-start' }}>
                    <Avatar
                      src={record.performedBy.avatar}
                      sx={{ width: 32, height: 32 }}
                    >
                      {record.performedBy.name.charAt(0)}
                    </Avatar>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                      <Typography variant="body2" sx={{ color: brandColors.neutral[900], fontSize: '14px', lineHeight: '20px' }}>
                        {record.performedBy.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                        {record.performedBy.role}
                      </Typography>
                      {record.attachments?.pdfs && record.attachments.pdfs.length > 0 && (
                        <Box
                          sx={{
                            bgcolor: brandColors.white,
                            borderRadius: '8px',
                            p: 1,
                            display: 'flex',
                            gap: 0.5,
                            alignItems: 'center',
                            boxShadow: '0px 1px 4px rgba(12, 12, 13, 0.1), 0px 1px 4px rgba(12, 12, 13, 0.05)',
                          }}
                        >
                          <FileText size={20} color={brandColors.critical.main} />
                          <Typography variant="caption" sx={{ color: brandColors.neutral[900], fontSize: '12px' }}>
                            {record.attachments.pdfs[0].name}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>

                  {/* Attached Images */}
                  {record.attachments?.images && record.attachments.images.length > 0 && (
                    <Box sx={{ display: 'flex', gap: 1.75, alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: -1.5 }}>
                        {record.attachments.images.slice(0, 4).map((img, imgIndex) => (
                          <Box
                            key={imgIndex}
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '8px',
                              bgcolor: brandColors.neutral[50],
                              border: `1px solid ${brandColors.white}`,
                              ml: imgIndex > 0 ? '-12px' : 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0px 1px 4px rgba(12, 12, 13, 0.1), 0px 1px 4px rgba(12, 12, 13, 0.05)',
                            }}
                          >
                            {img ? (
                              <Box
                                component="img"
                                src={img}
                                alt={`Attachment ${imgIndex + 1}`}
                                sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                              />
                            ) : (
                              <Box
                                sx={{
                                  width: '100%',
                                  height: '100%',
                                  bgcolor: brandColors.neutral[50],
                                  borderRadius: '8px',
                                }}
                              />
                            )}
                          </Box>
                        ))}
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1.75, alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ color: brandColors.neutral[900], fontSize: '12px' }}>
                          {record.attachments.images.length} {t('detail.maintenance.images_attached')}
                        </Typography>
                        <ChevronRight size={16} color={brandColors.neutral[500]} />
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MaintenanceTab;

