import { Box, Tabs, Tab, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { brandColors } from '@/theme';

type StandStatus = 'all' | 'available' | 'in_use' | 'in_transit' | 'maintenance' | 'new_listed' | 'deactivated';

type StandsTabsProps = {
  activeTab: StandStatus;
  onTabChange: (tab: StandStatus) => void;
  counts: {
    all: number;
    available: number;
    in_use: number;
    in_transit: number;
    maintenance: number;
    new_listed: number;
    deactivated: number;
  };
};

const StandsTabs = ({ activeTab, onTabChange, counts }: StandsTabsProps) => {
  const { t } = useTranslation('stands');

  const tabs: Array<{ value: StandStatus; label: string; count: number }> = [
    { value: 'all', label: t('tabs.all_stands'), count: counts.all },
    { value: 'available', label: t('tabs.available'), count: counts.available },
    { value: 'in_use', label: t('tabs.in_use'), count: counts.in_use },
    { value: 'in_transit', label: t('tabs.in_transit'), count: counts.in_transit },
    { value: 'maintenance', label: t('tabs.maintenance'), count: counts.maintenance },
    { value: 'new_listed', label: t('tabs.new_listed'), count: counts.new_listed },
    { value: 'deactivated', label: t('tabs.deactivated'), count: counts.deactivated },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        mb: 3,
      }}
    >
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => onTabChange(newValue as StandStatus)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          backgroundColor: brandColors.neutral[50],
          borderRadius: '10px',
          padding: '4px',
          minHeight: 'auto',
          '& .MuiTabs-indicator': {
            display: 'none',
          },
          '& .MuiTabs-flexContainer': {
            gap: 0,
          },
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;
          const badgeColor = isActive ? brandColors.badge.primary : brandColors.badge.secondary;

          return (
            <Tab
              key={tab.value}
              value={tab.value}
              label={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Box component="span">{tab.label}</Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: badgeColor.background,
                      border: `1px solid ${badgeColor.border}`,
                      color: badgeColor.text,
                      minWidth: '20px',
                      height: 23, // 22.55 rounded
                      borderRadius: '8px',
                      padding: '2px 8px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <Typography variant="caption" sx={{ color: 'inherit' }}>
                      {tab.count}
                    </Typography>
                  </Box>
                </Box>
              }
              sx={{
                textTransform: 'none',
                color: 'text.secondary',
                padding: '10px 12px',
                minHeight: '43px',
                borderRadius: '8px',
                marginRight: 0,
                '&.Mui-selected': {
                  color: 'text.primary',
                  backgroundColor: brandColors.white,
                  boxShadow: 'none',
                },
                '&:hover': {
                  color: 'text.primary',
                  backgroundColor: 'transparent',
                },
              }}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};

export default StandsTabs;

