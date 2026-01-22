import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { brandColors } from '@/theme';
import type { NavItem } from '../../../../types';

type HorizontalChildrenProps = {
    children: NavItem[];
    activePath?: string;
    onNavigate?: (path: string) => void;
};

const HorizontalChildren = ({ children, activePath, onNavigate }: HorizontalChildrenProps) => {
    const { t } = useTranslation('sidebar');

    const isChildActive = (child: NavItem): boolean => {
        return child.path === activePath;
    };

    const handleChildClick = (e: React.MouseEvent, child: NavItem) => {
        e.stopPropagation();
        if (child.path && onNavigate) {
            onNavigate(child.path);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                gap: '14px',
                alignItems: 'flex-start',
                paddingLeft: '26px',
                paddingRight: 0,
                paddingY: 0,
                width: '100%',
                marginTop: '8px',
            }}
        >
            <Box
                sx={{
                    width: '1px',
                    backgroundColor: brandColors.neutral[700],
                    flexShrink: 0,
                    alignSelf: 'stretch',
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    flex: '1 0 0',
                    flexDirection: 'column',
                    gap: '6px',
                    alignItems: 'flex-start',
                }}
            >
                {children.map((child) => {
                    const isChildActiveState = isChildActive(child);
                    return (
                        <Box
                            key={child.id}
                            onClick={(e) => handleChildClick(e, child)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                paddingX: '12px',
                                paddingY: '8px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                width: '100%',
                                bgcolor: isChildActiveState ? alpha(brandColors.primary.main, 0.08) : 'transparent',
                                border: isChildActiveState ? `1px solid ${brandColors.primary.main}` : '1px solid transparent',
                                '&:hover': {
                                    bgcolor: isChildActiveState ? alpha(brandColors.primary.main, 0.12) : alpha(brandColors.white, 0.05),
                                },
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    color: isChildActiveState ? brandColors.primary.main : brandColors.neutral[200],
                                }}
                            >
                                {t(child.labelKey)}
                            </Typography>
                            {child.chip && (
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: child.chip.color || (isChildActiveState ? brandColors.primary.main : brandColors.neutral[500]),
                                        fontWeight: 600,
                                        fontSize: '0.75rem',
                                        lineHeight: 1,
                                        ml: 'auto',
                                    }}
                                >
                                    {child.chip.label}
                                </Typography>
                            )}
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default HorizontalChildren;
