import axios from 'axios';

import { downloadFile, parseFileExtOfName } from '@/utils';

import axiosInstance from '../fetcher';

// AWS S3 조회용 Presigned URL 요청
export const fetchS3Presigned = async (s3key: string, fileName?: string) => {
  const params = {
    ...(fileName && { fileName }),
  };
  return axiosInstance.get(`/common/presigned/${s3key}`, { params }).then(res => res?.data?.url);
};

// AWS S3 업로드용 Presigned URL 요청
export const createS3Presigned = async (s3key: string, file: File | Blob) => {
  if (!file || !s3key) return;
  const postPresigned = await axiosInstance.post(`/common/presigned/${s3key}`);

  const { url, fields } = postPresigned.data;
  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value as string | Blob);
  });

  formData.append('content-type', file.type);
  formData.append('file', file);

  await axios.post(url, formData);
};

export const download = async (title: string, s3Key: string) => {
  const ext = parseFileExtOfName(s3Key);
  const fileName = `${title}.${ext}`;
  const s3Url = await fetchS3Presigned(s3Key, fileName);

  downloadFile(s3Url);
};
