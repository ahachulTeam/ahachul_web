import axiosInstance from '@/apis/fetcher';
import {
  type ApiResponse,
  type PaginatedList,
  type CommunityListParams,
  type CommunityPost,
  CommunityType,
  CommunityDetail,
  CommentList,
  CommunityForm,
  WithPostId,
} from '@/types';
import { appendFilesToFormData, createJsonBlob, extractFormData } from '@/utils';

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

export const createCommunity = async (req: CommunityForm) => {
  const formData = new FormData();
  const formDataWithoutImages = extractFormData(req, 'images');
  const jsonBlob = createJsonBlob(formDataWithoutImages);

  formData.append('content', jsonBlob);

  if (req.images?.length) {
    appendFilesToFormData(formData, req.images, 'imageFiles');
  }

  const { data } = await axiosInstance.post<ApiResponse<WithPostId>>('/community-posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export const fetchCommunityDetail = (id: number) =>
  axiosInstance.get<ApiResponse<CommunityDetail>>(`/community-posts/${id}`);

export const fetchCommunityCommentList = (id: number) =>
  axiosInstance.get<ApiResponse<CommentList>>(`/community-posts/${id}/comments`);
