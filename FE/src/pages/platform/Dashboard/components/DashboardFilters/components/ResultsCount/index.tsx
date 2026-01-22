import { Box, Typography } from '@mui/material';
import { brandColors } from '@/theme';

type ResultsCountProps = {
  count: number;
  label: string;
};

const ResultsCount = ({ count, label }: ResultsCountProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 0.5,
        minWidth: '80px',
        flexShrink: 0,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: brandColors.neutral[900],
          flexShrink: 0,
        }}
      >
        {count}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: brandColors.neutral[500],
          flexShrink: 0,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default ResultsCount;
