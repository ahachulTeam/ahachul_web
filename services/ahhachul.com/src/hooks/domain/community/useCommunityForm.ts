import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useCreateCommunity } from '@/services/community';
import { CommunityType, type CommunityForm } from '@/types';
import { validateLexicalContent } from '@/utils/lexical';

const useCommunityForm = () => {
  const { mutate: createCommunity, isPending } = useCreateCommunity();

  const methods = useForm<CommunityForm>({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      content: '',
      images: [],
      subwayLineId: 1,
      categoryType: CommunityType.FREE,
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
    (data: CommunityForm) => {
      if (!validateContent(data.content)) return;

      createCommunity(data);
    },
    [createCommunity, validateContent],
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

export default useCommunityForm;
