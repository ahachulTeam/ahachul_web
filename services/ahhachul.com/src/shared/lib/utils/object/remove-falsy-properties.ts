export const removeFalsyProperties = (obj: Record<string, unknown>) => {
  for (const key in obj) {
    if (obj[key] !== 0 && !obj[key]) {
      delete obj[key];
    }
  }
  return obj;
};
