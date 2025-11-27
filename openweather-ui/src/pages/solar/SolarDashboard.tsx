import React, { useEffect, useMemo, useState } from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import { Box, Card, CardContent, CircularProgress, Grid, Theme, Typography } from '@mui/material';
import { getSolarPanels } from '../../api/solarApi';
import { SolarPanel, SolarStatus } from '../../types/solar';

type MetricCardProps = {
  title: string;
  value: number;
  color?: string | ((theme: Theme) => string);
  icon?: React.ReactNode;
};

const MetricCard: React.FC<MetricCardProps> = ({ title, value, color, icon }) => (
  <Card
    elevation={0}
    sx={{
      borderRadius: 3,
      border: '1px solid',
      borderColor: 'divider',
      bgcolor: color,
      color: color ? 'common.white' : undefined
    }}
  >
    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {icon}
      <Box>
        <Typography variant="body2" color={color ? 'inherit' : 'text.secondary'}>
          {title}
        </Typography>
        <Typography variant="h3" fontWeight={700} color={color ? 'inherit' : 'text.primary'}>
          {value}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const SolarDashboard: React.FC = () => {
  const [panels, setPanels] = useState<SolarPanel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPanels = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getSolarPanels();
        setPanels(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load solar panels');
      } finally {
        setLoading(false);
      }
    };

    loadPanels();
  }, []);

  const { total, warningCount, errorCount } = useMemo(() => {
    const warningPanels = panels.filter(panel => panel.status === SolarStatus.WARNING).length;
    const errorPanels = panels.filter(panel => panel.status === SolarStatus.ERROR).length;
    return {
      total: panels.length,
      warningCount: warningPanels,
      errorCount: errorPanels
    };
  }, [panels]);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Solar Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Overview of solar panel health and alerts in a Berry Admin styled layout.
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <MetricCard
              title="Total Panels"
              value={total}
              icon={<SolarPowerIcon color="primary" fontSize="large" />}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MetricCard
              title="Warning Panels"
              value={warningCount}
              color={(theme: Theme) => theme.palette.warning.main}
              icon={<WarningAmberIcon color="inherit" fontSize="large" />}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MetricCard
              title="Error Panels"
              value={errorCount}
              color={(theme: Theme) => theme.palette.error.main}
              icon={<ErrorOutlineIcon color="inherit" fontSize="large" />}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default SolarDashboard;
