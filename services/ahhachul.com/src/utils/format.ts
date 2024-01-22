export const removeEmptyProperties = <T extends { [K in keyof T]: unknown }>(
  obj: T,
): T => {
  for (const key in obj) {
    if (obj[key] !== 0 && !obj[key]) {
      delete obj[key];
    }
  }
  return obj;
};
