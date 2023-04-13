const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL;
const ORIGIN = process.env.NEXT_PUBLIC_ORIGIN;
const REDIRECT_URI = `${ORIGIN}/onboarding/redirect`;

export const KAKAO_LOGIN_REQUEST_URL = `${AUTH_API_URL}/kakao?redirect_uri=${REDIRECT_URI}`;
export const GOOGLE_LOGIN_REQUEST_URL = `${AUTH_API_URL}/google?redirect_uri=${REDIRECT_URI}`;

export const ACCESS_TOKEN_STORAGE_KEY = "accessToken";
