import axiosInstance from '@/apis/fetcher';
import {
  type ApiResponse,
  type PaginatedList,
  type CommunityListParams,
  type CommunityPost,
  CommunityType,
} from '@/types';

export const fetchCommunityList = async (req: CommunityListParams) => {
  const endpoint =
    req.categoryType === CommunityType.HOT ? '/community-hot-posts' : '/community-posts';

  const { data } = await axiosInstance.get<ApiResponse<PaginatedList<CommunityPost>>>(endpoint, {
    params: {
      ...req,
      ...(req.categoryType !== CommunityType.HOT && { categoryType: req.categoryType }),
      pageSize: 10,
      sort: 'createdAt,desc',
    },
  });
  return data;
};
