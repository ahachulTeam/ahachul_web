import { phrases } from '../data/cheer-up-phrases';

export const getRandomPhrase = () => {
  let phrase = phrases[Math.floor(Math.random() * phrases.length)];
  return phrase;
};
