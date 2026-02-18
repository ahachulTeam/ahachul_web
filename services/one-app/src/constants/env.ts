import { AppEnv } from '@/types';

export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || AppEnv.DEV;
export const IS_DEV_ENV = APP_ENV === AppEnv.DEV;
const FALLBACK_DEV_URL = 'http://localhost:3000';

export const SITE_URL = (() => {
  const devSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL_DEV ?? process.env.APP_DEV_URL ?? FALLBACK_DEV_URL;
  const stagingSiteUrl = process.env.NEXT_PUBLIC_SITE_URL_STAGING ?? devSiteUrl;
  const productionSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL_PRODUCTION ?? process.env.APP_PRODUCTION_URL ?? devSiteUrl;

  if (APP_ENV === AppEnv.PRODUCTION) return productionSiteUrl;
  if (APP_ENV === AppEnv.STAGING) return stagingSiteUrl;

  return devSiteUrl;
})();
