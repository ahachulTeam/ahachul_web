import { API_PAGE_SIZE, API_PATHS, API_SORT } from '@ahhachul/http';
import { appendFilesToFormData, createJsonBlob, extractFormData, sleep } from '@ahhachul/utils';

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
  CommunityEditForm,
} from '@/types';

export const fetchCommunityList = async (req: CommunityListParams) => {
  const endpoint =
    req.categoryType === CommunityType.HOT ? API_PATHS.community.hotList : API_PATHS.community.list;

  const { data } = await axiosInstance.get<ApiResponse<PaginatedList<CommunityPost>>>(endpoint, {
    params: {
      ...req,
      ...(req.categoryType !== CommunityType.HOT && { categoryType: req.categoryType }),
      pageSize: API_PAGE_SIZE.list,
      sort: API_SORT.createdAtDesc,
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
    appendFilesToFormData(formData, req.images);
  }

  const { data } = await axiosInstance.post<ApiResponse<WithPostId>>(
    API_PATHS.community.list,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
};

export const fetchCommunityDetail = (id: number) =>
  axiosInstance.get<ApiResponse<CommunityDetail>>(API_PATHS.community.detail(id));

export const fetchCommunityCommentList = (id: number) =>
  axiosInstance.get<ApiResponse<CommentList>>(API_PATHS.community.comments(id), {
    params: {
      sort: API_SORT.createdAtAsc,
    },
  });

export const editCommunity = async (id: number, req: CommunityEditForm) => {
  const formData = new FormData();
  const formDataWithoutImages = extractFormData(req, 'images');
  const jsonBlob = createJsonBlob(formDataWithoutImages);

  formData.append('content', jsonBlob);

  if (req.images?.length) {
    appendFilesToFormData(
      formData,
      req.images.flatMap(image => (image.data !== null ? [image.data] : [])),
    );
  }

  const { data } = await axiosInstance.post<ApiResponse<WithPostId>>(
    API_PATHS.community.detail(id),
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
};

export const deleteCommunity = async (articleId: number) => {
  const [response] = await Promise.allSettled([
    axiosInstance.delete<ApiResponse<WithPostId>>(API_PATHS.community.detail(articleId)),
    sleep(750),
  ]);

  if (response.status === 'rejected') {
    throw response.reason;
  }

  if (response.status === 'fulfilled') {
    return response.value.data;
  }

  // TODO: sentry에 로그 남김
  throw new Error('Unexpected state in Promise.allSettled');
};
