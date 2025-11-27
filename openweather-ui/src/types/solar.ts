export enum SolarStatus {
  NORMAL = 'NORMAL',
  WARNING = 'WARNING',
  ERROR = 'ERROR'
}

export interface SolarPanel {
  id: number;
  name: string;
  voltage: number;
  current: number;
  watt: number;
  temperature: number;
  status: SolarStatus;
  lastUpdated: string;
  location: string;
}

export interface SolarLog {
  id: number;
  name: string;
  voltage: number;
  current: number;
  watt: number;
  temperature: number;
  status: SolarStatus;
  lastUpdated: string;
  location: string;
}
