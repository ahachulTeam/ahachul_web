export enum SubwayLine {
  '1호선' = '1호선',
  '2호선' = '2호선',
  '3호선' = '3호선',
  '4호선' = '4호선',
  '5호선' = '5호선',
  '6호선' = '6호선',
  '7호선' = '7호선',
  '8호선' = '8호선',
  '9호선' = '9호선',
  '공항' = '공항',
  '경의중앙' = '경의중앙',
  '경춘' = '경춘',
  '수인분당' = '수인분당',
  '신분당' = '신분당',
}

export type Line = keyof typeof SubwayLine

export const isSubwayLine = (line: Line | (string & {})): line is Line => Boolean(SubwayLine[line as Line])
