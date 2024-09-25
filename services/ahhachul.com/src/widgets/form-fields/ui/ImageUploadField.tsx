import React from 'react';
import { Control, Controller, Path } from 'react-hook-form';
import { ImageUpload } from 'shared/ui/Input/ImageInput';
import * as styles from './FormField.css';

interface ImageUploadFieldProps<T> {
  control: Control<T>;
  name: Path<T>;
}

export const ImageUploadField = <T,>({
  control,
  name,
}: ImageUploadFieldProps<T>) => (
  <div css={styles.section}>
    <span>첨부 이미지</span>
    <Controller
      name={name}
      render={({ field }) => (
        <ImageUpload
          hasPreview
          image={field.value as File | null}
          disabled={!!field.value}
          onDelete={() => field.onChange(null)}
          onChange={(file) => field.onChange(file)}
        />
      )}
      control={control}
    />
  </div>
);
