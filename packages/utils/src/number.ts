type NumberInput = number | string | null | undefined;

export interface NumberFormatOptions {
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
  invalidText?: string;
}

export interface PriceFormatOptions extends NumberFormatOptions {
  style?: 'suffix' | 'currency';
  suffix?: string;
  currency?: string;
  currencyDisplay?: 'code' | 'symbol' | 'narrowSymbol' | 'name';
}

const DEFAULT_LOCALE = 'ko-KR';

export function getRandomNumber(min = 1, max = 10) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function parseNumberInput(input: NumberInput): number | null {
  if (typeof input === 'number') {
    return Number.isFinite(input) ? input : null;
  }

  if (typeof input === 'string') {
    const normalized = input.trim().replace(/,/g, '');
    if (!normalized) {
      return null;
    }

    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

export function formatDisplayNumber(input: NumberInput, options: NumberFormatOptions = {}): string {
  const {
    locale = DEFAULT_LOCALE,
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping = true,
    invalidText = '-',
  } = options;

  const numberValue = parseNumberInput(input);
  if (numberValue === null) {
    return invalidText;
  }

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping,
  }).format(numberValue);
}

export function formatDisplayPrice(input: NumberInput, options: PriceFormatOptions = {}): string {
  const {
    locale = DEFAULT_LOCALE,
    style = 'suffix',
    suffix = '원',
    currency = 'KRW',
    currencyDisplay = 'symbol',
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
    useGrouping = true,
    invalidText = '-',
  } = options;

  const numberValue = parseNumberInput(input);
  if (numberValue === null) {
    return invalidText;
  }

  if (style === 'currency') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      currencyDisplay,
      minimumFractionDigits,
      maximumFractionDigits,
      useGrouping,
    }).format(numberValue);
  }

  const formattedNumber = formatDisplayNumber(numberValue, {
    locale,
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping,
    invalidText,
  });

  return `${formattedNumber}${suffix}`;
}
