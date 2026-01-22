import { useState } from 'react';
import { Box, Typography, Chip, Avatar, Button } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Calendar, ChevronDown, ArrowUpDown, MapPin } from 'lucide-react';
import { brandColors } from '@/theme';
import type { StandDetail } from '@/types/stand.types';

type TimelineTabProps = {
  stand: StandDetail;
};

type TimelineEvent = {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: 'deployment' | 'maintenance' | 'inspection' | 'status_change' | 'assignment';
  description?: string;
  user?: {
    name: string;
    role: string;
    avatar?: string;
  };
  location?: string;
  status?: string;
};

const TimelineTab = ({ stand: _stand }: TimelineTabProps) => {
  const { t } = useTranslation('stands');

  // Mock timeline data - will be replaced with API data
  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      title: 'Stand Deployed',
      date: '2024-10-15',
      time: '14:30',
      type: 'deployment',
      description: 'Stand deployed to customer location',
      user: {
        name: 'Sarah Johnson',
        role: 'Logistics Coordinator',
        avatar: '',
      },
      location: 'Frankfurt, Germany',
    },
    {
      id: '2',
      title: 'Status Changed',
      date: '2024-10-14',
      time: '10:15',
      type: 'status_change',
      description: 'Status updated from Available to In Use',
      user: {
        name: 'System',
        role: 'Automated',
        avatar: '',
      },
      status: 'In Use',
    },
    {
      id: '3',
      title: 'Maintenance Completed',
      date: '2024-10-12',
      time: '16:45',
      type: 'maintenance',
      description: 'Level 1 Inspection completed successfully',
      user: {
        name: 'James Chen',
        role: 'Superb Technician',
        avatar: '',
      },
    },
    {
      id: '4',
      title: 'Stand Assigned',
      date: '2024-10-10',
      time: '09:00',
      type: 'assignment',
      description: 'Stand assigned to customer',
      user: {
        name: 'Michael Brown',
        role: 'Operations Manager',
        avatar: '',
      },
      location: 'Dubai, UAE',
    },
  ];

  const getEventTypeColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'deployment':
        return brandColors.primary.main;
      case 'maintenance':
        return brandColors.success.main;
      case 'inspection':
        return brandColors.warning.main;
      case 'status_change':
        return brandColors.primary.main;
      case 'assignment':
        return brandColors.primary.main;
      default:
        return brandColors.neutral[500];
    }
  };

  const getEventTypeChipProps = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'deployment':
        return {
          bgcolor: brandColors.primary.light,
          color: brandColors.primary.main,
          border: `1.275px solid ${alpha(brandColors.primary.main, 0.2)}`,
        };
      case 'maintenance':
        return {
          bgcolor: brandColors.success.light,
          color: brandColors.success.dark,
          border: `1.275px solid ${brandColors.success.main}`,
        };
      case 'inspection':
        return {
          bgcolor: brandColors.warning.light,
          color: brandColors.warning.dark,
          border: `1.275px solid ${brandColors.warning.main}`,
        };
      case 'status_change':
        return {
          bgcolor: brandColors.primary.light,
          color: brandColors.primary.main,
          border: `1.275px solid ${alpha(brandColors.primary.main, 0.2)}`,
        };
      case 'assignment':
        return {
          bgcolor: brandColors.primary.light,
          color: brandColors.primary.main,
          border: `1.275px solid ${alpha(brandColors.primary.main, 0.2)}`,
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
            {t('detail.timeline.title')}
          </Typography>
          <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
            {t('detail.timeline.subtitle')}
          </Typography>
        </Box>

        {/* Filter Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
            startIcon={<ArrowUpDown size={16} color={brandColors.neutral[500]} />}
            endIcon={<ChevronDown size={16} color={brandColors.neutral[500]} />}
          >
            {t('detail.timeline.this_month')}
          </Button>
        </Box>
      </Box>

      {/* Timeline Events */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 3.125, pb: 3.125 }}>
        {timelineEvents.map((event, index) => (
          <Box
            key={event.id}
            sx={{
              position: 'relative',
              borderLeft: `1.275px solid ${brandColors.neutral[200]}`,
              pl: 3.06,
              pb: index === timelineEvents.length - 1 ? 0 : 1,
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
                bgcolor: getEventTypeColor(event.type),
                border: `3.824px solid ${brandColors.white}`,
                zIndex: 1,
              }}
            />

            {/* Event Card */}
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
                    {event.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                      <Calendar size={16} color={brandColors.neutral[500]} />
                      <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                        {event.date}
                      </Typography>
                    </Box>
                    {event.time && (
                      <>
                        <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                          •
                        </Typography>
                        <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                          {event.time}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
                <Chip
                  label={t(`detail.timeline.event_type.${event.type}`)}
                  size="small"
                  sx={{
                    ...getEventTypeChipProps(event.type),
                    height: 24,
                    px: 1.16,
                    py: 0.41,
                    fontSize: '12px',
                    fontWeight: 400,
                  }}
                />
              </Box>

              {/* Description */}
              {event.description && (
                <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                  {event.description}
                </Typography>
              )}

              {/* User Info */}
              {event.user && (
                <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'flex-start' }}>
                  {event.user.name === 'System' ? (
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
                      src={event.user.avatar}
                      sx={{ width: 32, height: 32 }}
                    >
                      {event.user.name.charAt(0)}
                    </Avatar>
                  )}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="body2" sx={{ color: brandColors.neutral[900], fontSize: '14px', lineHeight: '20px' }}>
                      {event.user.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                      {event.user.role}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* Additional Info */}
              {(event.location || event.status) && (
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                  {event.location && (
                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                      <MapPin size={14} color={brandColors.neutral[500]} />
                      <Typography variant="caption" sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                        {event.location}
                      </Typography>
                    </Box>
                  )}
                  {event.status && (
                    <Chip
                      label={event.status}
                      size="small"
                      sx={{
                        bgcolor: brandColors.success.light,
                        color: brandColors.success.dark,
                        border: `1.275px solid ${brandColors.success.main}`,
                        height: 20,
                        fontSize: '11px',
                        fontWeight: 400,
                      }}
                    />
                  )}
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TimelineTab;

