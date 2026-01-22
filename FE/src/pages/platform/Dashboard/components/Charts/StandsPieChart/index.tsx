import { Box, Paper, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { TFunction } from 'react-i18next';
import { brandColors } from '@/theme';

type LabelProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  name: string;
};

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: LabelProps, t: TFunction) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.35;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // Determine color based on name
  let labelColor = brandColors.neutral[500];
  if (name === 'homebase') labelColor = brandColors.primary.main;
  else if (name === 'pool') labelColor = brandColors.success.main;
  else if (name === 'third_party') labelColor = brandColors.warning.main;

  const displayName = t(`charts.stands_by_type.${name}`);

  return (
    <text
      x={x}
      y={y}
      fill={labelColor}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      style={{ fontSize: '0.75rem' }}
    >
      {`${displayName} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const StandsPieChart = () => {
  const { t } = useTranslation('dashboard');

  const data = [
    { name: 'homebase', displayName: 'Homebase', value: 62, count: 13, color: brandColors.primary.main },
    { name: 'pool', displayName: 'Pool', value: 24, count: 5, color: brandColors.success.main },
    { name: 'third_party', displayName: 'Third-party', value: 14, count: 3, color: brandColors.warning.main },
  ];

  return (
    <Paper
      sx={{
        p: 0,
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
      < Box
        sx={{
          height: 70,
          paddingX: 3, // 24px
          paddingTop: 3, // approx 24
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Typography variant="body1" color="text.primary">
          {t('charts.stands_by_type.title')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('charts.stands_by_type.subtitle')}
        </Typography>
      </Box >

      {/* Chart Content */}
      < Box
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
        < Box sx={{ height: 320, width: '100%', position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={100}
                fill={brandColors.primary.main}
                paddingAngle={0}
                dataKey="value"
                label={(props) => renderCustomizedLabel(props, t)}
                labelLine={false}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: `0 4px 6px -1px ${alpha(brandColors.neutral[900], 0.1)}`,
                  backgroundColor: brandColors.white,
                }}
                itemStyle={{ fontSize: '0.875rem' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box >

        {/* Legend */}
        < Box
          sx={{
            display: 'flex',
            gap: 0,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            height: '47.959px',
            width: '100%',
          }}
        >
          {
            data.map((entry, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                  alignItems: 'center',
                  width: 160,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1, // 8px
                    height: 20,
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: entry.color,
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {t(`charts.stands_by_type.${entry.name}`)}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{
                    textAlign: 'center',
                    width: '100%',
                  }}
                >
                  {entry.count}
                </Typography>
              </Box >
            ))}
        </Box >
      </Box >
    </Paper >
  );
};

export default StandsPieChart;
