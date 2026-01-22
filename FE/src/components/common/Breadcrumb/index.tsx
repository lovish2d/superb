import { Breadcrumbs, Link, Typography, IconButton } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';

import { brandColors } from '@/theme';

type BreadcrumbItem = {
  label: string;
  path?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const navigate = useNavigate();

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Breadcrumbs
      separator={<ChevronRight size={16} color={brandColors.neutral[500]} />}
      sx={{
        mb: 3,
        '& .MuiBreadcrumbs-ol': {
          flexWrap: 'nowrap',
        },
        '& .MuiBreadcrumbs-separator': {
          margin: '0 8px',
        },
      }}
    >
      <IconButton
        onClick={() => navigate('/dashboard')}
        sx={{
          p: 0.5,
          color: brandColors.neutral[500],
          '&:hover': {
            backgroundColor: alpha(brandColors.neutral[50], 0.5),
          },
        }}
      >
        <Home size={16} />
      </IconButton>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return isLast ? (
          <Typography
            key={item.label}
            variant="body2"
            sx={{
              fontWeight: 500,
              color: brandColors.neutral[900],
            }}
          >
            {item.label}
          </Typography>
        ) : (
          <Link
            key={item.label}
            component="button"
            onClick={() => item.path && navigate(item.path)}
            sx={{
              color: brandColors.neutral[500],
              textDecoration: 'none',
              cursor: item.path ? 'pointer' : 'default',
              border: 'none',
              background: 'none',
              padding: 0,
              '&:hover': {
                color: brandColors.primary.main,
                textDecoration: 'none',
              },
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;

