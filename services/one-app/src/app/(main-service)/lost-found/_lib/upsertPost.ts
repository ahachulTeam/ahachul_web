import { appendFilesToFormData, createJsonBlob, extractFormData } from '@ahhachul/utils';

import { fetchClient } from '@/lib/fetch-client';
import type { ApiResponse, LostFoundEditForm, LostFoundForm, WithPostId } from '@/types';

function buildMultipartBody<T extends LostFoundForm | LostFoundEditForm>(
  form: T,
  files: File[],
): FormData {
  const formData = new FormData();
  const formDataWithoutImages = extractFormData(form, 'images');

  formData.append('content', createJsonBlob(formDataWithoutImages));

  if (files.length > 0) {
    appendFilesToFormData(formData, files);
  }

  return formData;
}

export function createLostFoundPost(form: LostFoundForm): Promise<ApiResponse<WithPostId>> {
  const multipartBody = buildMultipartBody(form, form.images);

  return fetchClient<ApiResponse<WithPostId>>('/lost-posts', {
    method: 'POST',
    body: multipartBody,
  });
}

export function editLostFoundPost(
  id: number,
  form: LostFoundEditForm,
): Promise<ApiResponse<WithPostId>> {
  const files = form.images.flatMap(image => (image.data ? [image.data] : []));
  const multipartBody = buildMultipartBody(form, files);

  return fetchClient<ApiResponse<WithPostId>>(`/lost-posts/${id}`, {
    method: 'POST',
    body: multipartBody,
  });
}
