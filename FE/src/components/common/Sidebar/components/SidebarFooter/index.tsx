import { Box, List, ListItem, ListItemButton, Typography, Button } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { LogOut, FileText, Settings as SettingsIcon } from 'lucide-react';
import { brandColors } from '@/theme';
import type { NavItem } from '../../types';

type SidebarFooterProps = {
    collapsed: boolean;
    onLogout?: () => void;
    onNavigate?: (path: string) => void;
};

const SidebarFooter = ({ collapsed, onLogout, onNavigate }: SidebarFooterProps) => {
    const { t } = useTranslation('sidebar');

    const bottomItems: NavItem[] = [
        {
            id: 'audit_log',
            labelKey: 'audit_log',
            icon: FileText,
            path: '/audit-log',
        },
        {
            id: 'settings',
            labelKey: 'settings',
            icon: SettingsIcon,
            path: '/settings',
        },
    ];

    const handleItemClick = (item: NavItem) => {
        if (item.path && onNavigate) {
            onNavigate(item.path);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexShrink: 0, mt: 2 }}>
            <List sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {bottomItems.map((item) => {
                    return (
                        <ListItem key={item.id} disablePadding>
                            <ListItemButton
                                onClick={() => handleItemClick(item)}
                                sx={{
                                    minHeight: 44,
                                    px: 1.5,
                                    py: 1,
                                    borderRadius: '8px',
                                    justifyContent: collapsed ? 'center' : 'flex-start',
                                    '&:hover': {
                                        bgcolor: alpha(brandColors.neutral[500], 0.1),
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.5,
                                        width: '100%',
                                        justifyContent: collapsed ? 'center' : 'flex-start',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 20,
                                            height: 20,
                                            flexShrink: 0,
                                        }}
                                    >
                                        {item.icon && (
                                            <item.icon
                                                size={20}
                                                color={collapsed ? brandColors.white : brandColors.neutral[500]}
                                                strokeWidth={collapsed ? 2 : 1.5}
                                            />
                                        )}
                                    </Box>
                                    {!collapsed && (
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: brandColors.neutral[500],
                                            }}
                                        >
                                            {t(item.labelKey)}
                                        </Typography>
                                    )}
                                </Box>
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            {/* Logout Button */}
            <Button
                onClick={onLogout}
                variant="contained"
                startIcon={<LogOut size={20} />}
                sx={{
                    bgcolor: brandColors.primary.main,
                    color: brandColors.white,
                    minHeight: 36,
                    px: collapsed ? 1.5 : 2,
                    py: 0.875,
                    borderRadius: '8px',
                    textTransform: 'none',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    '&:hover': {
                        bgcolor: brandColors.primary.hover,
                    },
                    '& .MuiButton-startIcon': {
                        marginRight: collapsed ? 0 : 1,
                    },
                }}
            >
                {!collapsed && t('logout')}
            </Button>
        </Box>
    );
};

export default SidebarFooter;
