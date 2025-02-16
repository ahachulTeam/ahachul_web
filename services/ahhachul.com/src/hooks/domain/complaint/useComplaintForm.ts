import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { complaintsContentDetail } from '@/constants';
import { useCreateComplaint } from '@/services/complaint';
import { KeyOf } from '@/types';
import type { ComplaintForm } from '@/types/complaint';
import { validateLexicalContent } from '@/utils/lexical';

const useComplaintForm = (slug: KeyOf<typeof complaintsContentDetail>) => {
  const { mutate: createComplaintArticle, isPending } = useCreateComplaint();

  const methods = useForm<ComplaintForm>({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      content: '',
      images: [],
      subwayLineId: 1,
      complaintType: slug,
    },
  });

  const images = methods.watch('images');

  const validateContent = useCallback(
    (content: string) => validateLexicalContent(content, methods.setError),
    [methods.setError],
  );

  const handleImageUpload = useCallback(
    (files: File[]) => {
      const fileBlob = files[0];
      if (!fileBlob) return;

      const newImages = [...images, ...files].slice(0, 5);

      methods.setValue('images', newImages, { shouldDirty: true });
    },
    [methods.setValue, images],
  );

  const handleImageDelete = useCallback(
    (index: number) => {
      const targetImage = images[index];
      if (!targetImage) return;

      methods.setValue(
        'images',
        images.filter((_, i) => i !== index),
        { shouldDirty: true },
      );
    },
    [images, methods.setValue],
  );

  const onSubmit = useCallback(
    (data: ComplaintForm) => {
      if (!validateContent(data.content)) return;
      createComplaintArticle(data);
    },
    [createComplaintArticle, validateContent],
  );

  const onError = useCallback(() => {
    validateContent(methods.getValues('content'));
  }, [methods.getValues, validateContent]);

  return {
    methods,
    isPending,
    handleImageUpload,
    handleImageDelete,
    submit: methods.handleSubmit(onSubmit, onError),
  };
};

export default useComplaintForm;
