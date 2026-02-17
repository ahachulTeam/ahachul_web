import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const TIME_UNITS = {
  MINUTE: 60,
  DAY: 60 * 60 * 24,
} as const;

type DateFormat = 'relative' | 'short';
type DateInput = Date | string | number | null | undefined;

export interface DateFormatOptions {
  format?: DateFormat;
  invalidText?: string;
  now?: Date | number;
}

/**
 * 날짜를 'MM.DD HH:mm' 형식으로 변환합니다.
 * 분이 0인 경우 'MM.DD HH' 형식으로 반환합니다.
 */
function formatToShortDate(date: Date): string {
  const minutes = date.getMinutes();
  return minutes === 0
    ? format(date, 'MM월 dd일 a h시', { locale: ko })
    : format(date, 'MM월 dd일 a h시 mm분', { locale: ko });
}

function parseDateInput(input: DateInput): Date | null {
  if (!input) {
    return null;
  }

  const parsedDate = input instanceof Date ? input : new Date(input);
  if (isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
}

/**
 * 날짜를 상황에 맞는 형식으로 변환합니다.
 * - 1분 이내: '방금 전'
 * - 24시간 이내: 'n시간 전'
 * - 24시간 이후:
 *   - format이 'short'인 경우 'MM월 dd일 a h시 mm분'
 *   - format이 'relative'인 경우 '약 n일 전 / 약 n개월 전 / 약 n년 전'
 */
export function formatDisplayDate(input: DateInput, options: DateFormatOptions = {}): string {
  const { format = 'relative', invalidText = '알 수 없음', now } = options;
  const date = parseDateInput(input);

  if (!date) {
    return invalidText;
  }

  let baseTime = Date.now();
  if (now instanceof Date) {
    baseTime = now.getTime();
  } else if (typeof now === 'number') {
    baseTime = now;
  }
  const diffInSeconds = (baseTime - date.getTime()) / 1000;

  // 1분 이내
  if (diffInSeconds < TIME_UNITS.MINUTE) {
    return '방금 전';
  }

  // 24시간 이내
  if (diffInSeconds < TIME_UNITS.DAY) {
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: ko,
    });
  }

  // 24시간 이후
  if (format === 'short') {
    return formatToShortDate(date);
  }

  return formatDistanceToNow(date, { addSuffix: true, locale: ko });
}

/**
 * @deprecated Use `formatDisplayDate` as the single date-formatting entrypoint.
 */
export function formatDateTime(dateString: string, options: DateFormatOptions = {}) {
  return formatDisplayDate(dateString, options);
}
