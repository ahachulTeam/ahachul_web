import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useEditLostFound } from '@/services/lostFound';
import type { LostFoundType, LostFoundEditForm, EditableImage } from '@/types';
import { validateLexicalContent } from '@/utils/lexical';

const useEditLostFoundForm = (
  id: number,
  lostType: LostFoundType,
  defaultValues: LostFoundEditForm,
) => {
  const { mutate: updateLostArticle, isPending } = useEditLostFound(id, lostType);

  const methods = useForm<LostFoundEditForm>({
    mode: 'onBlur',
    defaultValues,
  });

  const [images = [], removeFileIds = []] = methods.watch(['images', 'removeFileIds']);

  const validateContent = useCallback(
    (content: string) => validateLexicalContent(content, methods.setError),
    [methods.setError],
  );

  const handleImageUpload = useCallback(
    (files: File[]) => {
      const fileBlob = files[0];
      if (!fileBlob) return;

      const fileUrl = URL.createObjectURL(fileBlob);
      const newImage: EditableImage = { id: null, data: fileBlob, url: fileUrl };

      methods.setValue('images', [...images, newImage], { shouldDirty: true });
    },
    [methods.setValue, images],
  );

  const handleImageDelete = useCallback(
    (index: number) => {
      const targetImage = images[index];
      if (!targetImage) return;

      if (targetImage.id !== null) {
        methods.setValue('removeFileIds', [...removeFileIds, targetImage.id], {
          shouldDirty: true,
        });
      }

      methods.setValue(
        'images',
        images.filter((_, i) => i !== index),
        { shouldDirty: true },
      );
    },
    [images, removeFileIds, methods.setValue],
  );

  const onSubmit = useCallback(
    (data: LostFoundEditForm) => {
      if (!validateContent(data.content)) return;
      updateLostArticle(data);
    },
    [updateLostArticle, validateContent],
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

export default useEditLostFoundForm;
