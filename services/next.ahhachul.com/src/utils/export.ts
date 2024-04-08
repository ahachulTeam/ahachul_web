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

import { COMPLAINTS_CONTENTS_TYPES } from '@/src/data/complaints';
import { CongestionColorType, CurrentTrainArrivalType } from '@/src/types';
import { removeEmptyProperties } from './object';

export const exportLineNameWithSubwayLineId = (lineId: string) => {
  switch (lineId) {
    case '1':
      return '1호선';
    case '2':
      return '2호선';
    case '3':
      return '3호선';
    case '4':
      return '4호선';
    case '5':
      return '5호선';
    case '6':
      return '6호선';
    case '7':
      return '7호선';
    case '8':
      return '8호선';
    case '9':
      return '9호선';
    case 'S':
      return '신림선';
    case 'UL':
      return '우의신설선';
    case 'D':
      return '신분당선';
    case 'SI':
      return '수인분당선';
    case 'GJ':
      return '경의중앙선';
    default:
      return '기타';
  }
};

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
    case 'SI':
      return '#FABE00';
    case 'D':
      return '#D31145';
    case 'S':
      return '#6789CA';
    case 'UL':
      return '#B7C450';
    case '경춘선':
      return '#178C72';
    case '경강선':
      return '#0054A6';
    case 'GJ':
      return '#77C4A3';
    default:
      return 'rgba(245, 249, 254, 0.11)';
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
        roomNumber = String(+trainNumber[1] + 1);
      } else {
        lineName = `${trainNumber[0]}호선`;
        roomNumber = String(+trainNumber[1] + 1);
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
        } else if (secondDigitIs7) {
          lineName = '경강선';
          roomNumber = trainNumber[3];
        } else if (secondDigitIs2Or3) {
          lineName = '경의중앙선';
          roomNumber = trainNumber[3];
        } else if (secondDigitIs5) {
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
        } else {
          error = '올바르지 않은 열차 번호입니다.';
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

export const formatComplaintTypeToKoSentence = (complaintType?: COMPLAINTS_CONTENTS_TYPES) => {
  if (!complaintType) return;

  switch (complaintType) {
    case '환경민원':
      return '환경 민원이 발생했어요.';
    case '온도조절':
      return '온도조절 민원이 발생했어요.';
    case '질서저해':
      return '질서저해 민원이 발생했어요.';
    case '안내방송':
      return '안내방송 민원이 발생했어요.';
    case '응급환자':
      return '응급환자 민원이 발생했어요.';
    case '폭력':
      return '폭력 민원이 발생했어요.';
    case '성추행':
      return '성추행 민원이 발생했어요.';
    default:
      return '민원이 발생했어요.';
  }
};

export const formatComplaintShortContentToKoSentence = (complaintShortContent?: string) => {
  if (!complaintShortContent) return;

  switch (complaintShortContent) {
    case '오물':
      return '오물이 있어요!';
    case '토사물':
      return '토사물이 있어요!';
    case '환기요청':
      return '안좋은 냄새가 나요, 환기 좀 부탁드려요!';
    case '시끄러워요':
      return '안내방송이 너무 커서 시끄러워요!';
    case '안들려요':
      return '안내방송이 너무 작아서 안들려요!';
    case '더워요':
      return '너무 더워요! 온도 좀 낮춰주세요.';
    case '추워요':
      return '너무 추워요! 온도 좀 높여주세요.';
    case '이동상인':
      return '이동상인이 물건을 팔아요!';
    case '취객':
      return '취객이 돌아다녀요!';
    case '노숙':
      return '지하철에서 노숙을 하고 계세요!';
    case '구걸':
      return '지하철에서 구걸하고 계신 분이 있어요!';
    case '종교행위':
      return '지하철에서 종교행위하고 계신 분이 있어요!';
    case '본인':
      return '제가 응급 환자에요.';
    case '목격자':
      return '저는 목격자에요.';
    case '피해자':
      return '제가 피해자에요.';
    default:
      return '민원이 발생했어요';
  }
};
