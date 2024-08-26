import { getAppEnv } from 'utils/appEnv';

// until backend api is ready
const MOCKING = getAppEnv() === 'staging' ? 'true' : process.env.REACT_APP_MOCKING ?? 'false';

export const isMocking = () => MOCKING === 'true';
