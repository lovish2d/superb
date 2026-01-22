import { Box, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { brandColors } from '@/theme';
import { ChevronDown } from 'lucide-react';
import StandCard from './components/StandCard';

const stands = [
    {
        id: 'S-PW1100D-A001',
        name: 'Dedienne',
        model: 'PW1100',
        location: 'Frankfurt',
        status: 'Unassigned',
        condition: 'Engine Onboard',
        conditionColor: 'warning',
        weight: '2177 kg',
        dims: '3680 × 2450 × 1570 mm',
    },
    {
        id: 'S-CFM56A-A002',
        name: 'AGSE',
        model: 'CFM56-5A/5B',
        location: 'Berlin',
        status: 'Assigned',
        condition: 'Empty',
        conditionColor: 'neutral',
        weight: '2250 kg',
        dims: '3700 × 2500 × 1600 mm',
    },
    {
        id: 'S-V2500F-A003',
        name: 'Frank Brown',
        model: 'PW1102',
        location: 'Munich',
        status: 'Unassigned',
        condition: 'Engine Onboard',
        conditionColor: 'warning',
        weight: '2300 kg',
        dims: '3720 × 2520 × 1620 mm',
    },
    {
        id: 'S-T1000D-A004',
        name: 'Dedienne',
        model: 'PW1103',
        location: 'Hamburg',
        status: 'Assigned',
        condition: 'Engine Onboard',
        conditionColor: 'warning',
        weight: '2400 kg',
        dims: '3750 × 2550 × 1650 mm',
    },
];

const FilterButton = ({ label }: { label: string }) => (
    <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: brandColors.neutral[50],
        border: '1.275px solid transparent',
        borderRadius: '8px',
        height: '36px',
        px: '13.265px',
        py: '1.275px',
        cursor: 'pointer',
        width: '150px',
    }}>
        <Typography variant="body2" color="text.primary">
            {label}
        </Typography>
        <ChevronDown size={15.993} color={brandColors.neutral[500]} style={{ opacity: 0.5 }} />
    </Box>
);

const StandsOverview = () => {
    const { t } = useTranslation('dashboard');

    return (
        <Paper
            sx={{
                p: '1.275px',
                borderRadius: '10px',
                border: `1.275px solid ${brandColors.neutral[200]}`,
                boxShadow: 'none',
                height: '100%',
                backgroundColor: brandColors.white,
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
            }}
        >
            {/* Header */}
            <Box sx={{ height: '85.96px', px: '24px', pt: '24px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Typography variant="body1" color="text.primary">
                        {t('stands_overview.title')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t('stands_overview.subtitle')}
                    </Typography>
                </Box>
            </Box>

            {/* Content */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15.993px', px: '24px', pb: 0 }}>
                {/* Filter Buttons */}
                <Box sx={{ display: 'flex', gap: '8px' }}>
                    <FilterButton label={t('stands_overview.all_categories')} />
                    <FilterButton label={t('stands_overview.all_countries')} />
                    <FilterButton label={t('stands_overview.all_companies')} />
                </Box>

                {/* Stand Cards */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15.993px' }}>
                    {stands.map((stand) => (
                        <StandCard key={stand.id} {...stand} />
                    ))}
                </Box>
            </Box>
        </Paper>
    );
};

export default StandsOverview;
