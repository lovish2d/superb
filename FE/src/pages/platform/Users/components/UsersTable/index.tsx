import { Box, Typography, Avatar, Chip, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MoreVertical, Search, ChevronDown } from 'lucide-react';
import { brandColors } from '@/theme';
import CountryFlag from '@/components/common/CountryFlag';

type User = {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  division: string;
  country: string;
  countryCode: string;
  poolingCenter: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
};

type UsersTableProps = {
  users: User[];
};

const UsersTable = ({ users }: UsersTableProps) => {
  const { t } = useTranslation('users');



  return (
    <Box
      sx={{
        bgcolor: brandColors.white,
        border: `1.275px solid ${brandColors.neutral[200]}`,
        borderRadius: '14px',
        overflow: 'hidden',
      }}
    >
      {/* Table Header */}
      <Box
        sx={{
          bgcolor: 'rgba(248, 250, 252, 0.3)',
          borderBottom: `1.275px solid ${brandColors.neutral[50]}`,
          p: 3,
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {/* Search Input */}
          <Box
            sx={{
              flex: 1,
              bgcolor: brandColors.white,
              border: `1px solid ${brandColors.neutral[200]}`,
              borderRadius: '8px',
              height: 36,
              px: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Search size={16} color={brandColors.neutral[500]} />
            <Typography
              sx={{
                color: brandColors.neutral[500],
                fontSize: '14px',
                flex: 1,
                lineHeight: '20px',
              }}
            >
              {t('filters.search_placeholder')}
            </Typography>
          </Box>

          {/* Filters */}
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {/* Country Filter */}
            <Box
              sx={{
                bgcolor: brandColors.neutral[50],
                border: `1.275px solid transparent`,
                borderRadius: '8px',
                height: 36,
                px: 1.66,
                py: 0.16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minWidth: 150,
              }}
            >
              <Typography sx={{ color: brandColors.neutral[900], fontSize: '14px' }}>
                {t('filters.all_countries')}
              </Typography>
              <ChevronDown size={16} color={brandColors.neutral[500]} />
            </Box>

            {/* Pooling Center Filter */}
            <Box
              sx={{
                bgcolor: brandColors.neutral[50],
                border: `1.275px solid transparent`,
                borderRadius: '8px',
                height: 36,
                px: 1.66,
                py: 0.16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minWidth: 185,
              }}
            >
              <Typography sx={{ color: brandColors.neutral[900], fontSize: '14px' }}>
                {t('filters.all_pooling_centers')}
              </Typography>
              <ChevronDown size={16} color={brandColors.neutral[500]} />
            </Box>

            {/* User Type Filter */}
            <Box
              sx={{
                bgcolor: brandColors.neutral[50],
                border: `1.275px solid transparent`,
                borderRadius: '8px',
                height: 36,
                px: 1.66,
                py: 0.16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minWidth: 150,
              }}
            >
              <Typography sx={{ color: brandColors.neutral[900], fontSize: '14px' }}>
                {t('filters.all_users')}
              </Typography>
              <ChevronDown size={16} color={brandColors.neutral[500]} />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Table Content */}
      <Box sx={{ minWidth: 1000 }}> {/* Ensure minimum width for grid */}
        {/* Table Headers */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'minmax(200px, 2.5fr) minmax(200px, 2fr) minmax(150px, 1.5fr) minmax(200px, 2fr) 100px minmax(120px, 1fr) 60px',
            borderBottom: `1px solid ${brandColors.neutral[200]}`,
            bgcolor: brandColors.white,
            height: 47,
            alignItems: 'center',
          }}
        >
          <Box sx={{ pl: 3, pr: 1.25 }}>
            <Typography sx={{ color: brandColors.neutral[900], fontSize: '12px', fontWeight: 400 }}>
              {t('table.headers.user')}
            </Typography>
          </Box>
          <Box sx={{ pl: 2, pr: 1.25 }}>
            <Typography sx={{ color: brandColors.neutral[900], fontSize: '12px', fontWeight: 400 }}>
              {t('table.headers.division_role')}
            </Typography>
          </Box>
          <Box sx={{ pl: 2, pr: 1.25 }}>
            <Typography sx={{ color: brandColors.neutral[900], fontSize: '12px', fontWeight: 400 }}>
              {t('table.headers.country')}
            </Typography>
          </Box>
          <Box sx={{ pl: 2, pr: 1.25 }}>
            <Typography sx={{ color: brandColors.neutral[900], fontSize: '12px', fontWeight: 400 }}>
              {t('table.headers.contact')}
            </Typography>
          </Box>
          <Box sx={{ pl: 2, pr: 1.25 }}>
            <Typography sx={{ color: brandColors.neutral[900], fontSize: '12px', fontWeight: 400 }}>
              {t('table.headers.status')}
            </Typography>
          </Box>
          <Box sx={{ pl: 2 }}>
            <Typography sx={{ color: brandColors.neutral[900], fontSize: '12px', fontWeight: 400 }}>
              {t('table.headers.last_login')}
            </Typography>
          </Box>
          <Box sx={{ pl: 2, pr: 1.25, display: 'flex', justifyContent: 'center' }}>
            <Typography sx={{ color: brandColors.neutral[900], fontSize: '12px', fontWeight: 400 }}>
              {t('table.headers.action')}
            </Typography>
          </Box>
        </Box>

        {/* Table Rows */}
        {users.map((user) => (
          <Box
            key={user.id}
            sx={{
              display: 'grid',
              gridTemplateColumns: 'minmax(200px, 2.5fr) minmax(200px, 2fr) minmax(150px, 1.5fr) minmax(200px, 2fr) 100px minmax(120px, 1fr) 60px',
              borderBottom: `1px solid ${brandColors.neutral[200]}`,
              bgcolor: brandColors.neutral[50],
              minHeight: 82,
              alignItems: 'center',
            }}
          >
            {/* User */}
            <Box sx={{ p: 2, pl: 3, display: 'flex', gap: 1.5, alignItems: 'center' }}>
              <Avatar
                src={user.avatar}
                sx={{
                  width: 44,
                  height: 44,
                  bgcolor: brandColors.neutral[50],
                  color: brandColors.neutral[900],
                }}
              >
                {user.name.charAt(0)}
              </Avatar>
              <Typography sx={{ color: brandColors.neutral[900], fontSize: '14px', lineHeight: '20px' }}>
                {user.name}
              </Typography>
            </Box>

            {/* Division & Role */}
            <Box sx={{ p: 2, pl: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography sx={{ color: brandColors.neutral[900], fontSize: '14px', lineHeight: '20px' }}>
                {user.role}
              </Typography>
              <Typography sx={{ color: '#9E9EA9', fontSize: '12px' }}>
                {user.division}
              </Typography>
            </Box>

            {/* Country */}
            <Box sx={{ p: 2, pl: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0.5 }}>
              <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center' }}>
                <CountryFlag countryCode={user.countryCode} />
                <Typography sx={{ color: brandColors.neutral[900], fontSize: '14px', lineHeight: '20px' }}>
                  {user.country}
                </Typography>
              </Box>
              <Typography sx={{ color: brandColors.neutral[500], fontSize: '12px', lineHeight: '16px' }}>
                {user.poolingCenter}
              </Typography>
            </Box>

            {/* Contact */}
            <Box sx={{ p: 2, pl: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0.5 }}>
              <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center' }}>
                <Mail size={12} color={brandColors.neutral[500]} />
                <Typography sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                  {user.email}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center' }}>
                <Phone size={12} color={brandColors.neutral[500]} />
                <Typography sx={{ color: brandColors.neutral[500], fontSize: '12px' }}>
                  {user.phone}
                </Typography>
              </Box>
            </Box>

            {/* Status */}
            <Box sx={{ p: 2, pl: 2, display: 'flex', alignItems: 'center', borderRight: `1px solid ${brandColors.neutral[200]}` }}>
              <Chip
                label={t(`table.status.${user.status}`)}
                size="small"
                color={
                  user.status === 'active'
                    ? 'success'
                    : user.status === 'pending'
                      ? 'warning'
                      : 'secondary'
                }
                sx={{
                  height: 24,
                  fontSize: '12px',
                  fontWeight: 400,
                }}
              />
            </Box>

            {/* Last Login */}
            <Box sx={{ p: 2, pl: 2, display: 'flex', alignItems: 'center', borderRight: `1px solid ${brandColors.neutral[200]}` }}>
              <Typography sx={{ color: brandColors.neutral[900], fontSize: '14px', lineHeight: '20px' }}>
                {user.lastLogin}
              </Typography>
            </Box>

            {/* Action */}
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconButton size="small" sx={{ color: brandColors.neutral[900], width: 16, height: 16, p: 0 }}>
                <MoreVertical size={16} />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Table Footer */}
      <Box
        sx={{
          bgcolor: 'rgba(248, 250, 252, 0.3)',
          borderTop: `1.275px solid ${brandColors.neutral[200]}`,
          px: 3,
          pt: 0.16,
          pb: 0,
          height: 65.247,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ color: brandColors.neutral[700], fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
          {t('table.footer.showing')} <span style={{ color: brandColors.neutral[900] }}>{users.length}</span> {t('table.footer.users')}
        </Typography>
      </Box>
    </Box>
  );
};

export default UsersTable;

