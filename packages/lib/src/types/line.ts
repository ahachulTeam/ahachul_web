export enum SubwayLine {
  '1호선' = '1',
  '2호선' = '2',
  '3호선' = '3',
  '4호선' = '4',
  '5호선' = '5',
  '6호선' = '6',
  '7호선' = '7',
  '8호선' = '8',
  '9호선' = '9',
  '공항' = '공항',
  '경의중앙' = '경의중앙',
  '경춘' = '경춘',
  '수인분당' = '수인분당',
  '신분당' = '신분당',
}

export type Line = keyof typeof SubwayLine

export const isSubwayLine = (line: Line | (string & {})): line is Line => Boolean(SubwayLine[line as Line])
