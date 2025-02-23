export const getAccessTokenInLocalStorage = () => {
  const tokenStore = localStorage.getItem(import.meta.env.VITE_CRYPTO_SECRET_KEY);
  return tokenStore ? JSON.parse(tokenStore).accessToken : null;
};
