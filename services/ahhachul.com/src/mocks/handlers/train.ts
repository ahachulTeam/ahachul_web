import { http, delay, HttpResponse } from 'msw';
import { API_BASE_URL } from 'data/api';
import { getRandomBoolean } from 'mocks/utils';

const fotTwo = [
  {
    upDownType: 'UP',
    nextStationDirection: '신대방방면',
    destinationStationDirection: '성수행',
    trainNum: '2234',
    currentArrivalTime: 0,
    currentTrainArrivalCode: 'ENTER',
  },
  {
    upDownType: 'UP',
    nextStationDirection: '봉천방면',
    destinationStationDirection: '성수행',
    trainNum: '2236',
    currentArrivalTime: 3,
    currentTrainArrivalCode: 'BEFORE_STATION_ARRIVE',
  },
  {
    upDownType: 'UP',
    nextStationDirection: '봉천방면',
    destinationStationDirection: '성수행',
    trainNum: '2217',
    currentArrivalTime: 7,
    currentTrainArrivalCode: 'BEFORE_STATION_ENTER',
  },
  {
    upDownType: 'UP',
    nextStationDirection: '신대방방면',
    destinationStationDirection: '성수행',
    trainNum: '2211',
    currentArrivalTime: 12,
    currentTrainArrivalCode: 'RUNNING',
  },
];

const fotSeven = [
  {
    upDownType: 'DOWN',
    nextStationDirection: '도봉산방면',
    destinationStationDirection: '도봉산행',
    trainNum: '7234',
    currentArrivalTime: 0,
    currentTrainArrivalCode: 'ENTER',
  },
  {
    upDownType: 'DOWN',
    nextStationDirection: '장암반영',
    destinationStationDirection: '도봉산행',
    trainNum: '7236',
    currentArrivalTime: 3,
    currentTrainArrivalCode: 'BEFORE_STATION_ARRIVE',
  },
  {
    upDownType: 'DOWN',
    nextStationDirection: '장암반영',
    destinationStationDirection: '도봉산행',
    trainNum: '7217',
    currentArrivalTime: 7,
    currentTrainArrivalCode: 'BEFORE_STATION_ENTER',
  },
  {
    upDownType: 'DOWN',
    nextStationDirection: '도봉산방면',
    destinationStationDirection: '도봉산행',
    trainNum: '7211',
    currentArrivalTime: 12,
    currentTrainArrivalCode: 'RUNNING',
  },
];

const forTwoCongestion = [
  {
    sectionNo: 1,
    congestionColor: 'SMOOTH',
  },
  {
    sectionNo: 2,
    congestionColor: 'MODERATE',
  },
  {
    sectionNo: 3,
    congestionColor: 'CONGESTED',
  },
  {
    sectionNo: 4,
    congestionColor: 'CONGESTED',
  },
  {
    sectionNo: 5,
    congestionColor: 'VERY_CONGESTED',
  },
  {
    sectionNo: 6,
    congestionColor: 'VERY_CONGESTED',
  },
  {
    sectionNo: 7,
    congestionColor: 'CONGESTED',
  },
  {
    sectionNo: 8,
    congestionColor: 'MODERATE',
  },
  {
    sectionNo: 9,
    congestionColor: 'SMOOTH',
  },
  {
    sectionNo: 10,
    congestionColor: 'SMOOTH',
  },
];

const forSevenCongestion = [
  {
    sectionNo: 1,
    congestionColor: 'CONGESTED',
  },
  {
    sectionNo: 2,
    congestionColor: 'SMOOTH',
  },
  {
    sectionNo: 3,
    congestionColor: 'VERY_CONGESTED',
  },
  {
    sectionNo: 4,
    congestionColor: 'CONGESTED',
  },
  {
    sectionNo: 5,
    congestionColor: 'VERY_CONGESTED',
  },
  {
    sectionNo: 6,
    congestionColor: 'VERY_CONGESTED',
  },
  {
    sectionNo: 7,
    congestionColor: 'VERY_CONGESTED',
  },
  {
    sectionNo: 8,
    congestionColor: 'CONGESTED',
  },
  {
    sectionNo: 9,
    congestionColor: 'CONGESTED',
  },
  {
    sectionNo: 10,
    congestionColor: 'MODERATE',
  },
];

const getTrainsRealTimeInfoResponse = (isLineTwo: boolean) => ({
  code: '100',
  message: 'SUCCESS',
  result: {
    trainRealTimes: isLineTwo ? fotTwo : fotSeven,
  },
});

const getTrainCongestionResponse = (isLineTwo: boolean) => ({
  code: '100',
  message: 'SUCCESS',
  result: {
    trainNo: '2023',
    congestions: isLineTwo ? forTwoCongestion : forSevenCongestion,
  },
});

const getTrainsRealTimeInfo = http.get(API_BASE_URL + '/trains/real-times', async (req) => {
  const url = req?.request?.url || '';
  const params = new URLSearchParams(url.split('?')[1]);
  const subwayLineId = params.get('subwayLineId');

  await delay(200);

  if (subwayLineId === '2') {
    return HttpResponse.json(getTrainsRealTimeInfoResponse(true));
  } else {
    return HttpResponse.json(getTrainsRealTimeInfoResponse(false));
  }
});

const getTrainCongestion = http.get(API_BASE_URL + '/trains/real-times/congestion', async (req) => {
  const url = req?.request?.url || '';
  const params = new URLSearchParams(url.split('?')[1]);
  const subwayLineId = params.get('subwayLineId');
  await delay(400);

  const bool = getRandomBoolean();

  if (bool) {
    if (subwayLineId === '2') {
      return HttpResponse.json(getTrainCongestionResponse(true));
    } else {
      return HttpResponse.json(getTrainCongestionResponse(false));
    }
  } else {
    throw new Error();
  }
});

const trainHandlers = [getTrainsRealTimeInfo, getTrainCongestion];

export default trainHandlers;
