import { API_BASE } from '@/common/configure-axios';

export async function getRedirectUrl() {
  try {
    const response = await API_BASE.get('/auth/redirect-url');
    return response.data;
  } catch (error) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
}
