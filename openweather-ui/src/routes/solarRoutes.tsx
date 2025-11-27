import React, { LazyExoticComponent, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

const SolarDashboard = React.lazy(() => import('../pages/solar/SolarDashboard'));
const SolarList = React.lazy(() => import('../pages/solar/SolarList'));

const withSuspense = (Component: LazyExoticComponent<React.ComponentType>): JSX.Element => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

export const solarRoutes: RouteObject[] = [
  {
    path: '/solar',
    element: withSuspense(SolarDashboard)
  },
  {
    path: '/solar/list',
    element: withSuspense(SolarList)
  }
];

export default solarRoutes;
