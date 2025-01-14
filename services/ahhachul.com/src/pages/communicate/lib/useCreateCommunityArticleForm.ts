import { useForm } from 'react-hook-form';

import { validateContent } from 'features/articles/lib/has-content-error';
import { usePostCommunityArticle } from 'pages/communicate/api/post-article';
import { CommunityForm } from 'pages/communicate/model/form';

export const useCreateCommunityArticleForm = () => {
  const {
    formState: { errors },
    control,
    register,
    setValue,
    setError,
    getValues,
    handleSubmit,
  } = useForm<CommunityForm>({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      content: '',
      imageFiles: null,
      categoryType: 'FREE',
    },
  });

  const { mutate: createComplaint, isPending } = usePostCommunityArticle();

  const onError = () => {
    if (!validateContent(getValues('content'), setError)) return;
  };

  const onSubmit = (data: CommunityForm) => {
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
