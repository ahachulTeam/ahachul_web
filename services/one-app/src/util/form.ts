import type { CreateFormDataParams } from '@/types';

/**
 * JSON 데이터와 파일 데이터를 받아 FormData 객체를 생성합니다.
 * @param jsonDataKey
 * @param jsonData - JSON 형식의 데이터 (key-value 쌍)
 * @param fileDataKey
 * @param fileData - 파일 데이터 배열 (key와 파일 객체 포함)
 * @returns 생성된 FormData 객체
 */
export const createFormData = <T extends Record<string, any>>({
  jsonDataKey,
  jsonData,
  fileDataKey,
  fileData,
}: CreateFormDataParams<T>): FormData => {
  const formData = new FormData();

  const jsonDataBlob = new Blob([JSON.stringify(jsonData)], {
    type: 'application/json',
  });
  formData.append(jsonDataKey, jsonDataBlob);

  // 파일 데이터를 FormData에 추가
  fileData?.forEach(file => {
    formData.append(fileDataKey, file, file.name);
  });

  return formData;
};
