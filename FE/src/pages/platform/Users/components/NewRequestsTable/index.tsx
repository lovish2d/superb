import { Box, Typography, Avatar, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Check, X } from 'lucide-react';
import { alpha } from '@mui/material/styles';
import { brandColors } from '@/theme';
import CountryFlag from '@/components/common/CountryFlag';

type NewRequest = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  division: string;
  country: string;
  countryCode: string;
  poolingCenter: string;
  requestedDate: string;
};

type NewRequestsTableProps = {
  requests: NewRequest[];
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
};

const NewRequestsTable = ({ requests, onApprove, onReject }: NewRequestsTableProps) => {
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
      {/* Table Content */}
      <Box>
        {/* Table Headers */}
        <Box
          sx={{
            display: 'flex',
            borderBottom: `1px solid ${brandColors.neutral[200]}`,
            bgcolor: brandColors.white,
            height: 47,
          }}
        >
          <Box sx={{ width: 254, pl: 3, pr: 1.25, py: 2, display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ color: brandColors.neutral[900], fontSize: '12px', fontWeight: 400 }}>
              {t('table.headers.user')}
            </Typography>
          </Box>
          <Box sx={{ flex: 1, pl: 2, pr: 1.25, py: 2, display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ color: brandColors.neutral[900], fontSize: '12px', fontWeight: 400 }}>
              {t('table.headers.division_role')}
            </Typography>
          </Box>
          <Box sx={{ flex: 1, pl: 2, pr: 1.25, py: 2, display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ color: brandColors.neutral[900], fontSize: '12px', fontWeight: 400 }}>
              {t('table.headers.location')}
            </Typography>
          </Box>
          <Box sx={{ flex: 1, p: 2, display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ color: brandColors.neutral[900], fontSize: '12px', fontWeight: 400 }}>
              {t('table.headers.requested_date')}
            </Typography>
          </Box>
          <Box sx={{ width: 260, p: 2, display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ color: brandColors.neutral[900], fontSize: '12px', fontWeight: 400 }}>
              {t('table.headers.actions')}
            </Typography>
          </Box>
        </Box>

        {/* Table Rows */}
        {requests.map((request) => (
          <Box
            key={request.id}
            sx={{
              display: 'flex',
              borderBottom: `1px solid ${brandColors.neutral[200]}`,
              bgcolor: brandColors.neutral[50],
              minHeight: 82,
            }}
          >
            {/* User */}
            <Box sx={{ width: 254, p: 2, pl: 3, display: 'flex', gap: 1.5, alignItems: 'center' }}>
              <Avatar
                src={request.avatar}
                sx={{
                  width: 44,
                  height: 44,
                  bgcolor: brandColors.neutral[50],
                  color: brandColors.neutral[900],
                }}
              >
                {request.name.charAt(0)}
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 38 }}>
                <Typography sx={{ color: brandColors.neutral[900], fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                  {request.name}
                </Typography>
                <Typography sx={{ color: brandColors.neutral[500], fontSize: '12px', fontWeight: 400 }}>
                  {request.email}
                </Typography>
              </Box>
            </Box>

            {/* Division & Role */}
            <Box sx={{ flex: 1, p: 2, pl: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 38 }}>
              <Typography sx={{ color: brandColors.neutral[900], fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                {request.role}
              </Typography>
              <Typography sx={{ color: '#9E9EA9', fontSize: '12px', fontWeight: 400 }}>
                {request.division}
              </Typography>
            </Box>

            {/* Location */}
            <Box sx={{ flex: 1, p: 2, pl: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 38 }}>
              <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center' }}>
                <CountryFlag countryCode={request.countryCode} />
                <Typography sx={{ color: brandColors.neutral[900], fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                  {request.country}
                </Typography>
              </Box>
              <Typography sx={{ color: brandColors.neutral[500], fontSize: '12px', lineHeight: '16px', fontWeight: 400 }}>
                {request.poolingCenter}
              </Typography>
            </Box>

            {/* Requested Date */}
            <Box sx={{ flex: 1, p: 2, display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ color: brandColors.neutral[900], fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                {request.requestedDate}
              </Typography>
            </Box>

            {/* Actions */}
            <Box sx={{ width: 260, p: 2, display: 'flex', gap: 1.25, alignItems: 'center' }}>
              <Button
                variant="outlined"
                startIcon={<Check size={16} />}
                onClick={() => onApprove?.(request.id)}
                sx={{
                  bgcolor: brandColors.success.light,
                  border: `1.275px solid ${alpha(brandColors.success.main, 0.2)}`,
                  color: brandColors.success.dark,
                  height: 36,
                  px: 2.125,
                  py: 0.875,
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontSize: '14px',
                  fontWeight: 400,
                  '&:hover': {
                    bgcolor: brandColors.success.light,
                    border: `1.275px solid ${alpha(brandColors.success.main, 0.2)}`,
                  },
                }}
              >
                {t('table.actions.approve')}
              </Button>
              <Button
                variant="outlined"
                startIcon={<X size={16} />}
                onClick={() => onReject?.(request.id)}
                sx={{
                  bgcolor: brandColors.critical.light,
                  border: `1.275px solid ${alpha(brandColors.critical.main, 0.2)}`,
                  color: brandColors.critical.dark,
                  height: 36,
                  px: 2.125,
                  py: 0.875,
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontSize: '14px',
                  fontWeight: 400,
                  '&:hover': {
                    bgcolor: brandColors.critical.light,
                    border: `1.275px solid ${alpha(brandColors.critical.main, 0.2)}`,
                  },
                }}
              >
                {t('table.actions.reject')}
              </Button>
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
          {t('table.footer.showing')} <span style={{ color: brandColors.neutral[900] }}>{requests.length}</span> {t('table.footer.users')}
        </Typography>
      </Box>
    </Box>
  );
};

export default NewRequestsTable;

