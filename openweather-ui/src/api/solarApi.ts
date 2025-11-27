import axios, { AxiosPromise } from 'axios';
import { SolarPanel } from '../types/solar';

const solarClient = axios.create({
  baseURL: '/api/solar'
});

export const getSolarPanels = (): AxiosPromise<SolarPanel[]> => solarClient.get('/');

export const getSolarPanel = (id: number): AxiosPromise<SolarPanel> => solarClient.get(`/${id}`);

export const createSolarPanel = (
  data: Omit<SolarPanel, 'id' | 'lastUpdated'>
): AxiosPromise<SolarPanel> => solarClient.post('/', data);

export const updateSolarPanel = (
  id: number,
  data: Partial<Omit<SolarPanel, 'id'>>
): AxiosPromise<SolarPanel> => solarClient.put(`/${id}`, data);

export const deleteSolarPanel = (id: number): AxiosPromise<void> => solarClient.delete(`/${id}`);

export const solarApi = {
  getSolarPanels,
  getSolarPanel,
  createSolarPanel,
  updateSolarPanel,
  deleteSolarPanel
};

export default solarApi;
