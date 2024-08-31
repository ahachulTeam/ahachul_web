import { base, routes, getQueryKeys, useAuthQuery } from 'shared/api';
import type { IResponse } from 'entities/with-server';

// 지하철 노선 & 역 정보 받아오는 쿼리
const SUBWAY_LINES_KEY = [routes['subway-lines']];

const getSubwayLinesInfo = () =>
  base.get<IResponse<{}>>(routes['subway-lines']);

export const useGetSubwayLinesInfo = () =>
  useAuthQuery({
    queryFn: getSubwayLinesInfo,
    queryKey: getQueryKeys(SUBWAY_LINES_KEY).lists(),
  });
