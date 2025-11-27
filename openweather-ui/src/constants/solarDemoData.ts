import { SolarPanel, SolarStatus } from '../types/solar';

export const solarDemoPanels: SolarPanel[] = [
  {
    id: 1,
    name: 'Aurora North',
    voltage: 48.3,
    current: 9.6,
    watt: 463.7,
    temperature: 36.2,
    status: SolarStatus.NORMAL,
    lastUpdated: new Date().toISOString(),
    location: 'Roof A1'
  },
  {
    id: 2,
    name: 'Helios East',
    voltage: 47.8,
    current: 10.1,
    watt: 482.8,
    temperature: 39.5,
    status: SolarStatus.WARNING,
    lastUpdated: new Date().toISOString(),
    location: 'Roof B2'
  },
  {
    id: 3,
    name: 'Solstice West',
    voltage: 46.9,
    current: 9.8,
    watt: 460.6,
    temperature: 41.1,
    status: SolarStatus.ERROR,
    lastUpdated: new Date().toISOString(),
    location: 'Field C'
  }
];

export default solarDemoPanels;
