import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Download, Plus, Users as UsersIcon, CheckCircle, Clock, Briefcase } from 'lucide-react';
import { brandColors } from '@/theme';
import PageContainer from '@/components/common/PageContainer';
import UserStatCard from './components/UserStatCard';
import UsersTable from './components/UsersTable';
import NewRequestsTable from './components/NewRequestsTable';
import AddUserModal from './modals/AddUserModal';
import { mockUsers, mockNewRequests } from './data';

type UsersTab = 'all_users' | 'new_requests';

const Users = () => {
  const { t } = useTranslation('users');
  const [activeTab, setActiveTab] = useState<UsersTab>('all_users');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const handleExport = () => {
    // Export functionality
  };

  const handleAddUser = () => {
    setIsAddUserModalOpen(true);
  };

  const handleApprove = (id: string) => {
    // Handle approve functionality
    console.log('Approve user:', id);
  };

  const handleReject = (id: string) => {
    // Handle reject functionality
    console.log('Reject user:', id);
  };

  return (
    <PageContainer
      title={t('page.title')}
      subtitle={t('page.subtitle')}
      headerRightContent={
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<Download size={16} />}
            onClick={handleExport}
            sx={{
              bgcolor: brandColors.white,
              borderColor: brandColors.neutral[200],
              color: brandColors.neutral[900],
              height: 36,
              px: 2.125,
              py: 0.875,
              '&:hover': {
                bgcolor: brandColors.white,
                borderColor: brandColors.neutral[200],
              },
            }}
          >
            {t('header.export')}
          </Button>
          <Button
            variant="contained"
            startIcon={<Plus size={16} />}
            onClick={handleAddUser}
            sx={{
              bgcolor: brandColors.primary.main,
              color: brandColors.white,
              height: 36,
              px: 2,
              py: 0.875,
              minWidth: 129,
              '&:hover': {
                bgcolor: brandColors.primary.hover,
              },
            }}
          >
            {t('header.add_user')}
          </Button>
        </Box>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.75, width: '100%' }}>
        {/* Stat Cards */}
        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
          <Box sx={{ flex: 1 }}>
            <UserStatCard
              labelKey="total_users"
              value={156}
              icon={<UsersIcon size={16} color={brandColors.primary.main} />}
              iconBgColor={brandColors.primary.light}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <UserStatCard
              labelKey="active_users"
              value={3}
              icon={<CheckCircle size={16} color={brandColors.success.main} />}
              iconBgColor={brandColors.success.light}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <UserStatCard
              labelKey="pending_approval"
              value={5}
              icon={<Clock size={16} color={brandColors.warning.main} />}
              iconBgColor={brandColors.warning.light}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <UserStatCard
              labelKey="operations"
              value={1}
              icon={<Briefcase size={16} color={brandColors.primary.main} />}
              iconBgColor={brandColors.primary.light}
            />
          </Box>
        </Box>

        {/* Tabs */}
        <Box
          sx={{
            bgcolor: brandColors.neutral[50],
            borderRadius: '10px',
            p: 0.5,
            display: 'flex',
            gap: 3.75,
          }}
        >
          <Box
            onClick={() => setActiveTab('all_users')}
            sx={{
              bgcolor: activeTab === 'all_users' ? brandColors.white : 'transparent',
              borderRadius: '8px',
              px: 1.25,
              py: 1.25,
              display: 'flex',
              gap: 0.75,
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <Typography
              sx={{
                color: activeTab === 'all_users' ? brandColors.neutral[900] : brandColors.neutral[500],
                fontSize: '14px',
                fontWeight: activeTab === 'all_users' ? 500 : 400,
                lineHeight: activeTab === 'all_users' ? 'normal' : '20px',
              }}
            >
              {t('tabs.all_users')}
            </Typography>
            <Box
              sx={{
                bgcolor: activeTab === 'all_users' ? brandColors.primary.light : brandColors.neutral[100],
                border: `1.275px solid ${brandColors.neutral[200]}`,
                borderRadius: '8px',
                height: 22.546,
                px: 1.16,
                py: 0.41,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                sx={{
                  color: brandColors.badge.primary.text,
                  fontSize: '12px',
                  fontWeight: 400,
                }}
              >
                4
              </Typography>
            </Box>
          </Box>
          <Box
            onClick={() => setActiveTab('new_requests')}
            sx={{
              bgcolor: activeTab === 'new_requests' ? brandColors.white : 'transparent',
              borderRadius: '8px',
              px: 1.25,
              py: 1.25,
              display: 'flex',
              gap: 0.75,
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <Typography
              sx={{
                color: activeTab === 'new_requests' ? brandColors.neutral[900] : brandColors.neutral[500],
                fontSize: '14px',
                fontWeight: activeTab === 'new_requests' ? 500 : 400,
                lineHeight: activeTab === 'new_requests' ? 'normal' : '20px',
              }}
            >
              {t('tabs.new_requests')}
            </Typography>
            <Box
              sx={{
                bgcolor: brandColors.neutral[100],
                border: `1.275px solid ${brandColors.neutral[200]}`,
                borderRadius: '8px',
                height: 22.546,
                px: 1.16,
                py: 0.41,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                sx={{
                  color: brandColors.badge.primary.text,
                  fontSize: '12px',
                  fontWeight: 400,
                }}
              >
                4
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Users Table */}
        {activeTab === 'all_users' ? (
          <UsersTable users={mockUsers} />
        ) : (
          <NewRequestsTable
            requests={mockNewRequests}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}
      </Box>

      {/* Add User Modal */}
      <AddUserModal
        open={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onSuccess={() => {
          setIsAddUserModalOpen(false);
          // Refresh users list
        }}
      />
    </PageContainer>
  );
};

export default Users;

