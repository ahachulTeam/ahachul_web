export const SUBWAY_LINE_FILTER = {
  id: 'lines',
  label: '호선',
  options: [
    // temporarily
    { label: '1호선', value: '64' },
    { label: '2호선', value: '65' },
    { label: '3호선', value: '66' },
    { label: '4호선', value: '67' },
    { label: '5호선', value: '68' },
    { label: '6호선', value: '69' },
    { label: '7호선', value: '70' },
    { label: '8호선', value: '71' },
    { label: '9호선', value: '72' },
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
