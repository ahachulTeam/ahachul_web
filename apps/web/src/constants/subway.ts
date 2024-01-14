export const SUBWAY_LINE_FILTER = {
  id: 'lines',
  label: '호선',
  options: [
    // temporarily
    { label: '1호선', value: 1 },
    { label: '2호선', value: 2 },
    { label: '3호선', value: 3 },
    { label: '4호선', value: 4 },
    { label: '5호선', value: 5 },
    { label: '6호선', value: 6 },
    { label: '7호선', value: 7 },
    { label: '8호선', value: 8 },
    { label: '9호선', value: 9 },
  ],
} as const

export const SUBWAY_CALL_CENTER = [
  {
    id: 0,
    label: '수도권 1~8호선',
    callNumber: '021234567',
  },
  {
    id: 1,
    label: '9호선',
    callNumber: '021234567',
  },
  {
    id: 2,
    label: '신분당선',
    callNumber: '021234567',
  },
  {
    id: 3,
    label: '공항철도, 경의중앙선, 분당선',
    callNumber: '021234567',
  },
]

export const SUBWAY_SELECT_UUID = 'ahhachulsubwaydialog'

export const SUBWAY_TRAIN_ARRIVAL_CODE = {
  ENTER: '진입',
  ARRIVE: '도착',
  DEPARTURE: '출발',
  BEFORE_STATION_DEPARTURE: '전역출발',
  BEFORE_STATION_ENTER: '전역진입',
  BEFORE_STATION_ARRIVE: '전역도착',
  RUNNING: '운행중',
}
