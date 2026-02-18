export { parseFileExtOfName } from '@ahhachul/utils';

const FILE_DOWNLOAD_CLEANUP_DELAY_MS = 100;

export const downloadFile = (url: string) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = '';

  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, FILE_DOWNLOAD_CLEANUP_DELAY_MS);
};

export const getUserAgent = () => {
  return window.navigator.userAgent;
};
