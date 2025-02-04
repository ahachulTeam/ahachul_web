export const appendFilesToFormData = (formData: FormData, files: File[], name = 'files'): void => {
  files.forEach(file => {
    formData.append(name, file, file.name);
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [excludeKey]: _, ...restData } = form;
  return restData;
};
