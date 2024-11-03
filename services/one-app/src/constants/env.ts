export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL as string;
export const IS_DEV_ENV = SITE_URL.startsWith('http://localhost');
export const API_BASE_URL = IS_DEV_ENV
  ? 'https://api.dev.ahhachul.com/'
  : 'https://api.ahhachul.com/';
