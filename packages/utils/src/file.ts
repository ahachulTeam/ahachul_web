export function parseFileExtOfName(fileName: string): string {
  const normalized = fileName.trim();
  if (!normalized) {
    return '';
  }

  const lastDotIndex = normalized.lastIndexOf('.');
  if (lastDotIndex < 0 || lastDotIndex === normalized.length - 1) {
    return '';
  }

  return normalized.slice(lastDotIndex + 1);
}

export const parseFileExtension = parseFileExtOfName;
