export type AppEnv = "production" | "staging" | "development";

const getAppEnv = (): AppEnv =>
  (process.env.NEXT_PUBLIC_APP_ENV as Exclude<AppEnv, "development">) ||
  "development";

export const getApiEndpoint = () => {
  switch (getAppEnv()) {
    case "production":
    case "staging":
    case "development":
    default:
      return "http://13.209.145.241:8080/v1";
  }
};

export const getDomainName = () => {
  switch (getAppEnv()) {
    case "production":
      return "https://ahhachul.com";
    case "staging":
      return "https://dev.ahhachul.com";
    case "development":
    default:
      return "http://localhost:3000";
  }
};

export const getDomainCookieKey = () => {
  return "cookie.ahhachul";
};
