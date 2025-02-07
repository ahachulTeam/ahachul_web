import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const TIME_UNITS = {
  MINUTE: 60,
  DAY: 60 * 60 * 24,
} as const;

type DateFormat = 'relative' | 'short';

interface FormatOptions {
  format?: DateFormat;
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

/**
 * 날짜를 상황에 맞는 형식으로 변환합니다.
 * - 1분 이내: '방금 전'
 * - 24시간 이내: 'n시간 전'
 * - 24시간 이후:
 *   - format이 'short'인 경우 'MM월 dd일 a h시 mm분'
 *   - format이 'relative'인 경우 '약 n일 전 / 약 n개월 전 / 약 n년 전'
 */
export function formatDateTime(dateString: string, options: FormatOptions = {}): string {
  const { format = 'relative' } = options;

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return '알 수 없음';
  }

  const now = Date.now();
  const diffInSeconds = (now - date.getTime()) / 1000;

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
  return format === 'short'
    ? formatToShortDate(date)
    : formatDistanceToNow(date, { addSuffix: true, locale: ko });
}
