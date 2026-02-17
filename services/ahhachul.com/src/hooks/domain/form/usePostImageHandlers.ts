import { useCallback } from 'react';
import type { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form';

import type { EditableImage } from '@/types';

import { MAX_POST_IMAGE_COUNT } from './schema';

type WithCreateImages = {
  images: File[];
};

type WithEditableImages = {
  images: EditableImage[];
  removeFileIds: number[];
};

export const useCreatePostImageHandlers = <TForm extends FieldValues & WithCreateImages>(
  methods: UseFormReturn<TForm>,
  maxImages = MAX_POST_IMAGE_COUNT,
) => {
  const images = methods.watch('images' as Path<TForm>) as TForm['images'];

  const handleImageUpload = useCallback(
    (files: File[]) => {
      const firstFile = files[0];
      if (!firstFile) return;

      const nextImages = [...images, ...files].slice(0, maxImages);

      methods.setValue('images' as Path<TForm>, nextImages as PathValue<TForm, Path<TForm>>, {
        shouldDirty: true,
      });
    },
    [images, maxImages, methods],
  );

  const handleImageDelete = useCallback(
    (index: number) => {
      const targetImage = images[index];
      if (!targetImage) return;

      methods.setValue(
        'images' as Path<TForm>,
        images.filter((_, currentIndex) => currentIndex !== index) as PathValue<TForm, Path<TForm>>,
        { shouldDirty: true },
      );
    },
    [images, methods],
  );

  return {
    handleImageUpload,
    handleImageDelete,
  };
};

export const useEditPostImageHandlers = <TForm extends FieldValues & WithEditableImages>(
  methods: UseFormReturn<TForm>,
  maxImages = MAX_POST_IMAGE_COUNT,
) => {
  const images = methods.watch('images' as Path<TForm>) as TForm['images'];
  const removeFileIds = methods.watch('removeFileIds' as Path<TForm>) as TForm['removeFileIds'];

  const handleImageUpload = useCallback(
    (files: File[]) => {
      const firstFile = files[0];
      if (!firstFile) return;
      if (images.length >= maxImages) return;

      const fileUrl = URL.createObjectURL(firstFile);
      const newImage: EditableImage = {
        id: null,
        data: firstFile,
        url: fileUrl,
      };

      methods.setValue(
        'images' as Path<TForm>,
        [...images, newImage] as PathValue<TForm, Path<TForm>>,
        { shouldDirty: true },
      );
    },
    [images, maxImages, methods],
  );

  const handleImageDelete = useCallback(
    (index: number) => {
      const targetImage = images[index];
      if (!targetImage) return;

      if (targetImage.id !== null) {
        const nextRemoveFileIds = Array.from(new Set([...removeFileIds, targetImage.id]));
        methods.setValue(
          'removeFileIds' as Path<TForm>,
          nextRemoveFileIds as PathValue<TForm, Path<TForm>>,
          { shouldDirty: true },
        );
      }

      methods.setValue(
        'images' as Path<TForm>,
        images.filter((_, currentIndex) => currentIndex !== index) as PathValue<TForm, Path<TForm>>,
        { shouldDirty: true },
      );
    },
    [images, methods, removeFileIds],
  );

  return {
    handleImageUpload,
    handleImageDelete,
  };
};
