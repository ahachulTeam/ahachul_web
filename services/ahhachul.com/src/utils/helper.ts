export const getRandomBoolean = (): boolean => {
  const number = Math.floor(Math.random() * 10) + 1;
  return Boolean(number % 2);
};
