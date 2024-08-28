import { getAppEnv } from 'shared/lib/config/app-env';

const MOCKING =
  getAppEnv() === 'test' && process.env.REACT_APP_MOCKING === 'true';

export const isMocking = () => Boolean(MOCKING);
