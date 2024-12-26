import { format, formatDistanceToNow, isValid } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * @description 초를 MM:SS 형식으로 변환하는 메서드입니다.
 */
export const formatMMSS = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return {
    minutes,
    seconds,
    formattedMinutes: String(minutes).padStart(2, '0'),
    formattedSeconds: String(seconds).padStart(2, '0'),
  };
};

/**
 * @description 날짜를 'MM.DD HH:mm' 형식으로 포맷팅하는 메서드입니다.
 */
export const formatToStandardDate = (dateString: string): string => {
  return format(new Date(dateString), 'MM.dd HH:mm');
};

/**
 * @description 날짜를 상황에 맞는 형식으로 포맷팅하는 메서드입니다.
 * - 1분 이내: '방금 전'
 * - 24시간 이내: 'n시간 전'
 * - 24시간 이후: 'MM.DD HH:mm' 또는 'n일 전'
 */
export function formatDate(date: string, shouldShowStandardDate = true) {
  const d = new Date(date);

  if (!isValid(d)) {
    return '알 수 없음';
  }

  const now = Date.now();
  const diffInSeconds = (now - d.getTime()) / 1000;

  // 1분 이내
  if (diffInSeconds < 60) {
    return '방금 전';
  }

  // 24시간 이내
  if (diffInSeconds < 60 * 60 * 24) {
    return formatDistanceToNow(d, { addSuffix: true, locale: ko });
  }

  // 24시간 이후
  return shouldShowStandardDate
    ? formatToStandardDate(date)
    : formatDistanceToNow(d, { addSuffix: true, locale: ko });
}
