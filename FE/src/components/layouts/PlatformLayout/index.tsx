import { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';

const PlatformLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handleUserMenuAction = (action: string) => {
    if (action === 'logout') {
      handleLogout();
    } else if (action === 'profile') {
      navigate('/profile');
    } else if (action === 'settings') {
      navigate('/settings');
    }
  };

  const handleToggleCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden' }}>
      <Sidebar
        activePath={location.pathname}
        onNavigate={navigate}
        onLogout={handleLogout}
        collapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100%', overflow: 'hidden' }}>
        <Header
          userName={user ? `${user.firstName} ${user.lastName}` : undefined}
          userRole={user?.roles?.[0]?.name || undefined}
          onUserMenuClick={handleUserMenuAction}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default PlatformLayout;
