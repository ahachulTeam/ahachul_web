export const formatMMSS = (second: number) => {
  const minutes = Math.floor(second / 60); // 분 계산
  const seconds = second % 60; // 초 계산
  const formattedMinutes = String(minutes).padStart(2, '0'); // 두 자리로 변환
  const formattedSeconds = String(seconds).padStart(2, '0'); // 두 자리로 변환

  return {
    minutes,
    seconds,
    formattedMinutes,
    formattedSeconds,
  };
};

/**
 * @description MM월DD일 HH:MM으로 Date format을 맞추는 메서드입니다.
 * @param {Date} date
 * @returns string - MM월DD일 HH:MM
 */
export const formatDate = (date: Date): string => {
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더합니다.
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);

  return `${month}월${day}일 ${hours}:${minutes}`;
};
