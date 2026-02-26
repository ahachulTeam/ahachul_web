import { API_PATHS } from '@ahhachul/http';

import { fetchClient } from './fetch-client';

type PresignedPostPayload = {
  url: string;
  fields: Record<string, string>;
};

type PresignedPostResponse = PresignedPostPayload | { result?: PresignedPostPayload | null };

const PROFILE_IMAGE_KEY_PREFIX = 'profile-images';

function getFileExtension(fileName: string) {
  const extension = fileName
    .split('.')
    .pop()
    ?.toLowerCase()
    .replace(/[^a-z0-9]/g, '');
  return extension ? extension.slice(0, 10) : '';
}

function buildProfileImageS3Key(file: File) {
  const extension = getFileExtension(file.name);
  const randomKey =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;

  if (!extension) {
    return `${PROFILE_IMAGE_KEY_PREFIX}/${randomKey}`;
  }

  return `${PROFILE_IMAGE_KEY_PREFIX}/${randomKey}.${extension}`;
}

function toPresignedPostPayload(response: PresignedPostResponse): PresignedPostPayload {
  if (
    response &&
    typeof response === 'object' &&
    'url' in response &&
    'fields' in response &&
    typeof response.url === 'string'
  ) {
    return response;
  }

  if (
    response &&
    typeof response === 'object' &&
    'result' in response &&
    response.result &&
    typeof response.result === 'object' &&
    'url' in response.result &&
    'fields' in response.result &&
    typeof response.result.url === 'string'
  ) {
    return response.result;
  }

  throw new Error('Invalid presigned response');
}

function resolveUploadedImageUrl(uploadUrl: string, key: string | undefined, fallbackKey: string) {
  const base = uploadUrl.endsWith('/') ? uploadUrl.slice(0, -1) : uploadUrl;
  const resolvedKey = (key ?? fallbackKey).replace(/^\/+/, '');
  return `${base}/${resolvedKey}`;
}

export async function uploadProfileImageFile(file: File) {
  const s3Key = buildProfileImageS3Key(file);
  const presignedRaw = await fetchClient<PresignedPostResponse>(
    API_PATHS.common.s3Presigned(s3Key),
    {
      method: 'POST',
    },
  );
  const presigned = toPresignedPostPayload(presignedRaw);

  const formData = new FormData();
  Object.entries(presigned.fields).forEach(([key, value]) => {
    formData.append(key, value);
  });
  formData.append('content-type', file.type || 'application/octet-stream');
  formData.append('file', file);

  const uploadResponse = await fetch(presigned.url, {
    method: 'POST',
    body: formData,
  });

  if (!uploadResponse.ok) {
    throw new Error('Failed to upload profile image');
  }

  return resolveUploadedImageUrl(presigned.url, presigned.fields.key, s3Key);
}
