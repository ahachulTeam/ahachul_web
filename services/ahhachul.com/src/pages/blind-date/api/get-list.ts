import type { IResponse } from 'entities/with-server';
import { base, routes, getQueryKeys, useAuthQuery } from 'shared/api';

const BLIND_KEY = [routes['blind-date']];

// eslint-disable-next-line @typescript-eslint/ban-types
const getBlindList = () => base.get<IResponse<{}>>(routes['blind-date']);

export const useGetBlindList = () =>
  useAuthQuery({
    queryFn: getBlindList,
    queryKey: getQueryKeys(BLIND_KEY).lists(),
  });
