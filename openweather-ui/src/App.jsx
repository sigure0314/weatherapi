
import { Suspense, lazy, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CircularProgress } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MainLayout from './layouts/MainLayout.jsx';
import theme from './theme/index.js';
import WeatherPage from './pages/WeatherPage.jsx';

const SolarDashboard = lazy(() => import('./pages/solar/SolarDashboard'));
const SolarList = lazy(() => import('./pages/solar/SolarList'));

export default function App() {
  const [activePage, setActivePage] = useState('weather');

  const navItems = useMemo(() => ([
    { key: 'weather', label: 'Weather Dashboard', icon: <DashboardIcon fontSize="small" /> },
    { key: 'solarOverview', label: 'Solar Overview', icon: <SolarPowerIcon fontSize="small" /> },
    { key: 'solarList', label: 'Solar Panels', icon: <ListAltIcon fontSize="small" /> }
  ]), []);

  const renderContent = () => {
    switch (activePage) {
      case 'solarOverview':
        return <SolarDashboard />;
      case 'solarList':
        return <SolarList />;
      case 'weather':
      default:
        return <WeatherPage />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <MainLayout navItems={navItems} activeItem={activePage} onNavSelect={setActivePage}>
        <Suspense
          fallback={(
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress />
            </Box>
          )}
        >
          {renderContent()}
        </Suspense>
      </MainLayout>
    </ThemeProvider>
  );
}
