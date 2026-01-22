import { Box, Typography, Divider, IconButton } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { brandColors } from '@/theme';
import LogoIcon from '@/assets/images/SidebarLogo.svg';

type SidebarHeaderProps = {
  collapsed: boolean;
  onToggleCollapse: () => void;
};

const SidebarHeader = ({ collapsed, onToggleCollapse }: SidebarHeaderProps) => {
  const { t } = useTranslation('sidebar');

  return (
    <Box sx={{ flexShrink: 0, mb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          gap: 1.5,
          mb: 3,
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            flex: collapsed ? 0 : 1,
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
        >
          <Box
            component="img"
            src={LogoIcon}
            alt="Superb Logo"
            sx={{
              width: '51.983px',
              height: '25.155px',
              flexShrink: 0,
            }}
          />
          {!collapsed && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '39.495px',
                alignItems: 'flex-start',
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  color: brandColors.white,
                  width: '77px',
                }}
              >
                {t('app_name')}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: brandColors.neutral[500],
                  width: '77px',
                }}
              >
                {t('app_subtitle')}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Collapse/Expand Toggle Button - 50% inside, 50% outside */}
        <IconButton
          onClick={onToggleCollapse}
          sx={{
            position: 'absolute',
            right: -16, // Half of button width (32px / 2 = 16px) to position 50% outside
            top: 40,
            transform: 'translateY(-50%)',
            width: 32,
            height: 32,
            bgcolor: brandColors.neutral[900],
            color: brandColors.neutral[200],
            borderRadius: '50%',
            border: `1px solid ${alpha(brandColors.neutral[200], 0.2)}`,
            zIndex: 1300, // Higher z-index to stay above content
            '&:hover': {
              bgcolor: brandColors.neutral[700],
              color: brandColors.white,
              border: `1px solid ${alpha(brandColors.neutral[200], 0.4)}`,
            },
            '&:focus': {
              outline: 'none',
              boxShadow: 'none',
            },
            '&:active': {
              bgcolor: brandColors.neutral[700],
            },
          }}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </IconButton>
      </Box>

      <Divider sx={{ bgcolor: alpha(brandColors.neutral[500], 0.1), height: '1px' }} />
    </Box>
  );
};

export default SidebarHeader;
