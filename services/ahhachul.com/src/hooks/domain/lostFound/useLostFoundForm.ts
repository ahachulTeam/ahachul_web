import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useCreateLostFound } from '@/services/lostFound';
import { type LostFoundForm, LostFoundType } from '@/types';
import { validateLexicalContent } from '@/utils/lexical';

const useLostFoundForm = () => {
  const { mutate: createLostArticle, isPending } = useCreateLostFound();

  const methods = useForm<LostFoundForm>({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      content: '',
      images: [],
      subwayLineId: 1,
      lostType: LostFoundType.LOST,
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
    (data: LostFoundForm) => {
      if (!validateContent(data.content)) return;
      createLostArticle(data);
    },
    [createLostArticle, validateContent],
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

export default useLostFoundForm;
