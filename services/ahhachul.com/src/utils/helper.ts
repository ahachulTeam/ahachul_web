export const copyClipBoard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    throw new Error('클립보드 복사에 실패했습니다.');
  }
};

export const getRandomBoolean = (): boolean => {
  const number = Math.floor(Math.random() * 10) + 1;
  return Boolean(number % 2);
};
