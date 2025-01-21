import axiosInstance from '@/apis/fetcher';
import {
  type ApiResponse,
  type PaginatedList,
  type CommunityListParams,
  type CommunityPost,
  CommunityType,
  CommunityDetail,
  CommentList,
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

export const fetchCommunityDetail = (id: number) =>
  axiosInstance.get<ApiResponse<CommunityDetail>>(`/community-posts/${id}`);

export const fetchCommunityCommentList = (id: number) =>
  axiosInstance.get<ApiResponse<CommentList>>(`/community-posts/${id}/comments`);
