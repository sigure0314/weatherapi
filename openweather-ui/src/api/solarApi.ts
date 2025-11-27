import config from '../config.js';
import { SolarPanel } from '../types/solar';

const baseUrl = `${config.apiBaseUrl}/api/solar`;

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Solar API request failed');
  }

  return response.json() as Promise<T>;
};

export const getSolarPanels = async (): Promise<SolarPanel[]> => {
  const response = await fetch(baseUrl);
  return handleResponse<SolarPanel[]>(response);
};

export const getSolarPanel = async (id: number): Promise<SolarPanel> => {
  const response = await fetch(`${baseUrl}/${id}`);
  return handleResponse<SolarPanel>(response);
};

export const createSolarPanel = async (
  data: Omit<SolarPanel, 'id' | 'lastUpdated'>
): Promise<SolarPanel> => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return handleResponse<SolarPanel>(response);
};

export const updateSolarPanel = async (
  id: number,
  data: Partial<Omit<SolarPanel, 'id'>>
): Promise<SolarPanel> => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return handleResponse<SolarPanel>(response);
};

export const deleteSolarPanel = async (id: number): Promise<void> => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE'
  });

  await handleResponse<void>(response);
};

export const solarApi = {
  getSolarPanels,
  getSolarPanel,
  createSolarPanel,
  updateSolarPanel,
  deleteSolarPanel
};

export default solarApi;
