declare const global: unknown

export const isServer = () => {
  return typeof window === 'undefined' && typeof global !== 'undefined'
}

export function isClient() {
  return !isServer()
}

export const isProd = (env: string): boolean => env === 'production'
