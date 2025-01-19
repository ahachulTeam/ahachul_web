import { GREETING_PHRASES } from './WelcomeMessage.constant';
import type { GreetingPhrase } from './WelcomeMessage.type';

export const getRandomGreeting = (): GreetingPhrase => {
  return GREETING_PHRASES[Math.floor(Math.random() * GREETING_PHRASES.length)];
};
