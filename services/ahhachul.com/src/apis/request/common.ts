import axios from 'axios';

import { API_PATHS } from '@ahhachul/http';

import { downloadFile, parseFileExtOfName } from '@/utils';

import axiosInstance from '../fetcher';

// AWS S3 조회용 Presigned URL 요청
export const fetchS3Presigned = async (s3key: string, fileName?: string) => {
  const params = {
    ...(fileName && { fileName }),
  };
  return axiosInstance
    .get(API_PATHS.common.s3Presigned(s3key), { params })
    .then(res => res?.data?.url);
};

// AWS S3 업로드용 Presigned URL 요청
export const createS3Presigned = async (s3key: string, file: File | Blob) => {
  if (!file || !s3key) return;
  const postPresigned = await axiosInstance.post(API_PATHS.common.s3Presigned(s3key));

  const { url, fields } = postPresigned.data;
  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value as string | Blob);
  });

  formData.append('content-type', file.type);
  formData.append('file', file);

  await axios.post(url, formData);

  const resolvedKey = typeof fields?.key === 'string' && fields.key.length > 0 ? fields.key : s3key;
  const normalizedUrl = typeof url === 'string' && url.endsWith('/') ? url.slice(0, -1) : url;
  return `${normalizedUrl}/${String(resolvedKey).replace(/^\/+/, '')}`;
};

export const download = async (title: string, s3Key: string) => {
  const ext = parseFileExtOfName(s3Key);
  const fileName = `${title}.${ext}`;
  const s3Url = await fetchS3Presigned(s3Key, fileName);

  downloadFile(s3Url);
};
