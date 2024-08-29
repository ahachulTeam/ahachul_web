import { phrases } from '../data/cheer-up-phrases';
export const getRandomPhrase = () => {
  const randomNum = Math.floor(Math.random() * phrases.length);
  return phrases[randomNum];
};
