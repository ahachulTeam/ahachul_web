import { isDev } from 'shared/lib/config/app-env';

const MOCKING = process.env.REACT_APP_MOCKING === 'true' && isDev();

export const isMocking = () => Boolean(MOCKING);
