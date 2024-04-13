import { base } from '..';
import { API_BASE_URL } from '@/src/data/api';

export const getSubwayURL = `${API_BASE_URL}/subway-lines`;

/** 노선 조회 */
export const getSubwayInfo = async () => {
  return await base.get(getSubwayURL);
};
