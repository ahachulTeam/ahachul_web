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
} from '@/types';
import { appendFilesToFormData, createJsonBlob, extractFormData } from '@/utils';

export const fetchLostFoundList = async (req: LostFoundListParams) => {
  const { data } = await axiosInstance.get<ApiResponse<PaginatedList<LostFoundPost>>>(
    '/lost-posts',
    {
      params: {
        ...req,
        pageSize: 10,
      },
    },
  );
  return data;
};

export const createLostFound = async (req: LostFoundForm) => {
  const formData = new FormData();
  const formDataWithoutImages = extractFormData(req, 'images');
  const jsonBlob = createJsonBlob(formDataWithoutImages);

  formData.append('content', jsonBlob);

  if (req.images?.length) {
    appendFilesToFormData(formData, req.images);
  }

  const { data } = await axiosInstance.post<ApiResponse<WithPostId>>('/lost-posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export const fetchLostFoundDetail = (id: number) =>
  axiosInstance.get<ApiResponse<LostFoundPostDetail>>(`/lost-posts/${id}`);

export const fetchLostFoundCommentList = (id: number) =>
  axiosInstance.get<ApiResponse<CommentList>>(`/lost-posts/${id}/comments`);

export const editLostFound = async (id: number, req: LostFoundEditForm) => {
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
    `/lost-posts/${id}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
};
