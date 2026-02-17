'use client';

import { useMemo } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  LOCALE_COOKIE_KEY,
  SUPPORTED_LOCALES,
  getLocaleMessages,
  localizePathname,
  resolveLocale,
  resolvePathLocale,
  stripLocaleFromPathname,
  type SupportedLocale,
} from '@/i18n';

type LanguageSelectorProps = {
  className?: string;
};

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

function setLocaleCookie(locale: SupportedLocale) {
  document.cookie = `${LOCALE_COOKIE_KEY}=${locale}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; samesite=lax`;
}

export default function LanguageSelector({ className = '' }: LanguageSelectorProps) {
  const router = useRouter();
  const pathname = usePathname() ?? '/';
  const searchParams = useSearchParams();
  const currentLocale = resolvePathLocale(pathname, null);
  const messages = getLocaleMessages(currentLocale);

  const languageOptions = useMemo(
    () =>
      SUPPORTED_LOCALES.map(locale => ({
        value: locale,
        label: messages.common.languages[locale],
      })),
    [messages.common.languages],
  );

  const handleChange = (nextLocale: SupportedLocale) => {
    const normalizedPathname = stripLocaleFromPathname(pathname);
    const localizedPathname = localizePathname(normalizedPathname, nextLocale);
    const query = searchParams.toString();
    const nextHref = query ? `${localizedPathname}?${query}` : localizedPathname;

    setLocaleCookie(nextLocale);
    router.push(nextHref);
    router.refresh();
  };

  return (
    <div className={`flex items-center gap-2 ${className}`.trim()}>
      <label htmlFor="site-language" className="text-body-small text-gray-80">
        {messages.common.language}
      </label>
      <select
        id="site-language"
        aria-label={messages.common.languageSelectAria}
        value={currentLocale}
        onChange={event => handleChange(resolveLocale(event.target.value))}
        className="h-9 min-w-[140px] rounded-lg border border-gray-30 bg-white px-3 text-body-small text-gray-90"
      >
        {languageOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
