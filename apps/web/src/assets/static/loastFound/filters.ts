export const LOST_FOUND_FILTERS = [
  {
    id: 'lines',
    label: '호선',
    options: [
      { label: '1호선', value: '1' },
      { label: '2호선', value: '2' },
      { label: '3호선', value: '3' },
      { label: '4호선', value: '4' },
    ],
  },
  {
    id: 'source',
    label: '출처',
    options: [
      { label: '마음속', value: '마음속' },
      { label: '아무거나', value: '아무거나' },
    ],
  },
] as const
