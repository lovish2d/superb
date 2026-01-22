import { Box, Typography } from '@mui/material';
import type { BoxProps } from '@mui/material';
import type { ReactNode } from 'react';

type PageContainerProps = BoxProps & {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  lastUpdated?: string;
  breadcrumb?: ReactNode;
  headerRightContent?: ReactNode;
};

const PageContainer = ({ children, title, subtitle, lastUpdated, breadcrumb, headerRightContent, sx, ...props }: PageContainerProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        p: { xs: 2, sm: 3, md: 4 },
        width: '100%',
        maxWidth: '100%',
        height: '100%',
        backgroundColor: 'background.paper',
        boxSizing: 'border-box',
        ...sx,
      }}
      {...props}
    >
      {breadcrumb}
      {(title || subtitle || lastUpdated || headerRightContent) && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'flex-start' },
            justifyContent: 'space-between',
            width: '100%',
            mb: { xs: 2, sm: 3, md: 4 },
            gap: { xs: 1, sm: 0 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1.25,
            }}
          >
            {title && <Typography variant="h1">{title}</Typography>}
            {subtitle && (
              <Typography variant="h3" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'flex-start', sm: 'flex-end' },
              gap: 1,
            }}
          >
            {headerRightContent}
            {lastUpdated && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textAlign: { xs: 'left', sm: 'right' },
                  whiteSpace: { xs: 'normal', sm: 'nowrap' },
                }}
              >
                {lastUpdated}
              </Typography>
            )}
          </Box>
        </Box>
      )}
      {children}
    </Box>
  );
};

export default PageContainer;

