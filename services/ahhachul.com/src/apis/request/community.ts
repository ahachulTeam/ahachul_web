import { API_PAGE_SIZE, API_PATHS, API_SORT } from '@ahhachul/http';
import { appendFilesToFormData, createJsonBlob, extractFormData, sleep } from '@ahhachul/utils';

import axiosInstance from '@/apis/fetcher';
import {
  type ApiResponse,
  type PaginatedList,
  type CommunityPost,
  CommunityType,
  CommunityDetail,
  CommentList,
  CommunityForm,
  WithPostId,
  CommunityEditForm,
} from '@/types';

interface CommunityListRequestParams {
  categoryType: CommunityType;
  subwayLineIds?: string | number;
  stationId?: number;
  content?: string;
  hashTag?: string;
  writer?: string;
  pageToken?: string;
}

const normalizePositiveNumber = (value: string | number | undefined): number | undefined => {
  if (value === undefined) {
    return undefined;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return undefined;
  }

  return parsed;
};

export const fetchCommunityList = async (req: CommunityListRequestParams) => {
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
  const normalizedRequest = {
    ...req,
    subwayLineId: normalizePositiveNumber(req.subwayLineId),
    stationId: normalizePositiveNumber(req.stationId),
  };
  const formDataWithoutImages = extractFormData(normalizedRequest, 'images');
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

export const likeCommunity = (id: number) =>
  axiosInstance.post<ApiResponse<null>>(API_PATHS.community.like(id));

export const unlikeCommunity = (id: number) =>
  axiosInstance.delete<ApiResponse<null>>(API_PATHS.community.like(id));

export const bookmarkCommunity = (id: number) =>
  axiosInstance.post<ApiResponse<null>>(API_PATHS.community.bookmark(id));

export const unbookmarkCommunity = (id: number) =>
  axiosInstance.delete<ApiResponse<null>>(API_PATHS.community.bookmark(id));

export const fetchCommunityCommentList = (id: number, sort: string = API_SORT.createdAtDesc) =>
  axiosInstance.get<ApiResponse<CommentList>>(API_PATHS.community.comments(id), {
    params: {
      sort,
    },
  });

export const editCommunity = async (id: number, req: CommunityEditForm) => {
  const formData = new FormData();
  const normalizedRequest = {
    ...req,
    subwayLineId: normalizePositiveNumber(req.subwayLineId),
    stationId: normalizePositiveNumber(req.stationId),
  };
  const formDataWithoutImages = extractFormData(normalizedRequest, 'images');
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
