import { isProd } from 'utils/appEnv';

export const API_BASE_URL = isProd() ? process.env.REACT_APP_BASE_URL : '';
