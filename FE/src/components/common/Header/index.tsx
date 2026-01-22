import { useState } from 'react';
import { Box, Typography, TextField, InputAdornment, IconButton, Badge, Avatar, Menu, MenuItem, Switch } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Search, Bell, ChevronDown, User } from 'lucide-react';
import { brandColors } from '@/theme';

type HeaderProps = {
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  notificationCount?: number;
  unitSystem?: 'metric' | 'imperial';
  onUnitChange?: (unit: 'metric' | 'imperial') => void;
  onSearch?: (query: string) => void;
  onNotificationsClick?: () => void;
  onUserMenuClick?: (action: string) => void;
};

const Header = ({
  userName = 'Alexander Martinez',
  userRole = 'Platform Administrator',
  userAvatar,
  notificationCount = 3,
  unitSystem = 'imperial',
  onUnitChange,
  onSearch,
  onNotificationsClick,
  onUserMenuClick,
}: HeaderProps) => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleUnitToggle = () => {
    if (onUnitChange) {
      onUnitChange(unitSystem === 'metric' ? 'imperial' : 'metric');
    }
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleUserMenuAction = (action: string) => {
    handleUserMenuClose();
    if (onUserMenuClick) {
      onUserMenuClick(action);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: brandColors.white,
        borderBottom: `1.275px solid ${brandColors.neutral[200]}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2.75, // 11px gap between search and right section
        px: 4, // 32px
        py: 1.625, // 13px
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Search Bar */}
      <Box
        sx={{
          width: 512,
          flexShrink: 0,
        }}
      >
        <TextField
          fullWidth
          placeholder={t('search_placeholder')}
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ mr: 1.5 }}>
                <Search size={16} color={brandColors.neutral[500]} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: brandColors.neutral[50],
              borderRadius: '8px',
              height: 36,
              px: 1.5, // 12px
              '& fieldset': {
                border: 'none',
              },
              '&:hover fieldset': {
                border: 'none',
              },
              '&.Mui-focused fieldset': {
                border: 'none',
              },
            },
            '& .MuiInputBase-input': {
              color: brandColors.neutral[500],
              fontSize: '14px',
              fontWeight: 400,
              '&::placeholder': {
                opacity: 0.5,
                color: brandColors.neutral[500],
                fontSize: '14px',
                fontWeight: 400,
              },
            },
          }}
        />
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.375, // 11px
        }}
      >
        {/* Unit Toggle */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            bgcolor: brandColors.white,
            border: `1.275px solid ${brandColors.neutral[200]}`,
            borderRadius: '10px',
            height: 34.5,
            width: 161,
            px: 1.5, // 12px
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: brandColors.neutral[900],
              fontSize: '12px',
              fontWeight: 500,
              lineHeight: '16px',
              position: 'absolute',
              left: 12,
              top: 8,
            }}
          >
            {t('metric')}
          </Typography>
          <Box
            sx={{
              position: 'absolute',
              left: 55.73,
              top: 6,
              width: 36,
              height: 20,
              bgcolor: brandColors.primary.main,
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              pl: 0.25,
              pr: 0,
              cursor: 'pointer',
            }}
            onClick={handleUnitToggle}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                bgcolor: brandColors.white,
                borderRadius: '50%',
                transition: 'transform 0.2s',
                transform: unitSystem === 'imperial' ? 'translateX(16px)' : 'translateX(0)',
              }}
            />
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: brandColors.neutral[500],
              fontSize: '12px',
              fontWeight: 500,
              lineHeight: '16px',
              position: 'absolute',
              right: 12,
              top: 8,
            }}
          >
            {t('imperial')}
          </Typography>
        </Box>

        {/* Notifications */}
        <IconButton
          onClick={onNotificationsClick}
          sx={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            position: 'relative',
            '&:hover': {
              bgcolor: brandColors.neutral[50],
            },
          }}
        >
          <Bell size={16} color={brandColors.neutral[500]} />
          {notificationCount > 0 && (
            <Box
              sx={{
                position: 'absolute',
                top: -4,
                right: -4,
                bgcolor: brandColors.critical.main,
                color: brandColors.white,
                borderRadius: '8px',
                minWidth: 20,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 500,
                border: `1.275px solid ${brandColors.white}`,
                px: 0.5,
              }}
            >
              {notificationCount}
            </Box>
          )}
        </IconButton>

        {/* User Profile */}
        <Box
          onClick={handleUserMenuOpen}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1, // 8px
            cursor: 'pointer',
            height: 36,
            borderRadius: '8px',
            px: 0.5,
            '&:hover': {
              bgcolor: brandColors.neutral[50],
            },
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: brandColors.neutral[50],
              border: `1px solid ${brandColors.neutral[200]}`,
            }}
          >
            {userAvatar ? (
              <Box component="img" src={userAvatar} alt={userName} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <User size={16} color={brandColors.neutral[500]} />
            )}
          </Avatar>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 36,
              width: 130,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: brandColors.neutral[900],
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 'normal',
              }}
            >
              {userName}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: brandColors.neutral[500],
                fontSize: '12px',
                fontWeight: 400,
                lineHeight: 'normal',
              }}
            >
              {userRole || t('platform_administrator')}
            </Typography>
          </Box>
          <ChevronDown size={16} color={brandColors.neutral[500]} />
        </Box>

        {/* User Menu */}
        <Menu
          anchorEl={userMenuAnchor}
          open={Boolean(userMenuAnchor)}
          onClose={handleUserMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={() => handleUserMenuAction('profile')}>{t('profile')}</MenuItem>
          <MenuItem onClick={() => handleUserMenuAction('settings')}>{t('settings')}</MenuItem>
          <MenuItem onClick={() => handleUserMenuAction('logout')}>{t('logout')}</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;

