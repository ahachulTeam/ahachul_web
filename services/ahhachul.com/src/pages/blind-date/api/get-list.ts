import { base, routes, getQueryKeys, useAuthQuery } from 'shared/api';
import type { IResponse } from 'entities/with-server';

const BLIND_KEY = [routes['blind-date']];

const getBlindList = () => base.get<IResponse<{}>>(routes['blind-date']);

export const useGetBlindList = () =>
  useAuthQuery({
    queryFn: getBlindList,
    queryKey: getQueryKeys(BLIND_KEY).lists(),
  });
