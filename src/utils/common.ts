export const getOneDepthPath = (path: string): string => {
  const p = path.split("/").filter(Boolean)[0] ?? "";
  return `/${p}`;
};

export const isMatchRoute = (path: string, comparePath: string): boolean =>
  getOneDepthPath(comparePath) === getOneDepthPath(path);