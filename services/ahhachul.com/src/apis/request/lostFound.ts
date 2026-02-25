import { API_PAGE_SIZE, API_PATHS, API_SORT } from '@ahhachul/http';
import { appendFilesToFormData, createJsonBlob, extractFormData, sleep } from '@ahhachul/utils';

import axiosInstance from '@/apis/fetcher';
import type {
  ApiResponse,
  LostFoundForm,
  LostFoundPost,
  PaginatedList,
  LostFoundListParams,
  LostFoundPostDetail,
  CommentList,
  WithPostId,
  LostFoundEditForm,
  LostStatus,
} from '@/types';

export const fetchLostFoundList = async (req: LostFoundListParams) => {
  const { data } = await axiosInstance.get<ApiResponse<PaginatedList<LostFoundPost>>>(
    API_PATHS.lostFound.list,
    {
      params: {
        ...req,
        pageSize: API_PAGE_SIZE.list,
      },
    },
  );
  return data;
};

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

export const createLostFound = async (req: LostFoundForm) => {
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
    API_PATHS.lostFound.list,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
};

export const fetchLostFoundDetail = (id: number) =>
  axiosInstance.get<ApiResponse<LostFoundPostDetail>>(API_PATHS.lostFound.detail(id));

export const likeLostFound = (id: number) =>
  axiosInstance.post<ApiResponse<null>>(API_PATHS.lostFound.like(id));

export const unlikeLostFound = (id: number) =>
  axiosInstance.delete<ApiResponse<null>>(API_PATHS.lostFound.like(id));

export const bookmarkLostFound = (id: number) =>
  axiosInstance.post<ApiResponse<null>>(API_PATHS.lostFound.bookmark(id));

export const unbookmarkLostFound = (id: number) =>
  axiosInstance.delete<ApiResponse<null>>(API_PATHS.lostFound.bookmark(id));

export const fetchLostFoundCommentList = (id: number, sort: string = API_SORT.createdAtDesc) =>
  axiosInstance.get<ApiResponse<CommentList>>(API_PATHS.lostFound.comments(id), {
    params: {
      sort,
    },
  });

export const editLostFound = async (id: number, req: LostFoundEditForm) => {
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
    API_PATHS.lostFound.detail(id),
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
};

export const deleteLostFound = async (articleId: number) => {
  const [response] = await Promise.allSettled([
    axiosInstance.delete<ApiResponse<WithPostId>>(API_PATHS.lostFound.detail(articleId)),
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

export const updateLostFoundStatus = async (articleId: number, status: LostStatus) => {
  const [response] = await Promise.allSettled([
    axiosInstance.patch<ApiResponse<WithPostId>>(API_PATHS.lostFound.status(articleId), { status }),
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
