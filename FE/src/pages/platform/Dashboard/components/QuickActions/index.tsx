import { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { brandColors } from '@/theme';
import addNewStandIcon from '@/assets/images/dashboard/add-new-stand-icon.svg';
import scheduleMaintenanceIcon from '@/assets/images/dashboard/schedule-maintenance-icon.svg';
import addUserIcon from '@/assets/images/dashboard/add-user-icon.svg';
import generateReportIcon from '@/assets/images/dashboard/generate-report-icon.svg';
import lightningIcon from '@/assets/images/dashboard/lightning-icon.svg';
import AddStandModal from '@/pages/platform/Stands/modals/AddStandModal';
import AddUserModal from '@/pages/platform/Users/modals/AddUserModal';
import ScheduleMaintenanceModal from '@/pages/platform/Dashboard/modals/ScheduleMaintenanceModal';
import GenerateReportModal from '@/pages/platform/Dashboard/modals/GenerateReportModal';

const QuickActions = () => {
    const { t } = useTranslation('dashboard');
    const [isAddStandModalOpen, setIsAddStandModalOpen] = useState(false);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isScheduleMaintenanceModalOpen, setIsScheduleMaintenanceModalOpen] = useState(false);
    const [isGenerateReportModalOpen, setIsGenerateReportModalOpen] = useState(false);

    const actions = [
        {
            title: t('quick_actions.add_new_stand.title'),
            description: t('quick_actions.add_new_stand.description'),
            iconSrc: addNewStandIcon,
            bg: brandColors.primary.light,
            onClick: () => {
                setIsAddStandModalOpen(true);
            },
        },
        {
            title: t('quick_actions.schedule_maintenance.title'),
            description: t('quick_actions.schedule_maintenance.description'),
            iconSrc: scheduleMaintenanceIcon,
            bg: brandColors.warning.light,
            onClick: () => {
                setIsScheduleMaintenanceModalOpen(true);
            },
        },
        {
            title: t('quick_actions.add_user.title'),
            description: t('quick_actions.add_user.description'),
            iconSrc: addUserIcon,
            bg: brandColors.success.light,
            onClick: () => {
                setIsAddUserModalOpen(true);
            },
        },
        {
            title: t('quick_actions.generate_report.title'),
            description: t('quick_actions.generate_report.description'),
            iconSrc: generateReportIcon,
            bg: brandColors.critical.light,
            onClick: () => {
                setIsGenerateReportModalOpen(true);
            },
        },
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2, // 16px
                width: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1, // 8px
                    height: 24,
                }}
            >
                <Box
                    component="img"
                    src={lightningIcon}
                    alt=""
                    sx={{
                        width: 20,
                        height: 20,
                    }}
                />
                <Typography
                    variant="body1"
                    sx={{
                        color: brandColors.neutral[900],
                    }}
                >
                    {t('quick_actions.title')}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
                    gap: '16px',
                    width: '100%',
                }}
            >
                {actions.map((action, index) => (
                    <Paper
                        key={index}
                        onClick={action.onClick}
                        sx={{
                            p: 3, // 24px
                            borderRadius: '10px',
                            border: `1px dashed ${brandColors.neutral[200]}`,
                            boxShadow: 'none',
                            backgroundColor: brandColors.white,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: 0,
                            cursor: 'pointer',
                            minHeight: 160,
                            position: 'relative',
                            '&:hover': {
                                bgcolor: brandColors.neutral[50],
                            },
                        }}
                    >
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: '10px',
                                backgroundColor: action.bg,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 1.5, // ~12px
                            }}
                        >
                            <Box
                                component="img"
                                src={action.iconSrc}
                                alt=""
                                sx={{
                                    width: 24,
                                    height: 24,
                                }}
                            />
                        </Box>
                        <Typography
                            variant="body1"
                            sx={{
                                color: brandColors.neutral[900],
                                mb: '8px',
                            }}
                        >
                            {action.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: brandColors.neutral[500],
                            }}
                        >
                            {action.description}
                        </Typography>
                    </Paper>
                ))}
            </Box>
            <AddStandModal
                open={isAddStandModalOpen}
                onClose={() => setIsAddStandModalOpen(false)}
                onSubmit={async (data) => {
                    // Handle form submission here
                    console.log('Stand data submitted:', data);
                    setIsAddStandModalOpen(false);
                }}
            />
            <AddUserModal
                open={isAddUserModalOpen}
                onClose={() => setIsAddUserModalOpen(false)}
                onSuccess={() => {
                    // Handle success (e.g., show success message, refresh user list)
                    console.log('User registered successfully');
                }}
            />
            <ScheduleMaintenanceModal
                open={isScheduleMaintenanceModalOpen}
                onClose={() => setIsScheduleMaintenanceModalOpen(false)}
                onSubmit={async (data) => {
                    console.log('Schedule Maintenance data submitted:', data);
                    // Mock API call simulation
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    setIsScheduleMaintenanceModalOpen(false);
                }}
            />
            <GenerateReportModal
                open={isGenerateReportModalOpen}
                onClose={() => setIsGenerateReportModalOpen(false)}
                onSubmit={async (data) => {
                    console.log('Generate Report data submitted:', data);
                    // Mock API call simulation
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    setIsGenerateReportModalOpen(false);
                }}
            />
        </Box>
    );
};

export default QuickActions;
