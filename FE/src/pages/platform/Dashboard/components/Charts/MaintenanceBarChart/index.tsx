import { Box, Paper, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { brandColors } from '@/theme';

const data = [
  { name: 'Jan', level1: 12, level2: 8, shockmount: 5 },
  { name: 'Feb', level1: 15, level2: 10, shockmount: 6 },
  { name: 'Mar', level1: 17, level2: 13, shockmount: 7 },
  { name: 'Apr', level1: 14, level2: 10, shockmount: 6 },
  { name: 'May', level1: 19, level2: 13, shockmount: 10 },
  { name: 'Jun', level1: 16, level2: 13, shockmount: 4 },
];

const MaintenanceBarChart = () => {
  const { t } = useTranslation('dashboard');

  return (
    <Paper
      sx={{
        p: 0, // removed small padding to just use container padding
        borderRadius: '10px',
        border: `1px solid ${brandColors.neutral[200]}`,
        boxShadow: 'none',
        height: '100%',
        backgroundColor: brandColors.white,
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          height: 70, // rounded from 69.967
          paddingX: 3, // 24px
          paddingTop: 3, // ~24px (from 22.45)
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <Typography variant="body1" sx={{ color: brandColors.neutral[900] }}>
          {t('charts.maintenance_load.title')}
        </Typography>
        <Typography variant="body2" sx={{ color: brandColors.neutral[500] }}>
          {t('charts.maintenance_load.subtitle')}
        </Typography>
      </Box>

      {/* Chart Content */}
      <Box
        sx={{
          flexGrow: 1,
          paddingX: 3, // 24px
          paddingBottom: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 2, // 16px
        }}
      >
        {/* Chart */}
        <Box sx={{ height: 320, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              barCategoryGap="20%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                horizontal={true}
                stroke={brandColors.neutral[200]}
                strokeWidth={1}
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: brandColors.neutral[500],
                  fontSize: '0.75rem',
                }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                domain={[0, 60]}
                ticks={[0, 15, 30, 45, 60]}
                tick={{
                  fill: brandColors.neutral[500],
                  fontSize: '0.75rem',
                }}
                width={40}
              />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: `0 4px 6px -1px ${alpha(brandColors.neutral[900], 0.1)}`,
                  backgroundColor: brandColors.white,
                }}
                labelStyle={{ color: brandColors.neutral[900], fontWeight: 600, marginBottom: 4 }}
              />
              <Bar
                dataKey="level1"
                stackId="a"
                fill={brandColors.primary.main}
                name={t('charts.maintenance_load.level_1')}
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="level2"
                stackId="a"
                fill={brandColors.success.main}
                name={t('charts.maintenance_load.level_2')}
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="shockmount"
                stackId="a"
                fill={brandColors.warning.main}
                name={t('charts.maintenance_load.shockmount')}
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Legend */}
        <Box
          sx={{
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
            alignItems: 'center',
            height: '19.996px',
            paddingX: 0,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: brandColors.primary.main,
                flexShrink: 0,
              }}
            />
            <Typography variant="body2" sx={{ color: brandColors.neutral[500] }}>
              {t('charts.maintenance_load.level_1')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '7.987px' }}>
            <Box
              sx={{
                width: '11.99px',
                height: '11.99px',
                borderRadius: '50%',
                backgroundColor: brandColors.success.main,
                flexShrink: 0,
              }}
            />
            <Typography variant="body2" sx={{ color: brandColors.neutral[500] }}>
              {t('charts.maintenance_load.level_2')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '7.987px' }}>
            <Box
              sx={{
                width: '11.99px',
                height: '11.99px',
                borderRadius: '50%',
                backgroundColor: brandColors.warning.main,
                flexShrink: 0,
              }}
            />
            <Typography variant="body2" sx={{ color: brandColors.neutral[500] }}>
              {t('charts.maintenance_load.shockmount')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default MaintenanceBarChart;
