/* eslint-disable @typescript-eslint/no-unused-vars */

export const appendFilesToFormData = (formData: FormData, files: File[]): void => {
  files.forEach(file => {
    formData.append('files', file, file.name);
  });
};

export const createJsonBlob = (data: object): Blob => {
  return new Blob([JSON.stringify(data)], {
    type: 'application/json',
  });
};

export const extractFormData = <T extends object, K extends keyof T>(
  form: T,
  excludeKey: K,
): Omit<T, K> => {
  const { [excludeKey]: _, ...restData } = form;
  return restData;
};
