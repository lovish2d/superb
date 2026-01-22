import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PageContainer from '@/components/common/PageContainer';
import DashboardFilters from './components/DashboardFilters';
import StatsSection from './components/StatsSection';
import QuickActions from './components/QuickActions';
import StandsPieChart from './components/Charts/StandsPieChart';
import MaintenanceBarChart from './components/Charts/MaintenanceBarChart';
import RecentActivity from './components/RecentActivity';
import StandsOverview from './components/StandsOverview';

const Dashboard = () => {
  const { t } = useTranslation('dashboard');

  // Format last updated timestamp
  const formatLastUpdated = () => {
    const getTimestamp = () => new Date();
    const now = getTimestamp();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  };

  return (
    <PageContainer
      title={t('title')}
      subtitle={t('subtitle')}
      lastUpdated={`${t('last_updated')} ${formatLastUpdated()}`}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 2, sm: 3, md: '30px' },
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
        }}
      >
        <DashboardFilters />

        <StatsSection />

        <QuickActions />

        <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ width: '100%', maxWidth: '100%', margin: 0, boxSizing: 'border-box' }}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
            <StandsPieChart />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
            <MaintenanceBarChart />
          </Grid>
        </Grid>

        <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ width: '100%', maxWidth: '100%', margin: 0, boxSizing: 'border-box' }}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
            <RecentActivity />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
            <StandsOverview />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
