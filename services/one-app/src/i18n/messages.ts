import type { SupportedLocale } from './config';
import cn from './messages/cn.json';
import en from './messages/en.json';
import ko from './messages/ko.json';
import th from './messages/th.json';

const MESSAGES_BY_LOCALE = {
  ko,
  en,
  th,
  cn,
} as const;

export type LocaleMessages = (typeof MESSAGES_BY_LOCALE)['ko'];

export function getLocaleMessages(locale: SupportedLocale): LocaleMessages {
  return MESSAGES_BY_LOCALE[locale];
}
