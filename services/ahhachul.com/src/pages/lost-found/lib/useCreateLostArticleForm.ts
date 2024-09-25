import { useForm } from 'react-hook-form';
import { LostForm } from 'pages/lost-found/model/form';
import { validateContent } from 'features/articles/lib/has-content-error';
import { usePostLostAndFoundArticle } from 'pages/lost-found/api/post-article';

export const useCreateLostArticleForm = () => {
  const {
    formState: { errors },
    control,
    register,
    setValue,
    setError,
    getValues,
    handleSubmit,
  } = useForm<LostForm>({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      content: '',
      imageFiles: null,
      lostType: 'LOST',
    },
  });

  const { mutate: createComplaint, isPending } = usePostLostAndFoundArticle();

  const onError = () => {
    if (!validateContent(getValues('content'), setError)) return;
  };

  const onSubmit = (data: LostForm) => {
    if (!validateContent(data.content, setError)) return;
    createComplaint(data);
  };

  return {
    control,
    register,
    setValue,
    setError,
    getValues,
    handleSubmit,
    formState: { errors },
    isSubmitting: isPending,
    onSubmit,
    onError,
  };
};
