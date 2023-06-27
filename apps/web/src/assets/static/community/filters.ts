export const COMMUNITY_FILTERS = [
  {
    id: 'ordering',
    label: '정렬',
    options: [
      { label: '최신순', value: '최신순' },
      { label: '조회순', value: '조회순' },
      { label: '댓글순', value: '댓글순' },
      { label: '공감순', value: '공감순' },
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
    ],
  },
] as const
