const INVALID_ENV_VALUES = new Set(['undefined', 'null', 'undefinedundefined', 'nullnull']);

function resolveEnvValue(rawValue: string | undefined): string {
  const value = (rawValue ?? '').trim();
  if (!value.length) {
    return '';
  }

  const normalized = value.toLowerCase().replace(/[^a-z]/g, '');
  if (INVALID_ENV_VALUES.has(normalized)) {
    return '';
  }

  return value;
}

export const BASE_URL = {
  SERVER: resolveEnvValue(import.meta.env.VITE_BASE_URL),
  S3: '',
};
