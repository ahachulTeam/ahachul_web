import { useForm } from 'react-hook-form';

import { validateContent } from 'features/articles/lib/has-content-error';
import { usePostComplaintArticle } from 'pages/complaint/api/post-article';
import { ComplaintForm } from 'pages/complaint/model/form';

import type { complaintsContentDetail } from '../data';

export const useCreateComplaintForm = (slug: KeyOf<typeof complaintsContentDetail>) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<ComplaintForm>({
    mode: 'onBlur',
    defaultValues: {
      content: '',
      imageFiles: null,
      shortContentType: null,
      complaintType: slug,
    },
  });

  const { mutate: createComplaint, isPending: isSubmitting } = usePostComplaintArticle();

  const onError = () => {
    if (!validateContent(getValues('content'), setError)) return;
  };

  const onSubmit = (data: ComplaintForm) => {
    console.log(':data:', data);
    if (!validateContent(data.content, setError)) return;
    createComplaint(data);
  };

  return {
    control,
    handleSubmit,
    formState: { errors },
    isSubmitting,
    onSubmit,
    onError,
  };
};
