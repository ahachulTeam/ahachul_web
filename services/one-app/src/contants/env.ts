export const SITE_URL = process.env.SITE_URL || 'https://dev.ahhachul.com/'; // 확인 필요

export const API_URL = process.env.API_URL || 'https://api.dev.ahhachul.com/';

export const IS_DEV_ENV = SITE_URL.startsWith('http://localhost');
