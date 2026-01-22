import {
    Box,
    Card,
    Checkbox,
    IconButton,
    Typography,
    Chip,
    Avatar,
    Stack,
    Divider,
} from '@mui/material';
import {
    MoreVertical,
    MapPin,
    Cpu, // For OEM/Engine
    Plane, // For Compatibility
    Maximize, // For Dimensions (Active Dimensions -> Width/Height)
    User, // For Customer fallback
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { brandColors } from '@/theme';
import ContainerImage from '@/assets/images/Container.png';
import type { Stand } from '@/types/stand.types';
import CountryFlag from '@/components/common/CountryFlag';

type StandCardProps = {
    stand: Stand;
    selected: boolean;
    onSelect: () => void;
};

const StandCard = ({ stand, selected, onSelect }: StandCardProps) => {
    const { t } = useTranslation('stands');

    const getStatusLabel = (status: Stand['status']) => {
        const statusMap: Record<Stand['status'], string> = {
            available: t('tabs.available'),
            in_use: t('tabs.in_use'),
            in_transit: t('tabs.in_transit'),
            maintenance: t('tabs.maintenance'),
            new_listed: t('tabs.new_listed'),
            deactivated: t('tabs.deactivated'),
        };
        return statusMap[status] || status;
    };

    const getStatusChipProps = (status: Stand['status']) => {
        switch (status) {
            case 'available':
                return { color: 'success' as const };
            case 'maintenance':
                return { color: 'error' as const };
            case 'new_listed':
                return { color: 'warning' as const };
            case 'in_use':
            case 'in_transit':
                return { color: 'info' as const };
            case 'deactivated':
                return { variant: 'outlined' as const, color: 'secondary' as const };
            default:
                return { variant: 'outlined' as const, color: 'secondary' as const };
        }
    };

    return (
        <Card
            sx={{
                height: '540px', // Fixed height to prevent fluctuation
                borderRadius: '12px',
                border: `1px solid ${selected ? brandColors.primary.main : brandColors.neutral[200]}`,
                boxShadow: selected ? `0 0 0 2px ${brandColors.primary.light}` : 'none',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'all 0.2s ease',
                '&:hover': {
                    borderColor: brandColors.primary.main,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                },
            }}
        >
            {/* Header Image Section - Fixed Height */}
            <Box sx={{ position: 'relative', height: '180px', minHeight: '180px', width: '100%', flexShrink: 0 }}>
                <Box
                    component="img"
                    src={ContainerImage}
                    alt="Stand Container"
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                    }}
                />

                {/* Checkbox: Top Left */}
                <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
                    <Checkbox
                        checked={selected}
                        onChange={onSelect}
                        sx={{
                            padding: 0,
                            color: brandColors.white,
                            '&.Mui-checked': {
                                color: brandColors.primary.main,
                            },
                            backgroundColor: selected ? brandColors.white : `rgba(255, 255, 255, 0.7)`,
                            borderRadius: '4px',
                            width: '20px',
                            height: '20px',
                            '& .MuiSvgIcon-root': { fontSize: '1.25rem' },
                        }}
                    />
                </Box>

                {/* Menu: Top Right */}
                <IconButton
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        color: brandColors.white,
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
                        width: '24px',
                        height: '24px',
                        borderRadius: '4px',
                    }}
                >
                    <MoreVertical size={16} />
                </IconButton>

                {/* ID + Tracking: Bottom Left */}
                <Box sx={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', alignItems: 'center' }}>
                    <Box sx={{
                        px: 1, py: 0.5,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(4px)',
                        borderRadius: '6px',
                        color: brandColors.white,
                        display: 'flex',
                        gap: 1,
                    }}>
                        <Typography variant="caption" component="span" sx={{ color: brandColors.white, fontWeight: 600 }}>{stand.standId}</Typography>
                        <Typography variant="caption" component="span" sx={{ opacity: 0.8, color: brandColors.white }}>{stand.trackingId}</Typography>
                    </Box>
                </Box>

                {/* Status: Bottom Right */}
                <Box sx={{ position: 'absolute', bottom: 12, right: 12 }}>
                    <Chip
                        label={stand.engineStatus === 'empty' ? 'Empty' : 'Occupied'}
                        size="small"
                        variant="outlined"
                        color="secondary"
                        sx={{
                            borderRadius: '12px',
                            bgcolor: 'rgba(255,255,255,0.9)',
                            border: 'none',
                            fontWeight: 600,
                            height: '24px',
                        }}
                        icon={
                            <Box sx={{
                                width: 6, height: 6, borderRadius: '50%',
                                bgcolor: stand.engineStatus === 'empty' ? brandColors.neutral[500] : brandColors.success.main,
                                ml: '8px !important'
                            }} />
                        }
                    />
                </Box>
            </Box>

            {/* Body Content */}
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>

                {/* Customer Section - Fixed Height reserved */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '50px' }}>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: brandColors.primary.light, color: brandColors.primary.main }}>
                            <User size={18} />
                        </Avatar>
                        <Box>
                            <Typography variant="overline" sx={{ color: brandColors.neutral[500], lineHeight: 1.2 }}>
                                Current Customer
                            </Typography>
                            <Typography variant="body2" noWrap sx={{ color: brandColors.neutral[900], mt: 0.5, fontWeight: 500, maxWidth: '140px' }}>
                                {stand.customer.name}
                            </Typography>
                            <Typography variant="caption" noWrap sx={{ color: brandColors.neutral[500], mt: 0.25, display: 'block', maxWidth: '140px' }}>
                                • {stand.standType}({stand.customer.name})
                            </Typography>
                        </Box>
                    </Box>

                    {/* Status Pill - Fixed Width to prevent jump */}
                    <Chip
                        label={getStatusLabel(stand.status)}
                        size="small"
                        {...getStatusChipProps(stand.status)}
                        sx={{
                            textTransform: 'capitalize',
                            minWidth: '90px', // Fixed width for status pill
                            justifyContent: 'center',
                            fontWeight: 500,
                        }}
                    />
                </Box>

                <Divider sx={{ borderColor: brandColors.neutral[100] }} />

                {/* Details Grid - Consistent spacing */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, flex: 1 }}>

                    {/* Location */}
                    <Box sx={{ display: 'flex', gap: 1.5, minHeight: '40px' }}>
                        <MapPin size={16} color={brandColors.neutral[500]} style={{ marginTop: 2 }} />
                        <Box>
                            <Typography variant="caption" sx={{ color: brandColors.neutral[500], display: 'block' }}>Location</Typography>
                            <Stack direction="row" alignItems="center" spacing={0.5} mt={0.5}>
                                {stand.customer.countryCode && <CountryFlag countryCode={stand.customer.countryCode} />}
                                <Typography variant="caption" sx={{ color: brandColors.neutral[900], fontWeight: 500 }}>
                                    {stand.customer.location}, {stand.customer.countryCode === 'DE' ? 'Germany' : 'UAE'}
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>

                    {/* OEM / Engine */}
                    <Box sx={{ display: 'flex', gap: 1.5, minHeight: '40px' }}>
                        <Cpu size={16} color={brandColors.neutral[500]} style={{ marginTop: 2 }} />
                        <Box>
                            <Typography variant="caption" sx={{ color: brandColors.neutral[500], display: 'block' }}>OEM / Engine</Typography>
                            <Typography variant="caption" sx={{ color: brandColors.neutral[900], mt: 0.5, fontWeight: 500, display: 'block' }}>
                                {stand.oem.name} • {stand.oem.engine}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Engine Compatibility */}
                    <Box sx={{ display: 'flex', gap: 1.5, minHeight: '40px' }}>
                        <Plane size={16} color={brandColors.neutral[500]} style={{ marginTop: 2 }} />
                        <Box>
                            <Typography variant="caption" sx={{ color: brandColors.neutral[500], display: 'block' }}>Engine Compatibility</Typography>
                            <Stack direction="row" spacing={0.5} mt={0.5} flexWrap="wrap" useFlexGap sx={{ minHeight: '24px' }}>
                                {stand.engineCompatibility.slice(0, 3).map(engine => (
                                    <Chip
                                        key={engine}
                                        label={engine}
                                        size="small"
                                        style={{ height: '20px', fontSize: '10px' }}
                                        color="info" // Default info color
                                        variant="filled" // Updated to filled for visibility
                                        sx={{ bgcolor: brandColors.neutral[100], color: brandColors.neutral[700] }}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    </Box>

                    {/* Active Dimensions */}
                    <Box sx={{ display: 'flex', gap: 1.5, minHeight: '40px' }}>
                        <Maximize size={16} color={brandColors.neutral[500]} style={{ marginTop: 2 }} />
                        <Box>
                            <Typography variant="caption" sx={{ color: brandColors.neutral[500], display: 'block' }}>Active Dimensions</Typography>
                            <Typography variant="caption" sx={{ color: brandColors.neutral[900], mt: 0.5, fontWeight: 500, display: 'block' }}>
                                {stand.measurement.length}x{stand.measurement.width}x{stand.measurement.height}mm • {stand.measurement.weight}{stand.measurement.weightUnit}
                            </Typography>
                        </Box>
                    </Box>

                </Box>
            </Box>
        </Card>
    );
};

export default StandCard;
