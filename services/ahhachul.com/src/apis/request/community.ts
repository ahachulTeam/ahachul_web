import axiosInstance from '@/apis/fetcher';
import type { ApiResponse, PaginatedList, CommunityListParams, CommunityPost } from '@/types';

export const fetchCommunityList = async (req: CommunityListParams) => {
  const { data } = await axiosInstance.get<ApiResponse<PaginatedList<CommunityPost>>>(
    '/community-posts',
    {
      params: {
        ...req,
        pageSize: 10,
        sort: 'createdAt,desc',
      },
    },
  );
  return data;
};
