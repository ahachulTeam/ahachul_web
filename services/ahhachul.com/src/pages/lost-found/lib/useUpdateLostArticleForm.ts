import { useForm } from 'react-hook-form';

import { validateContent } from 'features/articles/lib/has-content-error';
import { usePostLostAndFoundArticle } from 'pages/lost-found/api/post-article';
import { LostForm } from 'pages/lost-found/model/form';

export const useUpdateLostArticleForm = (defaultValues: Partial<LostForm>) => {
  const { control, register, setValue, setError, getValues, handleSubmit } = useForm<LostForm>({
    mode: 'onBlur',
    defaultValues,
  });

  const { mutate: createLostArticle, isPending } = usePostLostAndFoundArticle();

  const onError = () => {
    if (!validateContent(getValues('content'), setError)) return;
  };

  const onSubmit = (data: LostForm) => {
    if (!validateContent(data.content, setError)) return;
    createLostArticle(data);
  };

  return {
    control,
    isSubmitting: isPending,
    register,
    setValue,
    setError,
    getValues,
    handleSubmit,
    onSubmit,
    onError,
  };
};
