import { API_PATHS } from '@ahhachul/http';
import { appendFilesToFormData, createJsonBlob, extractFormData } from '@ahhachul/utils';

import { fetchClient } from '@/lib/fetch-client';
import type { ApiResponse, WithPostId } from '@/types';
import type { ComplaintForm } from '@/types/complaint';

function buildMultipartBody(form: ComplaintForm): FormData {
  const formData = new FormData();
  const formDataWithoutImages = extractFormData(form, 'images');

  formData.append('content', createJsonBlob(formDataWithoutImages));

  if (form.images.length > 0) {
    appendFilesToFormData(formData, form.images);
  }

  return formData;
}

export function createComplaintPost(form: ComplaintForm): Promise<ApiResponse<WithPostId>> {
  const multipartBody = buildMultipartBody(form);

  return fetchClient<ApiResponse<WithPostId>>(API_PATHS.complaint.list, {
    method: 'POST',
    body: multipartBody,
  });
}
