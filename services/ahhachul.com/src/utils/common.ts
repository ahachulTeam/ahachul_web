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

export const getUserAgent = () => {
  return window.navigator.userAgent;
};
