export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL as string;
export const IS_DEV_ENV = SITE_URL.startsWith('http://localhost'); // 수정하기
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
    ? 'http://localhost:9090'
    : IS_DEV_ENV
      ? 'https://api.dev.ahhachul.com/v1'
      : 'https://api.ahhachul.com/v1';
