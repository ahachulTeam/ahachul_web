export const LOST_FOUND_FILTERS = [
  {
    id: 'subwayLineId',
    label: '호선',
    options: [
      { label: '1호선', value: '1' },
      { label: '2호선', value: '2' },
      { label: '3호선', value: '3' },
      { label: '4호선', value: '4' },
    ],
  },
  {
    id: 'origin',
    label: '출처',
    options: [
      { label: '경찰청 유실물 종합관리시스템', value: 'LOST112' },
      { label: '아하철', value: 'AHACHUL' },
    ],
  },
] as const
