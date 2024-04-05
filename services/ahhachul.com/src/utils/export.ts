/**
 *
 * 남은거
 *
 * 인천 1, 2호선
 * 공항선
 * 의정부경전철
 * 에버라인
 * GTX-A
 * 서해선
 * 김포골드
 */

import { CongestionColorType, CurrentTrainArrivalType } from 'types';
import { removeEmptyProperties } from './object';

export const exportHexColorWidthLineName = (lineName: string) => {
  switch (lineName) {
    case '1':
    case '1호선':
      return '#0052A4';
    case '2':
    case '2호선':
      return '#00A84D';
    case '3':
    case '3호선':
      return '#EF7C1C';
    case '4':
    case '4호선':
      return '#00A4E3';
    case '5':
    case '5호선':
      return '#996cac';
    case '6':
    case '6호선':
      return '#CD7C2F';
    case '7':
    case '7호선':
      return '#747F00';
    case '8':
    case '8호선':
      return '#E6186C';
    case '9':
    case '9호선':
      return '#BDB092';
    case '수인분당선':
      return '#FABE00';
    case '신분당선':
      return '#D31145';
    case '신림선':
      return '#6789CA';
    case '우의신설선':
      return '#B7C450';
    case '경춘선':
      return '#178C72';
    case '경강선':
      return '#0054A6';
    case '경의중앙선':
      return '#77C4A3';
    default:
      return '#242424';
  }
};

export const exportSubwayInfoFromTrainNumber = (
  trainNumber: string,
): { lineName?: string; roomNumber?: string; error?: string } => {
  let lineName = '',
    roomNumber = '',
    error = '';
  const startsWithAlphabet = /^[a-zA-Z]/.test(trainNumber);
  const startsWithNumber = /^[0-9]/.test(trainNumber);

  if (startsWithAlphabet) {
    if (trainNumber[0] === 'S') {
      lineName = '신림선';
    } else if (trainNumber[0] === 'U') {
      lineName = '우의신설선';
    } else if (trainNumber[0] === 'D') {
      lineName = '신분당선';
    } else {
      error = '올바르지 않은 열차 번호입니다.';
    }
  } else if (startsWithNumber) {
    const isLengthFour = trainNumber.length === 4;
    const isLengthSix = trainNumber.length === 6;

    if (isLengthFour) {
      const firstDigitIs0Or1 = trainNumber[0] === '0' || trainNumber[0] === '1';

      if (firstDigitIs0Or1) {
        lineName = '1호선';
        roomNumber = trainNumber[1];
      } else {
        lineName = `${trainNumber[0]}호선`;
        roomNumber = trainNumber[1];
      }
    } else if (isLengthSix) {
      const startsWith3 = trainNumber[0] === '3';

      if (startsWith3) {
        const secondDigitIs6 = trainNumber[1] === '6';
        const secondDigitIs7 = trainNumber[1] === '7';
        const secondDigitIs2Or3 = trainNumber[1] === '2' || trainNumber[1] === '3';
        const secondDigitIs5 = trainNumber[1] === '5';
        const secondDigitIs1AndThirdDigitsIs9 = trainNumber[1] === '1' && trainNumber[2] === '9';

        if (secondDigitIs6) {
          lineName = '경춘선';
          roomNumber = trainNumber[3];
        }

        if (secondDigitIs7) {
          lineName = '경강선';
          roomNumber = trainNumber[3];
        }

        if (secondDigitIs2Or3) {
          lineName = '경의중앙선';
          roomNumber = trainNumber[3];
        }

        if (secondDigitIs5) {
          lineName = '수인분당선';
          roomNumber = trainNumber[3];
        } else if (secondDigitIs1AndThirdDigitsIs9) {
          const lastDigitAndSecondLastDigit = Number(
            `${trainNumber[trainNumber.length - 2]}${trainNumber[trainNumber.length - 1]}`,
          );

          const isLastDigitBetween1And5 = 1 <= lastDigitAndSecondLastDigit && lastDigitAndSecondLastDigit <= 5;

          if (isLastDigitBetween1And5) {
            lineName = '1호선';
            roomNumber = trainNumber[3];
          } else {
            lineName = '수인분당선';
            roomNumber = trainNumber[3];
          }
        }
      } else {
        error = '올바르지 않은 열차 번호입니다.';
      }
    } else {
      error = '올바르지 않은 열차 번호입니다.';
    }
  } else {
    error = '올바르지 않은 열차 번호입니다.';
  }

  return removeEmptyProperties({
    lineName,
    roomNumber,
    error,
  });
};

export const formatCurrentTrainArrivalTypeToKo = (trainArrivalType?: CurrentTrainArrivalType) => {
  if (!trainArrivalType) return;

  switch (trainArrivalType) {
    case 'ENTER':
      return '진입';
    case 'ARRIVE':
      return '도착';
    case 'DEPARTURE':
      return '출발';
    case 'BEFORE_STATION_DEPARTURE':
      return '전역출발';
    case 'BEFORE_STATION_ARRIVE':
      return '전역도착';
    case 'BEFORE_STATION_ENTER':
      return '전역진입';
    case 'RUNNING':
      return '운행중';
  }
};

export const formatCongestionColorToHexColor = (congestionColor?: CongestionColorType) => {
  if (!congestionColor) return;

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
