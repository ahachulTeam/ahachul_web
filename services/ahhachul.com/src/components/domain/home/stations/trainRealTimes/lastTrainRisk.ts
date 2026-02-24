export function resolveMinutesToLastTrainText(minutesToLastTrain: number): string {
  if (minutesToLastTrain < 0) {
    return '막차 시간 정보 없음';
  }

  return `막차까지 ${minutesToLastTrain}분`;
}
