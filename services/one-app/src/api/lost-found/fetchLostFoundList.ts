import { IResponse, ListResponseWithPagination, LostFoundListParams, LostFoundPost } from '@/types';
import { objectToQueryString } from '@/util';

import { axiosInstance } from '../axios';

const fetchLostFoundList = (params: LostFoundListParams) =>
  axiosInstance.get<IResponse<ListResponseWithPagination<LostFoundPost>>>(
    `/lost-posts?${objectToQueryString(params, { removeZero: true })}`,
  );

export { fetchLostFoundList };
