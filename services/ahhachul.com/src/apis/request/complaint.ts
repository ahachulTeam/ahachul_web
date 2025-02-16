import { appendFilesToFormData, createJsonBlob, extractFormData } from '@ahhachul/utils';

import axiosInstance from '@/apis/fetcher';
import type { ApiResponse, CommentList, PaginatedList, WithPostId } from '@/types';
import type {
  ComplaintForm,
  ComplaintListParams,
  ComplaintPost,
  ComplaintPostDetail,
} from '@/types/complaint';

export const fetchComplaintList = async (req: ComplaintListParams) => {
  const { data } = await axiosInstance.get<ApiResponse<PaginatedList<ComplaintPost>>>(
    '/complaint-posts',
    {
      params: {
        ...req,
        pageSize: 10,
      },
    },
  );
  return data;
};

export const createComplaint = async (req: ComplaintForm) => {
  console.log('req:', req);
  const formData = new FormData();
  const formDataWithoutImages = extractFormData(req, 'images');
  const jsonBlob = createJsonBlob(formDataWithoutImages);

  formData.append('content', jsonBlob);

  if (req.images?.length) {
    appendFilesToFormData(formData, req.images);
  }

  const { data } = await axiosInstance.post<ApiResponse<WithPostId>>('/complaint-posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export const fetchComplaintDetail = (id: number) =>
  axiosInstance.get<ApiResponse<ComplaintPostDetail>>(`/complaint-posts/${id}`);

export const fetchComplaintCommentList = (id: number) =>
  axiosInstance.get<ApiResponse<CommentList>>(`/complaint-posts/${id}/comments`, {
    params: {
      sort: 'createdAt,asc',
    },
  });
