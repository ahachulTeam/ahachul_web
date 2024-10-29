export type AppEnv = 'production' | 'staging' | 'development';

export const getAppEnv = (): AppEnv =>
  (process.env.NEXT_PUBLIC_APP_ENV as Exclude<AppEnv, 'development'>) ||
  'development';

export const isMocking = (): boolean =>
  process.env.NEXT_PUBLIC_API_MOCKING === 'enabled';
