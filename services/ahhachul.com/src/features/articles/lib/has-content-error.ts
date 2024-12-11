import type { UseFormSetError, Path } from 'react-hook-form';

export const isContentFieldHasError = (content: string) => {
  const isContentEmpty =
    JSON.parse(content)?.root?.children?.[0]?.children?.length <= 0;
  return isContentEmpty;
};

export const validateContent = <TData extends { content: Nullable<string> }>(
  content: string,
  setError: UseFormSetError<TData>,
) => {
  if (isContentFieldHasError(content)) {
    setError('content' as Path<TData>, { message: '내용을 입력해주세요' });
    return false;
  }
  return true;
};
