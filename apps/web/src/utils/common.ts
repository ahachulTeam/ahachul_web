export const getOneDepthPath = (path = ""): string => {
  const p = path?.split("/").filter(Boolean)[0] ?? "";
  return `/${p}`;
};

export const isMatchRoute = (comparePath: string, path = ""): boolean =>
  getOneDepthPath(comparePath) === getOneDepthPath(path);

export const isProd = (env: string): boolean => env === "production";
