/// <reference types="vite/client" />

/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_WEB_STAGING_URL: 'https://dev.ahhachul.com';
  readonly VITE_WEB_PRODUCTION_URL: 'https://ahhachul.com';
  readonly VITE_APP_ENV: 'development' | 'staging' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
