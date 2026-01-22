import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { theme } from '@/theme/index';
import store from '@/store';
import Login from '@/pages/public/Login';
import ForgotPassword from '@/pages/public/ForgotPassword';
import Dashboard from '@/pages/platform/Dashboard';
import ComingSoon from '@/pages/platform/ComingSoon';
import Stands from '@/pages/platform/Stands';
import StandDetail from '@/pages/platform/Stands/StandDetail';
import Users from '@/pages/platform/Users';
import PlatformLayout from '@/components/layouts/PlatformLayout';
import AuthGuard from '@/guards/AuthGuard';
import GuestGuard from '@/guards/GuestGuard';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route
              path="/login"
              element={
                <GuestGuard>
                  <Login />
                </GuestGuard>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <GuestGuard>
                  <ForgotPassword />
                </GuestGuard>
              }
            />
            <Route
              element={
                <AuthGuard>
                  <PlatformLayout />
                </AuthGuard>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Stand Registry */}
              <Route path="/stands" element={<Stands />} />
              <Route path="/stands/:id" element={<StandDetail />} />
              <Route path="/tracking-map" element={<ComingSoon />} />
              <Route path="/iot-tracking" element={<ComingSoon />} />
              {/* Superb Users */}
              <Route path="/users" element={<Users />} />
              <Route path="/users/roles" element={<ComingSoon />} />
              <Route path="/users/operations" element={<Users />} />
              <Route path="/users/technicians" element={<Users />} />
              <Route path="/users/logistics" element={<Users />} />
              <Route path="/users/admins" element={<Users />} />
              {/* Inspections */}
              <Route path="/inspections" element={<ComingSoon />} />
              <Route path="/inspections/schedules" element={<ComingSoon />} />
              {/* Deployment */}
              <Route path="/deployment" element={<ComingSoon />} />
              <Route path="/deployment/locations" element={<ComingSoon />} />
              {/* Other Pages */}
              <Route path="/logistics" element={<ComingSoon />} />
              <Route path="/maintenance" element={<ComingSoon />} />
              <Route path="/reference-data" element={<ComingSoon />} />
              <Route path="/reports" element={<ComingSoon />} />
              <Route path="/audit-log" element={<ComingSoon />} />
              <Route path="/settings" element={<ComingSoon />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
