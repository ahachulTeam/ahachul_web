import type { CongestionColorType } from 'features/subway-trains';

export const subwayCongestionHexColors = (
  congestionColor: CongestionColorType,
) => {
  switch (congestionColor) {
    case 'SMOOTH':
      return '#6FDA74';
    case 'MODERATE':
      return '#FFC44D';
    case 'CONGESTED':
      return '#FF884D';
    case 'VERY_CONGESTED':
      return '#EE6161';
    default:
      return 'rgba(0, 0, 0, 0)';
  }
};
