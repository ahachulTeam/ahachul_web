import { axiosInstance, axiosRoutes, getQueryKeys, useAuthQuery } from 'shared/api';

const BLIND_KEY = [axiosRoutes['blind-date']];

const getBlindList = () => axiosInstance.get(axiosRoutes['blind-date']);
const useGetBlindList = () =>
  useAuthQuery({
    queryFn: getBlindList,
    queryKey: getQueryKeys(BLIND_KEY).lists(),
  });

export { useGetBlindList };
