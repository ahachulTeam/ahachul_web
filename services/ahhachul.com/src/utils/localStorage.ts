export const getAccessTokenInLocalStorage = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const storageKey = import.meta.env.VITE_CRYPTO_SECRET_KEY;
  const tokenStore = window.localStorage.getItem(storageKey);
  if (!tokenStore) {
    return null;
  }

  try {
    const parsed = JSON.parse(tokenStore) as { accessToken?: string };
    return parsed.accessToken ?? null;
  } catch {
    window.localStorage.removeItem(storageKey);
    return null;
  }
};
