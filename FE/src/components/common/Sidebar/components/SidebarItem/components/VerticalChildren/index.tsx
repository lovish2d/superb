import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { brandColors } from '@/theme';
import type { NavItem } from '../../../../types';

type VerticalChildrenProps = {
    children: NavItem[];
    activePath?: string;
    onNavigate?: (path: string) => void;
};

const VerticalChildren = ({ children, activePath, onNavigate }: VerticalChildrenProps) => {
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
                                height: '34px',
                                alignItems: 'center',
                                paddingX: '16px',
                                paddingY: '12px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                width: '100%',
                                transition: 'all 0.2s ease',
                                bgcolor: isChildActiveState ? alpha(brandColors.primary.main, 0.08) : 'transparent',
                                border: isChildActiveState ? `1px solid ${brandColors.primary.main}` : '1px solid transparent',
                                '&:hover': {
                                    backgroundColor: isChildActiveState ? alpha(brandColors.primary.main, 0.12) : alpha(brandColors.white, 0.05),
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

export default VerticalChildren;
