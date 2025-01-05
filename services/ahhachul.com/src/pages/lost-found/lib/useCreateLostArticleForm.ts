import { useForm } from 'react-hook-form';
import { LostForm } from 'pages/lost-found/model/form';
import { validateContent } from 'features/articles/lib/has-content-error';
import { usePostLostAndFoundArticle } from 'pages/lost-found/api/post-article';

export const useCreateLostArticleForm = () => {
  const { control, register, setValue, setError, getValues, handleSubmit } =
    useForm<LostForm>({
      mode: 'onBlur',
      defaultValues: {
        title: '',
        content: '',
        lostType: 'LOST',
        imageFiles: null,
        subwayLineId: null,
      },
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
