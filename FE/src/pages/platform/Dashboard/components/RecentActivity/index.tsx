import { Box, Paper, Typography, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { brandColors } from '@/theme';
import chevronDownIcon from '@/assets/images/dashboard/chevron-down.svg';

const activities = [
    {
        id: 1,
        title: 'New Lease Agreement - Lufthansa AG for 3 GPU units at FRA',
        user: 'Sarah Johnson • Operations Manager',
        time: '2 hours ago',
        avatar: 'https://i.pravatar.cc/150?u=1', // Placeholder
        type: 'Contract',
        typeColor: 'primary',
    },
    {
        id: 2,
        title: 'Maintenance Completed - GPU S-CF34A-A001 serviced and returned to service',
        user: 'Mike Chen • Senior Technician',
        time: '4 hours ago',
        avatar: 'https://i.pravatar.cc/150?u=2',
        type: 'Maintenance',
        typeColor: 'success',
    },
    {
        id: 3,
        title: 'Low Battery Alert - Stand SUPW99QQ66AD02 requires immediate attention',
        user: 'System • Automated Alert',
        time: '6 hours ago',
        avatar: '', // System icon
        type: 'Alert',
        typeColor: 'error',
    },
    {
        id: 4,
        title: 'Lease Renewal - Emirates extended contract for 5 Air Start units at DXB',
        user: 'Emily Rodriguez • Logistics Coordinator',
        time: '8 hours ago',
        avatar: 'https://i.pravatar.cc/150?u=3',
        type: 'Contract',
        typeColor: 'primary',
    },
    {
        id: 5,
        title: 'Scheduled Service - Quarterly maintenance for Pool stands at DXB',
        user: 'David Kumar • Maintenance Technician',
        time: '1 day ago',
        avatar: 'https://i.pravatar.cc/150?u=4',
        type: 'Maintenance',
        typeColor: 'success',
    },
];

const RecentActivity = () => {
    const { t } = useTranslation('dashboard');

    return (
        <Paper
            sx={{
                p: 3, // 24px
                borderRadius: '10px',
                border: `1px solid ${brandColors.neutral[200]}`,
                boxShadow: 'none',
                height: '100%',
                backgroundColor: brandColors.white,
                display: 'flex',
                flexDirection: 'column',
                gap: 6, // 48px
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                <Box>
                    <Typography variant="body1" sx={{ color: brandColors.neutral[900], mb: '8px' }}>
                        {t('recent_activity.title')}
                    </Typography>
                    <Typography variant="body2" sx={{ color: brandColors.neutral[500] }}>
                        {t('recent_activity.subtitle')}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        bgcolor: brandColors.neutral[50],
                        border: '1px solid transparent',
                        px: 1.5, // 12px
                        py: 0.5,
                        height: 36,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        width: '150px',
                    }}
                >
                    <Typography variant="body2" sx={{ color: brandColors.neutral[900] }}>
                        {t('recent_activity.all_activity')}
                    </Typography>
                    <Box
                        component="img"
                        src={chevronDownIcon}
                        alt=""
                        sx={{
                            width: 16,
                            height: 16,
                        }}
                    />
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, overflowY: 'auto', flexGrow: 1 }}>
                {activities.map((activity) => (
                    <Box
                        key={activity.id}
                        sx={{
                            border: `1px solid ${brandColors.neutral[200]}`,
                            borderRadius: '10px',
                            p: 2,
                            display: 'flex',
                            gap: 1.5,
                            alignItems: 'center',
                        }}
                    >
                        <Box sx={{ flex: '1 0 0', minWidth: 0 }}>
                            <Typography variant="body2" sx={{ color: brandColors.neutral[900], mb: 0.5 }}>
                                {activity.title}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                                <Typography variant="caption" sx={{ color: brandColors.neutral[500] }}>
                                    {activity.user.split(' • ')[0]}
                                </Typography>
                                <Typography variant="caption" sx={{ color: brandColors.neutral[500] }}>
                                    •
                                </Typography>
                                <Typography variant="caption" sx={{ color: brandColors.neutral[500] }}>
                                    {activity.user.split(' • ')[1]}
                                </Typography>
                                <Typography variant="caption" sx={{ color: brandColors.neutral[500] }}>
                                    •
                                </Typography>
                                <Typography variant="caption" sx={{ color: brandColors.neutral[500] }}>
                                    {activity.time}
                                </Typography>
                            </Box>
                        </Box>
                        <Chip
                            label={activity.type}
                            size="small"
                            color={activity.typeColor === 'primary' ? 'default' : activity.typeColor === 'success' ? 'success' : activity.typeColor === 'error' ? 'error' : 'default'}
                            variant="outlined"
                        />
                    </Box>
                ))}
            </Box>
        </Paper>
    );
};

export default RecentActivity;
