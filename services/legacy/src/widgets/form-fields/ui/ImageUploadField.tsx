import { Control, Controller, Path } from 'react-hook-form';

import { ImageUpload } from 'shared/ui/Input/ImageInput';

import * as styles from './FormField.css';

interface ImageUploadFieldProps<T> {
  control: Control<T>;
  name: Path<T>;
}

export const ImageUploadField = <T,>({ control, name }: ImageUploadFieldProps<T>) => (
  <div css={styles.section}>
    <span>첨부 이미지 (최대 5장)</span>
    <Controller
      name={name}
      render={({ field }) => (
        <ImageUpload
          hasPreview
          images={(field.value as File[]) || []}
          onDelete={(index: number) => {
            const currentImages = (field.value as File[]) || [];
            const newImages = [...currentImages];
            newImages.splice(index, 1);
            field.onChange(newImages);
          }}
          onChange={(files: File[]) => {
            const currentImages = (field.value as File[]) || [];
            const newImages = [...currentImages, ...files].slice(0, 5);
            field.onChange(newImages);
          }}
        />
      )}
      control={control}
    />
  </div>
);
