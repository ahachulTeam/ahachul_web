export const COMMUNITY_FILTERS = [
  {
    id: 'sort',
    label: '정렬',
    options: [
      { label: '최신순', value: 'createdAt' },
      { label: '조회순', value: 'views' },
      { label: '공감순', value: 'likes' },
    ],
  },
  {
    id: 'lines',
    label: '호선',
    options: [
      { label: '1호선', value: '1' },
      { label: '2호선', value: '2' },
      { label: '3호선', value: '3' },
      { label: '4호선', value: '4' },
      { label: '5호선', value: '5' },
      { label: '6호선', value: '6' },
      { label: '7호선', value: '7' },
      { label: '8호선', value: '8' },
      { label: '9호선', value: '9' },
    ],
  },
] as const
