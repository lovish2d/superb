import { Box, ListItem, ListItemButton, Typography, Menu, MenuItem } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { brandColors } from '@/theme';
import type { NavItem } from '../../types';
import VerticalChildren from './components/VerticalChildren';
import HorizontalChildren from './components/HorizontalChildren';

type SidebarItemProps = {
    item: NavItem;
    collapsed: boolean;
    isExpanded: boolean;
    activePath?: string;
    onToggleExpand: (id: string) => void;
    onNavigate?: (path: string) => void;
};

const SidebarItem = ({
    item,
    collapsed,
    isExpanded,
    activePath,
    onToggleExpand,
    onNavigate,
}: SidebarItemProps) => {
    const { t } = useTranslation('sidebar');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const hasChildren = item.children && item.children.length > 0;

    const isChildActive = (child: NavItem): boolean => {
        return child.path === activePath;
    };

    const isItemActive = (): boolean => {
        if (item.path === activePath) return true;
        if (item.children && item.children.length > 0) {
            return item.children.some((child) => child.path === activePath);
        }
        return false;
    };

    const isActive = isItemActive();
    const isHorizontal = item.horizontalChildren === true;

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (hasChildren && collapsed) {
            setAnchorEl(event.currentTarget);
        } else if (hasChildren) {
            onToggleExpand(item.id);
        } else if (item.path && onNavigate) {
            onNavigate(item.path);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuClick = (path?: string) => {
        if (path && onNavigate) {
            onNavigate(path);
        }
        handleClose();
    };

    return (
        <Box>
            <ListItem disablePadding>
                <ListItemButton
                    onClick={handleClick}
                    sx={{
                        minHeight: 44,
                        px: collapsed ? 1.5 : 1.5,
                        py: 1,
                        borderRadius: hasChildren ? '6px' : '8px',
                        justifyContent: collapsed ? 'center' : 'flex-start',
                        bgcolor:
                            isActive && hasChildren
                                ? brandColors.neutral[900]
                                : isActive && !hasChildren
                                    ? alpha(brandColors.primary.main, 0.08)
                                    : 'transparent',
                        border: isActive
                            ? hasChildren
                                ? `1px solid ${brandColors.primary.hover}`
                                : `1px solid ${brandColors.primary.main}`
                            : '1px solid transparent',
                        '&:hover': {
                            bgcolor:
                                hasChildren && isActive
                                    ? brandColors.neutral[900]
                                    : isActive && !hasChildren
                                        ? alpha(brandColors.primary.main, 0.12)
                                        : alpha(brandColors.neutral[500], 0.1),
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: collapsed ? 0 : 1.5,
                            width: collapsed ? 'auto' : '100%',
                            justifyContent: collapsed ? 'center' : 'flex-start',
                        }}
                    >
                        {item.icon && (
                            <item.icon
                                size={20}
                                color={isActive ? brandColors.primary.main : brandColors.neutral[200]}
                                strokeWidth={1.5}
                            />
                        )}

                        {!collapsed && (
                            <>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color:
                                            isActive && hasChildren
                                                ? brandColors.white
                                                : isActive && !hasChildren
                                                    ? brandColors.primary.main
                                                    : brandColors.neutral[200],
                                        flex: 1,
                                    }}
                                >
                                    {t(item.labelKey)}
                                </Typography>
                                {item.chip && (
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: item.chip.color || (isActive ? brandColors.primary.main : brandColors.neutral[500]),
                                            fontWeight: 600,
                                            fontSize: '0.75rem',
                                            lineHeight: 1,
                                            mr: hasChildren ? 1 : 0,
                                        }}
                                    >
                                        {item.chip.label}
                                    </Typography>
                                )}
                                {hasChildren && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: isExpanded ? brandColors.white : brandColors.neutral[200],
                                            transform: isExpanded ? 'rotate(180deg)' : 'none',
                                            transition: 'transform 0.2s ease',
                                        }}
                                    >
                                        <ChevronDown size={16} />
                                    </Box>
                                )}
                            </>
                        )}
                    </Box>
                </ListItemButton>

                {/* Menu for Collapsed State */}
                {hasChildren && collapsed && (
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'left',
                        }}
                        slotProps={{
                            paper: {
                                sx: {
                                    bgcolor: brandColors.neutral[900],
                                    border: `1px solid ${brandColors.neutral[700]}`,
                                    ml: 1,
                                    borderRadius: '8px',
                                },
                            },
                        }}
                    >
                        {item.children?.map((child) => {
                            const isChildActiveState = isChildActive(child);
                            return (
                                <MenuItem
                                    key={child.id}
                                    onClick={() => handleMenuClick(child.path)}
                                    sx={{
                                        color: isChildActiveState ? brandColors.primary.main : brandColors.neutral[200],
                                        '&:hover': {
                                            bgcolor: alpha(brandColors.primary.main, 0.1),
                                            color: brandColors.primary.main,
                                        },
                                        fontSize: '0.875rem',
                                        minWidth: '150px',
                                    }}
                                >
                                    {t(child.labelKey)}
                                </MenuItem>
                            );
                        })}
                    </Menu>
                )}
            </ListItem>

            {/* Sub-items - Vertical Layout */}
            {hasChildren && isExpanded && !collapsed && !isHorizontal && (
                <VerticalChildren
                    children={item.children!}
                    activePath={activePath}
                    onNavigate={onNavigate}
                />
            )}

            {/* Sub-items - Horizontal Layout */}
            {hasChildren && isExpanded && !collapsed && isHorizontal && (
                <HorizontalChildren
                    children={item.children!}
                    activePath={activePath}
                    onNavigate={onNavigate}
                />
            )}
        </Box>
    );
};

export default SidebarItem;
