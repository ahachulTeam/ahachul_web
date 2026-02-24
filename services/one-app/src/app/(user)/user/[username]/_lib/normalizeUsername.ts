export function normalizeUsernameParam(username: string): string {
  let normalized = username;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const decoded = decodeURIComponent(normalized);
      if (decoded === normalized) {
        return normalized;
      }
      normalized = decoded;
    } catch {
      return normalized;
    }
  }

  return normalized;
}
