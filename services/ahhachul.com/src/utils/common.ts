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

/**
 * Math.random()은 0 이상 1 미만의 부동소수점 난수를 생성합니다
 * 이 값에 60을 곱하고 1을 더한 후 소수점을 버리면 1~60 사이의 정수가 됩니다
 */
export const getRandomNumber1to60 = () => Math.floor(Math.random() * 60) + 1;
