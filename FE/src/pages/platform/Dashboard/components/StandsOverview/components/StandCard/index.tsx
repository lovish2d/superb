import { Box, Typography, Chip } from '@mui/material';
import { brandColors } from '@/theme';
import standImage from '@/assets/images/dashboard/stand-image.png';
import companyLogo from '@/assets/images/dashboard/company-logo.png';

type StandCardProps = {
  id: string;
  name: string;
  model: string;
  location: string;
  status: string;
  condition: string;
  conditionColor: 'warning' | 'neutral';
  weight: string;
  dims: string;
};

const StandCard = ({ id, name, model, location, status, condition, conditionColor, weight, dims }: StandCardProps) => {
  return (
    <Box
      sx={{
        p: '13.275px',
        border: `1.275px solid ${brandColors.neutral[50]}`,
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        position: 'relative',
        cursor: 'pointer',
        '&:hover': {
          bgcolor: brandColors.neutral[50],
        },
      }}
    >
      {/* Left: Image Container */}
      <Box sx={{ position: 'relative', width: '104px', height: '105px', flexShrink: 0 }}>
        <Box
          component="img"
          src={standImage}
          alt="Stand"
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            objectFit: 'cover',
          }}
        />
        {/* Company Logo Overlay */}
        <Box
          sx={{
            position: 'absolute',
            left: '87.45px',
            top: '87.59px',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            border: '4px solid',
            borderColor: brandColors.white,
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={companyLogo}
            alt="Company"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
      </Box>

      {/* Right: Stand Details */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '11.99px', ml: '11.99px' }}>
        {/* Top Section: ID, Chip, Model, Location */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {/* Row 1: ID and Chip */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '7.987px' }}>
            <Typography variant="body1" sx={{ color: brandColors.primary.main, flex: 1 }}>
              {id}
            </Typography>
            <Chip label={name} color="info" size="small" />
          </Box>
          {/* Row 2: Model and Location */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '7.987px', height: '23.98px' }}>
            <Typography variant="caption" color="text.primary">
              {model}
            </Typography>
            <Typography variant="body2" color="text.disabled">
              •
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {location}
            </Typography>
          </Box>
        </Box>

        {/* Bottom Section: Status and Details */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '41px', justifyContent: 'center' }}>
          <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
            {status}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '11.99px', height: '14.997px' }}>
            {/* Status Indicator */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '3.983px' }}>
              <Box
                sx={{
                  width: '5.995px',
                  height: '5.995px',
                  borderRadius: '50%',
                  bgcolor: conditionColor === 'warning' ? brandColors.warning.main : brandColors.neutral[200],
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {condition}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.disabled">
              |
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {weight}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              |
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {dims}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StandCard;
