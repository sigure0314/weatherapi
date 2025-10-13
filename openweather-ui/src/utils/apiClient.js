import config from '../config.js';

const defaultHeaders = {
  Accept: 'application/json'
};

export async function get(path) {
  const response = await fetch(`${config.apiBaseUrl}${path}`, {
    method: 'GET',
    headers: defaultHeaders
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Request failed');
  }

  return response.json();
}
