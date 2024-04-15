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
import { PATH } from '../data';
import { defaultMetadata } from '../data/seo';

import communityBanner from '@/src/static/img/banners/community_page_banner.png';
import communityLine1Banner from '@/src/static/img/banners/community/line_1.png';
import communityLine2Banner from '@/src/static/img/banners/community/line_2.png';
import communityLine3Banner from '@/src/static/img/banners/community/line_3.png';
import communityLine4Banner from '@/src/static/img/banners/community/line_4.png';
import communityLine5Banner from '@/src/static/img/banners/community/line_5.png';
import communityLine6Banner from '@/src/static/img/banners/community/line_6.png';
import communityLine7Banner from '@/src/static/img/banners/community/line_7.png';
import communityLine8Banner from '@/src/static/img/banners/community/line_8.png';
import communityLine9Banner from '@/src/static/img/banners/community/line_9.png';

export const exportLineNameWithSubwayLineId = (lineId?: string) => {
  switch (lineId?.toString()) {
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
    case '10':
      return '신분당선';
    case '11':
      return '수인분당선';
    case '12':
      return '경의중앙선';
    case '13':
      return '우의신설선';
    case '14':
      return '신림선';
    case '15':
      return '공항선';
    default:
      return '기타 호선';
  }
};

export const exportHexColorWidthLineName = (lineName: string) => {
  switch (lineName?.toString()) {
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
    case '10':
    case '신분당선':
      return '#D31145';
    case '11':
    case '수인분당선':
      return '#FABE00';
    case '12':
    case '경의중앙선':
      return '#77C4A3';
    case '13':
    case '우의신설선':
      return '#B7C450';
    case '14':
    case '신림선':
      return '#6789CA';
    case '15':
    case '공항선':
      return '#0090D2';
    case '경춘선':
      return '#178C72';
    case '경강선':
      return '#0054A6';

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
      return '취객이 있어요!';
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

export const exportTitleFromPath = (defaultTitle?: string, pathname?: string): string => {
  if (defaultTitle) return defaultTitle;
  else {
    switch (pathname) {
      case PATH.home:
        return '아하철 - 1등 지하철&유실물 정보앱';
      case PATH.complaints:
        return '지하철 민원 센터 by 아하철';
      case PATH.lost:
        return '지하철 유실물 센터 by 아하철';
      case PATH.community:
        return '지하철 커뮤니티 by 아하철';
      default:
        return defaultMetadata.title;
    }
  }
};

export const exportDescriptionFromPath = (defaultDescription?: string, pathname?: string): string => {
  if (defaultDescription) return defaultDescription;
  else {
    switch (pathname) {
      case PATH.home:
        return '지하철에 당신의 따뜻한 이야기를 채워나가요';
      case PATH.complaints:
        return '지하철 민원을 10초 안에 해결해드릴게요';
      case PATH.lost:
        return '지하철 유실물을 모두 모아 보여드릴게요';
      case PATH.community:
        return '지하철에 당신의 따뜻한 이야기를 채워나가요';
      default:
        return defaultMetadata.description;
    }
  }
};

export const exportBannerImageWidthLineId = (lineName: string) => {
  switch (lineName) {
    case '1':
      return communityLine1Banner.src;
    case '2':
      return communityLine2Banner.src;
    case '3':
      return communityLine3Banner.src;
    case '4':
      return communityLine4Banner.src;
    case '5':
      return communityLine5Banner.src;
    case '6':
      return communityLine6Banner.src;
    case '7':
      return communityLine7Banner.src;
    case '8':
      return communityLine8Banner.src;
    case '9':
      return communityLine9Banner.src;
    default:
      return communityBanner.src;
  }
};
