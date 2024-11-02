export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL as string;
export const IS_DEV_ENV = SITE_URL.startsWith('http://localhost');
