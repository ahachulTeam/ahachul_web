export const isChangedArray = (a: unknown[] = [], b: unknown[] = []) =>
  a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]));

export const isValidObject = (obj: unknown): obj is Record<string, any> => {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
};

export const parseFileExtOfName = (fileName: string): string => fileName.split('.').at(-1) ?? '';

export const downloadFile = (url: string) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = '';

  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, 100);
};
